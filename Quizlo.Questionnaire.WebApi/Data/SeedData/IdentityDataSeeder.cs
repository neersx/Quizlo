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

            string[] roleNames = { "Admin", "Student", "Teacher" };

            // 1. Create Roles if missing
            foreach (var roleName in roleNames)
            {
                var exists = roleManager.RoleExistsAsync(roleName).GetAwaiter().GetResult();
                if (!exists)
                {
                    var result = roleManager.CreateAsync(new Role
                    {
                        Name = roleName,
                        NormalizedName = roleName.ToUpperInvariant()
                    }).GetAwaiter().GetResult();

                    if (!result.Succeeded)
                    {
                        Console.WriteLine($"[Seeder] Failed to create role '{roleName}': {string.Join(", ", result.Errors.Select(e => e.Description))}");
                    }
                    else
                    {
                        Console.WriteLine($"[Seeder] Created role '{roleName}'.");
                    }
                }
            }

            // 2. Create Admin User if missing
            string adminEmail = "quizlo@gmail.com";
            string adminPassword = "Admin@123"; // TODO: Secure for prod

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

                var createUserResult = userManager.CreateAsync(adminUser, adminPassword).GetAwaiter().GetResult();

                if (!createUserResult.Succeeded)
                {
                    Console.WriteLine($"[Seeder] Failed to create admin user: {string.Join(", ", createUserResult.Errors.Select(e => e.Description))}");
                    return;
                }
                else
                {
                    Console.WriteLine("[Seeder] Created admin user.");
                }
            }

            // 3. Ensure Admin User is in Admin Role
            var isInRole = userManager.IsInRoleAsync(adminUser, "Admin").GetAwaiter().GetResult();
            if (!isInRole)
            {
                var addToRoleResult = userManager.AddToRoleAsync(adminUser, "Admin").GetAwaiter().GetResult();
                if (!addToRoleResult.Succeeded)
                {
                    Console.WriteLine($"[Seeder] Failed to add admin user to Admin role: {string.Join(", ", addToRoleResult.Errors.Select(e => e.Description))}");
                }
                else
                {
                    Console.WriteLine("[Seeder] Admin user added to Admin role.");
                }
            }
            else
            {
                Console.WriteLine("[Seeder] Admin user already in Admin role.");
            }
        }
    }
}
