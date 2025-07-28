export function GetCssClassByStatus(status: string): string {
    switch (status) {
      case 'Passed':
        return 'bg-success-transparent';
      case 'Failed':
        return 'bg-danger-transparent';
      case 'Started':
        return 'bg-warning-transparent';
      case 'NotStarted':
      case 'Not Started':
        return 'bg-secondary-transparent';
      case 'Completed':
        return 'bg-primary-transparent';
      default:
        return 'bg-light-transparent';
    }
  }