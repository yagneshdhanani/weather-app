const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const msgOne = document.querySelector("#msg-one");
const msgTwo = document.querySelector("#msg-two");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = search.value;
    msgOne.textContent = "Loading...";
    msgTwo.textContent = "";

    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then(data => {
        if(data.err){
            msgOne.textContent = data.err;
        } else {
            msgOne.textContent = data.location;
            msgTwo.textContent = data.forecast;
        }
    });
 })
})