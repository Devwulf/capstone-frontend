import React from "react";
import Policies from "../components/Policies";
import PolicyState from "../components/PolicyState";
import ToggleTeam from "../components/ToggleTeam";
import TopBar from "../components/TopBar";
import { Team } from "../models/Policies";
import { AccuracyContext, TeamContext } from "../utils/Context";
import { Action } from "../utils/Enums";

type MainPageProps = {

}

type MainPageState = {
    team: Team;
}

type TeamListener = {
    name: string;
    listener: (team: Team) => Promise<void>;
}

type AccuracyListener = {
    name: string;
    listener: (accuracy: number) => Promise<void>;
}

export default class MainPage extends React.Component<MainPageProps, MainPageState> {
    private teamListeners: TeamListener[] = [];
    private accuracyListeners: AccuracyListener[] = [];
    constructor(props: MainPageProps) {
        super(props);

        this.state = {
            team: Team.Blue
        };

        this.setTeam = this.setTeam.bind(this);
        this.addTeamListener = this.addTeamListener.bind(this);
        this.removeTeamListener = this.removeTeamListener.bind(this);

        this.setAccuracy = this.setAccuracy.bind(this);
        this.addAccuracyListener = this.addAccuracyListener.bind(this);
        this.removeAccuracyListener = this.removeAccuracyListener.bind(this);
    }

    setTeam(team: Team): void {
        this.setState({team: team}, async () => {
            // run all listeners
            await Promise.all(this.teamListeners.map(fn => fn.listener(team)));
        });
    }

    addTeamListener(name: string, listener: (team: Team) => Promise<void>): void {
        if (this.teamListeners.filter(listener => listener.name === name).length > 0)
            return;
        
        this.teamListeners.push({name, listener});
    }

    removeTeamListener(name: string): void {
        if (this.teamListeners.filter(listener => listener.name === name).length <= 0)
            return;

        this.teamListeners = this.teamListeners.filter(listener => listener.name !== name);
    }

    async setAccuracy(accuracy: number): Promise<void> {
        await Promise.all(this.accuracyListeners.map(fn => fn.listener(accuracy)));
    }

    addAccuracyListener(name: string, listener: (accuracy: number) => Promise<void>): void {
        if (this.accuracyListeners.filter(listener => listener.name === name).length > 0)
            return;
        
        this.accuracyListeners.push({name, listener});
    }

    removeAccuracyListener(name: string): void {
        if (this.accuracyListeners.filter(listener => listener.name === name).length <= 0)
            return;

        this.accuracyListeners = this.accuracyListeners.filter(listener => listener.name !== name);
    }
    
    render(): JSX.Element {
        const { team } = this.state;
        return (
            <TeamContext.Provider value={{team: team, setTeam: this.setTeam, addListener: this.addTeamListener, removeListener: this.removeTeamListener}}>
                <AccuracyContext.Provider value={{setAccuracy: this.setAccuracy, addListener: this.addAccuracyListener, removeListener: this.removeAccuracyListener}}>
                    <div className={`transition-default duration-500 ease-in-out flex flex-col w-screen h-screen ${team === Team.Blue ? "bg-blue-300" : "bg-red-300"}`}>
                        <TopBar />
                        <Policies />
                    </div>
                </AccuracyContext.Provider>
            </TeamContext.Provider>
        );
    }
}