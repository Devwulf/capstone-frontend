import React from "react";
import Toggle from "react-toggle";
import { Team } from "../models/Policies";
import Configuration from "../utils/Configuration";
import { BaseUrlContext, TeamContext } from "../utils/Context";

type ToggleBaseUrlProps = {

}

type ToggleBaseUrlState = {
    
}

export default class ToggleBaseUrl extends React.Component<ToggleBaseUrlProps, ToggleBaseUrlState> {
    constructor(props: ToggleBaseUrlProps) {
        super(props);

        this.state = {
            
        };
    }

    render(): JSX.Element {
        return (
            <BaseUrlContext.Consumer>
                {({baseUrl, setBaseUrl}) => (
                    <div className="flex items-center">
                        <label htmlFor="" className="flex items-center">
                            <span className="text-sm font-bold mr-2 text-gray-900">Local</span>
                            <Toggle className="mr-2"
                                icons={false}
                                checked={baseUrl === Configuration.serverBaseUrl ? true : false}
                                onChange={event => {
                                    const url = event.target.checked ? 
                                        Configuration.serverBaseUrl : Configuration.localBaseUrl;
                                    setBaseUrl(url);
                                }} />
                            <span className="text-sm font-bold text-gray-900">Server</span>
                        </label>
                    </div>
                )}
            </BaseUrlContext.Consumer>
        );
    }
}