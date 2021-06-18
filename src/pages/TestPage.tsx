import React from "react";
import Policy from "../components/Policy";
import { PoliciesModel } from "../models/Policies";
import { PolicyModel } from "../models/Policy";

type TestPageProps = {

}

type TestPageState = {
    bestPolicies: PolicyModel[];
}

export default class TestPage extends React.Component<TestPageProps, TestPageState> {
    constructor(props: TestPageProps) {
        super(props);

        this.state = {
            bestPolicies: []
        };
    }

    async componentDidMount() {
        const policies = new PoliciesModel();
        const bestPolicies = await policies.getBestPolicies();
        console.log(bestPolicies);

        this.setState({bestPolicies});
    }
    
    render(): JSX.Element {
        const { bestPolicies } = this.state;
        return (
            <div className="">
                <div className="flex flex-col">
                    {bestPolicies.map((policy, index) => (
                        <div key={index} className="mb-4">
                            <Policy policy={policy.getSchema()} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}