import React from "react";
import { Team } from "../models/Policies";
import { PolicySchema } from "../models/Policy";
import { PolicyContext, TeamContext } from "../utils/Context";

type PolicyProps = {
    policy: PolicySchema;
    isSelected?: boolean;
    isDisabled?: boolean;
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
        const { policy, isSelected = false, isDisabled = false, showState = false, showAction = false, showProbability = false, showQValue = false, showGoldAdv = false } = this.props;
        const probability = policy.probability < 0 ? "-" : `${(policy.probability * 100).toFixed(2)}%`;
        const qValue = policy.qValue < 0 ? "-" : `${policy.qValue.toFixed(2)}`;
        const goldAdv = policy.goldAdv === "" ? "-" : policy.goldAdv;
        return (
            <TeamContext.Consumer>
                {({team}) => (
                    <PolicyContext.Consumer>
                        {({choosePolicy}) => (
                            <button className={`flex flex-col items-center w-full ${isSelected ? (team === Team.Blue ? "bg-blue-600 text-blue-200" : "bg-red-600 text-red-200") : ""} ${isDisabled ? "opacity-50 cursor-default" : ""}`}
                                onClick={() => choosePolicy(team, policy)}
                                disabled={isDisabled}>
                                <span className={`${showState ? "" : "hidden"}`}>{policy.state}</span>
                                <span className={`${showAction ? "text-sm" : "hidden"}`}>{policy.action}</span>
                                <div className="flex flex-row">
                                    <div className={`${showProbability ? "flex flex-col mr-4" : "hidden"}`}>
                                        <span className="text-xs">Probability</span>
                                        <span className="text-sm">{probability}</span>
                                    </div>
                                    <div className={`${showQValue ? "flex flex-col mr-4" : "hidden"}`}>
                                        <span className="text-xs">Q-Value</span>
                                        <span className="text-sm">{qValue}</span>
                                    </div>
                                    <div className={`${showGoldAdv ? "flex flex-col" : "hidden"}`}>
                                        <span className="text-xs">Gold Adv</span>
                                        <span className="text-sm">{goldAdv}</span>
                                    </div>
                                </div>
                            </button>
                        )}
                    </PolicyContext.Consumer>
                )}
            </TeamContext.Consumer>
        );
    }
}