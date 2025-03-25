const BASE_URL = "https://api.exchangerate-api.com/v4/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
     select.append(newOption);
    }

    
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const fromCurrency = fromCurr.value;
    const toCurrency = toCurr.value;
    const URL = `${BASE_URL}/${fromCurrency}`;

    try {
        const response = await fetch(URL);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        if (rate) {
            const exchangedAmount = (amtVal * rate).toFixed(2);
            document.querySelector(".msg").innerText = `${amtVal} ${fromCurrency} = ${exchangedAmount} ${toCurrency}`;
        } else {
            console.error("Rate not found for the selected currency.");
        }
    } catch (error) {
        console.error("Error fetching exchange rate data:", error);
    }
});