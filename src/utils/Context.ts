import React from "react";
import { Team } from "../models/Policies";

export type TeamContextType = {
    team: Team;
    setTeam: (team: Team) => void;
};
export const TeamContext = React.createContext<TeamContextType>({
    team: Team.Blue,
    setTeam: team => { return; }
});