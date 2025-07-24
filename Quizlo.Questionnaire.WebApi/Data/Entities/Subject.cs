using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Quizlo.Questionnaire.WebApi.Data.Entities
{
    public class Subject
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Title { get; set; }

        [MaxLength(50)]
        public string Category { get; set; }

        [ForeignKey("Exam")]
        public int ExamId { get; set; }
        public Exam Exam { get; set; }

        public int TotalQuestions { get; set; } = 0;
        public int QuestionsInExam { get; set; } = 0;
        public decimal? MinusMarks { get; set; }
        public double? EachQuesMarks { get; set; }

        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
