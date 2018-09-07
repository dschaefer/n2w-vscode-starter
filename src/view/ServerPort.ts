import { Response, AddRequest, AddResponse, Request } from "../common/messages";

declare function acquireVsCodeApi(): any;
const vscode = acquireVsCodeApi();

export class ServerPort {
    private currentToken = 0;
    private queue: {
        token: number,
        receiver: (response: Response) => void;
    }[] = [];

    constructor() {
        window.addEventListener('message', event => {
            const response: Response = event.data;
            this.queue = this.queue.filter(entry => {
                if (entry.token === response.token) {
                    entry.receiver(response);
                    return false;
                } else {
                    return true;
                }
            });
        });
    }

    post(request: AddRequest): Promise<AddResponse>;

    post<Req extends Request, Resp extends Response>(request: Request): Promise<Response> {
        return new Promise<Resp>((resolve, reject) => {
            request.token = this.currentToken++;
            vscode.postMessage(request);
            this.queue.push({
                token: request.token,
                receiver: (response: Response) => {
                    resolve(response as Resp);
                }
            });
        });
    }
}
