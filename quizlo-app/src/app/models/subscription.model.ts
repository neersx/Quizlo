export interface UserSubscriptionModel {
    planName: string;
    maxExams: number;
    maxTestsPerExam: number;
    maxLanguages: number;
    maxActiveTests: number;
    canRetryTest: boolean;
    maxTestAttempts: number;
    canScheduleTests: boolean;
    showAnalytics: boolean;
    canSelectDifficulty: boolean;
    displayTestTimeline: boolean;
}

export interface SubscriptionModel {
    planName: string;
    subscribedOn: Date;
    validTill: Date;
}

export interface UserCurrentUsageModel {
    activeTests: number;
    retryAttempted: number;
    testsCreatedPerExam: number;
    noOfExamsForwhichTestsGiven: number;
}

export interface UserWithSubscriptionModel {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    subscription: SubscriptionModel;
    currentUsage: UserCurrentUsageModel;
}