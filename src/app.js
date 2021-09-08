"use strict";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAi-R4nmIMbKd6rxPARWfHb1o16rSt5n8s",
  authDomain: "yehor-kyslynskyi-cv.firebaseapp.com",
  projectId: "yehor-kyslynskyi-cv",
  storageBucket: "yehor-kyslynskyi-cv.appspot.com",
  messagingSenderId: "126626775472",
  appId: "1:126626775472:web:16662e7746676734ed1675",
  measurementId: "G-D2C98VNRCX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import "./styles.css";
import "./index.html";
import { Message } from "./message";
const form = document.getElementById("form");
const inputName = form.querySelector("#name");
const inputEmail = form.querySelector("#email");
const inputMessage = form.querySelector("#message");
const sendBtn = form.querySelector("#send");

//Remove preload class, that blocked transision of buttons
window.addEventListener("load", function (event) {
  document.body.classList.remove("preload");
});

// Fixed header during scrolling
const header = document.getElementById("myheader");
let sticky = header.offsetTop;
window.onscroll = fixedHeader;

function fixedHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// Navigating anchors
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const blockID = anchor.getAttribute("href").substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

// Form listener

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    if (error === 0) {
      alertErrorRemove();
      form.classList.add("_sending");
      const message = {
        name: inputName.value.trim(),
        email: inputEmail.value.trim(),
        text: inputMessage.value.trim(),
        date: new Date().toJSON(),
      };
      Message.create(message)
        .then(() => {
          form.classList.remove("_sending");
        })
        .then(() => {
          form.reset();
        })
        .then(() => {
          alertDoneAdd();
        })
        .catch(function (error) {
          console.log(`error: ${error}`);
        });
    } else {
      alertErrorAdd();
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll("._req");

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains("_email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.classList.add("_error");
  }

  function formRemoveError(input) {
    input.classList.remove("_error");
  }

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

  function alertErrorAdd() {
    let errorAlert = document.getElementById("error-alert");
    errorAlert.innerHTML = "<h1>Fields filled in incorrectly!</h1>";
    errorAlert.classList.add("red-text");
  }

  function alertErrorRemove() {
    let errorAlert = document.getElementById("error-alert");
    errorAlert.innerHTML = "";
    errorAlert.classList.remove("red-text");
  }

  function alertDoneAdd() {
    let errorAlert = document.getElementById("error-alert");
    errorAlert.innerHTML = "<h1>Message sent!</h1>";
    errorAlert.classList.add("green-text");
    setTimeout(() => {
      errorAlert.innerHTML = "";
      errorAlert.classList.remove("green-text");
    }, 3000);
  }
});
