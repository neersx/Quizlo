using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace Quizlo.Questionnaire.WebApi.Data.Entities
{
    public class Question
    {
        [Key]
        public int QuestionId { get; set; }

        public int QuestionNo { get; set; }

        public string QuestionText { get; set; }

        public string Type { get; set; }

        // store options as JSON in the DB
        public string OptionsJson { get; set; }

        [NotMapped]
        public string[] Options
        {
            get => JsonSerializer.Deserialize<string[]>(OptionsJson);
            set => OptionsJson = JsonSerializer.Serialize(value);
        }

        // you can do the same for CorrectAnswer & CorrectOption
        public string Explanation { get; set; }
        public string Complexity { get; set; }

        // FK back to Exam
        public int ExamId { get; set; }
        public Exam Exam { get; set; }
    }
}
