using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProjetoAngular.Application.Contratos;
using Microsoft.AspNetCore.Http;
using ProjetoAngular.Application.Dtos;
using ProjetoAngular.API.Extensions;
using Microsoft.AspNetCore.Authorization;
using ProjetoAngular.Persistence.Models;
using ProjetoAngular.API.Helpers;

namespace ProjetoAngular.API.Controllers
{
    // [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class EventosController : ControllerBase
    {
        private readonly IEventoService _eventoService;

        // private readonly IUtil _util;

        // private readonly IAccountService _accountService;

        private readonly string _destino = "Images";

        public EventosController(IEventoService eventoService
        // ,
        //                          IUtil util,
        //                          IAccountService accountService
                                 )
        {
            // _util = util;
            // _accountService = accountService;
            _eventoService = eventoService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var eventos = await _eventoService.GetAllEventosAsync(true);

                if (eventos is null)
                    return NoContent();

                // Response.AddPagination(eventos.CurrentPage, eventos.PageSize, eventos.TotalCount, eventos.TotalPages);

                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var evento = await _eventoService.GetEventoByIdAsync(
                    // User.GetUserId(),
                    id, true);

                if (evento is null)
                    return NoContent();

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        // [HttpPost("upload-image/{eventoId}")]
        // public async Task<IActionResult> UploadImage(int eventoId)
        // {
        //     try
        //     {
        //         var evento = await _eventoService.GetEventoByIdAsync(User.GetUserId(), eventoId, true);

        //         if (evento is null)
        //             return NoContent();

        //         var file = Request.Form.Files[0];

        //         if (file.Length > 0)
        //         {
        //             _util.DeleteImage(evento.ImagemURL, _destino);
        //             evento.ImagemURL = await _util.SaveImage(file, _destino);
        //         }

        //         var EventoRetorno = await _eventoService.UpdateEvento(User.GetUserId(), eventoId, evento);

        //         return Ok(EventoRetorno);
        //     }
        //     catch (Exception ex)
        //     {
        //         return this.StatusCode(StatusCodes.Status500InternalServerError,
        //             $"Erro ao tentar realizar upload de foto do evento. Erro: {ex.Message}");
        //     }
        // }

        [HttpPost]
        public async Task<IActionResult> Post(EventoDto model)
        {
            Console.WriteLine("Entrou na controller");
            try
            {
                var evento = await _eventoService.AddEventos(
                    // 1,
                     model);

                if (evento is null)
                    return NoContent();

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar eventos. Erro: {ex.Message} + {ex.InnerException}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, EventoDto model)
        {
            try
            {
                var evento = await _eventoService.UpdateEvento(
                    // User.GetUserId(),
                    id, model);

                if (evento is null)
                    return NoContent();

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar eventos. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var evento = await _eventoService.GetEventoByIdAsync(
                    // User.GetUserId(),
                     id, true);

                if (evento is null)
                    return NoContent();

                if (await _eventoService.DeleteEvento(
                    // User.GetUserId(),
                     id))
                {
                    // _util.DeleteImage(evento.ImagemURL, _destino);
                    return Ok(true);
                }
                else
                    throw new Exception("Ocorreu um problema não específico ao tentar deletar evento.");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar eventos. Erro: {ex.Message}");
            }
        }
    }
}