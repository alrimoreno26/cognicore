import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {BehaviorSubject, Subscription} from 'rxjs';
import {cloneDeep} from 'lodash';
import {ChatService} from '../../service/chat.service';
import {BusinessService} from '../../../business/service/business.service';
import {MessageServices} from '../../../../core/injects/message.services';

@Component({
    selector: 'sentence-generated',
    templateUrl: './sentence-generated.component.html',
    styleUrls: ['./sentence-generated.component.scss']
})
export class SentenceGeneratedComponent implements OnInit {
    @Input() sentences: any[];
    @Input() state: string;
    @Input() domain: string;
    @Input() checkAll: boolean;
    generations: any[];

    @Output() checkedSentences: EventEmitter<number> = new EventEmitter<number>();
    @Output() modifyCampaign: EventEmitter<any> = new EventEmitter<any>();


    edited = false;
    reVisuals = [];
    oldValues = {
        title: '',
        campaign: '',
        tagline: '',
        visuals: '',
    };
    promptImage: any = '';
    subscriptions: Subscription = new Subscription();
    arrayVisualsChanges = new BehaviorSubject<boolean[]>([]);
    generationsImages = new BehaviorSubject<boolean[]>([]);

    constructor(public chatService: ChatService,
                private business: BusinessService,
                private messageService: MessageServices,
                private ref: ChangeDetectorRef
    ) {
        if (this.sentences !== undefined) {
            this.sentences.sort((a, b) => (a.brand === b.brand ? 0 : a.brand ? -1 : 1));
            this.generations = cloneDeep(this.sentences);
        }
        this.initStates();
        this.chatService.newImage$.subscribe((status) => {
            let i = 0;
            if (status.status === 'OK') {
                if (Object.keys(status.generated_images_urls.url).length > 0) {
                    this.generations.map(f => {
                        if (f.prompt.id === this.promptImage) {
                            this.reVisuals[i] = false;
                            this.changeArrayVisualsChangesImage(i, false);
                            this.changeArrayVisualsChanges(i, false);
                            return f.images[0].itemImageSrc = status.generated_images_urls.url;
                        } else {
                            return f;
                        }
                    });
                }
            }
            if (status.status === 'FAIL') {
                this.generations.map(f => {
                    let index = 0;
                    if (f.prompt.id === this.promptImage) {
                        this.messageService.addError('An error occurred trying to regenerate the image, try again later');
                        index = this.generations.findIndex(x=>x.id === f.id)
                    }
                    this.reVisuals[index] = false;
                    this.changeArrayVisualsChangesImage(index, false);
                    this.changeArrayVisualsChanges(index, false);
                    return f;
                });
            }

            this.ref.markForCheck();
            i++;
        });
    }

    initStates() {
        this.subscriptions.add(
            this.chatService.checkAll$.subscribe(status => {
                if (status.value && this.generations.filter(x => x.checked).length !== this.generations.length) {
                    this.generations.filter(s => s.step === status.step).forEach(gen => {
                        if (!gen.checked) {
                            gen.checked = status.value;
                            this.checkedSentences.next(1);
                        }
                    });
                }
                if (status.step === -1 && this.generations.filter(x => x.checked).length === this.generations.length) {
                    this.generations.forEach(gen => {
                        gen.checked = false;
                        this.checkedSentences.next(-1);

                    });
                }
            })
        );

    }

    ngOnInit(): void {
        this.generations = cloneDeep(this.sentences);
        this.generations.map(() => {
            this.reVisuals.push(false);
            this.arrayVisualsChanges.value.push(false);
            this.generationsImages.value.push(false);
        });
    }

    generatingImage(pos): boolean {
        return this.generationsImages.value[pos];
    }

    changeArrayVisualsChanges(index: number, valor: boolean) {
        const currentArray = this.arrayVisualsChanges.getValue();
        currentArray[index] = valor;
        this.arrayVisualsChanges.next(currentArray);
    }

    changeArrayVisualsChangesImage(index: number, valor: boolean) {
        const currentArray = this.generationsImages.getValue();
        currentArray[index] = valor;
        this.generationsImages.next(currentArray);
    }

    getPromptInitialText(prompt: any): string {
        let initial = '';
        if (prompt.facet !== '') {
            initial += prompt.facet.toUpperCase();
        }
        if (prompt.gender !== '') {
            initial += prompt.gender.charAt(0).toUpperCase();
        }
        if (prompt.age !== '') {
            initial += prompt.age;
        }
        return initial;
    }

    getPromptTooltip(target: any, prompt: any): string {
        let tooltip = [];
        const personalised = [
            {index: 'r', value: 'Rest'},
            {index: 'o', value: 'Openness'},
            {index: 'c', value: 'Conscientiousness'},
            {index: 'e', value: 'Extraversion'},
            {index: 'a', value: 'Agreeableness'},
            {index: 'n', value: 'Neuroticism'}
        ];
        if (prompt.facet !== '' && prompt.facet !== undefined) {
            let selected = personalised.find(obj => obj.index === prompt.facet);
            if (selected !== undefined) {
                tooltip.push(selected.value);
            }
        }
        if (prompt.gender !== '' && prompt.gender !== undefined) {
            tooltip.push(prompt.gender.toUpperCase());
        }
        if (prompt.age !== '' && prompt.age !== undefined) {
            tooltip.push(prompt.age);
        }
        if (target) {
            return 'Generated for brand: ' + tooltip.join('-');
        } else {
            return tooltip.join('-');
        }

    }

    checkVersion(event, pos) {
        event.stopPropagation();
        event.preventDefault();
        this.generations[pos].checked = !this.generations[pos].checked;
        if (this.generations.filter(f => f.checked).length > 0) {
            this.generations[pos].checked ? this.checkedSentences.next(1) : this.checkedSentences.next(-1);
        }
    }

    editVersion(event, pos) {
        this.edited = !this.edited;
        this.oldValues.title = this.generations[pos].title;
        this.oldValues.tagline = this.generations[pos].tagline;
        this.oldValues.campaign = this.generations[pos].campaign;
        this.oldValues.visuals = this.generations[pos].visuals;
    }

    cancelEdit(event, pos) {
        this.edited = !this.edited;
        this.generations[pos].title = this.oldValues.title;
        this.generations[pos].tagline = this.oldValues.tagline;
        this.generations[pos].campaign = this.oldValues.campaign;
        this.generations[pos].visuals = this.oldValues.visuals;
        this.oldValues.title = '';
        this.oldValues.tagline = '';
        this.oldValues.campaign = '';
        this.oldValues.visuals = '';

    }

    saveEdit(event, pos) {
        this.edited = !this.edited;
        //this.chatService.setChangedValues$({old: this.oldValues.campaign, new: this.generations[pos].campaign});
        if (this.oldValues.campaign !== this.generations[pos].campaign) {
            this.modifyCampaign.next({pos: pos, value: this.generations[pos].campaign});
        }
    }

    newImage(event, pos) {
        const data = {
            target: this.generations[pos].target,
            age: this.generations[pos].prompt.age,
            sex: this.generations[pos].prompt.gender,
            personality: this.generations[pos].prompt.facet,
            description: this.generations[pos].visuals,
            domain: this.domain,
            business_id: this.business.selectedEntity$().id,
            generation_id: this.generations[pos].generation_id,
            id: this.generations[pos].id
        };
        this.promptImage = this.generations[pos].prompt.id;
        this.changeArrayVisualsChangesImage(pos, true);
        this.chatService.changeImage(data);
    }
}
