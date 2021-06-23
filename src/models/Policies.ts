import axios from "axios";
import { PolicySchema } from "./Policy";

export enum Team {
    Blue,
    Red
}

export interface IPoliciesModel {
    retrieveBestPolicies(team?: Team, state?: number, actions?: string): Promise<void>;
    retrieveNextPolicies(team?: Team, state?: number, action?: string): Promise<void>;
    retrieveStartPolicies(team?: Team): Promise<void>;
    getSchema(): PoliciesSchema;
}

export class PoliciesModel implements IPoliciesModel {
    private readonly baseUrl: string = "http://localhost:5000/api/policy";
    private policies: PoliciesSchema;

    constructor(policies: PoliciesSchema = { policies: [] }) {
        this.policies = policies;
    }

    async retrieveBestPolicies(team: Team = Team.Blue, state = 0, actions = "bKills"): Promise<void> {
        // Get policies from backend
        const policies: PolicySchema[] = [];
        const url = `${this.baseUrl}/best?team=${Team[team]}&state=${state}&actions=${actions}`;
        const res = await axios.get<PoliciesSchema>(url);
        res.data.policies.forEach(policy => {
            policies.push(policy);
        });

        this.policies.policies = policies;
    }

    async retrieveNextPolicies(team: Team = Team.Blue, state = 0, action = "bKills"): Promise<void> {
        // Get policies from backend
        const policies: PolicySchema[] = [];
        const url = `${this.baseUrl}/next?team=${Team[team]}&state=${state}&action=${action}`;
        const res = await axios.get<PoliciesSchema>(url);
        res.data.policies.forEach(policy => {
            policies.push(policy);
        });

        this.policies.policies = policies;
    }

    async retrieveStartPolicies(team: Team = Team.Blue): Promise<void> {
        // Get policies from backend
        const policies: PolicySchema[] = [];
        const url = `${this.baseUrl}/start?team=${Team[team]}`;
        const res = await axios.get<PoliciesSchema>(url);
        res.data.policies.forEach(policy => {
            policies.push(policy);
        });

        this.policies.policies = policies;
    }

    getSchema(): PoliciesSchema {
        return this.policies;
    }
}

export class DummyPoliciesModel implements IPoliciesModel {
    private policies: PoliciesSchema;

    constructor(policies: PoliciesSchema = { policies: [] }) {
        this.policies = policies;
    }

    async retrieveBestPolicies(team: Team = Team.Blue, state = 0, actions = "bKills"): Promise<void> {
        const policySchemas: PolicySchema[] = [
            {state: 0, action: "bKills", probability: 1, qValue: 0, goldAdv: "Even"},
            {state: 1, action: "rKills", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: 2, action: "bMID_OUTER_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: 3, action: "bMID_INNER_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: 4, action: "bMID_BASE_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: 5, action: "bMID_INHIBITOR", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: 6, action: "bMID_NEXUS_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: 7, action: "bMID_NEXUS_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: 8, action: "bWon", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
        ];
        
        this.policies.policies = policySchemas;
    }

    async retrieveNextPolicies(team: Team = Team.Blue, state = 0, action = "bKills"): Promise<void> {
        const policySchemas: PolicySchema[] = [
            {state: 1, action: "bKills", probability: 1, qValue: 0, goldAdv: "Even"},
            {state: 1, action: "rKills", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: 1, action: "bMID_OUTER_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: 1, action: "bMID_INNER_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: 1, action: "bMID_BASE_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: 1, action: "bMID_INHIBITOR", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: 1, action: "bMID_NEXUS_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
        ];
        
        this.policies.policies = policySchemas;
    }

    async retrieveStartPolicies(team: Team = Team.Blue): Promise<void> {
        const policySchemas: PolicySchema[] = [
            {state: 0, action: "rKills", probability: Math.random(), qValue: 0, goldAdv: "Even"},
            {state: 0, action: "bKills", probability: Math.random(), qValue: 0, goldAdv: "Even"},
            {state: 0, action: "rTOP_OUTER_TURRET", probability: Math.random(), qValue: 0, goldAdv: "Even"},
            {state: 0, action: "bBOT_OUTER_TURRET", probability: Math.random(), qValue: 0, goldAdv: "Even"},
            {state: 0, action: "bDRAGON", probability: Math.random(), qValue: 0, goldAdv: "Even"},
            {state: 0, action: "rBOT_OUTER_TURRET", probability: Math.random(), qValue: 0, goldAdv: "Even"},
            {state: 0, action: "bTOP_OUTER_TURRET", probability: Math.random(), qValue: 0, goldAdv: "Even"},
        ];
        
        this.policies.policies = policySchemas;
    }

    getSchema(): PoliciesSchema {
        return this.policies;
    }
}

export type PoliciesSchema = {
    policies: PolicySchema[];
}