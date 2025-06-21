
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Quizlo.Questionnaire.WebApi.Data.Entities;
using Microsoft.AspNetCore.Identity;

namespace Quizlo.Questionnaire.WebApi.Data
{
    public class QuizDbContext : IdentityDbContext
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

            // If you named your tables differently, you can override them here:
            builder.Entity<User>(b => {
                b.ToTable("Users");
            });
            builder.Entity<Role>(b => {
                b.ToTable("Roles");
            });
            builder.Entity<IdentityUserRole<int>>(b => {
                b.ToTable("UserRoles");
            });
            builder.Entity<IdentityUserClaim<int>>(b => {
                b.ToTable("UserClaims");
            });
            builder.Entity<IdentityUserLogin<int>>(b => {
                b.ToTable("UserLogins");
            });
            builder.Entity<IdentityRoleClaim<int>>(b => {
                b.ToTable("RoleClaims");
            });
            builder.Entity<IdentityUserToken<int>>(b => {
                b.ToTable("UserTokens");
            });
        }
    }
}
