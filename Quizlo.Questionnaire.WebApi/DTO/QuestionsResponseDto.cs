namespace Quizlo.Questionnaire.WebApi.DTO
{
    using System.Text.Json.Serialization;

    public class N8nResponseDto
    {
        [JsonPropertyName("totalTimeToAnswer")]
        public int TotalTimeToAnswer { get; set; } // in minutes

        [JsonPropertyName("TotalQuestions")]
        public int TotalQuestions { get; set; }

        [JsonPropertyName("totalMarks")]
        public int TotalMarks { get; set; }


        [JsonPropertyName("questions")]
        public List<QuestionDto> Questions { get; set; } = [];
    }
    
     public record QuestionsRequestDto(
        int TestId,
        bool CanGetAiQuestions
     );


}
