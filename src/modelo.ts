export type EstadoPartida = "gana" | "pierde" | "enProgreso" | "noIniciada";
export type ValorCarta = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 0.5;

export type MensajePlantarse = "" | "Al menos juega una carta cagón" | "Has sido muy conservador" | "Te ha entrado el canguelo eh?" | "Casi casi...";

export interface Carta {
	valor: ValorCarta | null;
	imagenUrl: string;
}

const BASE_URL = "/src/assets/";

export const barajaInicial: Carta[] = [
	{
		imagenUrl: `${BASE_URL}As.jpg`,
		valor: 1,
	},
	{
		imagenUrl: `${BASE_URL}Dos.jpg`,
		valor: 2,
	},
	{
		imagenUrl: `${BASE_URL}Tres.jpg`,
		valor: 3,
	},
	{
		imagenUrl: `${BASE_URL}Cuatro.jpg`,
		valor: 4,
	},
	{
		imagenUrl: `${BASE_URL}Cinco.jpg`,
		valor: 5,
	},
	{
		imagenUrl: `${BASE_URL}Seis.jpg`,
		valor: 6,
	},
	{
		imagenUrl: `${BASE_URL}Siete.jpg`,
		valor: 7,
	},
	{
		imagenUrl: `${BASE_URL}Sota.jpg`,
		valor: 0.5,
	},
	{
		imagenUrl: `${BASE_URL}Caballo.jpg`,
		valor: 0.5,
	},
	{
		imagenUrl: `${BASE_URL}Rey.jpg`,
		valor: 0.5,
	},
];

export interface Partida {
	estado: EstadoPartida;
	puntuacion: number;
	mensaje: MensajePlantarse;
	carta: Carta;
	barajaRestante: Carta[];
}

export const partida: Partida = {
	estado: "noIniciada",
	puntuacion: 0,
	mensaje: "",
	carta: {
		valor: null,
		imagenUrl: `${BASE_URL}back.jpg`,
	},
	barajaRestante: barajaInicial,
};
