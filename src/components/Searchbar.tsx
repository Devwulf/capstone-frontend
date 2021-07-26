import React from "react";
import { Team } from "../models/Policies";
import { SearchContext, TeamContext } from "../utils/Context";

type SearchbarProps = {

}

type SearchbarState = {

}

export default class Searchbar extends React.Component<SearchbarProps, SearchbarState> {
    constructor(props: SearchbarProps) {
        super(props);

        this.state = {

        };
    }

    render(): JSX.Element {
        return (
            <TeamContext.Consumer>
                {({ team }) => (
                    <SearchContext.Consumer>
                        {({ searchStr, setSearchStr, searchAction }) => (
                            <div className="flex w-full px-4 py-2">
                                <input className="w-full mr-2 rounded-default shadow-inner px-2 text-sm" 
                                    placeholder="Type in Youtube link here..."
                                    value={searchStr}
                                    onChange={event => setSearchStr(event.target.value)}
                                    onSubmit={() => searchAction()} />
                                <button className={`px-4 rounded-default text-sm ${team === Team.Blue ? "bg-blue-500 text-blue-200" : "bg-red-500 bg- text-red-200"}`}
                                    onClick={() => searchAction()}>
                                    Search
                                </button>
                            </div>
                        )}
                    </SearchContext.Consumer>
                )}
            </TeamContext.Consumer>
        );
    }
}