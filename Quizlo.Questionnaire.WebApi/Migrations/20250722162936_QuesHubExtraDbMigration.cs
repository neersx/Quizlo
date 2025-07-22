using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Quizlo.Questionnaire.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class QuesHubExtraDbMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "TestStartDateTime",
                table: "Tests",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "AnsweredAt",
                table: "TestQuestions",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsCorrect",
                table: "TestQuestions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Marks",
                table: "TestQuestions",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "MinusMarks",
                table: "TestQuestions",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SelectedOptionIds",
                table: "TestQuestions",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Language",
                table: "Questions",
                type: "nvarchar(70)",
                maxLength: 70,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TestStartDateTime",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "AnsweredAt",
                table: "TestQuestions");

            migrationBuilder.DropColumn(
                name: "IsCorrect",
                table: "TestQuestions");

            migrationBuilder.DropColumn(
                name: "Marks",
                table: "TestQuestions");

            migrationBuilder.DropColumn(
                name: "MinusMarks",
                table: "TestQuestions");

            migrationBuilder.DropColumn(
                name: "SelectedOptionIds",
                table: "TestQuestions");

            migrationBuilder.DropColumn(
                name: "Language",
                table: "Questions");
        }
    }
}
