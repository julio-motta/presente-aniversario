let i = 0;
let txt = "Feliz Aniversário, Amor ❤️";
let speed = 100;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("typing").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
window.onload = typeWriter;

function startSite() {
    document.getElementById("intro").classList.add("hidden");
    document.getElementById("main-content").classList.remove("hidden");
}

// Contador de dias juntos
let startDate = new Date("2025-05-16");
let today = new Date();
let diffTime = Math.abs(today - startDate);
let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
document.getElementById("daysTogether").innerText = diffDays;

// Galeria slideshow
let slideIndex = 0;
showSlides();
function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let j = 0; j < slides.length; j++) {
        slides[j].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 3000);
}

// Carta
function openLetter() {
    document.getElementById("letter").classList.remove("hidden");
}

// Quiz
function quizAnswer(correct) {
    let result = document.getElementById("quizResult");
    if (correct) {
        result.innerText = "Isso mesmo! Você lembra de tudo ❤️";
    } else {
        result.innerText = "Hmm... quase! Mas ainda te amo 💕";
    }
}
