import React from "react";
import { DummyPoliciesModel, IPoliciesModel, PoliciesModel } from "../models/Policies";
import { PolicyModel } from "../models/Policy";
import Policy from "./Policy";

type PoliciesProps = {
    
}

type PoliciesState = {
    policies: IPoliciesModel;
}

export default class Policies extends React.Component<PoliciesProps, PoliciesState> {
    constructor(props: PoliciesProps) {
        super(props);

        this.state = {
            policies: new DummyPoliciesModel()
        };
    }

    async componentDidMount(): Promise<void> {
        await this.state.policies.retrieveBestPolicies();
    }

    render(): JSX.Element {
        const { policies } = this.state;
        const policySchemas = policies.getSchema().policies;

        return (
            <div className="flex flex-col">
                {policySchemas.map((policy, index) => (
                    <div key={index} className="mb-4">
                        <Policy policy={policy} />
                    </div>
                ))}
            </div>
        );
    }
}