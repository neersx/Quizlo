
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Quizlo.Questionnaire.WebApi.Data.Entities;
using Microsoft.AspNetCore.Identity;

namespace Quizlo.Questionnaire.WebApi.Data
{
    public class QuizDbContext : IdentityDbContext<User, Role, int>
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
        }
    }
}
