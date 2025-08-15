using System.Threading.Tasks;
using ProjetoAngular.Application.Dtos;

namespace ProjetoAngular.Application.Contratos
{
    public interface ITokenService
    {
        Task<string> CreateToken(UserUpdateDto userUpdateDto);
    }
}