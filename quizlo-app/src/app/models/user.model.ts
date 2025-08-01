import { UserCurrentUsageModel, UserSubscriptionModel } from "./subscription.model";

export interface UserModel {
  id: number;
  email: string;
  displayName?: string;
  firstName?: string,
  lastName?: string,
  photoURL?: string;
  emailVerified?: boolean;
  phoneNumber?: string;
  phoneNumberConfirmed?: boolean;
  subscriptionPlan?: UserSubscriptionModel;
  currentUsage?: UserCurrentUsageModel;
}
