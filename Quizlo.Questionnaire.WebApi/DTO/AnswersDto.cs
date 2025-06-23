namespace Quizlo.Questionnaire.WebApi.DTO
{
    public record SubmitAnswerDto
    {
        public int QuestionId { get; init; }
        public string[] SelectedIds { get; init; } = [];
    }

    public record SubmitTestAnswersRequest
    {
        public List<SubmitAnswerDto> Answers { get; init; } = [];
    }

    public record TestSubmissionResultDto(
    int TestId,
    int TotalQuestions,
    int Attempted,
    int Correct,
    int Incorrect,
    double ScorePercent);

}
