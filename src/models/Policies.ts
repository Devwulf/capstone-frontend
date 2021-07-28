import axios from "axios";
import { PolicySchema } from "./Policy";

export enum Team {
    Blue,
    Red
}

export interface IPoliciesModel {
    retrieveBestPolicies(token: string, team?: Team, state?: number, actions?: string): Promise<void>;
    retrieveNextPolicies(token: string, team?: Team, state?: number, action?: string): Promise<void>;
    retrieveStartPolicies(token: string, team?: Team): Promise<void>;
    addPolicy(policy: PolicySchema): void;
    clearPolicies(): void;
    getSchema(): PoliciesSchema;
}

export class PoliciesModel implements IPoliciesModel {
    private readonly baseUrl: string = "http://localhost:5000/api/policy";
    private policies: PoliciesSchema;

    constructor(policies: PoliciesSchema = { policies: [] }) {
        this.policies = policies;
    }

    async retrieveBestPolicies(token: string, team: Team = Team.Blue, state = 0, actions = "bKills"): Promise<void> {
        // Get policies from backend
        const policies: PolicySchema[] = [];
        const url = `${this.baseUrl}/best?team=${Team[team]}&state=${state}&actions=${actions}`;
        const res = await axios.get<PoliciesSchema>(url, {
            headers: {
                "X-Access-Tokens": token
            }
        });
        res.data.policies.forEach(policy => {
            policies.push(policy);
        });

        this.policies.policies = policies;
    }

    async retrieveNextPolicies(token: string, team: Team = Team.Blue, state = 0, action = "bKills"): Promise<void> {
        // Get policies from backend
        const policies: PolicySchema[] = [];
        const url = `${this.baseUrl}/next?team=${Team[team]}&state=${state}&action=${action}`;
        const res = await axios.get<PoliciesSchema>(url, {
            headers: {
                "X-Access-Tokens": token
            }
        });
        res.data.policies.forEach(policy => {
            policies.push(policy);
        });

        this.policies.policies = policies;
    }

    async retrieveStartPolicies(token: string, team: Team = Team.Blue): Promise<void> {
        // Get policies from backend
        const policies: PolicySchema[] = [];
        const url = `${this.baseUrl}/start?team=${Team[team]}`;
        const res = await axios.get<PoliciesSchema>(url, {
            headers: {
                "X-Access-Tokens": token
            }
        });
        res.data.policies.forEach(policy => {
            policies.push(policy);
        });

        this.policies.policies = policies;
    }

    addPolicy(policy: PolicySchema): void {
        // TODO: Validate policy
        this.policies.policies.push(policy);
    }

    clearPolicies(): void {
        this.policies.policies = [];
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

    async retrieveBestPolicies(token: string, team: Team = Team.Blue, state = 0, actions = "bKills"): Promise<void> {
        const bluePolicySchemas: PolicySchema[] = [
            {state: state, action: actions, probability: 1, qValue: 0, goldAdv: "Even"},
            {state: state + 1, action: "rKills", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 2, action: "bMID_OUTER_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 3, action: "bMID_INNER_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 4, action: "bMID_BASE_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 5, action: "bMID_INHIBITOR", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 6, action: "bMID_NEXUS_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 7, action: "bMID_NEXUS_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 8, action: "bWon", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
        ];

        const redPolicySchemas: PolicySchema[] = [
            {state: state, action: actions, probability: 1, qValue: 0, goldAdv: "Even"},
            {state: state + 1, action: "bKills", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 2, action: "rMID_OUTER_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 3, action: "rMID_INNER_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 4, action: "rMID_BASE_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 5, action: "rMID_INHIBITOR", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 6, action: "rMID_NEXUS_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 7, action: "rMID_NEXUS_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 8, action: "rWon", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
        ];
        
        this.policies.policies = team === Team.Blue ? bluePolicySchemas : redPolicySchemas;
    }

    async retrieveNextPolicies(token: string, team: Team = Team.Blue, state = 0, action = "bKills"): Promise<void> {
        const bluePolicySchemas: PolicySchema[] = [
            {state: state + 1, action: "bKills", probability: 1, qValue: 0, goldAdv: "Even"},
            {state: state + 1, action: "rKills", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 1, action: "bMID_OUTER_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 1, action: "bMID_INNER_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 1, action: "bMID_BASE_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 1, action: "bMID_INHIBITOR", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 1, action: "bMID_NEXUS_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
        ];

        const redPolicySchemas: PolicySchema[] = [
            {state: state + 1, action: "bKills", probability: 1, qValue: 0, goldAdv: "Even"},
            {state: state + 1, action: "rKills", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 1, action: "rMID_OUTER_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 1, action: "rMID_INNER_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 1, action: "rMID_BASE_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 1, action: "rMID_INHIBITOR", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
            {state: state + 1, action: "rMID_NEXUS_TURRET", probability: Math.random(), qValue: Math.random() * 100, goldAdv: "Even"},
        ];
        
        this.policies.policies = team === Team.Blue ? bluePolicySchemas : redPolicySchemas;
    }

    async retrieveStartPolicies(token: string, team: Team = Team.Blue): Promise<void> {
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

    addPolicy(policy: PolicySchema): void {
        // TODO: Validate policy
        this.policies.policies.push(policy);
    }

    clearPolicies(): void {
        this.policies.policies = [];
    }

    getSchema(): PoliciesSchema {
        return this.policies;
    }
}

export type PoliciesSchema = {
    policies: PolicySchema[];
}