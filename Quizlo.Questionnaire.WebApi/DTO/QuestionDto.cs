using Quizlo.Questionnaire.WebApi.Helpers;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using System.Text.Json.Serialization;

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

        public string? SelectedOptionIds { get; set; }  // CSV of Option.Id for multiple
        public bool IsCorrect { get; set; } = false;
        [NotMapped]
        public bool IsMultipleSelect { get; set; }

        [NotMapped]
        public string[] Options
        {
            get => JsonSerializer.Deserialize<string[]>(OptionsJson);
            set => OptionsJson = JsonSerializer.Serialize(value);
        }
    }
}
