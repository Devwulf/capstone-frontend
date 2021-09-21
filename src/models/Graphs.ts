import axios from "axios";
import { Team } from "./Policies";

export interface ITwoDGraphModel {
    retrieveQValuesGraph(token: string, team?: Team, endAction?: string): Promise<void>;
    retrieveProbabilityGraph(token: string, team?: Team, endAction?: string): Promise<void>;
    clearPoints(): void;
    getSchema(): TwoDGraphSchema;
}

export interface ILabeledGraphModel {
    retrieveProbabilityGraph(token: string, team?: Team, startState?: number, startAction?: string, hasKills?: boolean): Promise<void>;
    clearPoints(): void;
    getSchema(): LabeledGraphSchema;
}

export class TwoDGraphModel implements ITwoDGraphModel {
    private baseUrl: string;
    private graph: TwoDGraphSchema;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.graph = { points: [] };
    }

    async retrieveQValuesGraph(token: string, team: Team = Team.Blue, endAction = "bKills"): Promise<void> {
        const points: TwoDPointSchema[] = [];
        const url = `${this.baseUrl}/api/policy/line?team=${Team[team]}&endAction=${endAction}&isProbability=${false}`;
        const res = await axios.get<TwoDGraphSchema>(url, {
            headers: {
                "X-Access-Tokens": token
            }
        });
        res.data.points.forEach(point => {
            points.push(point);
        });

        this.graph.points = points;
    }

    async retrieveProbabilityGraph(token: string, team: Team = Team.Blue, endAction = "bKills"): Promise<void> {
        const points: TwoDPointSchema[] = [];
        const url = `${this.baseUrl}/api/policy/line?team=${Team[team]}&endAction=${endAction}&isProbability=${true}`;
        const res = await axios.get<TwoDGraphSchema>(url, {
            headers: {
                "X-Access-Tokens": token
            }
        });
        res.data.points.forEach(point => {
            points.push(point);
        });

        this.graph.points = points;
    }

    clearPoints(): void {
        this.graph.points = [];
    }

    getSchema(): TwoDGraphSchema {
        return this.graph;
    }
}

export class LabeledGraphModel implements ILabeledGraphModel {
    private baseUrl: string;
    private graph: LabeledGraphSchema;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.graph = { points: [] };
    }

    async retrieveProbabilityGraph(token: string, team: Team = Team.Blue, startState = 0, startAction = "bKills", hasKills = true): Promise<void> {
        const points: LabeledPointSchema[] = [];
        const url = `${this.baseUrl}/api/policy/pie?team=${Team[team]}&startState=${startState}&startAction=${startAction}&hasKills=${hasKills}`;
        const res = await axios.get<LabeledGraphSchema>(url, {
            headers: {
                "X-Access-Tokens": token
            }
        });
        res.data.points.forEach(point => {
            points.push(point);
        });

        this.graph.points = points;
    }

    clearPoints(): void {
        this.graph.points = [];
    }

    getSchema(): LabeledGraphSchema {
        return this.graph;
    }
}

export type TwoDPointSchema = {
    x: number;
    y: number;
}

export type TwoDGraphSchema = {
    points: TwoDPointSchema[];
}

export type LabeledPointSchema = {
    label: string;
    value: number;
}

export type LabeledGraphSchema = {
    points: LabeledPointSchema[];
}