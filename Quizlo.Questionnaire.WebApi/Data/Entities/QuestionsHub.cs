using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Quizlo.Questionnaire.WebApi.Helpers;

namespace Quizlo.Questionnaire.WebApi.Data.Entities
{
    public class QuestionsHub
    {
        [Key]
        public long Id { get; set; }

        [ForeignKey("Exam")]
        public int ExamId { get; set; }
        public Exam Exam { get; set; }

        [ForeignKey("Subject")]
        public int SubjectId { get; set; }
        public Subject Subject { get; set; }

        [ForeignKey("Question")]
        public int QuestionId { get; set; }
        public Question Question { get; set; }

        [MaxLength(50)]
        public string? Topic { get; set; }  // Optional field to group by topic (e.g., Algebra, Thermodynamics)

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int CreatedBy { get; set; }

        public bool IsActive { get; set; } = true;
        public string Difficulty { get; set; } = DifficultyLevel.Medium.ToString();
    }

}