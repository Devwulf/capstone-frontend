import React from "react";
import { Cookies } from "react-cookie/es6";
import { Team } from "../models/Policies";
import { PolicySchema } from "../models/Policy";

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

export type PolicyContextType = {
    choosePolicy: (team: Team, policy: PolicySchema) => Promise<void>;
}

export const PolicyContext = React.createContext<PolicyContextType>({
    choosePolicy: async (team, policy) => { return; }
});

export type AccuracyContextType = {
    setAccuracy: (accuracy: number) => Promise<void>;
    addListener: (name: string, listener: (accuracy: number) => Promise<void>) => void;
    removeListener: (name: string) => void;
}

export const AccuracyContext = React.createContext<AccuracyContextType>({
    setAccuracy: async accuracy => { return; },
    addListener: (name, listener) => { return; },
    removeListener: (name) => { return; }
});

export type SearchContextType = {
    searchStr: string;
    setSearchStr: (searchStr: string) => void;
    searchAction: () => Promise<void>;
    addActionListener: (name: string, listener: (searchStr: string) => Promise<void>) => void;
    removeActionListener: (name: string) => void;
}

export const SearchContext = React.createContext<SearchContextType>({
    searchStr: "",
    setSearchStr: searchStr => { return; },
    searchAction: async () => { return; },
    addActionListener: (name, listener) => { return; },
    removeActionListener: (name) => { return; }
});

export type AuthContextType = {
    token: string;
    setToken: (token: string) => void;
}

export const AuthContext = React.createContext<AuthContextType>({
    token: "",
    setToken: token => { return; }
});

export type BaseUrlContextType = {
    baseUrl: string;
    setBaseUrl: (baseUrl: string) => void;
    addListener: (name: string, listener: (baseUrl: string) => Promise<void>) => void;
    removeListener: (name: string) => void;
}

export const BaseUrlContext = React.createContext<BaseUrlContextType>({
    baseUrl: "",
    setBaseUrl: baseUrl => { return; },
    addListener: (name, listener) => { return; },
    removeListener: (name) => { return; }
});

export type CookiesContextType = {
    cookies: Cookies;
}

export const CookiesContext = React.createContext<CookiesContextType>({
    cookies: new Cookies()
});

export type TooltipContextType = {
    currentTooltip: number;
    isTooltipEnabled: boolean;
    setCurrentTooltip: (index: number) => void;
    setTooltipEnabled: (isEnabled: boolean) => void;
}

export const TooltipContext = React.createContext<TooltipContextType>({
    currentTooltip: 0,
    isTooltipEnabled: true,
    setCurrentTooltip: index => { return; },
    setTooltipEnabled: isEnabled => { return; }
});