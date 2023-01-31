console.log("Client-side js is loaded");

const weatherForm = document.querySelector("form");
const search = document.getElementById("address");

const msg1 = document.getElementById("msg1");
const msg2 = document.getElementById("msg2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const address = search.value;

  msg1.textContent = "Loading....";

  fetch("http://localhost:3000/weather?address=" + address).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msg2.textContent = "";

        msg1.textContent = data.error;
        console.log(data.error);
      } else {
        msg1.textContent = "";

        msg2.textContent =
          "Location is " + data.address + " and " + data.forecast;

        console.log(data.address);
        console.log(data.forecast);
      }
    });
  });
});
