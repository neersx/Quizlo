using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Quizlo.Questionnaire.WebApi.DTO;
using Quizlo.Questionnaire.WebApi.Helpers.Constants;

namespace Quizlo.Questionnaire.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DropdownController : ControllerBase
    {
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
    }
}