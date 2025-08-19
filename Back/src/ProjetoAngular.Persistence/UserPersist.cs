using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProjetoAngular.Domain.Identity;
using ProjetoAngular.Persistence.Contextos;
using ProjetoAngular.Persistence.Contratos;

namespace ProjetoAngular.Persistence
{
    public class UserPersist : GeralPersist, IUserPersist
    {
        private readonly ProjetoAngularContext _context;

        public UserPersist(ProjetoAngularContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> GetUserByUserNameAsync(string userName)
        {
            return await _context.Users
                                 .SingleOrDefaultAsync(user => user.UserName == userName.ToLower());
        }
    }
}