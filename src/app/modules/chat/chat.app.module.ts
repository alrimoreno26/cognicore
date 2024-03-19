import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatAppRoutingModule } from './chat.app-routing.module';
import { ChatAppComponent } from './chat.app.component';
import { ChatSidebarComponent } from './components/chat-sidebar/chat-sidebar.component';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BadgeModule } from 'primeng/badge';
import { UserCardComponent } from './components/user-card/user-card.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { ChatService } from './service/chat.service';
import { RippleModule } from 'primeng/ripple';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import {reducer} from './store/chat.reducers';
import {ChatEffects} from './store/chat.effects';
import {LottieComponent} from "ngx-lottie";
import {PipesModule} from '../../core/pipes/pipes.module';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SentenceGeneratedComponent} from './components/sentence-generated/sentence-generated.component';
import {AccordionModule} from 'primeng/accordion';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TagModule} from 'primeng/tag';
import {TooltipModule} from 'primeng/tooltip';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {MultiSelectModule} from 'primeng/multiselect';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChatAppRoutingModule,
        AvatarModule,
        InputTextModule,
        ButtonModule,
        BadgeModule,
        OverlayPanelModule,
        RippleModule,
        PipesModule,
        LottieComponent,
        StoreModule.forFeature('chat', reducer),
        StoreDevtoolsModule.instrument({}),
        EffectsModule.forFeature([ChatEffects]),
        RadioButtonModule,
        AccordionModule,
        InputTextareaModule,
        TagModule,
        TooltipModule,
        DropdownModule,
        InputSwitchModule,
        MultiSelectModule,
    ],
    declarations: [
        ChatSidebarComponent,
        ChatAppComponent,
        UserCardComponent,
        ChatBoxComponent,
        SentenceGeneratedComponent
    ],
    providers: [
        ChatService
    ]
})
export class ChatAppModule { }
