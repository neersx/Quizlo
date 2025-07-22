using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using Quizlo.Questionnaire.WebApi.Helpers;
using Quizlo.Questionnaire.WebApi.Helpers.Constants;

namespace Quizlo.Questionnaire.WebApi.Data.Entities
{
    public class Question
    {
        public int Id { get; set; }

        [MaxLength(500)]
        public required string QuestionText { get; set; }

        public required string OptionsJson { get; set; }

        public QuestionType Type { get; set; }         // Single, Multiple, etc.
        public DifficultyLevel Difficulty { get; set; }

        public required string Explanation { get; set; }
        [MaxLength(50)]
        public required string CorrectOptionIds { get; set; }
        [MaxLength(50)]
        public string? SelectedOptionIds { get; set; }  // CSV of Option.Id for multiple
        public bool? IsCorrect { get; set; }
        public decimal? MinusMarks { get; set; }
        public double? Marks { get; init; }
        [MaxLength(70)]
        public string Language { get; set; } = IndianLanguages.English;

        public DateTime? AnsweredAt { get; set; }

        [NotMapped]
        public string[] Options
        {
            get => JsonSerializer.Deserialize<string[]>(OptionsJson);
            set => OptionsJson = JsonSerializer.Serialize(value);
        }

    }
}
