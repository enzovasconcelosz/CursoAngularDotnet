using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProjetoAngular.Application.Dtos;
using ProjetoAngular.Domain;
using ProjetoAngular.Persistence.Models;

namespace ProjetoAngular.Application.Contratos
{
    public interface IEventoService
    {
        Task<EventoDto> AddEventos(
            // int userId,
            EventoDto model);

        Task<EventoDto> UpdateEvento(
            // int userId,
            int eventoId, EventoDto model);

        Task<bool> DeleteEvento(
            // int userId,
            int eventoId);

        Task<IEnumerable<EventoDto>> GetAllEventosAsync(bool includePalestrantes = false);

        Task<EventoDto> GetEventoByIdAsync(
            // int userId,
             int eventoId, bool includePalestrantes = false);
    }
}