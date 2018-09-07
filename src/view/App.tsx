import React from 'react';
import { ServerPort } from "./ServerPort";

interface AppState {
    x: number;
    y: number;
    result?: number;
}

export class App extends React.Component<{}, AppState> {
    private port: ServerPort = new ServerPort();

    constructor(props: any) {
        super(props);
        this.state = {
            x: 3,
            y: 5
        };

        this.port.post({
            command: 'addRequest',
            x: this.state.x,
            y: this.state.y
        }).then(response => {
            this.setState({
                result: response.result
            });
        });
    }

    render() {
        const prefix = `Adding ${this.state.x} + ${this.state.y}`;
        const message = prefix + (this.state.result ? ` = ${this.state.result}` : " : request sent");
        return <p>{message}</p>;
    }
}
