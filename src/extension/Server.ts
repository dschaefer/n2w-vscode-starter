import * as vscode from 'vscode';
import * as path from 'path';
import { Request, Response } from '../common/messages';
import { add } from '../native/native';

export class Server {
    private panel: vscode.WebviewPanel;

    constructor(private context: vscode.ExtensionContext) {
        this.panel = vscode.window.createWebviewPanel(
            'n2w-starter',
            'Native to Webview',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [ vscode.Uri.file(path.join(context.extensionPath, 'out')) ]
            }
        );
        context.subscriptions.push(this.panel);

        this.panel.webview.onDidReceiveMessage((request: Request) => this.receiveMessage(request));
    
        this.panel.webview.html = `
            <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                </head>
                <body>
                    <div id="app"></div>
                    ${this.loadScript('out/vendor.js')}
                    ${this.loadScript('out/view.js')}
                </body>
            </html>
        `;
    }

    private loadScript(path: string) {
        return `<script src="${vscode.Uri.file(this.context.asAbsolutePath(path)).with({ scheme: 'vscode-resource'}).toString()}"></script>`;
    }

    postMessage(response: Response) {
        this.panel.webview.postMessage(response);
    }
    
    async receiveMessage(request: Request) {
        switch (request.command) {
            case 'addRequest':
                this.postMessage({
                    command: 'addResponse',
                    token: request.token,
                    result: await add(request.x, request.y)
                });
                break;
        }
    }
}
