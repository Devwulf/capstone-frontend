import React from "react";
import Policies from "../components/Policies";
import PolicyState from "../components/PolicyState";
import ToggleTeam from "../components/ToggleTeam";
import { Team } from "../models/Policies";
import { TeamContext } from "../utils/Context";
import { Action } from "../utils/Enums";

type TestPageProps = {

}

type TestPageState = {
    team: Team;
}

export default class TestPage extends React.Component<TestPageProps, TestPageState> {
    static contextType = TeamContext;
    constructor(props: TestPageProps) {
        super(props);

        this.state = {
            team: Team.Blue
        };

        this.setTeam = this.setTeam.bind(this);
    }

    setTeam(team: Team): void {
        console.log(team);
        
        this.setState({team: team});
    }
    
    render(): JSX.Element {
        const { team } = this.state;
        return (
            <TeamContext.Provider value={{team: team, setTeam: this.setTeam}}>
                <div className={`transition-default duration-200 ease-in-out flex flex-col w-screen h-screen ${team === Team.Blue ? "bg-blue-300" : "bg-red-300"}`}>
                    <ToggleTeam />
                    <Policies />
                </div>
            </TeamContext.Provider>
        );
    }
}