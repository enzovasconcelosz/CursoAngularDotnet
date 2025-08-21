import { Evento } from "./Evento";
import { User } from "./Identity/User";
import { RedeSocial } from "./RedeSocial";

export interface Palestrante {
  id: number;

  miniCurriculo: string;

  userId: number;

  User: User;

  redesSociais: RedeSocial[];

  palestrantesEventos: Evento[];
}
