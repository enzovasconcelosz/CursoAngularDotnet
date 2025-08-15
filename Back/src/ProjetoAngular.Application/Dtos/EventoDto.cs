using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProjetoAngular.Application.Dtos
{
    [Serializable]
    public class EventoDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigtório."),
         MinLength(3, ErrorMessage = "{0} deve ter no mínimo 3 caracteres."),
         MaxLength(50, ErrorMessage = "{0} deve ter no máximo 50 caracteres."),
         StringLength(50, MinimumLength = 3, ErrorMessage = "O campo {0} deve conter entre 3 a 50 caracteres.")]
        public string Local { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigtório.")]
        public string DataEvento { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigtório."),
         MinLength(3, ErrorMessage = "{0} deve ter no mínimo 3 caracteres."),
         MaxLength(50, ErrorMessage = "{0} deve ter no máximo 50 caracteres."),
         StringLength(50, MinimumLength = 3, ErrorMessage = "O campo {0} deve conter entre 3 a 50 caracteres.")]
        public string Tema { get; set; }

        [Range(1, 3000, ErrorMessage = "O campo {0} não pode ser menor que 1 e maior que 3000.")]
        public int QuantidadePessoas { get; set; }

        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$", ErrorMessage = "{0} Não é uma imagem válida. (gif, jpg, jpeg, bmp ou png)")]
        public string ImagemURL { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        [Phone(ErrorMessage = "O campo {0} não contém um número válido.")]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        [EmailAddress(ErrorMessage = "O campo {0} não contém um e-mail válido.")]
        public string EmailPrincipal { get; set; }

        // public int UserId { get; set; }
        // public UserDto UserDto { get; set; }

        // public IEnumerable<LoteDto> Lotes { get; set; }
        // public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        // public IEnumerable<PalestranteDto> Palestrantes { get; set; }
    }
}