export interface Notify {
  body: string;
  created: string;
  id: number;
  payload: any;
  read: boolean;
  title: string;
  uri?: string;
  email?: string;
}

export interface WsMessage {
  body: string;
  title: string;
  payload: any;
  created: string;
}

