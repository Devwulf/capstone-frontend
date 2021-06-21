import React from "react";
import Scrollbars from "react-custom-scrollbars-2";

export function Scrollbar(props: any): JSX.Element {
    return (
        <Scrollbars {...props}>
            {props.children}
        </Scrollbars>
    );
}