using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Quizlo.Questionnaire.WebApi.Data;
using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.Data.Seed;
using Quizlo.Questionnaire.WebApi.DTO;
using Quizlo.Questionnaire.WebApi.Helpers;
using Quizlo.Questionnaire.WebApi.MapProfiles;
using Quizlo.Questionnaire.WebApi.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// 1. Configuration & Connection String
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// 2. EF Core DbContext
builder.Services.AddDbContext<QuizDbContext>(options => options.UseSqlServer(connectionString));

// 3. Identity
builder.Services.AddIdentity<User, Role>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = true;
})
    .AddEntityFrameworkStores<QuizDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"], // e.g., "QuizloApi"
        ValidAudience = builder.Configuration["Jwt:Audience"], // e.g., "QuizloApiClient"
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.AddAuthorization();

// Register all Profiles in this assembly
builder.Services.AddAutoMapper(typeof(TestProfile).Assembly);
builder.Services.AddAutoMapper(typeof(QuestionsProfile).Assembly);
builder.Services.AddAutoMapper(typeof(BlogProfile).Assembly);
builder.Services.AddAutoMapper(typeof(BlogMappingProfile).Assembly);
builder.Services.AddTransient<PrependBaseUrlResolver>();
builder.Services.AddAutoMapper(typeof(BlogListMappingProfile).Assembly);


// 5. Register your services
builder.Services.AddScoped<IExamService, ExamService>();
builder.Services.AddScoped<IQuestionService, QuestionService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<JwtTokenService>();

builder.Services.AddHttpClient();          // for webhook
builder.Services.AddScoped<ITestService, TestService>();
builder.Services.AddScoped<IDropdownService, DropdownService>();

builder.Services.AddScoped<IBlogService, BlogService>();


// 6. Controllers, Swagger, CORS
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.MaxDepth = 64; // optional: increase if you need
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Description = "Paste access-token here"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement {
      { new OpenApiSecurityScheme { Reference = new OpenApiReference {
              Id = "Bearer", Type = ReferenceType.SecurityScheme }}, Array.Empty<string>() }
    });
});

// Optional: open up only your front-end origin(s)
builder.Services.AddCors(options =>
{
    options.AddPolicy("DefaultCors", policy =>
    {
        policy.WithOrigins("https://quizloai.com", "http://localhost:4000", "http://localhost:4200")
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

app.UseCors("DefaultCors");
app.UseAuthentication();  // <--- This must come before UseAuthorization
app.UseAuthorization();

app.MapControllers();

// Seed data
IdentityDataSeeder.Seed(app.Services);
ExamDataSeeder.Seed(app.Services);
SubjectSeedData.Seed(app.Services);


app.Run();
