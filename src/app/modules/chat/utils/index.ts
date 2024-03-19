import {SentenceRobotMessage} from '../model';

export function modifyChatAnswer(answer: any, step:any): SentenceRobotMessage {
    const message: SentenceRobotMessage = {};
    message.title = answer.generated_texts.title;
    message.tagline = answer.generated_texts.tagline;
    message.campaign = answer.generated_texts.campaign_message;
    message.visuals = answer.generated_texts.visuals_description;
    message.hashtags = Array.isArray(answer.generated_texts.hashtags) ?
        answer.generated_texts.hashtags :
        answer.generated_texts.hashtags !== undefined ? answer.generated_texts.hashtags.split(' ') : [];
    message.id = answer.id;
    message.generation_id = answer.generation_id;
    message.step = step;
    message.target = answer.segment_id;
    message.checked = false;
    let img = [{
        itemImageSrc: answer.imagen,
        thumbnailImageSrc: answer.imagen,
        alt: 'Description for Image 1',
        title: 'Image 1'
    }];
    message.prompt = {
        id: answer.id,
        age: answer.age,
        gender: answer.sex,
        facet: answer.facet,
    };
    message.images = img;
    message.filters = answer.filters;
    message.seed = answer.target;
    message.brand = answer.brand;
    message.completeText = answer.generated_texts;
    return message;
}
