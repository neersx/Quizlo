using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Quizlo.Questionnaire.WebApi.DTO
{
    public class UserProfileDto
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? GoogleId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Profession { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? PostalCode { get; set; }
        public string? Address { get; set; }
        public string? Country { get; set; }
        public string? Hobbies { get; set; }
        public string? Gender { get; set; }
        public string? Linkedin { get; set; }
        public string? Twitter { get; set; }
        public string? Instagram { get; set; }
        public string? Facebook { get; set; }
        public string? ImageUrl { get; set; }
        public string? Designation { get; set; }
        public string? Company { get; set; }
        public string? About { get; set; }
        public string? Skills { get; set; }
        public string? Headline { get; set; }
        public IEnumerable<string> Roles { get; set; } = Array.Empty<string>();
    }

    public class UpdateUserProfileDto
    {
        [MaxLength(100)]
        public string? FirstName { get; set; }
        [MaxLength(100)]
        public string? LastName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        [MaxLength(50)]
        public string? Profession { get; set; }
        [MaxLength(100)]
        public string? City { get; set; }
        [MaxLength(100)]
        public string? State { get; set; }
        public string? PostalCode { get; set; }
        [MaxLength(300)]
        public string? Address { get; set; }
        [MaxLength(100)]
        public string? Country { get; set; }
        [MaxLength(300)]
        public string? Hobbies { get; set; }
        public string? Gender { get; set; }
        [MaxLength(300)]
        public string? Linkedin { get; set; }
        [MaxLength(300)]
        public string? Twitter { get; set; }
        [MaxLength(300)]
        public string? Instagram { get; set; }
        [MaxLength(300)]
        public string? Facebook { get; set; }
        [MaxLength(500)]
        public string? ImageUrl { get; set; }
        [MaxLength(150)]
        public string? Designation { get; set; }
        [MaxLength(150)]
        public string? Company { get; set; }
        [MaxLength(700)]
        public string? About { get; set; }
        [MaxLength(700)]
        public string? Skills { get; set; }
        [MaxLength(300)]
        public string? Headline { get; set; }

        [EmailAddress]
        public string? Email { get; set; }
    }



}