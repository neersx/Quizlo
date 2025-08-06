using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quizlo.Questionnaire.WebApi.DTO
{
    public class UserCurrentUsageDto
{
    public int ActiveTests { get; set; }
    public string ActiveExamIds { get; set; } // Comma separated examIds
    public int RetryAttempted { get; set; }
    public int ScheduledTestsCount { get; set; } // Count of tests with status Scheduled
    public int SelectedLanguagesCount { get; set; } // Count of languages selected for the test
    public int TestsCreatedPerExam { get; set; }
    public int NoOfExamsForwhichTestsGiven { get; set; }
}

}