using Microsoft.AspNetCore.Identity;
using Quizlo.Questionnaire.WebApi.Data.Entities;

namespace Quizlo.Questionnaire.WebApi.Data.Seed
{
    public static class IdentityDataSeeder
    {
        public static void Seed(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<Role>>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();

            // 1. Seed Roles first (blocking and ensuring they exist before user assignment)
            string[] roleNames = { "Admin", "Student", "Teacher" };
            foreach (var roleName in roleNames)
            {
                var exists = roleManager.RoleExistsAsync(roleName).GetAwaiter().GetResult();
                if (!exists)
                {
                    var role = new Role
                    {
                        Name = roleName,
                        NormalizedName = roleName.ToUpperInvariant() // <--- This is required!
                    };
                    var createResult = roleManager.CreateAsync(role).GetAwaiter().GetResult();
                    if (createResult.Succeeded)
                        Console.WriteLine($"Role '{roleName}' created.");
                    else
                        Console.WriteLine($"Failed to create role '{roleName}': {string.Join(", ", createResult.Errors.Select(e => e.Description))}");
                }
                else
                {
                    Console.WriteLine($"Role '{roleName}' already exists.");
                }
            }

            // 2. Now add Admin user
            string adminEmail = "quizlo@gmail.com";
            string adminPassword = "Admin@123"; // Change this before production

            var adminUser = userManager.FindByEmailAsync(adminEmail).GetAwaiter().GetResult();
            if (adminUser == null)
            {
                adminUser = new User
                {
                    UserName = adminEmail,
                    Email = adminEmail,
                    EmailConfirmed = true,
                    FirstName = "Admin",
                    LastName = "User",
                    PhoneNumber = "9999999999"
                };

                var result = userManager.CreateAsync(adminUser, adminPassword).GetAwaiter().GetResult();
                if (result.Succeeded)
                {
                    // Refetch roles (optional, but safest)
                    foreach (var roleName in roleNames)
                    {
                        var roleExists = roleManager.RoleExistsAsync(roleName).GetAwaiter().GetResult();
                        if (!roleExists)
                            throw new InvalidOperationException($"Role {roleName} does not exist.");
                    }

                    var addToRoleResult = userManager.AddToRoleAsync(adminUser, "Admin").GetAwaiter().GetResult();
                    if (!addToRoleResult.Succeeded)
                    {
                        foreach (var error in addToRoleResult.Errors)
                            Console.WriteLine($"Role assignment error: {error.Description}");
                    }
                    else
                    {
                        Console.WriteLine("Admin user created and assigned Admin role.");
                    }
                }
                else
                {
                    foreach (var error in result.Errors)
                        Console.WriteLine(error.Description);
                }
            }
            else
            {
                var inRole = userManager.IsInRoleAsync(adminUser, "Admin").GetAwaiter().GetResult();
                if (!inRole)
                {
                    var addToRoleResult = userManager.AddToRoleAsync(adminUser, "Admin").GetAwaiter().GetResult();
                    if (!addToRoleResult.Succeeded)
                    {
                        foreach (var error in addToRoleResult.Errors)
                            Console.WriteLine($"Role assignment error: {error.Description}");
                    }
                }
            }
        }
    }
}
