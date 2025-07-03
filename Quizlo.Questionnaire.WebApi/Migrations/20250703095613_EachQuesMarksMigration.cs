using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Quizlo.Questionnaire.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class EachQuesMarksMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "EachQuesMarks",
                table: "Subjects",
                type: "float",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EachQuesMarks",
                table: "Subjects");
        }
    }
}
