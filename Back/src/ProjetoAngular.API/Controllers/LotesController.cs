using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjetoAngular.Application.Contratos;
using ProjetoAngular.Application.Dtos;

namespace ProjetoAngular.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LotesController : ControllerBase
    {
        private readonly ILoteService _loteService;

        public LotesController(ILoteService LoteService)
        {
            _loteService = LoteService;
        }

        [HttpGet("{eventoId}")]
        public async Task<IActionResult> Get(int eventoId)
        {
            try
            {
                var lotes = await _loteService.GetLotesByEventoIdAsync(eventoId);

                if (lotes is null)
                    return NoContent();

                return Ok(lotes);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar os lotes. Erro: {ex.Message}");
            }
        }

        [HttpPut("{eventoId}")]
        public async Task<IActionResult> SaveLotes(int eventoId, LoteDto[] models)
        {
            try
            {
                var lotes = await _loteService.SaveLotes(eventoId, models);

                if (lotes is null)
                    return NoContent();

                return Ok(lotes);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar salvar os lotes. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{eventoId}/{loteId}")]
        public async Task<IActionResult> Delete(int eventoId, int loteId)
        {
            try
            {
                var lote = await _loteService.GetLoteByIdsAsync(eventoId, loteId);

                if (lote is null)
                    return NoContent();

                return await _loteService.DeleteLote(lote.EventoId, lote.Id)
                       ? Ok(new { message = "Lote excluído." })
                       : throw new Exception("Ocorreu um problem não específico ao tentar excluir o lote.");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar excluir lotes. Erro: {ex.Message}");
            }
        }
    }
}