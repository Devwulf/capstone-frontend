import React from "react";
import { TooltipContext } from "../utils/Context";

type TooltipProps = {
    order: number;
    text: string;
    position: "left" | "right" | "top" | "bottom";
    positionOffset?: number;
    hasPrev?: boolean;
    hasNext?: boolean;
    hasClose?: boolean;
    isClose?: boolean;
}

type TooltipState = {

}

export default class Tooltip extends React.Component<TooltipProps, TooltipState> {
    constructor(props: TooltipProps) {
        super(props);

        this.state = {

        };
    }

    render(): JSX.Element {
        const { order, text, position, positionOffset = 0, hasPrev = false, hasNext = false, hasClose = false, isClose = false } = this.props;
        let style: React.CSSProperties;
        switch(position) {
        case "top":
            style = {
                bottom: `calc(100% + 0.75rem + ${positionOffset}rem)`
            };
            break;
        case "bottom":
            style = {
                top: `calc(100% + 0.75rem + ${positionOffset}rem)`
            };
            break;
        case "left":
            style = {
                right: `calc(100% + 0.75rem + ${positionOffset}rem)`
            };
            break;
        default:
            style = {
                left: `calc(100% + 0.75rem + ${positionOffset}rem)`
            };
            break;
        }
        return (
            <TooltipContext.Consumer>
                {({ currentTooltip, isTooltipEnabled, setCurrentTooltip, setTooltipEnabled }) => { 
                    if (!isTooltipEnabled || currentTooltip !== order)
                        return null;
                    else
                        return (
                            <div className="relative w-full h-full flex items-center justify-center"
                                style={{bottom: "100%"}}>
                                <div className={`tooltip-${position} absolute flex flex-col p-2 text-sm rounded-default w-64 bg-gray-900 text-gray-100 opacity-50`} 
                                    style={{...style}}>
                                    <span className="mb-2">
                                        {text}
                                    </span>
                                    <div className="flex justify-between">
                                        <div className="">
                                            <button className="px-2 py-1 rounded-default bg-gray-600" 
                                                hidden={!hasPrev}
                                                onClick={() => setCurrentTooltip(order - 1)}>
                                                Prev
                                            </button>
                                        </div>
                                        <div className="">
                                            <button className="px-2 py-1 mr-1 rounded-default bg-blue-500" 
                                                hidden={!hasNext}
                                                onClick={() => setCurrentTooltip(order + 1)}>
                                                Next
                                            </button>
                                            <button className="px-2 py-1 rounded-default bg-red-500" 
                                                hidden={!hasClose}
                                                onClick={() => setTooltipEnabled(false)}>
                                                {isClose ? "Close" : "Skip"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                }}
            </TooltipContext.Consumer>
        );
    }
}