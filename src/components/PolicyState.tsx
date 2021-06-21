import React from "react";
import { PolicySchema } from "../models/Policy";
import { Action } from "../utils/Enums";
import Policy from "./Policy";

type PolicyStateProps = {
    state: number;
    selectedAction: Action;
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
        const { state, selectedAction } = this.props;
        const allSchemas: PolicySchema[] = [];
        for (const value in Action) {
            if (!isNaN(Number(value)))
                continue;
            
            const schema: PolicySchema = { state: state, action: value, probability: 1, qValue: 0, goldAdv: "Even" };
            allSchemas.push(schema);
        }

        console.log(allSchemas);

        return (
            <div className="flex flex-col">
                {allSchemas.map((value, index) => (
                    <div key={index} className="mb-4">
                        {(value.action === Action[selectedAction] && 
                            <Policy policy={value} isSelected showAction />
                        ) || 
                        (value.action !== Action[selectedAction] &&
                            <Policy policy={value} showAction />
                        )}
                    </div>
                ))}
            </div>
        );
    }
}