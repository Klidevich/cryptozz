/* Маски для полей (в работе) */

// Подключение функционала "Чертогов Фрилансера"
// Подключение списка активных модулей
import { mhzModules } from "../modules.js";

// Подключение модуля
import "inputmask/dist/inputmask.min.js";

export function inputmaslFirstInit() {
	const inputMasks = document.querySelectorAll('[data-inputmask]');
	if (inputMasks.length) {
		mhzModules.inputmask = Inputmask().mask(inputMasks);
	}
}
inputmaslFirstInit();
