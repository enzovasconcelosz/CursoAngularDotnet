using System;
using ProjetoAngular.Application.Dtos;
using ProjetoAngular.Domain;
using ProjetoAngular.Persistence.Models;
using AutoMapper;

namespace ProjetoAngular.Application.Helpers
{
    public class ProjetoAngularProfile : Profile
    {
        public ProjetoAngularProfile()
        {
            CreateMap<Evento, EventoDto>().ReverseMap();
            CreateMap<Lote, LoteDto>().ReverseMap();
            CreateMap<RedeSocial, RedeSocialDto>().ReverseMap();
            CreateMap<Palestrante, PalestranteDto>().ReverseMap();
            CreateMap<Palestrante, PalestranteAddDto>().ReverseMap();
            CreateMap<Palestrante, PalestranteUpdateDto>().ReverseMap();

            // CreateMap<User, UserDto>().ReverseMap();
            // CreateMap<User, UserLoginDto>().ReverseMap();
            // CreateMap<User, UserUpdateDto>().ReverseMap();
        }
    }
}