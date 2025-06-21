using Microsoft.AspNetCore.Identity;
using Quizlo.Questionnaire.WebApi.Data.Entities;

public static class SeedData
{
    public static async Task SeedRolesAsync(IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<Role>>();
        string[] roleNames = { "Admin", "Student", "Teacher" };

        foreach (var roleName in roleNames)
        {
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                await roleManager.CreateAsync(new Role { Name = roleName });
            }
        }
    }
}
