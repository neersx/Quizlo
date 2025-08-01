import { UserCurrentUsageModel, UserSubscriptionModel } from "./subscription.model";

    export interface AuthResponseModel {
        token: string;
        userId: number;
        email: string;
        firstName: string;
        lastName: string;
        subscriptionPlan: UserSubscriptionModel;
        currentUsage: UserCurrentUsageModel;
    }