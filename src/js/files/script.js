// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { mhzModules } from "./modules.js";


document.addEventListener('DOMContentLoaded', function() {
  const searchHeader = document.querySelector('.search-header');
  const searchHeaderTrigger = searchHeader ? searchHeader.querySelector('.search-header__trigger') : null;
  if (searchHeader&&searchHeaderTrigger) {
    const searchHeaderSubmit = searchHeader.querySelector('button[type="submit"');
    document.addEventListener('click', (e)=>{
      if (e.target === searchHeaderTrigger||(e.target.closest('.search-header'))) {
        // e.preventDefault();
        if (!searchHeader.classList.contains('_active')) {
          searchHeader.classList.add('_active');
        } else {
          searchHeaderSubmit ? searchHeaderSubmit.click() : null;
        }
      } else {
        searchHeader.classList.remove('_active');
      }
    })
  }

  const copyYear = document.querySelector('.footer__copy span');
  copyYear ? copyYear.innerHTML = new Date().getFullYear() : null;

  const menuCategoriesTriggers =document.querySelectorAll('.menu-categories__title._spoller-active');
  if (menuCategoriesTriggers.length) {
    menuCategoriesTriggers.forEach(menuCategoriesTrigger=>{
      if (window.innerWidth < 992) {
        menuCategoriesTrigger.click();
      }
      window.addEventListener('resize', (e)=>{
        if (window.innerWidth < 992) {
          menuCategoriesTrigger.click();
        }
      })
    })
  }
})

