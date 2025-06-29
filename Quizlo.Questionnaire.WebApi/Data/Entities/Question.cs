﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using Quizlo.Questionnaire.WebApi.Helpers;

namespace Quizlo.Questionnaire.WebApi.Data.Entities
{
    public class Question
    {
        public int Id { get; set; }

        [MaxLength(500)]
        public string QuestionText { get; set; }

        // store options as JSON in the DB
        public string OptionsJson { get; set; }

        public QuestionType Type { get; set; }         // Single, Multiple, etc.
        public DifficultyLevel Difficulty { get; set; }

        [NotMapped]
        public string[] Options
        {
            get => JsonSerializer.Deserialize<string[]>(OptionsJson);
            set => OptionsJson = JsonSerializer.Serialize(value);
        }

       
        public string Explanation { get; set; }
        [MaxLength(50)]
        public string CorrectOptionIds { get; set; }
        [MaxLength(50)]
        public string SelectedOptionIds { get; set; }  // CSV of Option.Id for multiple
        public bool IsCorrect { get; set; }
    }
}
