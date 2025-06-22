
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Quizlo.Questionnaire.WebApi.Data.Entities;
using Microsoft.AspNetCore.Identity;

namespace Quizlo.Questionnaire.WebApi.Data
{
    public class QuizDbContext : IdentityDbContext<User, Role, int,
     UserClaim, UserRole, UserLogin, RoleClaim, UserToken>
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options)
            : base(options)
        { }

        public DbSet<Exam> Exams { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<Question> Questions { get; set; }

        public DbSet<TestQuestion> TestQuestions { get; set; }
        public DbSet<OTPRecord> OTPRecords { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>(b => b.ToTable("Users"));
            builder.Entity<Role>(b => b.ToTable("Roles"));

            builder.Entity<UserRole>(b => b.ToTable("UserRoles"));
            builder.Entity<UserClaim>(b => b.ToTable("UserClaims"));
            builder.Entity<UserLogin>(b => b.ToTable("UserLogins"));
            builder.Entity<RoleClaim>(b => b.ToTable("RoleClaims"));
            builder.Entity<UserToken>(b => b.ToTable("UserTokens"));
        }
    }
}
