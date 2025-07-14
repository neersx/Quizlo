using AutoMapper;
using Quizlo.Questionnaire.WebApi.DTO;

namespace Quizlo.Questionnaire.WebApi.Helpers
{
public class PrependBaseUrlResolver
    : IMemberValueResolver<Blog, BlogListDto, string, string>
{
    private readonly string _baseUrl;
    public PrependBaseUrlResolver(IConfiguration config) =>
        _baseUrl = config.GetValue<string>("AppSettings:ClientUrl");

    // sourceMember is the Blog.SharedLink or ImageUrl that your lambda pulled out
    public string Resolve(
        Blog source,
        BlogListDto destination,
        string sourceMember,
        string destMember,
        ResolutionContext context)
    {
        if (string.IsNullOrWhiteSpace(sourceMember)) 
            return null;
        if (sourceMember.StartsWith("http", StringComparison.OrdinalIgnoreCase))
            return sourceMember;
        return $"{_baseUrl}{sourceMember}";
    }
}



}