import { UserSubscriptionModel, UserCurrentUsageModel } from "../../models/subscription.model";

export function GenerateUsageAlerts(subscriptionPlan?: UserSubscriptionModel, currentUsage?: UserCurrentUsageModel): any[] {

    if (!subscriptionPlan || !currentUsage) return [];

    const alerts = [];

  const dangerIcon = `<svg class="svg-danger" xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 24 24" width="1.5rem" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"/></svg>`;
  const primaryIcon = `<svg class="svg-primary" xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 24 24" width="1.5rem" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`;
  const warningIcon = `<svg class="svg-warning" xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 24 24" width="1.5rem" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;

  if (currentUsage.activeTests > subscriptionPlan.maxActiveTests) {
    alerts.push({
      type: 'danger svg-danger custom-alert-icon shadow-sm',
      icon: dangerIcon,
      message: `You are allowed a maximum of ${subscriptionPlan.maxActiveTests} active or unfinished test(s), but currently you have ${currentUsage.activeTests}. Please finish or archive some tests.`
    });
  }

  if (subscriptionPlan.canRetryTest && currentUsage.retryAttempted >= subscriptionPlan.maxTestAttempts) {
    alerts.push({
      type: 'danger svg-danger custom-alert-icon shadow-sm',
      icon: dangerIcon,
      message: `Maximum retry attempts (${subscriptionPlan.maxTestAttempts}) reached. You have attempted retry ${currentUsage.retryAttempted} time(s).`
    });
  }

  if (currentUsage.testsCreatedPerExam > subscriptionPlan.maxTestsPerExam) {
    alerts.push({
      type: 'warning svg-warning custom-alert-icon shadow-sm',
      icon: warningIcon,
      message: `You can create only ${subscriptionPlan.maxTestsPerExam} tests per exam, but currently ${currentUsage.testsCreatedPerExam} have been created.`
    });
  }

  if (currentUsage.noOfExamsForwhichTestsGiven > subscriptionPlan.maxExams) {
    alerts.push({
      type: 'warning svg-warning custom-alert-icon shadow-sm',
      icon: warningIcon,
      message: `You are allowed to give tests for ${subscriptionPlan.maxExams} exam(s), but currently have given tests for ${currentUsage.noOfExamsForwhichTestsGiven} exam(s).`
    });
  }

  return alerts;
}
