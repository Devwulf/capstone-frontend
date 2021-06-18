import React from "react";
import { PolicySchema } from "../models/Policy";

type PolicyProps = {
    policy: PolicySchema;
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
        const { policy } = this.props;

        return (
            <div className="flex flex-col items-center w-full">
                <span className="">{policy.state}</span>
                <span className="">{policy.action}</span>
                <span className="">{policy.probability}</span>
                <span className="">{policy.qValue}</span>
                <span className="">{policy.goldAdv}</span>
            </div>
        );
    }
}