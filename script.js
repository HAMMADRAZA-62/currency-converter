const BASE_URL = "https://open.er-api.com/v6/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const amountInput = document.querySelector(".amount input");

const countrylist = {
  USD: "US",
  PKR: "PK",
  INR: "IN",
  EUR: "EU",
  GBP: "GB",
  JPY: "JP",
  CNY: "CN",
  AUD: "AU",
  CAD: "CA",
};


for (let select of dropdowns) {
  select.innerHTML = "";

  for (let currCode in countrylist) {
    let option = document.createElement("option");
    option.value = currCode;
    option.innerText = currCode;

    if (select.name === "from" && currCode === "USD") {
      option.selected = true;
    }

    if (select.name === "to" && currCode === "PKR") {
      option.selected = true;
    }

    select.appendChild(option);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}


const updateFlag = (element) => {
  const currCode = element.value;
  const countryCode = countrylist[currCode];

  element.parentElement.querySelector("img").src =
    `https://flagsapi.com/${countryCode}/flat/64.png`;
};

// Exchange Rate Logic
const updateExchangeRate = async () => {
  let amtVal = amountInput.value;

  if (amtVal === "" || amtVal <= 0) {
    amtVal = 1;
    amountInput.value = 1;
  }

  try {
    const URL = `${BASE_URL}/${fromCurr.value}`;

    const response = await fetch(URL);
    const data = await response.json();

    if (data.result !== "success") {
      throw new Error("API Error");
    }

    const rate = data.rates[toCurr.value];
    const finalAmount = (amtVal * rate).toFixed(2);

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    msg.innerText = "Error fetching exchange rate!";
    console.log("Fetch Error:", error);
  }
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", updateExchangeRate);


