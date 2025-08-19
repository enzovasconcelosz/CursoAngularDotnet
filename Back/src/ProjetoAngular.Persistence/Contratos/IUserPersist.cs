using System.Collections.Generic;
using System.Threading.Tasks;
using ProjetoAngular.Domain.Identity;

namespace ProjetoAngular.Persistence.Contratos
{
    public interface IUserPersist : IGeralPersist
    {
        Task<IEnumerable<User>> GetUsersAsync();

        Task<User> GetUserByIdAsync(int id);

        Task<User> GetUserByUserNameAsync(string userName);
    }
}