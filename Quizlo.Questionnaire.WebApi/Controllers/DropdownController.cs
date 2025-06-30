using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Quizlo.Questionnaire.WebApi.DTO;
using Quizlo.Questionnaire.WebApi.Helpers.Constants;
using Quizlo.Questionnaire.WebApi.Services;

namespace Quizlo.Questionnaire.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DropdownController : ControllerBase
    {
        private readonly IDropdownService _ddService;
        public DropdownController(IDropdownService ddService)
        {
            _ddService = ddService;
        }

        [HttpGet("languages")]
        public ActionResult<ApiResponse<List<SelectOptionDto>>> GetAll()
        {
            // reflect all public const fields on IndianLanguages
            var langs = typeof(IndianLanguages)
                .GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.FlattenHierarchy)
                .Where(static fi => fi.IsLiteral && !fi.IsInitOnly)
                .Select(static fi => fi.GetRawConstantValue() as string!)
                .Select(static str => new SelectOptionDto { Label = str, Value = str })
                .ToList();

            return Ok(ApiResponse<List<SelectOptionDto>>.Success(
                langs,
                message: "Languages fetched successfully"
            ));
        }

        [HttpGet("subjects-by-exam/{examId}")]
        public async Task<IActionResult> GetSubjectsByExam(int examId)
        {
            var subjects = await _ddService.GetSubjectsByExamIdAsync(examId);
             return Ok(ApiResponse<List<SelectOptionDto>>.Success(
                subjects,
                message: "Exam Subjects fetched successfully"
            ));
        }
    }
}