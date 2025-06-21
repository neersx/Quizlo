using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Quizlo.Questionnaire.WebApi.Data.Entities
{
    public class User:  IdentityUser<int>
    {
        public int Id { get; set; }
        [MaxLength(100)]
        public string FirstName { get; set; }
        [MaxLength(100)]
        public string LastName { get; set; }
        [MaxLength(20)]
        public string PreparingForExam { get; set; }
        [MaxLength(100)]
        public string Email { get; set; }
        public string PasswordHash { get; set; }       // null if Google-only
        public string GoogleId { get; set; }
        [MaxLength(20)]
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
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
        public int UserId { get; set; }
        public User User { get; set; }
        public int RoleId { get; set; }
        public Role Role { get; set; }
    }
}
