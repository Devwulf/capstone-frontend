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

type TeamListener = {
    name: string;
    listener: (team: Team) => Promise<void>;
}

export default class TestPage extends React.Component<TestPageProps, TestPageState> {
    static contextType = TeamContext;
    private listeners: TeamListener[] = [];
    constructor(props: TestPageProps) {
        super(props);

        this.state = {
            team: Team.Blue
        };

        this.setTeam = this.setTeam.bind(this);
        this.addListener = this.addListener.bind(this);
        this.removeListener = this.removeListener.bind(this);
    }

    setTeam(team: Team): void {
        this.setState({team: team}, async () => {
            // run all listeners
            await Promise.all(this.listeners.map(fn => fn.listener(team)));
        });
    }

    addListener(name: string, listener: (team: Team) => Promise<void>): void {
        if (this.listeners.filter(listener => listener.name === name).length > 0)
            return;
        
        this.listeners.push({name, listener});
    }

    removeListener(name: string): void {
        if (this.listeners.filter(listener => listener.name === name).length <= 0)
            return;

        this.listeners = this.listeners.filter(listener => listener.name !== name);
    }
    
    render(): JSX.Element {
        const { team } = this.state;
        return (
            <TeamContext.Provider value={{team: team, setTeam: this.setTeam, addListener: this.addListener, removeListener: this.removeListener}}>
                <div className={`transition-default duration-500 ease-in-out flex flex-col w-screen h-screen ${team === Team.Blue ? "bg-blue-300" : "bg-red-300"}`}>
                    <ToggleTeam />
                    <Policies />
                </div>
            </TeamContext.Provider>
        );
    }
}