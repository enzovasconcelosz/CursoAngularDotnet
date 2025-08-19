using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using ProjetoAngular.Application.Dtos;

namespace ProjetoAngular.Application.Contratos
{
    public interface IAccountService
    {
        Task<bool> UserExists(string username);

        Task<UserUpdateDto> GetUserByUserNameAsync(string userName);

        Task<SignInResult> CheckUserPasswordAsync(UserUpdateDto userUpdateDto, string password);

        Task<UserUpdateDto> CreateAccountAsync(UserDto userDto);

        Task<UserUpdateDto> UpdateAccount(UserUpdateDto userUpdateDto);
    }
}