using System.Threading.Tasks;
using ProjetoAngular.Domain;
using ProjetoAngular.Persistence.Models;

namespace ProjetoAngular.Persistence.Contratos
{
    public interface IPalestrantePersist : IGeralPersist
    {
        Task<PageList<Palestrante>> GetAllPalestrantesAsync(PageParams pageParams, bool includeEventos = false);
        
        Task<Palestrante> GetPalestranteByUserIdAsync(int userId, bool includeEventos = false);
    }
}