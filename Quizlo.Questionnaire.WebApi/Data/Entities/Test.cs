using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Quizlo.Questionnaire.WebApi.Helpers.Constants;

namespace Quizlo.Questionnaire.WebApi.Data.Entities
{
    public class Test
    {
        [Key]
        public int Id { get; set; }

        [Required, ForeignKey(nameof(Exam))]
        public int ExamId { get; set; }

        [InverseProperty(nameof(Exam.Tests))]
        public Exam Exam { get; set; }

        [Required, MaxLength(200)]
        public string Title { get; set; }

        [MaxLength(50)]
        public string Language { get; set; } = IndianLanguages.English;

        [MaxLength(100)]
        public string? Subject { get; set; } = "English";

        [Required]
        public TimeSpan? Duration { get; set; }
        public TimeSpan? DurationCompltedIn { get; set; }
        public DateTime? SubmissionTime { get; set; } = DateTime.UtcNow;

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required, ForeignKey(nameof(CreatedBy))]
        public int CreatedByUserId { get; set; }

        public User CreatedBy { get; set; }
        public double? TotalMarks { get; set; }
        public double? MarksScored { get; set; }
        [MaxLength(1000)]
        public string? TestRules { get; set; }

         public int? TotalQuestions { get; set; } = 0;
        [MaxLength(1000)]
        public string? Notes { get; set; }

        public string? Type { get; set; }
        public string Status { get; set; } = TestStatus.NotStarted;
        public ICollection<TestQuestion> TestQuestions { get; set; }
        //public ICollection<Attempt> Attempts { get; set; }
    }

    public class TestQuestion
    {
        [Key]
        public int Id { get; set; }
        public int TestId { get; set; }
        public Test Test { get; set; }
        public int QuestionId { get; set; }
        public Question Question { get; set; }
        public int Order { get; set; }
    }

}
