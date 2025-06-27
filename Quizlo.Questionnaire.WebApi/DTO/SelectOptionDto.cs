using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quizlo.Questionnaire.WebApi.DTO
{
   public class SelectOptionDto
    {
        public string Label { get; set; } = default!;
        public string Value { get; set; } = default!;
    }
}