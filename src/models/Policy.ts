export class PolicyModel {
    private policy: PolicySchema;

    constructor(policy: PolicySchema) {
        this.policy = policy;
    }

    getSchema(): PolicySchema {
        return this.policy;
    }
}

export type PolicySchema = {
    state: number;
    action: string;
    probability: number;
    qValue: number;
    goldAdv: string;
}