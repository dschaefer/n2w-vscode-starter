import * as vscode from 'vscode';
import { Server } from './Server';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('n2w.showView', () => new Server(context))
    );
}