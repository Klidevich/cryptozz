// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { mhzModules } from "./modules.js";


document.addEventListener('DOMContentLoaded', function() {
  const searchHeader = document.querySelector('.search-header');
  const searchHeaderTrigger = searchHeader ? searchHeader.querySelector('.search-header__trigger') : null;

  const copyYear = document.querySelector('.footer__copy span');
  copyYear ? copyYear.innerHTML = new Date().getFullYear() : null;

  const menuCategoriesTriggers =document.querySelectorAll('.menu-categories__title._spoller-active');
  if (menuCategoriesTriggers.length) {
    menuCategoriesTriggers.forEach(menuCategoriesTrigger=>{
      if (window.innerWidth < 992) {
        menuCategoriesTrigger.classList.contains('_spoller-active') ? menuCategoriesTrigger.click() : null;
      } else {
        !menuCategoriesTrigger.classList.contains('_spoller-active') ? menuCategoriesTrigger.click() : null;
      }
      window.addEventListener('resize', (e)=>{
        if (window.innerWidth < 992) {
          menuCategoriesTrigger.classList.contains('_spoller-active') ? menuCategoriesTrigger.click() : null;
        } else {
          !menuCategoriesTrigger.classList.contains('_spoller-active') ? menuCategoriesTrigger.click() : null;
        }
      })
    })
  }


  const mainCategories = document.querySelector('.main-categories');
  if (mainCategories) {
    setMainCategoriesViewType(mainCategories);
    window.addEventListener('resize', ()=>{
      setMainCategoriesViewType(mainCategories);
    })
  }

  const mainCategoriesFilters = document.querySelector('.main-categories__filters');
  const filtersParent = document.querySelector('.filters-categories');
  if (mainCategoriesFilters&&filtersParent) {
    renderFiltersItems(mainCategoriesFilters, filtersParent);
  }
  document.addEventListener('click', (e)=>{
    if (searchHeader&&searchHeaderTrigger) {
      const searchHeaderSubmit = searchHeader.querySelector('button[type="submit"');
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
    }
    if (mainCategoriesFilters&&filtersParent) {
      renderFiltersItems(mainCategoriesFilters, filtersParent);
      setUnfilteredItems(e, mainCategoriesFilters, filtersParent);
    }
  })

  const tabsAdditionalKeys =document.querySelectorAll('.additional-tabs__key');
  if (tabsAdditionalKeys.length) {
    if (window.innerWidth <= 767&&window.innerWidth > 480) {
      setTabsAdditionalKeysWidth(tabsAdditionalKeys);
    }
    window.addEventListener('resize', (e)=>{
      if (window.innerWidth <= 767&&window.innerWidth > 480) {
        setTabsAdditionalKeysWidth(tabsAdditionalKeys);
      }
    })
  }
})


function setMainCategoriesViewType(mainCategories) {
  const mainCategoriesViewButtons =mainCategories.querySelectorAll('[data-view]');
  const mainCategoriesBody = mainCategories.querySelector('.main-categories__body');
  if (window.innerWidth < 767||(window.innerWidth < 1312 && window.innerWidth > 992)) {
    mainCategoriesBody.className = `main-categories__body _lines`;
  } else {
    if (mainCategoriesBody) {
      const viewType = localStorage.getItem('viewType');
      if (viewType) {
        mainCategoriesBody.className = `main-categories__body _${viewType}`;
      }
      if (mainCategoriesBody) {
        mainCategoriesViewButtons.forEach(mainCategoriesViewButton=>{
          let viewType = mainCategoriesViewButton.getAttribute('data-view');
          mainCategoriesViewButton.addEventListener('click', (e)=>{
            mainCategoriesViewButtons.forEach(e=>{e.classList.remove('_active')});
            mainCategoriesViewButton.classList.add('_active');
            e.preventDefault();
            mainCategoriesBody.className = `main-categories__body _${viewType}`;
            localStorage.setItem('viewType', viewType);
          })
        })
      }
    }
  }
}

function setUnfilteredItems(e, mainCategoriesFilters, filtersParent) {
  if (e.target.closest('.main-categories__filtereditem ._del')&&!e.target.closest('.main-categories__filtereditem_slider ._del')) {
    const filterName = e.target.closest('.main-categories__filtereditem').textContent.trim();
    const boxesItems =document.querySelectorAll('.boxes-filters__item .boxes-filters__input:checked');
    if (boxesItems.length) {
      boxesItems.forEach(boxesItem=>{
        let name = boxesItem.closest('.boxes-filters__item').textContent.trim();
        if (name === filterName) {
          boxesItem.checked = false;
        }
      })
    }
  }
  if (e.target.closest('.main-categories__filtereditem_slider ._del')) {
    const filterName = e.target.closest('.main-categories__filtereditem_slider').querySelector('._name').textContent.trim();
    const filterNames = document.querySelectorAll('.filters-categories__title');
    if (filterNames.length) {
      filterNames.forEach(filterNameEl=>{
        if (filterNameEl.textContent.trim() === filterName) {
          let range = filterNameEl.parentElement.querySelector('[data-range]');
          if (range.noUiSlider) {
            let min = range.noUiSlider.options.range.min[0];
            range.noUiSlider.set(min);
          }
        }
      })
    }
  }

  
  renderFiltersItems(mainCategoriesFilters, filtersParent);
}

function renderFiltersItems(mainCategoriesFilters, filtersParent) {
  const checkedFilters = document.querySelectorAll('.filters-categories input:checked');

  let str = ``;
  checkedFilters.forEach(checkedFilter=>{
    const name = checkedFilter.parentElement.textContent.trim();
    str+=`
    <div class="main-categories__filtereditem">
      <span class="_del">
        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="13.8694" cy="13.8694" r="12.8694" fill="white"/>
          <path d="M9.29028 19.0127L18.9945 9.27151" stroke="#56BB3E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9.27246 9.28992L19.0136 18.9941" stroke="#56BB3E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <span>${name}</span>
    </div>`;
  });

  const rangeSliders = filtersParent.querySelectorAll('[data-range]');
  if (rangeSliders.length) {
    rangeSliders.forEach(rangeSlider=>{
      let min = rangeSlider.getAttribute('min');
      if (rangeSlider.noUiSlider) {
        let mozhno = min&&rangeSlider.noUiSlider.get()==parseFloat(min) ? false : true;
        const parent = rangeSlider.closest('.filters-categories__item');
        const name = parent ? parent.querySelector('.filters-categories__title').textContent.trim() : null;
        let value = rangeSlider.noUiSlider.get();
        if (mozhno&&name) {
          str+=`
          <div class="main-categories__filtereditem main-categories__filtereditem_slider">
            <span class="_del">
              <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="13.8694" cy="13.8694" r="12.8694" fill="white"/>
                <path d="M9.29028 19.0127L18.9945 9.27151" stroke="#56BB3E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.27246 9.28992L19.0136 18.9941" stroke="#56BB3E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span><span class="_name">${name}</span>: ${value}</span>
          </div>`
        }
      }
    })
  }
  
  mainCategoriesFilters.innerHTML = str;
}

function setTabsAdditionalKeysWidth(tabsAdditionalKeys) {
  let arr = [];
  tabsAdditionalKeys.forEach(tabsAdditionalKey=>{
    tabsAdditionalKey.style.minWidth = `0`;
  });
  tabsAdditionalKeys.forEach(tabsAdditionalKey=>{
    arr.push(tabsAdditionalKey.getBoundingClientRect().width);
  });
  tabsAdditionalKeys.forEach(tabsAdditionalKey=>{
    tabsAdditionalKey.style.minWidth = `${Math.max(...arr) + 30}px`;
  });
}