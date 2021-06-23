import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { PolicySchema } from "../models/Policy";
import { Action } from "../utils/Enums";
import Policy from "./Policy";
import { Scrollbar } from "./Scrollbar";

type PolicyStateProps = {
    state: number;
    selectedAction: PolicySchema;
    actions?: PolicySchema[];
}

type PolicyStateState = {

}

export default class PolicyState extends React.Component<PolicyStateProps, PolicyStateState> {
    constructor(props: PolicyStateProps) {
        super(props);

        this.state = {

        };
    }

    render(): JSX.Element {
        const { state, selectedAction, actions = [] } = this.props;
        const allSchemas: PolicySchema[] = actions;
        if (actions.length <= 0) {
            for (const value in Action) {
                if (!isNaN(Number(value)))
                    continue;
                
                const schema: PolicySchema = 
                    selectedAction.action === value ? 
                        selectedAction : 
                        { state: state, action: value, probability: -1, qValue: -1, goldAdv: "" };
                allSchemas.push(schema);
            }
        }

        return (
            <div className="flex flex-col flex-grow-default w-64 h-screen p-4">
                <div className="flex flex-col items-center justify-center mb-4 h-12">
                    <span className="text-xs" style={{marginBottom: "-0.75rem"}}>State</span>
                    <span className="text-4xl font-medium">{state}</span>
                </div>
                <div className="flex flex-col h-full py-4 border-2 rounded-lg border-opacity-25">
                    <Scrollbars autoHide autoHideTimeout={250} style={{width: "100%"}}>
                        {allSchemas.map((value, index) => (
                            <div key={index} className={`${index === allSchemas.length - 1 ? "" : "mb-2"}`}>
                                {(value.action === selectedAction.action && 
                                    <Policy policy={value} isSelected showAction showProbability showQValue showGoldAdv />
                                ) || 
                                (value.action !== selectedAction.action &&
                                    <Policy policy={value} showAction showProbability showQValue showGoldAdv />
                                )}
                            </div>
                        ))}
                    </Scrollbars>
                </div>
            </div>
        );
    }
}