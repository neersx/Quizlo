using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quizlo.Questionnaire.WebApi.DTO
{
public class ApiResponse<T>
    {
        public bool IsSuccess { get; set; }
        public T? Data { get; set; }
        public string? Message { get; set; }
        public int StatusCode { get; set; }

        // Success factory
        public static ApiResponse<T> Success(
            T data,
            string? message = null,
            int statusCode = StatusCodes.Status200OK)
        {
            return new ApiResponse<T>
            {
                IsSuccess = true,
                Data = data,
                Message = message,
                StatusCode = statusCode
            };
        }

        // Failure factory
        public static ApiResponse<T> Failure(
            string message,
            int statusCode = StatusCodes.Status400BadRequest)
        {
            return new ApiResponse<T>
            {
                IsSuccess = false,
                Data = default,
                Message = message,
                StatusCode = statusCode
            };
        }
    }
}