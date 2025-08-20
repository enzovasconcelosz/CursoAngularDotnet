using System.Threading.Tasks;
using ProjetoAngular.Domain;
using ProjetoAngular.Persistence.Models;

namespace ProjetoAngular.Persistence.Contratos
{
    public interface IEventoPersist
    {
        Task<PageList<Evento>> GetAllEventosAsync(int userId, PageParams pageParams, bool includePalestrantes = false);

        Task<Evento> GetEventoByIdAsync(int userId, int eventoId, bool includePalestrantes = false);
    }
}