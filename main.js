let x = 0;
let y = 0;
let drawApple = "";
let apple = null;
let speakData = "";
let toNumber = 0;

var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function preload() {
  // Carrega a imagem da maçã
  apple = loadImage("apple.png", 
    () => console.log("Imagem carregada com sucesso."), // Callback de sucesso
    () => console.log("Erro ao carregar a imagem. Verifique o caminho.") // Callback de erro
  );
}

function start() {
  document.getElementById("status").innerHTML = "O sistema está ouvindo. Por favor, fale.";  
  recognition.start();
}

recognition.onresult = function(event) {
  let content = event.results[0][0].transcript;
  document.getElementById("status").innerHTML = "A fala foi reconhecida: " + content;
  
  toNumber = Number(content);

  if (Number.isInteger(toNumber) && toNumber > 0) {
    document.getElementById("status").innerHTML = "A maçã começou a ser desenhada.";
    drawApple = "set";
  } else {
    document.getElementById("status").innerHTML = "O número não foi reconhecido.";
  }
}

function setup() {
  let canvas = createCanvas(500, 500);
  canvas.parent("canvas-container");
}

function draw() {
  if (drawApple == "set" && apple !== null) {
    clear(); // Limpa o canvas antes de desenhar
    for (let i = 1; i <= toNumber; i++) {
      x = Math.floor(Math.random() * width);
      y = Math.floor(Math.random() * height);
      image(apple, x, y, 50, 50); // Desenha a maçã em posição aleatória
    }
    document.getElementById("status").innerHTML = toNumber + " maçãs desenhadas.";
    speakData = toNumber + " maçãs desenhadas.";
    speak();
    drawApple = ""; // Reseta para evitar redesenho contínuo
  }
}

function speak() {
  let synth = window.speechSynthesis;
  let utterThis = new SpeechSynthesisUtterance(speakData);
  synth.speak(utterThis);
  speakData = "";
}
