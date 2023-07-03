const add_UserEl = document.getElementById("add_user");
const doubleEl = document.getElementById("double");
const show_El = document.getElementById("show_millionaries");
const sort_El = document.getElementById("sort");

// Calculate
const calculate_El = document.getElementById("calculate_wealth");
const main_El = document.getElementById("main");

let data = [];
let isfalse = true;
// Fetch random User and add Money

async function getRandomUser() {
  const res = await fetch(`https://randomuser.me/api`);
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Add new obj to data arr

function addData(obj) {
  data.push(obj);

  updateDOM();
}

// DOuble Money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

function SortedData() {
  isfalse = !isfalse;
  console.log(isfalse);

  isfalse
    ? data.sort((a, b) => b.money - a.money)
    : data.sort((a, b) => a.money - b.money);

  updateDOM();
}

// update DOM

function updateDOM(providedData = data) {
  // Clear Main div
  main_El.innerHTML = `   <h2><strong>Person</strong>Wealth </h2>`;
  providedData.forEach(item => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = /*html*/ `
<strong>${item.name}</strong>${formatMoney(item.money)} 


`;
    main_El.appendChild(element);
  });
}

// Fomat number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function show() {
  data = data.filter(user => user.money > 100000);

  updateDOM();
}

function calculate() {
  let wealth = data.reduce((acc, cur) => {
    return (acc += cur.money);
  }, 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total wealth:${formatMoney(wealth)}</h3>`;

  main.appendChild(wealthEl);
}

// Event Listeners

calculate_El.addEventListener("click", calculate);

add_UserEl.addEventListener("click", getRandomUser);
doubleEl.addEventListener("click", doubleMoney);
sort_El.addEventListener("click", SortedData);
show_El.addEventListener("click", show);
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();
