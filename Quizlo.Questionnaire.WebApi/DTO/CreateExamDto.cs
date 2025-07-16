using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Quizlo.Questionnaire.WebApi.DTO
{
    public class CreateExamDto
    {
        [Required, MaxLength(200)]
        public string Name { get; set; }

        [Required, MaxLength(20)]
        public string Code { get; set; }

        [MaxLength(50)]
        public string Country { get; set; }

        [MaxLength(50)]
        public string Category { get; set; }

        [MaxLength(50)]
        public string Type { get; set; }

        public bool IsTrending { get; set; } = false;
        public bool IsActive { get; set; } = false;
        public string? ImageUrl { get; set; }
        public string? ExamGuidelines { get; set; }
    }

    public class UpdateExamDto : CreateExamDto
    {
        [Required]
        public int Id { get; set; }
    }

    public class ExamResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Country { get; set; }
        public string Category { get; set; }
        public string Type { get; set; }
        public bool IsTrending { get; set; }
        public bool IsActive { get; set; }
        public string? ImageUrl { get; set; }
        public string? ExamGuidelines { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedByUserId { get; set; }
    }
}