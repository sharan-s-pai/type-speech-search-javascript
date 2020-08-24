var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
let msg = document.getElementById("message");
let timeId;

const recognition = new SpeechRecognition();
recognition.lang = "en-IN";
recognition.interimResults = false;
recognition.maxAlternatives = 5;
recognition.onstart = () => {
  document.getElementById("message").innerHTML =
    "<b>The Computer Is Listening</b>";
};
recognition.onend = () => {
  document.getElementById(
    "message"
  ).innerHTML = `<b>Speech recognition service disconnected</b>`;
  timeId = setTimeout(() => {
    msg.innerText = "";
  }, 2000);
};

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  //document.getElementById("output").textContent = "";
  document.getElementById("output").innerHTML = `${transcript}`;
  window.location.href=`https://${transcript}.com`
};

document.getElementById("start").addEventListener("click", () => {
  //recognition.continuous = true;
  recognition.start();
});
document.getElementById("stop").addEventListener("click", () => {
  recognition.continuous = false;
  recognition.stop();
  document.getElementById(
    "message"
  ).innerHTML = `<b>Speech recognition service disconnected</b>`;
  timeId = setTimeout(() => {
    msg.innerText = "";
  }, 2000);
});

document.getElementById('back').addEventListener('click',(e)=>{
  e.preventDefault();
  window.history.back();
})