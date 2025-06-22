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
