import React from "react";
import { AccuracyContext } from "../utils/Context";
import ToggleTeam from "./ToggleTeam";

type TopBarProps = {

}

type TopBarState = {
    accuracy: number;
}

export default class TopBar extends React.Component<TopBarProps, TopBarState> {
    static contextType = AccuracyContext;
    constructor(props: TopBarProps) {
        super(props);

        this.state = {
            accuracy: 0
        };

        this.onAccuracyChanged = this.onAccuracyChanged.bind(this);
    }

    componentDidMount(): void {
        this.context.addListener("topBar", this.onAccuracyChanged);
    }

    async onAccuracyChanged(accuracy: number): Promise<void> {
        this.setState({accuracy: accuracy});
    }

    componentWillUnmount(): void {
        this.context.removeListener("topBar");
    }

    render(): JSX.Element {
        const { accuracy } = this.state;
        return (
            <div className="flex justify-between w-screen h-16 p-4">
                <ToggleTeam />
                <div className="flex items-center">
                    <span className="font-medium">Model Accuracy: {(accuracy * 100).toFixed(2)}%</span>
                </div>
            </div>
        );
    }
}