const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const fromCurr = document.querySelector(".select-from");
const toCurr = document.querySelector(".select-to");

const select_container = document.querySelectorAll(".box");
for (const select of select_container) {
    for (const code in countryList) {
        let option = document.createElement("option");
        option.innerText = code;
        option.value = code;
        if (select.name === "Currency-from" && code === "USD") {
            option.selected = "selected";
        }
        if (select.name === "Currency-to" && code === "INR") {
            option.selected = "selected";
        }
        select.append(option);
    }
    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    })
}


let updateFlag = (elem) => {
    let currCode = elem.value;
    let countyCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countyCode}/flat/64.png`;
    let img = elem.parentElement.querySelector("img")
    img.src = newSrc;
}


let btn = document.querySelector("button");
btn.addEventListener("click", async (e) => {
    e.preventDefault();
    let amount = document.querySelector("input");
    let amtValue = amount.value;
    const URL = `${baseUrl}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalValue = rate * amtValue;
    let result = document.querySelector(".msg");
    amtValue<"0" || amtValue===""? result.innerText="Invalid Amount" : result.innerText=finalValue.toFixed(2)
})

