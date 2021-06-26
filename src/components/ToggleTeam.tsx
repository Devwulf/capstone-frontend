import React from "react";
import Toggle from "react-toggle";
import { Team } from "../models/Policies";
import { TeamContext } from "../utils/Context";

type ToggleTeamProps = {

}

type ToggleTeamState = {
    
}

export default class ToggleTeam extends React.Component<ToggleTeamProps, ToggleTeamState> {
    constructor(props: ToggleTeamProps) {
        super(props);

        this.state = {
            
        };
    }

    render(): JSX.Element {
        return (
            <TeamContext.Consumer>
                {({team, setTeam}) => (
                    <div className="flex p-4 w-screen h-16 items-center">
                        <label htmlFor="" className="flex items-center">
                            <span className={`text-lg font-bold mr-2 ${team === Team.Blue ? "text-blue-900" : "text-red-900"}`}>Team</span>
                            <Toggle 
                                icons={false}
                                onChange={event => {
                                    const team = event.target.checked ? 
                                        Team.Red : Team.Blue;
                                    setTeam(team);
                                }} />
                        </label>
                    </div>
                )}
            </TeamContext.Consumer>
        );
    }
}