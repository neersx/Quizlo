
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
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Subject> Subjects { get; set; }

        public DbSet<TestQuestion> TestQuestions { get; set; }
        public DbSet<OTPRecord> OTPRecords { get; set; }
        public DbSet<QuestionsHub> QuestionsHubs { get; set; }

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

            builder.Entity<QuestionsHub>().HasOne(qh => qh.Exam).WithMany().HasForeignKey(qh => qh.ExamId);
            builder.Entity<QuestionsHub>().HasOne(qh => qh.Subject).WithMany().HasForeignKey(qh => qh.SubjectId);
            builder.Entity<QuestionsHub>().HasOne(qh => qh.Question).WithMany().HasForeignKey(qh => qh.QuestionId);
        }
    }
}
