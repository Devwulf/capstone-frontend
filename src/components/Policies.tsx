import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { DummyPoliciesModel, IPoliciesModel, PoliciesModel } from "../models/Policies";
import { PolicyModel } from "../models/Policy";
import { Action } from "../utils/Enums";
import Policy from "./Policy";
import PolicyState from "./PolicyState";

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
            <Scrollbars autoHide autoHideTimeout={250} style={{width: "100vw", height: "100vh"}}>
                <div className="flex flex-row">
                    {policySchemas.map((policy, index) => (
                        <div key={index} className="">
                            <PolicyState state={policy.state} selectedAction={Action[policy.action as keyof typeof Action]} />
                        </div>
                    ))}
                </div>
            </Scrollbars>
        );
    }
}