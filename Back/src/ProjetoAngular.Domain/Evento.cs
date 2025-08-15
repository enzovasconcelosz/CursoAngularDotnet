using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoAngular.Domain
{
    public class Evento
    {
        public int Id { get; set; }

        public string Local { get; set; }

        public DateTime? DataEvento { get; set; }

        public string Tema { get; set; }

        public int QuantidadePessoas { get; set; }

        public string ImagemURL { get; set; }

        public string Telefone { get; set; }

        public string EmailPrincipal { get; set; }

        //public int UserId { get; set; }

        public IEnumerable<Lote> Lotes { get; set; }

        public IEnumerable<RedeSocial> RedesSociais { get; set; }

        public IEnumerable<PalestranteEvento> PalestrantesEventos { get; set; }
    }
}