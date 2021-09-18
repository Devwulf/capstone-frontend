import React from "react";
import { TooltipContext } from "../utils/Context";

type TooltipProps = {
    order: number;
    text: string;
    position: "left" | "right" | "top" | "bottom";
    positionOffsetX?: number;
    positionOffsetY?: number;
    targetSizeY?: number;
    hasPrev?: boolean;
    hasNext?: boolean;
    hasClose?: boolean;
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
        const { order, text, position, positionOffsetX = 0, positionOffsetY = 0, targetSizeY = 0, hasPrev = false, hasNext = false, hasClose = false } = this.props;
        let style: React.CSSProperties;
        let arrowStyle: React.CSSProperties;
        switch(position) {
        case "top":
            arrowStyle = {
                bottom: `calc(100% + 0.75rem + ${positionOffsetY}rem)`
            };
            style = {
                left: `${positionOffsetX !== 0 ? positionOffsetX + "rem" : ""}`,
                bottom: arrowStyle.bottom
            };
            break;
        case "bottom":
            arrowStyle = {
                top: `calc(100% + 0.75rem + ${positionOffsetY}rem)`
            };
            style = {
                left: `${positionOffsetX !== 0 ? positionOffsetX + "rem" : ""}`,
                top: arrowStyle.top
            };
            break;
        case "left":
            arrowStyle = {
                top: `${targetSizeY / 2}px`,
                right: `calc(100% + 0.75rem + ${positionOffsetX}rem)`
            };
            style = {
                top: `${positionOffsetY !== 0 ? positionOffsetY + "rem" : ""}`,
                right: arrowStyle.right
            };
            break;
        default:
            arrowStyle = {
                top: `${targetSizeY / 2}px`,
                left: `calc(100% + 0.75rem + ${positionOffsetX}rem)`
            };
            style = {
                top: `${positionOffsetY !== 0 ? positionOffsetY + "rem" : ""}`,
                left: arrowStyle.left
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
                            <div className="relative w-full flex items-center justify-center z-50"
                                style={{bottom: "100%"}}>
                                <div className="absolute flex flex-col p-2 text-sm rounded-default w-64 bg-gray-800 text-gray-100"
                                    style={{...style}}>
                                    <span className="mb-2">
                                        {text}
                                    </span>
                                    <div className="flex justify-between">
                                        <div className="">
                                            <button className="px-2 py-1 rounded-default bg-gray-600" 
                                                hidden={!hasPrev || order <= 0}
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
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className={`tooltip-${position} absolute flex flex-col w-full h-full`}
                                    style={{...arrowStyle}}></div>
                            </div>
                        );
                }}
            </TooltipContext.Consumer>
        );
    }
}