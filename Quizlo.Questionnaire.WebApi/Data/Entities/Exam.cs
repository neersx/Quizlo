using System.ComponentModel.DataAnnotations;

namespace Quizlo.Questionnaire.WebApi.Data.Entities
{
    public class Exam
    {
        [Key]
        public int ExamId { get; set; }

        public int TestId { get; set; }

        // in minutes
        public int TotalTimeToAnswer { get; set; }

        public ICollection<Question> Questions { get; set; }
    }
}
