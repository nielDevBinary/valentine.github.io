var canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d");

var ww, wh;

function onResize() {
  ww = canvas.width = window.innerWidth;
  wh = canvas.height = window.innerHeight;
}

ctx.strokeStyle = "red";
ctx.shadowBlur = 25;
ctx.shadowColor = "hsla(0, 100%, 60%, 0.5)";

var precision = 100;
var hearts = [];
var effectActive = false; // Para controlar el efecto

var Heart = function (x, y) {
  this.x = x || Math.random() * ww;
  this.y = y || Math.random() * wh;
  this.size = Math.random() * 2 + 1;
  this.shadowBlur = Math.random() * 10;
  this.speedX = (Math.random() + 0.2 - 0.6) * 8;
  this.speedY = (Math.random() + 0.2 - 0.6) * 8;
  this.speedSize = Math.random() * 0.05 + 0.01;
  this.opacity = 1;
  this.vertices = [];

  for (var i = 0; i < precision; i++) {
    var step = (i / precision - 0.5) * (Math.PI * 2);
    var vector = {
      x: 15 * Math.pow(Math.sin(step), 3),
      y:
        -(
          13 * Math.cos(step) -
          5 * Math.cos(2 * step) -
          2 * Math.cos(3 * step) -
          Math.cos(4 * step)
        ),
    };
    this.vertices.push(vector);
  }
};

Heart.prototype.draw = function () {
  this.size -= this.speedSize;
  this.x += this.speedX;
  this.y += this.speedY;

  ctx.save();
  ctx.translate(-1000, this.y);
  ctx.scale(this.size, this.size);
  ctx.beginPath();

  for (var i = 0; i < precision; i++) {
    var vector = this.vertices[i];
    ctx.lineTo(vector.x, vector.y);
  }

  ctx.globalAlpha = this.size;
  ctx.shadowBlur = Math.round((3 - this.size) * 10);
  ctx.shadowColor = "hsla(0, 100%, 60%, 0.5)";
  ctx.shadowOffsetX = this.x + 1000;
  ctx.globalCompositeOperation = "screen";
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

function render() {
  if (!effectActive) return; // Solo ejecuta si está activo
  requestAnimationFrame(render);
  
  hearts.push(new Heart());
  ctx.clearRect(0, 0, ww, wh);
  
  for (var i = 0; i < hearts.length; i++) {
    hearts[i].draw();
    if (hearts[i].size <= 0) {
      hearts.splice(i, 1);
      i--;
    }
  }
}

const h1 = document.querySelector("h1");
// Evento para activar el efecto cuando se hace clic en el botón
document.getElementById("yesButton").addEventListener("click", function () {
  effectActive = true; // Activa el efecto
  render(); // Comienza la animación
  h1.textContent = "¡Sabia que ibas aceptar Mi Gari!";

    // Crear un nuevo elemento de imagen
  const newImg = document.createElement("img");
  newImg.src = "W2gx-unscreen.gif";
  newImg.classList.add("valentine-gif");
  newImg.style.width = "300px";
  newImg.style.height = "300px";
  
  // Agregar la imagen al contenedor antes del h1
  const container = document.querySelector(".valentine-container");
  container.insertBefore(newImg, h1);

  // Ocultar los botones "Si" y "No"
  yesButton.style.display = "none";
  noButton.style.display = "none";

  // Reproducir la música
  const audio = new Audio("lamar.mp3"); // Asegúrate de que la ruta sea correcta
  audio.play();

});

onResize();
window.addEventListener("resize", onResize);




// button escurridiso


document.getElementById("noButton").addEventListener("mouseover", function() {
  // Obtiene las dimensiones del botón
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;
  
  // Calcula el área máxima en la que se puede mover el botón
  const maxX = window.innerWidth - buttonWidth;
  const maxY = window.innerHeight - buttonHeight;
  
  // Genera posiciones aleatorias dentro de esos límites
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);
  
  // Usa position fixed para que sea relativo a la ventana
  noButton.style.position = "fixed";
  noButton.style.left = randomX + "px";
  noButton.style.top = randomY + "px";
});