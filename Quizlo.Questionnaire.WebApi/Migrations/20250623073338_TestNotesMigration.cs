using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Quizlo.Questionnaire.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class TestNotesMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Tests",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TestRules",
                table: "Tests",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "TestRules",
                table: "Tests");
        }
    }
}
