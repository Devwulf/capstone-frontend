import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { DummyPoliciesModel, IPoliciesModel, PoliciesModel, PoliciesSchema, Team } from "../models/Policies";
import { PolicyModel, PolicySchema } from "../models/Policy";
import { PolicyContext, TeamContext } from "../utils/Context";
import { Action } from "../utils/Enums";
import { setStateAsync } from "../utils/Helpers";
import Policy from "./Policy";
import PolicyState from "./PolicyState";
import logo from "../logo.svg";

type PoliciesProps = {
    
}

type PoliciesState = {
    currentPolicies: IPoliciesModel;
    bestPolicies: IPoliciesModel;
    nextPolicies: IPoliciesModel;
    startPolicies: IPoliciesModel;
    isLoading: boolean;
}

export default class Policies extends React.Component<PoliciesProps, PoliciesState> {
    static contextType = TeamContext;
    constructor(props: PoliciesProps) {
        super(props);

        const policies: PoliciesSchema = {policies: [{state: 0, action: "bKills", probability: 1, qValue: 0, goldAdv: "Even"}]};
        this.state = {
            currentPolicies: new DummyPoliciesModel(),
            bestPolicies: new DummyPoliciesModel(),
            nextPolicies: new DummyPoliciesModel(),
            startPolicies: new DummyPoliciesModel(),
            isLoading: true
        };

        this.onTeamChanged = this.onTeamChanged.bind(this);
        this.onChoosePolicy = this.onChoosePolicy.bind(this);
    }

    async componentDidMount(): Promise<void> {
        this.context.addListener("policies", this.onTeamChanged);

        await this.state.startPolicies.retrieveStartPolicies();
        await setStateAsync({isLoading: false}, this);
    }

    async onTeamChanged(team: Team): Promise<void> {
        await setStateAsync({isLoading: true}, this);
        await this.state.currentPolicies.clearPolicies();
        await this.state.bestPolicies.retrieveBestPolicies(team, 0, "rTOP_OUTER_TURRET");
        await this.state.nextPolicies.retrieveNextPolicies(team, 0, "rTOP_OUTER_TURRET");
        await setStateAsync({isLoading: false}, this);
    }

    async onChoosePolicy(team: Team, policy: PolicySchema): Promise<void> {
        const { currentPolicies, bestPolicies, nextPolicies } = this.state;

        await setStateAsync({isLoading: true}, this);
        currentPolicies.addPolicy(policy);

        const currentState = currentPolicies.getSchema().policies.length - 1;

        if (currentState >= 0) {
            await bestPolicies.retrieveBestPolicies(team, currentState, policy.action);
            await nextPolicies.retrieveNextPolicies(team, currentState, policy.action);
        }

        await setStateAsync({isLoading: false}, this);
    }

    componentWillUnmount(): void {
        this.context.removeListener("policies");
    }

    render(): JSX.Element {
        const { currentPolicies, startPolicies, bestPolicies, nextPolicies, isLoading } = this.state;
        const currentSchemas = currentPolicies.getSchema().policies;
        const startSchemas = startPolicies.getSchema().policies;
        const bestSchemas = bestPolicies.getSchema().policies;
        const nextSchemas = nextPolicies.getSchema().policies;
        const allSchemas = [];
        allSchemas.push(...currentSchemas);
        allSchemas.push(...bestSchemas.slice(1));

        let nextState = 0;
        if (nextSchemas.length > 0)
            nextState = nextSchemas[0].state;
        
        return (
            <PolicyContext.Provider value={{choosePolicy: this.onChoosePolicy}}>
                <div className="w-full h-full relative">
                    {(isLoading && 
                        <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center backdrop-filter backdrop-blur-sm z-10">
                            <div className="p-4 bg-gray-800 rounded-md">
                                <img src={logo} alt="logo" className="App-logo" />
                                <span className="text-2xl text-blue-200">Loading</span>
                            </div>
                        </div>
                    )}
                    <Scrollbars autoHide autoHideTimeout={250}>
                        <div className="flex flex-row h-full">
                            {(currentSchemas.length <= 0 &&
                                <PolicyState state={0} actions={startSchemas} />
                            ) ||
                            (currentSchemas.length > 0 && 
                                <>
                                    {allSchemas.map((policy, index) => (
                                        <div key={index} className="">
                                            {(policy.state === nextState && 
                                                <PolicyState state={policy.state} selectedAction={policy} actions={nextSchemas} />
                                            ) ||
                                            (policy.state !== nextState &&
                                                <PolicyState state={policy.state} selectedAction={policy} />
                                            )}
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </Scrollbars>
                </div>
            </PolicyContext.Provider>  
        );
    }
}