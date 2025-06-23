using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Quizlo.Questionnaire.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class TestStatusMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Tests",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Tests");
        }
    }
}
