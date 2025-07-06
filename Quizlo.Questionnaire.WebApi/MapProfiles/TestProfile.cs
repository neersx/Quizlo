using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Quizlo.Questionnaire.WebApi.DTO;

namespace Quizlo.Questionnaire.WebApi.MapProfiles
{
   public class TestProfile : Profile
{
    public TestProfile()
    {
        CreateMap<Data.Entities.Test, TestDetailsDto>()
          // e.g. if your DTO has different property names:
          .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt))
          // etc.
          ;
    }
}

}