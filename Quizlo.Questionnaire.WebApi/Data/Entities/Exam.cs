using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Quizlo.Questionnaire.WebApi.Data.Entities
{

    public class Exam
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(200)]
        public string Name { get; set; }

        [Required, MaxLength(20)]
        public string Code { get; set; }

        [MaxLength(50)]
        public string Country { get; set; }

        [MaxLength(50)]
        public string Category { get; set; }     // New column

        [MaxLength(50)]
        public string Type { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        public int CreatedByUserId { get; set; }

        public ICollection<Test> Tests { get; set; }
    }
}
