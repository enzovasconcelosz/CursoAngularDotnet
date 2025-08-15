using System.Threading.Tasks;
using ProjetoAngular.Domain;

namespace ProjetoAngular.Persistence.Contratos
{
    public interface IEventoPersist
    {
        Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false);

        Task<Evento> GetEventoByIdAsync(
            // int userId,
            int eventoId, bool includePalestrantes = false);
    }
}