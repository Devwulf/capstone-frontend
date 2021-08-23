import React, { useContext } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { DummyPoliciesModel, IPoliciesModel, PoliciesModel, PoliciesSchema, Team } from "../models/Policies";
import { PolicyModel, PolicySchema } from "../models/Policy";
import { AccuracyContext, AccuracyContextType, AuthContext, AuthContextType, BaseUrlContext, BaseUrlContextType, PolicyContext, TeamContext, TeamContextType } from "../utils/Context";
import { Action } from "../utils/Enums";
import { setStateAsync } from "../utils/Helpers";
import Policy from "./Policy";
import PolicyState from "./PolicyState";
import logo from "../logo.svg";

type PoliciesProps = {
    teamContext: TeamContextType;
    accuracyContext: AccuracyContextType;
    authContext: AuthContextType;
    baseUrlContext: BaseUrlContextType;
}

type PoliciesState = {
    currentPolicies: IPoliciesModel;
    bestPolicies: IPoliciesModel;
    nextPolicies: IPoliciesModel;
    pastPolicies: PoliciesSchema[];
    isLoading: boolean;
    correctCount: number;
}

class PoliciesInner extends React.Component<PoliciesProps, PoliciesState> {
    constructor(props: PoliciesProps) {
        super(props);

        const baseUrl = props.baseUrlContext.baseUrl;
        this.state = {
            currentPolicies: new PoliciesModel(baseUrl),
            bestPolicies: new PoliciesModel(baseUrl),
            nextPolicies: new PoliciesModel(baseUrl),
            pastPolicies: [],
            isLoading: true,
            correctCount: 0
        };

        this.onTeamChanged = this.onTeamChanged.bind(this);
        this.onBaseUrlChanged = this.onBaseUrlChanged.bind(this);
        this.resetPolicies = this.resetPolicies.bind(this);
        this.onChoosePolicy = this.onChoosePolicy.bind(this);
    }

    async componentDidMount(): Promise<void> {
        const { teamContext, baseUrlContext } = this.props;

        teamContext.addListener("policies", this.onTeamChanged);
        baseUrlContext.addListener("policies", this.onBaseUrlChanged);

        await this.state.nextPolicies.retrieveStartPolicies(this.props.authContext.token);
        await setStateAsync({isLoading: false}, this);
    }

    async onTeamChanged(team: Team): Promise<void> {
        await this.resetPolicies();
    }

    async onBaseUrlChanged(baseUrl: string): Promise<void> {
        await this.resetPolicies();
    }

    async resetPolicies(): Promise<void> {
        await setStateAsync({isLoading: true, pastPolicies: []}, this);
        await this.state.currentPolicies.clearPolicies();
        await this.state.bestPolicies.clearPolicies();
        await this.state.nextPolicies.retrieveStartPolicies(this.props.authContext.token);
        await setStateAsync({isLoading: false}, this);
    }

    async onChoosePolicy(team: Team, policy: PolicySchema): Promise<void> {
        const { accuracyContext, authContext } = this.props;
        const { pastPolicies, currentPolicies, bestPolicies, nextPolicies, correctCount } = this.state;

        currentPolicies.addPolicy(policy);

        const bestSchemas = bestPolicies.getSchema().policies;
        const currentSchemas = currentPolicies.getSchema().policies;

        // For counting how many times the best policy got a right prediction
        let count = correctCount;
        if (bestSchemas.length > 1 && policy.action === bestSchemas[1].action)
            count++;

        if (currentSchemas.length > 1)
            accuracyContext.setAccuracy(count / (currentSchemas.length - 1));

        const policiesArr = pastPolicies.concat({policies: nextPolicies.getSchema().policies});
        await setStateAsync({isLoading: true, pastPolicies: policiesArr, correctCount: count}, this);

        const currentState = currentSchemas.length - 1;
        if (currentState >= 0) {
            await bestPolicies.retrieveBestPolicies(authContext.token, team, currentState, policy.action);
            await nextPolicies.retrieveNextPolicies(authContext.token, team, currentState, policy.action);
        }

        await setStateAsync({isLoading: false}, this);
    }

    componentWillUnmount(): void {
        const { teamContext, baseUrlContext } = this.props;
        teamContext.removeListener("policies");
        baseUrlContext.removeListener("policies");
    }

    render(): JSX.Element {
        const { pastPolicies, currentPolicies, bestPolicies, nextPolicies, isLoading } = this.state;
        const currentSchemas = currentPolicies.getSchema().policies;
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
                                <PolicyState state={0} actions={nextSchemas} />
                            ) ||
                            (currentSchemas.length > 0 && 
                                <>
                                    {allSchemas.map((policy, index) => (
                                        <div key={index} className="">
                                            {(policy.state === nextState && 
                                                <PolicyState state={policy.state} selectedAction={policy} actions={nextSchemas} />
                                            ) ||
                                            (policy.state !== nextState && index < pastPolicies.length &&
                                                <PolicyState state={policy.state} selectedAction={policy} actions={pastPolicies[index].policies} isDisabled />
                                            ) ||
                                            (policy.state !== nextState && index >= pastPolicies.length &&
                                                <PolicyState state={policy.state} selectedAction={policy} isDisabled />
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

export default function Policies(): JSX.Element {
    const team = useContext(TeamContext);
    const accuracy = useContext(AccuracyContext);
    const auth = useContext(AuthContext);
    const baseUrl = useContext(BaseUrlContext);

    return (
        <PoliciesInner teamContext={team} accuracyContext={accuracy} authContext={auth} baseUrlContext={baseUrl} />
    );
}