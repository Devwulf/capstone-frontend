import React from "react";
import { Team } from "../models/Policies";
import { AccuracyContext, GraphOverlayContext, TeamContext } from "../utils/Context";
import Searchbar from "./Searchbar";
import ToggleBaseUrl from "./ToggleBaseUrl";
import ToggleTeam from "./ToggleTeam";
import Tooltip from "./Tooltip";

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
            <GraphOverlayContext.Consumer>
                {({ setShowGraph }) => (
                    <TeamContext.Consumer>
                        {({ team }) => (
                            <div className="flex justify-between w-screen h-20 p-4">
                                <div className="flex flex-row">
                                    <div className="flex flex-col justify-center mr-4">
                                        <ToggleTeam />
                                        <Tooltip order={0}
                                            text="This is for toggling the team to track, between either Blue or Red team."
                                            position="bottom"
                                            positionOffsetX={1}
                                            positionOffsetY={3}
                                            hasPrev
                                            hasNext />
                                    </div>
                                    <div className="flex flex-col justify-center mr-4">
                                        <ToggleBaseUrl />
                                        <Tooltip order={1}
                                            text="This is for choosing whether to use your own local backend server or a premade server for the action queries."
                                            position="bottom"
                                            positionOffsetY={3}
                                            hasPrev
                                            hasNext />
                                    </div>
                                </div>
                                <div className="w-full flex flex-col max-w-3xl items-center">
                                    <Searchbar />
                                    <Tooltip order={2}
                                        text="Type in the Youtube link to the match replay here. Click the Demo button for a test Youtube link. The following formats are accepted: https://youtu.be/kTewx3x6Dps or https://www.youtube.com/watch?v=kTewx3x6Dps or kTewx3x6Dps"
                                        position="bottom"
                                        positionOffsetY={3}
                                        hasPrev
                                        hasNext />
                                </div>
                                <div className="flex flex-col items-end justify-center w-40">
                                    <button className={`px-4 py-2 rounded-default text-sm ${team === Team.Blue ? "bg-blue-500 text-blue-200" : "bg-red-500 text-red-200"}`}
                                        onClick={() => setShowGraph(true)}>
                                        Show Graphs
                                    </button>
                                    <Tooltip order={3}
                                        text="This shows an overlay containing graphs for real-time visualization of data."
                                        position="bottom"
                                        positionOffsetX={-6}
                                        positionOffsetY={3}
                                        hasPrev
                                        hasClose />
                                    {/*
                                <>
                                    <span className="text-sm">Model Accuracy:</span>
                                    <span className="text-sm font-bold">{(accuracy * 100).toFixed(2)}%</span>
                                </>
                            /**/}
                                </div>
                            </div>
                        )}
                        
                    </TeamContext.Consumer>
                )}
                
            </GraphOverlayContext.Consumer>
        );
    }
}