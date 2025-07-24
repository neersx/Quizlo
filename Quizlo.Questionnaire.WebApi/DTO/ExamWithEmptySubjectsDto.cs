using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quizlo.Questionnaire.WebApi.DTO
{
    public class ExamWithEmptySubjectsDto
    {
        public int ExamId { get; set; }
        public string ExamName { get; set; }
        public string ExamCode { get; set; }
        public List<SubjectDto> Subjects { get; set; }
    }

    public class SubjectDto
    {
        public int SubjectId { get; set; }
        public string Name { get; set; }
        public int TotalQuestions { get; set; }
        public int QuestionsInExam { get; set; } = 0;
    }

}