using System;
using System.Collections.Generic;

namespace Quizlo.Questionnaire.WebApi.Data.Entities
{
    public static class ExamDataSeeder
    {
        public static List<Exam> GetExams(int adminId)
        {
            var now = DateTime.UtcNow;

            return new()
               {  
                   // Medical  
                   new() { Name = "National Eligibility cum Entrance Test", Code = "NEET", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "Medical", Type = "Entrance Exam" },
                   new() { Name = "AIIMS MBBS Entrance", Code = "AIIMS", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "Medical", Type = "Entrance Exam" },
                   new() { Name = "JIPMER Entrance Exam", Code = "JIPMER", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "Medical", Type = "Entrance Exam" },  

                   // Engineering  
                   new() {  Name = "IIT Joint Entrance Examination", Code = "IITJEE", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "Engineering", Type = "Entrance Exam" },
                   new() {  Name = "All India Engineering Entrance Examination", Code = "AIEEE", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "Engineering", Type = "Entrance Exam" },
                   new() {  Name = "Graduate Aptitude Test in Engineering", Code = "GATE", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "Engineering", Type = "Certification Exam" },
                   new() {  Name = "Birla Institute of Technology and Science Admission Test", Code = "BITSAT", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "Engineering", Type = "Entrance Exam" },  

                   // Banking  
                   new() { Name = "IBPS Probationary Officer", Code = "IBPS_PO", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "Banking", Type = "Entrance Exam" },
                   new() { Name = "IBPS Clerk", Code = "IBPS_CLERK", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "Banking", Type = "Entrance Exam" },
                   new() {  Name = "SBI Probationary Officer", Code = "SBI_PO", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "Banking", Type = "Entrance Exam" },
                   new() {  Name = "RBI Grade B", Code = "RBI_GRB", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "Banking", Type = "Entrance Exam" },  

                   // Railway  
                   new() { Name = "Railway Recruitment Board NTPC", Code = "RRB_NTPC", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "Railway", Type = "Entrance Exam" },
                   new() { Name = "Railway Recruitment Board Group D", Code = "RRB_GRP_D", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "Railway", Type = "Entrance Exam" },
                   new() { Name = "Railway Assistant Loco Pilot", Code = "RRB_ALP", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "Railway", Type = "Entrance Exam" },  

                   // Civiment Administrative)  
                   new() { Name = "Union Public Service Commission Civil Services Exam", Code = "UPSC", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "Civil", Type = "Entrance Exam" },
                   new() { Name = "State Public Service Commission", Code = "STATE_PCS", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "Civil", Type = "Entrance Exam" },  

                   // Defe
                   new() { Name = "National Defence Academy", Code = "NDA", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "Defence", Type = "Entrance Exam" },
                   new() { Name = "Combined Defence Services", Code = "CDS", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "Defence", Type = "Entrance Exam" },
                   new() { Name = "Air Force Common Admission Test", Code = "AFCAT", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "Defence", Type = "Entrance Exam" },  

                   // Gener government exams)  
                   new() { Name = "Staff Selection Commission CGL", Code = "SSC_CGL", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "General", Type = "Entrance Exam" },
                   new() { Name = "Staff Selection Commission CHSL", Code = "SSC_CHSL", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "General", Type = "Entrance Exam" },
                   new() { Name = "Central Teacher Eligibility Test", Code = "CTET", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "General", Type = "Certification Exam" },
                   new() { Name = "Common Law Admission Test", Code = "CLAT", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "General", Type = "Entrance Exam" },
                   new() { Name = "Common Admission Test", Code = "CAT", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "General", Type = "Entrance Exam" },
                   new() { Name = "Graduate Pharmacy Aptitude Test", Code = "GPAT", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "General", Type = "Certification Exam" },
                   new() { Name = "UPTET (Uttar Pradesh Teacher Eligibility Test)", Code = "UPTET", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "General", Type = "Certification Exam" },
                   new() { Name = "Bihar Public Service Commission", Code = "BPSC", Country = "India", CreatedAt = now, CreatedByUserId = adminId, Category = "Civil", Type = "Entrance Exam" }
               };
        }

        public static void Seed(IServiceProvider serviceProvider)
        {
            string adminEmail = "quizlo@gmail.com";
            using var scope = serviceProvider.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<QuizDbContext>();
            if (!db.Exams.Any())
            {
                int adminId = db.Users.FirstOrDefault(u => u.UserName == adminEmail)?.Id ?? 1;
                var exams = GetExams(adminId);
                db.Exams.AddRange(exams);
                db.SaveChanges();
            }
        }
    }
}
