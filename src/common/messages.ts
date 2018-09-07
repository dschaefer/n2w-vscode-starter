export interface Message {
    token?: number;
}

export interface AddRequest extends Message {
    command: 'addRequest';
    x: number;
    y: number;
}

export interface AddResponse extends Message {
    command: 'addResponse';
    result: number;
}

export type Request = AddRequest;
export type Response = AddResponse;
