// const url = "http://localhost:3000/weather?address=Boston";
const url = "http://localhost:3000/weather?address=";

// fetch(url + "Boston").then((response) => {
fetch("/" + "Boston").then((response) => {
  response
    .json()
    .then((data) => {
      if (data.error) {
        console.log(data.error);
        return;
      }
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  //   console.log(location);
  //   console.log(url + location);

  messageOne.textContent = "Loading...";

  // fetch(url + location).then((response) => {
  fetch("/" + location).then((response) => {
    response
      .json()
      .then((data) => {
        if (data.error) {
          //   console.log(data.error);
          messageOne.textContent = data.error;
          return;
        }
        // console.log(data);
        messageOne.textContent = data.Place;
        messageTwo.textContent = data.Forecast;
      })
      .catch((error) => {
        // console.log(error);
        messageOne.textContent = JSON.stringify(error);
      });
  });
});
