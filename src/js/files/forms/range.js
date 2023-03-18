// Подключение из node_modules
import * as noUiSlider from 'nouislider';

// Подключение стилей из scss/base/forms/range.scss 
// в файле scss/forms/forms.scss

// Подключение cтилей из node_modules
import 'nouislider/dist/nouislider.css';

export function rangeInit() {
	const priceSlider = document.querySelector('#range');
	if (priceSlider) {
		let textFrom = priceSlider.getAttribute('data-from');
		let textTo = priceSlider.getAttribute('data-to');
		noUiSlider.create(priceSlider, {
			start: 0, // [0,200000]
			connect: [true, false],
			range: {
				'min': [0],
				'max': [200000]
			}
		});
		/*
		const priceStart = document.getElementById('price-start');
		const priceEnd = document.getElementById('price-end');
		priceStart.addEventListener('change', setPriceValues);
		priceEnd.addEventListener('change', setPriceValues);
		*/
		function setPriceValues() {
			let priceStartValue;
			let priceEndValue;
			if (priceStart.value != '') {
				priceStartValue = priceStart.value;
			}
			if (priceEnd.value != '') {
				priceEndValue = priceEnd.value;
			}
			priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
		}
	}

  const rangeParents =document.querySelectorAll('[data-range-parent]');
  if (rangeParents.length) {
    rangeParents.forEach(rangeParent=>{
      const range = rangeParent.querySelector('[data-range]');
      if (range) {
        const min = range.hasAttribute('min') ? parseFloat(range.getAttribute('min')) : 0;
        const max = range.hasAttribute('max') ? parseFloat(range.getAttribute('max')) : 99999999;
        const step = range.hasAttribute('data-step') ? parseFloat(range.getAttribute('data-step')) : null;
        
        let rangeSlider = noUiSlider.create(range, {
          start: 0, // [0,200000]
          connect: [true, false],
          tooltips: [true],
          step,
          range: {
            'min': [min],
            'max': [max]
          }
        });
      }
    })
  }
}
rangeInit();
