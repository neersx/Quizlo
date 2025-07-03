using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Quizlo.Questionnaire.WebApi.Data.Entities
{
    public class User : IdentityUser<int>
    {
        [MaxLength(100)]
        public string? FirstName { get; set; }
        [MaxLength(100)]
        public string? LastName { get; set; }
        public string? GoogleId { get; set; }
        public DateTime CreatedAt { get; set; }

        public DateTime? DateOfBirth { get; set; }
        [MaxLength(50)]
        public string Profession { get; set; } = "";
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



        public ICollection<UserRole> UserRoles { get; set; } = [];
    }

    public class Role : IdentityRole<int>
    {
        public ICollection<UserRole> UserRoles { get; set; } = [];
    }

    public class UserRole : IdentityUserRole<int> { }

    public class UserClaim : IdentityUserClaim<int> { }
    public class UserLogin : IdentityUserLogin<int> { }
    public class RoleClaim : IdentityRoleClaim<int> { }
    public class UserToken : IdentityUserToken<int> { }
}
