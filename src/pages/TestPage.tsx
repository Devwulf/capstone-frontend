import React from "react";
import Policies from "../components/Policies";

type TestPageProps = {

}

type TestPageState = {
    
}

export default class TestPage extends React.Component<TestPageProps, TestPageState> {
    constructor(props: TestPageProps) {
        super(props);

        this.state = {
            
        };
    }
    
    render(): JSX.Element {
        return (
            <div className="">
                <Policies />
            </div>
        );
    }
}