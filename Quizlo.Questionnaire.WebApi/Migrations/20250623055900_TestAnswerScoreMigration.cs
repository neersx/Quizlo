using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Quizlo.Questionnaire.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class TestAnswerScoreMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "MarksScored",
                table: "Tests",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "TotalMarks",
                table: "Tests",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Marks",
                table: "Questions",
                type: "float",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MarksScored",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "TotalMarks",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "Marks",
                table: "Questions");
        }
    }
}
