using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;

namespace Quizlo.Questionnaire.WebApi.Data
{
    public class QuizDbContextFactory : IDesignTimeDbContextFactory<QuizDbContext>
    {
        public QuizDbContext CreateDbContext(string[] args)
        {
            // build configuration (reads appsettings.json)
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var optionsBuilder = new DbContextOptionsBuilder<QuizDbContext>();
            var connString = config.GetConnectionString("DefaultConnection");
            optionsBuilder.UseSqlServer(connString);

            return new QuizDbContext(optionsBuilder.Options);
        }
    }
}
