using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Quizlo.Questionnaire.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class TestSubmissionTimeMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "SubmissionTime",
                table: "Tests",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SubmissionTime",
                table: "Tests");
        }
    }
}
