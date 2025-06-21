erDiagram
    USER ||--o{ USERROLE       : has
    ROLE ||--o{ USERROLE       : assigned_to
    USER ||--o{ OTPRECORD      : owns
    EXAMTYPE ||--o{ QUESTION    : contains
    QUESTION ||--o{ OPTION      : has
    TEST ||--o{ TESTQUESTION   : includes
    QUESTION ||--o{ TESTQUESTION: appears_in
    TEST ||--o{ ATTEMPT        : taken_as
    ATTEMPT ||--o{ ANSWER       : records
    QUESTION ||--o{ ANSWER       : answered_by

    %% PK/FK annotations
    USER {
      int     Id PK
      string  Email
      …
    }
    ROLE {
      int     Id PK
      string  Name
    }
    USERROLE {
      int     UserId FK
      int     RoleId FK
    }
    OTPRECORD {
      int     Id PK
      int     UserId FK
      string  Code
      datetime ExpiresAt
    }
    EXAMTYPE {
      int     Id PK
      string  Name
    }
    QUESTION {
      int     Id PK
      int     ExamTypeId FK
      string  Text
      …
    }
    OPTION {
      int     Id PK
      int     QuestionId FK
      string  Text
      bool    IsCorrect
    }
    TEST {
      int     Id PK
      int     ExamTypeId FK
      int     CreatedByUserId FK
      string  Title
      …
    }
    TESTQUESTION {
      int     TestId FK
      int     QuestionId FK
      int     Order
    }
    ATTEMPT {
      int     Id PK
      int     TestId FK
      int     UserId FK
      datetime StartedAt
      datetime SubmittedAt
      float   Score
    }
    ANSWER {
      int     Id PK
      int     AttemptId FK
      int     QuestionId FK
      string  SelectedOptionIds
      bool    IsCorrect
    }
