import React from "react";
import { PolicySchema } from "../models/Policy";

type PolicyProps = {
    policy: PolicySchema;
    isSelected?: boolean;
    showState?: boolean;
    showAction?: boolean;
    showProbability?: boolean;
    showQValue?: boolean;
    showGoldAdv?: boolean;
}

type PolicyState = {

}

export default class Policy extends React.Component<PolicyProps, PolicyState> {
    constructor(props: PolicyProps) {
        super(props);

        this.state = {

        };
    }

    render(): JSX.Element {
        const { policy, isSelected = false, showState = false, showAction = false, showProbability = false, showQValue = false, showGoldAdv = false } = this.props;

        return (
            <div className={`flex flex-col items-center w-full ${isSelected ? "bg-blue-700 text-gray-200" : ""}`}>
                <span className={`${showState ? "" : "hidden"}`}>{policy.state}</span>
                <span className={`${showAction ? "" : "hidden"}`}>{policy.action}</span>
                <span className={`${showProbability ? "" : "hidden"}`}>{policy.probability}</span>
                <span className={`${showQValue ? "" : "hidden"}`}>{policy.qValue}</span>
                <span className={`${showGoldAdv ? "" : "hidden"}`}>{policy.goldAdv}</span>
            </div>
        );
    }
}