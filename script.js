// Typing effect
let i = 0;
let txt = "Feliz Aniversário, Amor ❤️";
let speed = 90;
function typeWriter() {
  if (i < txt.length) {
    document.getElementById("typing").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
window.onload = typeWriter;

// Hearts on intro
const heartsContainer = document.getElementById('heartsContainer');
setInterval(() => {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = '💖';
  heart.style.left = Math.random()*100 + 'vw';
  heart.style.animationDuration = 3 + Math.random()*2 + 's';
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}, 400);

// Start site
function startSite() {
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("main-content").classList.remove("hidden");
  // auto play bgm politely
  const bgm = document.getElementById('bgm');
  if (bgm) bgm.play().catch(()=>{});
}

// Counter
let startDate = new Date("2025-05-16");
let today = new Date();
let diffTime = Math.abs(today - startDate);
let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("daysTogether").innerText = diffDays;
});

// Gallery
let slideIndex = 1;
let autoTimer;
function showSlides(n) {
  const slides = document.getElementsByClassName("slide");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (let j = 0; j < slides.length; j++) slides[j].style.display = "none";
  slides[slideIndex-1].style.display = "block";
}
function plusSlides(n){
  slideIndex += n; showSlides(slideIndex); resetAuto();
}
function autoSlides(){
  slideIndex += 1; showSlides(slideIndex);
}
function resetAuto(){
  clearInterval(autoTimer);
  autoTimer = setInterval(autoSlides, 3000);
}
document.addEventListener('DOMContentLoaded', () => {
  showSlides(slideIndex);
  autoTimer = setInterval(autoSlides, 3000);
  const ss = document.getElementById('slideshow');
  ss.addEventListener('mouseenter', ()=>clearInterval(autoTimer));
  ss.addEventListener('mouseleave', resetAuto);
});

// Letter
function toggleLetter() {
  const el = document.getElementById("letter");
  el.classList.toggle("hidden");
}

// Stars
function spawnStars(){
  const sky = document.getElementById('sky');
  for (let s=0; s<40; s++){
    const star = document.createElement('span');
    star.className = 'star';
    star.style.left = Math.random()*100 + '%';
    star.style.top = Math.random()*100 + '%';
    star.style.animationDelay = (Math.random()*2)+'s';
    star.onclick = () => alert(['Você é meu sonho realizado ❤️','Te amo até as estrelas ✨','Você ilumina minha vida 🌟','Para sempre ao seu lado 💕'][Math.floor(Math.random()*4)]);
    sky.appendChild(star);
  }
}
document.addEventListener('DOMContentLoaded', spawnStars);

// Music toggle
function toggleMusic(){
  const bgm = document.getElementById('bgm');
  if (!bgm) return;
  const btn = document.getElementById('musicToggle');
  if (bgm.paused){ bgm.play(); btn.textContent='🔊 Música'; }
  else { bgm.pause(); btn.textContent='🔈 Música'; }
}

// Share
function sharePage(){
  const text = 'Olha o presente que preparei pra você 💝';
  const url = window.location.href;
  if (navigator.share){
    navigator.share({ title: document.title, text, url });
  } else {
    const wpp = 'https://wa.me/?text=' + encodeURIComponent(text + ' ' + url);
    window.open(wpp, '_blank');
  }
}

// Quiz
const questions = [
  { q: "Qual foi o nosso primeiro filme juntos?", options: ["lilo e stitch","Titanic","Velozes e Furiosos"], correct: 0 },
  { q: "Aonde foi nosso primeiro beijo?", options: ["na sua casa","na praça","em um  restaurant"], correct: 1 },
  { q: "Em que mês começamos a namorar?", options: ["Maio","Junho","Abril"], correct: 0 },
  { q: "Qual música marcou nosso relacionamento?", options: ["A Thousand Years","Perfect","Shape of You"], correct: 0 },
  { q: "Qual é o apelido carinhoso que uso com voce?", options: ["Amor","Princesa","morceguinha"], correct: 0 }
];
let step = 0, score = 0;
function renderQuiz(){
  const box = document.getElementById('quizContainer');
  if (step >= questions.length){
    const result = document.getElementById('quizResult');
    result.textContent = `Você acertou ${score}/${questions.length}!`;
    if (score === questions.length){
      document.getElementById('surpresa').classList.remove('hidden');
    }
    return;
  }
  const {q, options, correct} = questions[step];
  box.innerHTML = `<p class="q">${step+1}. ${q}</p>`;
  const wrap = document.createElement('div');
  wrap.className = 'options';
  options.forEach((text, idx)=>{
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = text;
    btn.onclick = ()=>{
      if (idx === correct){ score++; btn.classList.add('success'); }
      else { btn.style.background = '#ef4444'; }
      // disable all buttons
      Array.from(wrap.children).forEach(b=>b.disabled=true);
      setTimeout(()=>{ step++; renderQuiz(); }, 600);
    };
    wrap.appendChild(btn);
  });
  box.appendChild(wrap);
}
document.addEventListener('DOMContentLoaded', renderQuiz);

// Confetti
function startConfetti(){
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
  resize(); window.addEventListener('resize', resize);
  const pieces = Array.from({length: 180}, ()=> ({
    x: Math.random()*canvas.width,
    y: -20 - Math.random()*canvas.height,
    r: 4 + Math.random()*6,
    vy: 2 + Math.random()*3,
    vx: -2 + Math.random()*4,
    rot: Math.random()*Math.PI
  }));
  let running = true;
  function draw(){
    if (!running) return;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (const p of pieces){
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r);
      ctx.restore();
      p.x += p.vx; p.y += p.vy; p.rot += 0.05;
      if (p.y > canvas.height + 20) { p.y = -20; p.x = Math.random()*canvas.width; }
    }
    requestAnimationFrame(draw);
  }
  draw();
  // auto stop after 6s
  setTimeout(()=>{ running=false; ctx.clearRect(0,0,canvas.width,canvas.height); }, 6000);
}

function finalMessage(){
  alert("Feliz aniversário, meu amor! Obrigado por existir e por compartilhar a vida comigo. 💘");
  startConfetti();
}
