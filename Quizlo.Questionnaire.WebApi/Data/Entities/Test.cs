using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

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

        [Required]
        public TimeSpan Duration { get; set; }
        [Required]
        public TimeSpan DurationCompltedIn { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required, ForeignKey(nameof(CreatedBy))]
        public int CreatedByUserId { get; set; }

        public User CreatedBy { get; set; }

        public ICollection<TestQuestion> TestQuestions { get; set; }
        //public ICollection<Attempt> Attempts { get; set; }
    }

    public class TestQuestion
    {
        public int TestId { get; set; }
        public Test Test { get; set; }
        public int QuestionId { get; set; }
        public Question Question { get; set; }
        public int Order { get; set; }
    }

}
