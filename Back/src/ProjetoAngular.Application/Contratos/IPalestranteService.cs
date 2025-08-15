using System.Threading.Tasks;
using ProjetoAngular.Application.Dtos;
using ProjetoAngular.Persistence.Models;

namespace ProjetoAngular.Application.Contratos
{
    public interface IPalestranteService
    {
        Task<PalestranteDto> AddPalestrantes(int userId, PalestranteAddDto model);

        Task<PalestranteDto> UpdatePalestrante(int userId, PalestranteUpdateDto model);

        Task<PageList<PalestranteDto>> GetAllPalestrantesAsync(PageParams pageParams, bool includeEventos = false);

        Task<PalestranteDto> GetPalestranteByUserIdAsync(int userId, bool includeEventos = false);
    }
}