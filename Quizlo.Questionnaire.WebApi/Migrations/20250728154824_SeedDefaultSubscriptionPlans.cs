using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Quizlo.Questionnaire.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class SeedDefaultSubscriptionPlans : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SubscriptionPlans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DurationInDays = table.Column<int>(type: "int", nullable: false),
                    MaxExamsAllowed = table.Column<int>(type: "int", nullable: false),
                    MaxTestsPerExam = table.Column<int>(type: "int", nullable: false),
                    MaxLanguagesPerTest = table.Column<int>(type: "int", nullable: false),
                    MaxActiveTests = table.Column<int>(type: "int", nullable: false),
                    AllowRetryTestAttempt = table.Column<bool>(type: "bit", nullable: false),
                    MaxTestAttempts = table.Column<int>(type: "int", nullable: false),
                    DisplayTestTimeline = table.Column<bool>(type: "bit", nullable: false),
                    AllowDifficultySelection = table.Column<bool>(type: "bit", nullable: false),
                    AllowTestScheduling = table.Column<bool>(type: "bit", nullable: false),
                    MaxScheduledTestsAllowed = table.Column<int>(type: "int", nullable: false),
                    HasProgressTracking = table.Column<bool>(type: "bit", nullable: false),
                    DisplayTestAnalytics = table.Column<bool>(type: "bit", nullable: false),
                    AllowCertification = table.Column<bool>(type: "bit", nullable: false),
                    CanAccessPremiumTests = table.Column<bool>(type: "bit", nullable: false),
                    HasAIRecommendations = table.Column<bool>(type: "bit", nullable: false),
                    Level = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubscriptionPlans", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserSubscriptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    SubscriptionPlanId = table.Column<int>(type: "int", nullable: false),
                    SubscribedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ValidTill = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PaymentTransactionId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    AutoRenew = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSubscriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSubscriptions_SubscriptionPlans_SubscriptionPlanId",
                        column: x => x.SubscriptionPlanId,
                        principalTable: "SubscriptionPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserSubscriptions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserSubscriptions_SubscriptionPlanId",
                table: "UserSubscriptions",
                column: "SubscriptionPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSubscriptions_UserId",
                table: "UserSubscriptions",
                column: "UserId");

                            // Step 2: Seed default plans
migrationBuilder.InsertData(
    table: "SubscriptionPlans",
    columns: new[]
    {
        "Id", "Name", "Description", "Price", "DurationInDays",
        "MaxExamsAllowed", "MaxTestsPerExam", "MaxLanguagesPerTest", "MaxActiveTests",
        "AllowRetryTestAttempt", "MaxTestAttempts", "DisplayTestTimeline",
        "AllowDifficultySelection", "AllowTestScheduling", "MaxScheduledTestsAllowed",
        "HasProgressTracking", "DisplayTestAnalytics", "AllowCertification",
        "CanAccessPremiumTests", "HasAIRecommendations", "Level", "CreatedAt"
    },
    values: new object[,]
    {
        {
            1, "Foundation", "Basic access for foundation practice of an exam", 0.00m, 30,
            1, 5, 1, 1,
            true, 2, false,
            false, false, 0,
            false, false, false,
            false, false, 1, DateTime.UtcNow
        },
        {
            2, "Preparation Pro", "Standard plan for serious students for preparation of exams", 199.00m, 90,
            2, 20, 2, 3,
            true, 50, true,
            true, true, 1,
            true, true, true,
            true, false, 2, DateTime.UtcNow
        },
        {
            3, "Champion", "Full access with analytics, premium exam question papers, previous year questions", 999.00m, 365,
            10, 50, 5, 10,
            true, 100, true,
            true, true, 50,
            true, true, true,
            true, true, 3, DateTime.UtcNow
        }
    });

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserSubscriptions");

            migrationBuilder.DropTable(
                name: "SubscriptionPlans");
        }
    }
}
