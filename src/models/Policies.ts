import axios from "axios";
import { PolicyModel, PolicySchema } from "./Policy";

export enum Team {
    Blue,
    Red
}

export class PoliciesModel {
    private readonly baseUrl: string = "http://localhost:5000/api/policy";

    async getBestPolicies(team: Team = Team.Blue, state = 0, actions = "bKills"): Promise<PolicyModel[]> {
        // Get policies from backend
        const policies: PolicyModel[] = [];
        const url = `${this.baseUrl}/best?team=${Team[team]}&state=${state}&actions=${actions}`;
        const res = await axios.get<PoliciesSchema>(url);
        res.data.policies.forEach(policy => {
            policies.push(new PolicyModel(policy));
        });

        return policies;
    }
}

export type PoliciesSchema = {
    policies: PolicySchema[];
}