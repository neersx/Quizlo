namespace Quizlo.Questionnaire.WebApi.DTO
{
    public class N8nQuestionDto
    {
        public int QuestionNo { get; set; }
        public string Question { get; set; } = default!;
        public string[] Options { get; set; } = default!;
        public string[] CorrectOption { get; set; } = default!;
        public string? Explanation { get; set; }
        public string Complexity { get; set; } = "easy";
    }
}
