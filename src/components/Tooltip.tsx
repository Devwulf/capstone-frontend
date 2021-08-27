import React from "react";

type TooltipProps = {

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
        return (
            <div className="tooltip-right absolute flex flex-col p-2 text-sm rounded-default w-64 bg-gray-900 text-gray-100 opacity-50" style={{left: "calc(100% + 1rem)"}}>
                <span className="mb-2">
                    This button fills in the login details for demo. Try it out!
                </span>
                <div className="flex justify-end">
                    <button className="px-2 py-1 rounded-default bg-blue-500">
                        Next
                    </button>
                </div>
            </div>
        );
    }
}