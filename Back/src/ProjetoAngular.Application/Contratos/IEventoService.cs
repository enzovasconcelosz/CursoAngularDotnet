using System.Collections.Generic;
using System.Threading.Tasks;
using ProjetoAngular.Application.Dtos;

namespace ProjetoAngular.Application.Contratos
{
    public interface IEventoService
    {
        Task<EventoDto> AddEventos(int userId, EventoDto model);

        Task<EventoDto> UpdateEvento(int userId, int eventoId, EventoDto model);

        Task<bool> DeleteEvento(int userId, int eventoId);

        Task<IEnumerable<EventoDto>> GetAllEventosAsync(int userId, bool includePalestrantes = false);

        Task<EventoDto> GetEventoByIdAsync(int userId, int eventoId, bool includePalestrantes = false);
    }
}