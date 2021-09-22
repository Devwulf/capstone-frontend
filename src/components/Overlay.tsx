import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { GraphOverlayContext } from "../utils/Context";
import LineGraph from "./LineGraph";
import PieGraph from "./PieGraph";

type OverlayProps = {

}

type OverlayState = {

}

export default class Overlay extends React.Component<OverlayProps, OverlayState> {
    constructor(props: OverlayProps) {
        super(props);

        this.state = {

        };
    }

    render(): JSX.Element {
        return (
            <GraphOverlayContext.Consumer>
                {({ setShowGraph }) => (
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex">
                        <div className="w-full h-full bg-gray-900 opacity-50"></div>
                        <div className="absolute w-full h-full flex items-center justify-center px-24 py-12 z-20">
                            <div className="w-full h-full max-w-6xl bg-gray-100">
                                <div className="p-4 flex flex-row-reverse justify-between">
                                    <button className="px-4 py-2 rounded-default text-sm bg-red-500 text-red-200"
                                        onClick={() => setShowGraph(false)}>
                                        Close
                                    </button>
                                </div>
                                <div className="p-4" style={{height: "calc(100% - 4.5rem)"}}>
                                    <Scrollbars>
                                        <div className="px-4">
                                            <LineGraph isProbability={true} showTeam={false} />
                                            <LineGraph isProbability={false} />
                                            <PieGraph />
                                        </div>
                                    </Scrollbars>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </GraphOverlayContext.Consumer>
        );
    }
}