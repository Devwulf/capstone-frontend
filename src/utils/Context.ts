import React from "react";
import { Team } from "../models/Policies";

export type TeamContextType = {
    team: Team;
    setTeam: (team: Team) => void;
    addListener: (name: string, listener: (team: Team) => Promise<void>) => void;
    removeListener: (name: string) => void;
};

export const TeamContext = React.createContext<TeamContextType>({
    team: Team.Blue,
    setTeam: team => { return; },
    addListener: (name, listener) => { return; },
    removeListener: (name) => { return; }
});