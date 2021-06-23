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
    bestPolicies: IPoliciesModel;
    nextPolicies: IPoliciesModel;
    isLoading: boolean;
}

export default class Policies extends React.Component<PoliciesProps, PoliciesState> {
    constructor(props: PoliciesProps) {
        super(props);

        this.state = {
            bestPolicies: new DummyPoliciesModel(),
            nextPolicies: new DummyPoliciesModel(),
            isLoading: true
        };
    }

    async componentDidMount(): Promise<void> {
        await this.state.bestPolicies.retrieveBestPolicies();
        await this.state.nextPolicies.retrieveNextPolicies();
        this.setState({isLoading: false});
    }

    render(): JSX.Element {
        const { bestPolicies, nextPolicies } = this.state;
        const bestSchemas = bestPolicies.getSchema().policies;
        const nextSchemas = nextPolicies.getSchema().policies;
        let nextState = 0;
        if (nextSchemas.length > 0)
            nextState = nextSchemas[0].state;
        
        return (
            <Scrollbars autoHide autoHideTimeout={250} style={{width: "100vw", height: "100vh"}}>
                <div className="flex flex-row">
                    {bestSchemas.map((policy, index) => (
                        <div key={index} className="">
                            {(policy.state === nextState && 
                                <PolicyState state={policy.state} selectedAction={policy} actions={nextSchemas} />
                            ) ||
                            (policy.state !== nextState &&
                                <PolicyState state={policy.state} selectedAction={policy} />
                            )}
                        </div>
                    ))}
                </div>
            </Scrollbars>
        );
    }
}