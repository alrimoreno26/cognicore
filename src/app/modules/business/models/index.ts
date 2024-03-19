import {WorkspaceTO} from '../../workspace/models';

export interface BusinessTO {
    id: string,
    name: string,
    description: string,
    isAnalyst?: boolean;
    color: string,
    owner: string,
    analysts: string[]
    workspaces: WorkspaceTO[]
}

export interface AllBusinessTO{
    owner: BusinessTO[];
    analysts: BusinessTO[];
}


export interface CreatedTO{
    id: string
}
