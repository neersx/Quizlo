public class EligibilityResultDto
{
    public bool IsEligible { get; set; }
    public List<string> Messages { get; set; } = new();
}