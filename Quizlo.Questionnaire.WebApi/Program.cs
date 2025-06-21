using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Quizlo.Questionnaire.WebApi.Data;
using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Configuration & Connection String
// Make sure you have a "DefaultConnection" in appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// 2. EF Core DbContext
builder.Services.AddDbContext<QuizDbContext>(options =>
    options.UseSqlServer(connectionString));

// 3. Identity (with default cookie scheme)
builder.Services.AddIdentity<User, Role>(options =>
{
    // password, lockout, etc. configuration
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
})
    .AddEntityFrameworkStores<QuizDbContext>()
    .AddDefaultTokenProviders();

// 4. Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
})
    .AddCookie()
    // 4.a Google
    .AddGoogle(GoogleDefaults.AuthenticationScheme, options =>
    {
        options.ClientId = builder.Configuration["Authentication:Google:ClientId"];
        options.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];
        options.CallbackPath = "/signin-google";
    })
    // 4.b (placeholder for phone number / OTP scheme)
    ;

// 5. Register your application services & repositories
builder.Services.AddScoped<IExamService, ExamService>();
builder.Services.AddScoped<IQuestionService, QuestionService>();
builder.Services.AddScoped<IUserService, UserService>();

// 6. Controllers, Swagger & CORS
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    // Tell Swagger that you use Bearer/Cookie tokens
    c.AddSecurityDefinition("cookieAuth", new()
    {
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
        Name = "Cookie",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Cookie authentication"
    });
    c.AddSecurityRequirement(new()
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new()
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id   = "cookieAuth"
                }
            },
            new string[] {}
        }
    });
});

// Optional: open up only your front-end origin(s)
builder.Services.AddCors(options =>
{
    options.AddPolicy("DefaultCors", policy =>
    {
        policy.WithOrigins("https://your-frontend.com")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 7. Order is important:
app.UseCors("DefaultCors");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
