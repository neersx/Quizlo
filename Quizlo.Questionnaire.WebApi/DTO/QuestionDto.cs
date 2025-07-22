using Quizlo.Questionnaire.WebApi.Helpers;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using Quizlo.Questionnaire.WebApi.Helpers.Constants;

namespace Quizlo.Questionnaire.WebApi.DTO
{
    public class QuestionDto
    {
        public int Id { get; set; }

        [MaxLength(500)]
        public string QuestionText { get; set; }
        public int QuestionNo { get; set; }
        public string OptionsJson { get; set; }
        public QuestionType Type { get; set; }         // Single, Multiple, etc.
        public string Difficulty   { get; set; } = default!;
        public string Explanation { get; set; }
        public string CorrectOptionIds { get; set; }
         [MaxLength(70)]
        public string Language { get; set; } = IndianLanguages.English;

        public string? SelectedOptionIds { get; set; }  // CSV of Option.Id for multiple
        public bool? IsCorrect { get; set; }
        [NotMapped]
        public bool IsMultipleSelect { get; set; }
        public double? Marks { get; init; }
        public decimal? MinusMarks { get; set; }
        public DateTime? AnsweredAt { get; set; }

        [NotMapped]
        public string[] Options
        {
            get => JsonSerializer.Deserialize<string[]>(OptionsJson);
            set => OptionsJson = JsonSerializer.Serialize(value);
        }
    }
}
