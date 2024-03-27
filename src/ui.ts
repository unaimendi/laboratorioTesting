import { partida } from "./modelo";
import { resetPartida, sacarCarta, calculaPuntuacion, comprobarEstadoPartida, generarMensajePlantarse } from "./motor";

export const iniciarPartida = (): void => {
	const btnPedirCarta = document.getElementById("btnPedirCarta");
	const btnPlantarse = document.getElementById("btnPlantarse");
	const btnVerFuturo = document.getElementById("btnVerFuturo");
	const btnReiniciar = document.getElementById("btnReiniciar");
	const feedback = document.getElementById("feedback");
	const imgCarta = document.getElementById("imgCarta");
	const contadorPantalla = document.getElementById("contadorPantalla");

	const muestraPuntuacion = (): void => {
		if (contadorPantalla && contadorPantalla instanceof HTMLElement) contadorPantalla.innerText = partida.puntuacion.toString();
	};

	const muestraCarta = (): void => {
		if (imgCarta && imgCarta instanceof HTMLImageElement) imgCarta.src = partida.carta?.imagenUrl;
	};

	const pedirCarta = (): void => {
		sacarCarta();
		muestraCarta();

		calculaPuntuacion();
		muestraPuntuacion();

		comprobarEstadoPartida();
		muestrarFeedback();
	};

	const clickPlantarse = (): void => {
		comprobarEstadoPartida();
		generarMensajePlantarse();

		if (feedback && feedback instanceof HTMLElement) {
			feedback.innerText = partida.mensaje;
		}

		if (btnPedirCarta && btnPedirCarta instanceof HTMLButtonElement && btnPlantarse && btnPlantarse instanceof HTMLButtonElement && btnReiniciar && btnReiniciar instanceof HTMLButtonElement && btnVerFuturo && btnVerFuturo instanceof HTMLButtonElement) {
			btnPedirCarta.style.display = "none";
			btnPlantarse.style.display = "none";
			btnReiniciar.style.display = "inline-block";
			btnVerFuturo.style.display = "inline-block";
			btnVerFuturo.disabled = false;
		}
	};

	const verFuturo = (): void => {
		pedirCarta();

		if (btnVerFuturo && btnVerFuturo instanceof HTMLButtonElement) {
			btnVerFuturo.disabled = true;
		}

		if (feedback && feedback instanceof HTMLElement) {
			switch (partida.estado) {
				case "gana":
					feedback.innerText = "¡La hubieras clavado!";
					break;
				case "pierde":
					feedback.innerText = "Hubieras perdido";
					break;
				default:
					feedback.innerText = "Hubieras mejorado";
					break;
			}
		}

		if (btnPedirCarta && btnPedirCarta instanceof HTMLButtonElement && btnPlantarse && btnPlantarse instanceof HTMLButtonElement && btnReiniciar && btnReiniciar instanceof HTMLButtonElement && btnVerFuturo && btnVerFuturo instanceof HTMLButtonElement) {
			btnPedirCarta.style.display = "none";
			btnPlantarse.style.display = "none";
			btnReiniciar.style.display = "inline-block";
			btnVerFuturo.style.display = "inline-block";
		}
	};

	const habilitaPlantarse = (): void => {
		if (btnPlantarse && btnPlantarse instanceof HTMLButtonElement) btnPlantarse.disabled = false;
	};
	const deshabilitaPlantarse = (): void => {
		if (btnPlantarse && btnPlantarse instanceof HTMLButtonElement) btnPlantarse.disabled = true;
	};
	const cambiarBotones = (): void => {
		if (btnPedirCarta && btnPedirCarta instanceof HTMLButtonElement && btnPlantarse && btnPlantarse instanceof HTMLButtonElement && btnReiniciar && btnReiniciar instanceof HTMLButtonElement && btnVerFuturo && btnVerFuturo instanceof HTMLButtonElement) {
			switch (true) {
				case partida.estado === "gana" || partida.estado === "pierde":
					btnPedirCarta.style.display = "none";
					btnPlantarse.style.display = "none";
					btnReiniciar.style.display = "inline-block";
					btnVerFuturo.style.display = "none";
					break;
				case partida.estado === "enProgreso" || partida.estado === "noIniciada":
					btnPedirCarta.style.display = "inline-block";
					btnPlantarse.style.display = "inline-block";
					btnReiniciar.style.display = "none";
					btnVerFuturo.style.display = "none";
					break;
				default:
					break;
			}
		}
	};

	const muestrarFeedback = (): void => {
		if (feedback && feedback instanceof HTMLElement) {
			switch (partida.estado) {
				case "gana":
					feedback.innerText = "¡Lo has clavado! ¡Enhorabuena!";
					break;
				case "pierde":
					feedback.innerText = "Game Over";
					break;
				case "noIniciada":
					feedback.innerText = "¡Empecemos a jugar!";
					break;
				case "enProgreso":
					feedback.innerText = "¡Vas bien!";
					break;
				default:
					feedback.innerText = partida.mensaje;
					break;
			}
		}
	};

	const reiniciaPartida = (): void => {
		resetPartida();
		muestraPuntuacion();
		muestraCarta();
		muestrarFeedback();
		cambiarBotones();
		deshabilitaPlantarse();
	};

	muestraCarta();
	muestraPuntuacion();
	muestrarFeedback();

	btnPedirCarta?.addEventListener("click", () => {
		pedirCarta();
		cambiarBotones();
		habilitaPlantarse();
	});
	btnPlantarse?.addEventListener("click", clickPlantarse);
	btnVerFuturo?.addEventListener("click", verFuturo);
	btnReiniciar?.addEventListener("click", reiniciaPartida);
};
