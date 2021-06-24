import React from "react";

export async function setStateAsync<P, S, K extends keyof S>(
    state:
        ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) |
        Pick<S, K> |
        S |
        null,
    component: React.Component<P, S>
): Promise<unknown> {
    return new Promise(resolve => component.setState(state, () => resolve(null)));
}