using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Quizlo.Questionnaire.WebApi.Data.Entities
{
    public class User:  IdentityUser<int>
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(100)]
        public string? FirstName { get; set; }
        [MaxLength(100)]
        public string? LastName { get; set; }
        public string? GoogleId { get; set; }
        [MaxLength(20)]
        public string? PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; } = false;
        public DateTime CreatedAt { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
    }

    public class Role : IdentityRole<int>
    {
        public int Id { get; set; }
        public string Name { get; set; }               // e.g. "Student","Teacher","Admin"
        public ICollection<UserRole> UserRoles { get; set; }
    }

    public class UserRole
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int RoleId { get; set; }
        public Role Role { get; set; }
    }
}
