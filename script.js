"use strict";

// DOM Elements
const jokeText = document.querySelector(".joke-text");
const audioPlayer = document.querySelector(".audio-player");
const btnPlay = document.querySelector(".play-btn");
const btnNewJoke = document.querySelector(".new-btn");

// global variables
let joke = "";

// fetch data from jokes api
const getJoke = async function () {
  const url = `https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit
  `;
  const data = await fetch(url);
  const jokeData = await data.json();

  joke = jokeData.setup
    ? `${jokeData.setup} ... ${jokeData.delivery}`
    : `${jokeData.joke}`;
  renderJoke();
  getJokeAudio();
};
getJoke();

//get joke audio
function getJokeAudio() {
  VoiceRSS.speech({
    key: "016d0a8379604b5cb332e2ca6432b097",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

//enable btn after playing
const enablePlayButton = function () {
  audioPlayer.addEventListener("ended", function () {
    console.log("ended");
    btnPlay.removeAttribute("disabled");
  });
};

// display joke on display
const renderJoke = function () {
  console.log(jokeText.innerHTML);
  jokeText.innerHTML = joke;
};

// event listeners
btnNewJoke.addEventListener("click", getJoke);
btnPlay.addEventListener("click", () => {
  audioPlayer.play();

  //disable button while playing
  btnPlay.setAttribute("disabled", "");
  enablePlayButton();
});
