namespace Quizlo.Questionnaire.WebApi.DTO
{
    using System.Text.Json.Serialization;

    public class N8nResponseDto
    {
        [JsonPropertyName("totalTimeToAnswer")]
        public int TotalTimeToAnswer { get; set; }

        [JsonPropertyName("TotalQuestions")]
        public int TotalQuestions { get; set; }

        [JsonPropertyName("questions")]
        public List<QuestionDto> Questions { get; set; } = [];
    }

}
