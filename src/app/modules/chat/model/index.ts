export interface MessageTO {
    id: string | number;
    usr: string
    msg?: any
    showMessage?: boolean
    grafica?: any
    response?: any[]
    target_option?: any[]
    target_title?: string
    step?: number
    msgDate?: string
    fromRobots?: boolean
    generating?: boolean
    type?: string
    status?: string
    selectedResponse?: any,
    bussiness_id?: any,
    brand?: any,
    seed?: any,
    domain?: any,
    required_visuals?: boolean,
    ui_filters?: string[],
    approved_generation?: boolean,
}

export interface SentenceRobotMessage {
    title?: string;
    tagline?: string;
    id?: string;
    generation_id?: string;
    campaign?: string;
    visuals?: string;
    target?: string;
    seed?: string;
    hashtags?: string[];
    filters?: string[];
    images?: any;
    checked?: boolean;
    brand?: boolean;
    completeText?: string;
    step?: string;
    tone?: string;
    prompt?: Prompt;
    approach?: string;
}

export interface Prompt {
    age?: string | '';
    defaultGenerated?: boolean | false;
    description?: string | '';
    facet?: string | '';
    gender?: string | '';
    id?: string | number;
    interests?: string[] | [];
    target?: string | '';
    requires_visuals?: boolean | false;
}

export const optionsCustomization: any[] = [
    {name: 'Brand', key: 'brand'},
    {name: 'Personality', key: 'personality'},
    {name: 'Age', key: 'age'},
    {name: 'Gender', key: 'sex'}
];

export const optionsExternalData: any[] = [
    {name: 'HTTP', key: 'HTTP'},
    {name: 'File', key: 'FILE'}
];

export const optionsFilters: any[] = [
    {name: 'Short', key: 'SHORT'},
    {name: 'Long', key: 'LONG'},
    {name: 'Descriptive', key: 'DESCRIPTIVE'},
    {name: 'Creative', key: 'CREATIVE'},
];
