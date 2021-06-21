import React from "react";
import { DummyPoliciesModel, IPoliciesModel, PoliciesModel } from "../models/Policies";
import { PolicyModel } from "../models/Policy";
import Policy from "./Policy";

type PoliciesProps = {
    
}

type PoliciesState = {
    policiesModel: IPoliciesModel;
    isLoading: boolean;
}

export default class Policies extends React.Component<PoliciesProps, PoliciesState> {
    constructor(props: PoliciesProps) {
        super(props);

        this.state = {
            policiesModel: new DummyPoliciesModel(),
            isLoading: true
        };
    }

    async componentDidMount(): Promise<void> {
        await this.state.policiesModel.retrieveBestPolicies();
        this.setState({isLoading: false});
    }

    render(): JSX.Element {
        const { policiesModel } = this.state;
        const policySchemas = policiesModel.getSchema().policies;
        
        return (
            <div className="flex flex-row">
                {policySchemas.map((policy, index) => (
                    <div key={index} className="mb-4">
                        <Policy policy={policy} showAction />
                    </div>
                ))}
            </div>
        );
    }
}