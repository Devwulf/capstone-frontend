import React from "react";
import Policies from "../components/Policies";
import PolicyState from "../components/PolicyState";
import ToggleTeam from "../components/ToggleTeam";
import TopBar from "../components/TopBar";
import { Team } from "../models/Policies";
import { AccuracyContext, SearchContext, TeamContext } from "../utils/Context";
import { Action } from "../utils/Enums";

type MainPageProps = {

}

type MainPageState = {
    team: Team;
    searchStr: string;
}

type TeamListener = {
    name: string;
    listener: (team: Team) => Promise<void>;
}

type AccuracyListener = {
    name: string;
    listener: (accuracy: number) => Promise<void>;
}

type SearchListener = {
    name: string;
    listener: (searchStr: string) => Promise<void>;
}

export default class MainPage extends React.Component<MainPageProps, MainPageState> {
    private teamListeners: TeamListener[] = [];
    private accuracyListeners: AccuracyListener[] = [];
    private searchListeners: SearchListener[] = [];
    constructor(props: MainPageProps) {
        super(props);

        this.state = {
            team: Team.Blue,
            searchStr: ""
        };

        this.setTeam = this.setTeam.bind(this);
        this.addTeamListener = this.addTeamListener.bind(this);
        this.removeTeamListener = this.removeTeamListener.bind(this);

        this.setAccuracy = this.setAccuracy.bind(this);
        this.addAccuracyListener = this.addAccuracyListener.bind(this);
        this.removeAccuracyListener = this.removeAccuracyListener.bind(this);

        this.setSearchStr = this.setSearchStr.bind(this);
        this.searchAction = this.searchAction.bind(this);
        this.addSearchActionListener = this.addSearchActionListener.bind(this);
        this.removeSearchActionListener = this.removeSearchActionListener.bind(this);
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

    setSearchStr(searchStr: string): void {
        this.setState({searchStr: searchStr});
    }

    async searchAction(): Promise<void> {
        const { searchStr } = this.state;
        await Promise.all(this.searchListeners.map(fn => fn.listener(searchStr)));
    }

    addSearchActionListener(name: string, listener: (searchStr: string) => Promise<void>): void {
        if (this.searchListeners.filter(listener => listener.name === name).length > 0)
            return;

        this.searchListeners.push({name, listener});
    }

    removeSearchActionListener(name: string): void {
        if (this.searchListeners.filter(listener => listener.name === name).length <= 0)
            return;

        this.searchListeners = this.searchListeners.filter(listener => listener.name !== name);
    }
    
    render(): JSX.Element {
        const { team, searchStr } = this.state;
        return (
            <TeamContext.Provider value={{team: team, setTeam: this.setTeam, addListener: this.addTeamListener, removeListener: this.removeTeamListener}}>
                <AccuracyContext.Provider value={{setAccuracy: this.setAccuracy, addListener: this.addAccuracyListener, removeListener: this.removeAccuracyListener}}>
                    <SearchContext.Provider value={{searchStr: searchStr, setSearchStr: this.setSearchStr, searchAction: this.searchAction, addActionListener: this.addSearchActionListener, removeActionListener: this.removeSearchActionListener}}>
                        <div className={`transition-default duration-500 ease-in-out flex flex-col w-screen h-screen ${team === Team.Blue ? "bg-blue-300" : "bg-red-300"}`}>
                            <TopBar />
                            <Policies />
                        </div>
                    </SearchContext.Provider>
                </AccuracyContext.Provider>
            </TeamContext.Provider>
        );
    }
}