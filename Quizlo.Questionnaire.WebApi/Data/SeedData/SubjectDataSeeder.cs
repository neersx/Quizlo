using System;
using System.Collections.Generic;

namespace Quizlo.Questionnaire.WebApi.Data.Entities
{
    public static class SubjectSeedData
    {
        public static List<Subject> GetSubjects(int createdByUserId = 1)
        {
            var now = DateTime.UtcNow;
            return new List<Subject>
            {
                // 1: NEET
                new Subject {Title = "Biology", Category = "Medical", ExamId = 1, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject {Title = "Physics", Category = "Medical", ExamId = 1, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject {Title = "Chemistry", Category = "Medical", ExamId = 1, CreatedAt = now, CreatedBy = createdByUserId },

                // 2: AIIMS
                new Subject {Title = "Biology", Category = "Medical", ExamId = 2, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject {Title = "Physics", Category = "Medical", ExamId = 2, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject {Title = "Chemistry", Category = "Medical", ExamId = 2, CreatedAt = now, CreatedBy = createdByUserId },

                // 3: JIPMER
                new Subject {Title = "Biology", Category = "Medical", ExamId = 3, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject {Title = "Physics", Category = "Medical", ExamId = 3, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject {Title = "Chemistry", Category = "Medical", ExamId = 3, CreatedAt = now, CreatedBy = createdByUserId },

                // 4: IIT JEE
                new Subject { Title = "Mathematics", Category = "Engineering", ExamId = 4, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Physics", Category = "Engineering", ExamId = 4, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Chemistry", Category = "Engineering", ExamId = 4, CreatedAt = now, CreatedBy = createdByUserId },

                // 5: AIEEE
                new Subject { Title = "Mathematics", Category = "Engineering", ExamId = 5, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Physics", Category = "Engineering", ExamId = 5, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Chemistry", Category = "Engineering", ExamId = 5, CreatedAt = now, CreatedBy = createdByUserId },

                // 6: GATE
                new Subject { Title = "Mathematics", Category = "Engineering", ExamId = 6, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Engineering Sciences", Category = "Engineering", ExamId = 6, CreatedAt = now, CreatedBy = createdByUserId },

                // 7: BITSAT
                new Subject { Title = "Mathematics", Category = "Engineering", ExamId = 7, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Physics", Category = "Engineering", ExamId = 7, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Chemistry", Category = "Engineering", ExamId = 7, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "English Proficiency", Category = "Engineering", ExamId = 7, CreatedAt = now, CreatedBy = createdByUserId },

                // 8: IBPS PO
                new Subject { Title = "Quantitative Aptitude", Category = "Banking", ExamId = 8, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Reasoning Ability", Category = "Banking", ExamId = 8, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "English Language", Category = "Banking", ExamId = 8, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "General Awareness", Category = "Banking", ExamId = 8, CreatedAt = now, CreatedBy = createdByUserId },

                // 9: IBPS Cl
                new Subject { Title = "Quantitative Aptitude", Category = "Banking", ExamId = 9, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Reasoning Ability", Category = "Banking", ExamId = 9, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "English Language", Category = "Banking", ExamId = 9, CreatedAt = now, CreatedBy = createdByUserId },

                // 10: SBI PO
                new Subject { Title = "Quantitative Aptitude", Category = "Banking", ExamId = 10, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Reasoning Ability", Category = "Banking", ExamId = 10, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "English Language", Category = "Banking", ExamId = 10, CreatedAt = now, CreatedBy = createdByUserId },

                // 11: RBI Gr
                new Subject { Title = "Economic and Social Issues", Category = "Banking", ExamId = 11, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Finance and Management", Category = "Banking", ExamId = 11, CreatedAt = now, CreatedBy = createdByUserId },

                // 12: RRB NT
                new Subject { Title = "General Intelligence", Category = "Railway", ExamId = 12, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "General Awareness", Category = "Railway", ExamId = 12, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Mathematics", Category = "Railway", ExamId = 12, CreatedAt = now, CreatedBy = createdByUserId },

                // 13: RRB Gr
                new Subject { Title = "General Intelligence", Category = "Railway", ExamId = 13, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "General Awareness", Category = "Railway", ExamId = 13, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Mathematics", Category = "Railway", ExamId = 13, CreatedAt = now, CreatedBy = createdByUserId },

                // 14: RRB AL
                new Subject { Title = "General Intelligence", Category = "Railway", ExamId = 14, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Technical Ability", Category = "Railway", ExamId = 14, CreatedAt = now, CreatedBy = createdByUserId },

                // 15: UPSC
                new Subject { Title = "General Studies", Category = "Civil", ExamId = 15, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Essay", Category = "Civil", ExamId = 15, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Optional Subject", Category = "Civil", ExamId = 15, CreatedAt = now, CreatedBy = createdByUserId },

                // 16: State PCS
                new Subject { Title = "General Studies", Category = "Civil", ExamId = 16, CreatedAt = now, CreatedBy = createdByUserId },

                // 17: NDA
                new Subject { Title = "Mathematics", Category = "Defence", ExamId = 17, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "General Ability", Category = "Defence", ExamId = 17, CreatedAt = now, CreatedBy = createdByUserId },

                // 18: CDS
                new Subject { Title = "English", Category = "Defence", ExamId = 18, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "General Knowledge", Category = "Defence", ExamId = 18, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Elementary Mathematics", Category = "Defence", ExamId = 18, CreatedAt = now, CreatedBy = createdByUserId },

                // 19: AFCAT
                new Subject { Title = "General Awareness", Category = "Defence", ExamId = 19, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Verbal Ability", Category = "Defence", ExamId = 19, CreatedAt = now, CreatedBy = createdByUserId },

                // 20: SSC CG
                new Subject { Title = "Quantitative Aptitude", Category = "General", ExamId = 20, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Reasoning Ability", Category = "General", ExamId = 20, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "English Language", Category = "General", ExamId = 20, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "General Awareness", Category = "General", ExamId = 20, CreatedAt = now, CreatedBy = createdByUserId },

                // 21: SSC CH
                new Subject { Title = "Quantitative Aptitude", Category = "General", ExamId = 21, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Reasoning Ability", Category = "General", ExamId = 21, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "English Language", Category = "General", ExamId = 21, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "General Awareness", Category = "General", ExamId = 21, CreatedAt = now, CreatedBy = createdByUserId },

                // 22: CTET
                new Subject { Title = "Child Development and Pedagogy", Category = "General", ExamId = 22, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Language I", Category = "General", ExamId = 22, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Language II", Category = "General", ExamId = 22, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Mathematics", Category = "General", ExamId = 22, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Environmental Studies", Category = "General", ExamId = 22, CreatedAt = now, CreatedBy = createdByUserId },

                // 23: CLAT
                new Subject { Title = "Legal Aptitude", Category = "General", ExamId = 23, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Logical Reasoning", Category = "General", ExamId = 23, CreatedAt = now, CreatedBy = createdByUserId },

                // 24: CAT
                new Subject { Title = "Quantitative Aptitude", Category = "General", ExamId = 24, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Data Interpretation", Category = "General", ExamId = 24, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Verbal Ability", Category = "General", ExamId = 24, CreatedAt = now, CreatedBy = createdByUserId },

                // 25: GPAT
                new Subject { Title = "Pharmaceutical Chemistry", Category = "General", ExamId = 25, CreatedAt = now, CreatedBy = createdByUserId },

                // 26: UPTET
                new Subject { Title = "Child Development and Pedagogy", Category = "General", ExamId = 26, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Mathematics", Category = "General", ExamId = 26, CreatedAt = now, CreatedBy = createdByUserId },
                new Subject { Title = "Environmental Studies", Category = "General", ExamId = 26, CreatedAt = now, CreatedBy = createdByUserId },

                // 27: BPSC
                new Subject { Title = "General Studies", Category = "Civil", ExamId = 27, CreatedAt = now, CreatedBy = createdByUserId },
            };
        }

        public static void Seed(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            string adminEmail = "quizlo@gmail.com";
            var db = scope.ServiceProvider.GetRequiredService<QuizDbContext>();

            if (!db.Subjects.Any())
            {
                int adminId = db.Users.FirstOrDefault(u => u.UserName == adminEmail)?.Id ?? 1;
                var subjects = GetSubjects(adminId);
                db.Subjects.AddRange(subjects);
                db.SaveChanges();
            }
        }
    }
}
