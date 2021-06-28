import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { Team } from "../models/Policies";
import { PolicySchema } from "../models/Policy";
import { PolicyContext, TeamContext } from "../utils/Context";
import { Action } from "../utils/Enums";
import Policy from "./Policy";
import { Scrollbar } from "./Scrollbar";

type PolicyStateProps = {
    state: number;
    selectedAction?: PolicySchema;
    actions?: PolicySchema[];
    isDisabled?: boolean;
}

type PolicyStateState = {
    
}

export default class PolicyState extends React.Component<PolicyStateProps, PolicyStateState> {
    static contextType = PolicyContext;
    constructor(props: PolicyStateProps) {
        super(props);

        this.state = {
            
        };
    }

    render(): JSX.Element {
        const { state, selectedAction, actions = [], isDisabled = false } = this.props;
        const allSchemas: PolicySchema[] = actions;
        if (actions.length <= 0) {
            for (const value in Action) {
                if (!isNaN(Number(value)))
                    continue;
                
                const schema: PolicySchema = 
                    selectedAction !== undefined && selectedAction.action === value ? 
                        selectedAction : 
                        { state: state, action: value, probability: -1, qValue: -1, goldAdv: "" };
                allSchemas.push(schema);
            }
        }

        return (
            <TeamContext.Consumer>
                {({team}) => (
                    <div className="flex flex-col w-64 h-full p-4">
                        <div className={`flex flex-col items-center justify-center mb-4 h-12 ${team === Team.Blue ? "text-blue-900" : "text-red-900"}`}>
                            <span className="text-xs" style={{marginBottom: "-0.75rem"}}>State</span>
                            <span className="text-4xl font-medium">{state}</span>
                        </div>
                        <div className={`flex flex-col h-full py-4 border-2 shadow-lg rounded-lg bg-gray-100 ${team === Team.Blue ? "border-blue-800" : "border-red-800"}`}>
                            <Scrollbars autoHide autoHideTimeout={250} style={{width: "100%"}}>
                                {allSchemas.map((value, index) => (
                                    <div key={index} className={`${index === allSchemas.length - 1 ? "" : "mb-2"}`}>
                                        <Policy policy={value} 
                                            isSelected={selectedAction !== undefined && value.action === selectedAction.action} 
                                            isDisabled={isDisabled}
                                            showAction 
                                            showProbability 
                                            showQValue 
                                            showGoldAdv />
                                    </div>
                                ))}
                            </Scrollbars>
                        </div>
                    </div>
                )}
            </TeamContext.Consumer>
        );
    }
}