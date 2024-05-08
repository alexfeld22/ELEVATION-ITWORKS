import './style.css';
import { getSupportedCurrencies, getRates, getExchangeResult } from './http/client';

const ELEMENT_SELECTORS = { ROOT: '#app', NAVBAR: '[data-navbar]' };

document.addEventListener('DOMContentLoaded', init);

export function getElement(selector) {
  return document.querySelector(selector);
}

export function init() {
  renderNavbarElement();
  renderExchangePage();
}

export function renderExchangePage(currArr) {
  const selectEl = createSelectEl(currArr);
  const rootEl = getElement(ELEMENT_SELECTORS.ROOT)
  
  rootEl.innerHTML = /*html*/ `
    <h1>Exchange page</h1>
  `
  rootEl.appendChild(selectEl);
  ;
}

export function renderExchangeCalculator() {
  const selectEl = document.createElement('select')
  getElement(ELEMENT_SELECTORS.ROOT).innerHTML = /*html*/ `
    <h1>Exchange calculator</h1>
  `;
}

export function renderNavbarElement() {
  const navbarElement = getElement(ELEMENT_SELECTORS.NAVBAR);
  navbarElement.innerHTML = /*html*/ `
    <nav>
      <button data-exchange-btn>Exchange</button>
      <button data-exchange-calculator-btn>Exchange calculator</button>
    </nav>
  `;

  navbarElement.querySelector('[data-exchange-btn]').addEventListener('click', async () => {
    try {
      const currencies = await getSupportedCurrencies();
      renderExchangePage(currencies.supported_codes);
    } catch (err) {
        console.error("We have an error: ", err)
    }

  });

  navbarElement.querySelector('[data-exchange-calculator-btn]').addEventListener('click', () => {
    renderExchangeCalculator();
  });
}


function createSelectEl(arr){
  const selectEl = document.createElement('select');
  selectEl.setAttribute("name","currencies");
  selectEl.id = 'curr';
  console.log(arr);
  arr.forEach(item => {
    const option = document.createElement('option');
    option.setAttribute('value',item[0]); 
    option.textContent = item[0];
    selectEl.appendChild(option);
  });
  selectEl.addEventListener('change', (e) => {
    updateRates(e.target.value);
  });
  return selectEl;
}

async function updateRates(baseCurrency){
  const rates = await getRates(baseCurrency);
  // console.log(rates);
  updateRatesTable(rates.converson_rates);
}

function updateRatesTable(ratesArr){
  // const tableRatesEl
}