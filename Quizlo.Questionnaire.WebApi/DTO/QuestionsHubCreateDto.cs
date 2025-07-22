using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quizlo.Questionnaire.WebApi.DTO
{
    public class QuestionsHubCreateDto
    {
        public int ExamId { get; set; }
        public string ExamName { get; set; }
        public string ExamCode { get; set; }
        public int SubjectId { get; set; }
        public int QuestionId { get; set; }
        public QuestionDto Question { get; set; }
        public string Language { get; set; } = default!;
        public string Subject { get; set; } = default!;
        public TimeSpan Duration { get; set; }
    }

    public class QuestionsHubDto
    {
        public int Id { get; set; }
        public int ExamId { get; set; }
        public string ExamName { get; set; }
        public int SubjectId { get; set; }
        public string SubjectTitle { get; set; }
        public int QuestionId { get; set; }
        public string QuestionText { get; set; }
        public string? Topic { get; set; }
        public DateTime CreatedAt { get; set; }
    }

}