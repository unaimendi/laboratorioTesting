import { barajaInicial, partida } from "./modelo";

export const posicionCartaRandom = (): number => Math.floor(Math.random() * partida.barajaRestante.length);

export const sacarCarta = (): void => {
	console.log(partida.barajaRestante);
	const nuevaCarta = partida.barajaRestante.splice(posicionCartaRandom(), 1)[0];
	console.log(nuevaCarta);
	partida.carta = nuevaCarta;
};

export const calculaPuntuacion = (): void => {
	if (partida.carta.valor) {
		partida.puntuacion = partida.puntuacion + partida.carta.valor;
	}
};

export const generarMensajePlantarse = (): void => {
	switch (true) {
		case partida.puntuacion < 0.5:
			partida.mensaje = "Al menos juega una carta cagón";
			break;
		case partida.puntuacion < 4:
			partida.mensaje = "Has sido muy conservador";
			break;
		case partida.puntuacion < 6:
			partida.mensaje = "Te ha entrado el canguelo eh?";
			break;
		case partida.puntuacion <= 7:
			partida.mensaje = "Casi casi...";
			break;
		default:
			partida.mensaje = "";
			break;
	}
};

export const comprobarEstadoPartida = (): void => {
	switch (true) {
		case partida.puntuacion === 7.5:
			partida.estado = "gana";
			break;
		case partida.puntuacion > 7.5:
			partida.estado = "pierde";
			break;
		default:
			partida.estado = "enProgreso";
			break;
	}
};

export const resetPartida = () => {
	partida.puntuacion = 0;
	partida.carta = {
		valor: null,
		imagenUrl: "/src/assets/back.jpg",
	};
	partida.mensaje = "";
	partida.estado = "noIniciada";
	partida.barajaRestante = barajaInicial;
};
