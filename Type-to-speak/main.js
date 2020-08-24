//Assigning a property of web speech to variable

let synthesis = window.speechSynthesis;

//Calling DOM elements

let textForm = document.querySelector("form");
let textInput = document.getElementById("text-input");
let voiceSelect = document.getElementById("voice-select");
let msg = document.getElementById("message");
let pitch = document.getElementById("pitch");
let pitchValue = document.getElementById("pitch-value");

let voices = [];

// Options of Voices are made in UI

let getVoices = () => {
  voices = synthesis.getVoices();
  voices.forEach((element) => {
    let option = document.createElement("option");
    option.textContent = `${element.name} ( ${element.lang} )`;
    option.setAttribute("data-lang", element.lang);
    option.setAttribute("data-name", element.name);
    voiceSelect.appendChild(option);
  });
};
getVoices();

//Callback required to feed values in array as it works asynchronously

if (synthesis.onvoiceschanged !== undefined) {
  synthesis.onvoiceschanged = getVoices;
}

//The function that converts text to  speech

let speak = () => {
  //Checking if it is still speaking

  if (synthesis.speaking) {
    msg.innerHTML = `<b>Still Speaking</b>`;
    setTimeout(() => {
      msg.innerHTML = "";
    }, 1000);
    return;
  }
  if (textInput.value == "") {
    msg.innerHTML = `<b>Kindly fill the Text-Area before trying again</b>`;
    setTimeout(() => {
      msg.innerHTML = "";
    }, 2500);
  }
  if (textInput.value !== "") {
    let speechText = new SpeechSynthesisUtterance(textInput.value); // Creates a new speech Request
    //option (name) that is selected (used for changing the voice)

    let selected = voiceSelect.selectedOptions[0].getAttribute("data-name");
    voices.forEach((element) => {
      if (element.name === selected) {
        speechText.voice = element; //assigning element to the voice property
      }
    });
    speechText.onend = (e) => {
      msg.innerHTML = `<b>Done Speaking</b>`;
      synthesis.speaking=false;
      setTimeout(() => {
        msg.innerHTML = "";
      }, 1000);
    };
    speechText.onerror = (e) => {
      console.log("Something Is Worng");
    };
    speechText.pitch = pitch.value; //setting the pitch
    speechText.rate = 1; //setting the rate (speed)
    speechText.volume = 50;
    console.log(speechText);
    synthesis.speak(speechText);
    console.log(synthesis)
  }
};

//Adding Event listeners

textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  textInput.blur();
});
voiceSelect.addEventListener("change", () => {
  speak();
});

pitch.addEventListener("change", () => (pitchValue.textContent = pitch.value));

document.getElementById('back').addEventListener('click',(e)=>{
  e.preventDefault();
  window.history.back();
})