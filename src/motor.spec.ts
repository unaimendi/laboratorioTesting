import { vi } from "vitest";
import { EstadoPartida, MensajePlantarse, partida, Carta } from "./modelo";
import { generarMensajePlantarse, comprobarEstadoPartida, calculaPuntuacion, posicionCartaRandom, sacarCarta } from "./motor";
import * as motor from "./motor";

describe("posicionCartaRandom", () => {
	it("Si forzamos al Math.random a que devuelva un 0.5 la posición que debería devolvernos es la 5", () => {
		// Arrange
		const posicionRandomEsperada: number = 5;
		vi.spyOn(global.Math, "random").mockReturnValue(0.5);

		// Act
		const cartaDevuelta: number = posicionCartaRandom();

		// Assert
		expect(cartaDevuelta).toBe(posicionRandomEsperada);
	});
});

describe("sacarCarta", () => {
	beforeEach(() => {
		// Restablecer el estado de partida antes de cada prueba
		partida.barajaRestante = [
			{
				imagenUrl: "/src/assets/Uno.jpg",
				valor: 1,
			},
			{
				imagenUrl: "/src/assets/Dos.jpg",
				valor: 2,
			},
			{
				imagenUrl: "/src/assets/Tres.jpg",
				valor: 3,
			},
			{
				imagenUrl: "/src/assets/Cuatro.jpg",
				valor: 4,
			},
			{
				imagenUrl: "/src/assets/Cinco.jpg",
				valor: 5,
			},
			{
				imagenUrl: "/src/assets/Seis.jpg",
				valor: 6,
			},
			{
				imagenUrl: "/src/assets/Siete.jpg",
				valor: 7,
			},
			{
				imagenUrl: "/src/assets/Sota.jpg",
				valor: 0.5,
			},
			{
				imagenUrl: "/src/assets/Caballo.jpg",
				valor: 0.5,
			},
			{
				imagenUrl: "/src/assets/Rey.jpg",
				valor: 0.5,
			},
		];
		partida.carta = {
			imagenUrl: "/src/assets/back.jpg",
			valor: null,
		};
	});

	afterEach(() => {
		// Limpiar el mock después de cada prueba
		vi.spyOn(global.Math, "random").mockRestore();
	});

	it('Si formazamos posicionCartaRandom para que devuelva un 2 la carta que debemos recibir el el "Tres"', () => {
		// Arrange
		const cartaEsperada: Carta = {
			imagenUrl: "/src/assets/Tres.jpg",
			valor: 3,
		};

		// Act
		// Mock de Math.random
		vi.spyOn(global.Math, "random").mockReturnValue(0.2);
		sacarCarta();

		// Assert
		expect(partida.carta).toEqual(cartaEsperada);
	});
});

describe("calculaPuntuacion", () => {
	it("Suma el valor de la carta sacada con la puntuación anterior", () => {
		// Arrange
		partida.puntuacion = 4;
		partida.carta.valor = 5;
		const puntuacionEsperada: number = 9;

		// Act
		calculaPuntuacion();

		// Assert
		expect(partida.puntuacion).toBe(puntuacionEsperada);
	});
});

describe("generarMensajePlantarse", () => {
	it('Si la puntuación es menor a 0.5 debe almacenar en mensaje "Al menos juega una carta cagón"', () => {
		// Arrange
		partida.puntuacion = 0;
		const mensajeEsperado: MensajePlantarse = "Al menos juega una carta cagón";

		// Act
		generarMensajePlantarse();

		// Assert
		expect(partida.mensaje).toBe(mensajeEsperado);
	});

	it('Si la puntuación es menor a 4 debe almacenar en mensaje "Has sido muy conservador"', () => {
		// Arrange
		partida.puntuacion = 3;
		const mensajeEsperado: MensajePlantarse = "Has sido muy conservador";

		// Act
		generarMensajePlantarse();

		// Assert
		expect(partida.mensaje).toBe(mensajeEsperado);
	});

	it('Si la puntuación es menor a 6 debe almacenar en mensaje "Te ha entrado el canguelo eh?"', () => {
		// Arrange
		partida.puntuacion = 5;
		const mensajeEsperado: MensajePlantarse = "Te ha entrado el canguelo eh?";

		// Act
		generarMensajePlantarse();

		// Assert
		expect(partida.mensaje).toBe(mensajeEsperado);
	});

	it('Si la puntuación es menor o igual a 7 debe almacenar en mensaje "Casi casi..."', () => {
		// Arrange
		partida.puntuacion = 7;
		const mensajeEsperado: MensajePlantarse = "Casi casi...";

		// Act
		generarMensajePlantarse();

		// Assert
		expect(partida.mensaje).toBe(mensajeEsperado);
	});

	it("Si la puntuación no cumple ninguna de las otras condiciones debe almacenar en mensaje vacío", () => {
		// Arrange
		partida.puntuacion = 8;
		const mensajeEsperado: MensajePlantarse = "";

		// Act
		generarMensajePlantarse();

		// Assert
		expect(partida.mensaje).toBe(mensajeEsperado);
	});
});

describe("comprobarEstadoPartida", () => {
	it('Si la puntuación es 7.5 debe almacenar en estado "gana"', () => {
		// Arrange
		partida.puntuacion = 7.5;
		const estadoEsperado: EstadoPartida = "gana";

		// Act
		comprobarEstadoPartida();

		// Assert
		expect(partida.estado).toBe(estadoEsperado);
	});

	it('Si la puntuación es mayor a 7.5 debe almacenar en estado "pierde"', () => {
		// Arrange
		partida.puntuacion = 8.5;
		const estadoEsperado: EstadoPartida = "pierde";

		// Act
		comprobarEstadoPartida();

		// Assert
		expect(partida.estado).toBe(estadoEsperado);
	});

	it('Si la puntuación es menor a 7.5 debe almacenar en estado "enProgreso"', () => {
		// Arrange
		partida.puntuacion = 6.5;
		const estadoEsperado: EstadoPartida = "enProgreso";

		// Act
		comprobarEstadoPartida();

		// Assert
		expect(partida.estado).toBe(estadoEsperado);
	});
});
