const dots = document.querySelectorAll(".dot");
const dotsWrapper = document.querySelector(".timeline-dots-wrapper");
const yearDisplay = document.querySelector(".timeline-year-display");
const slides = document.querySelectorAll(".history-slide");
const topText = document.getElementById("toptext-content");

let currentIndex = 0;

const topTexts = [
  "Esta foi a nossa 1.ª edição, onde crescemos ainda mais. Vê o vídeo desta edição da JAM",
  "A segunda edição expandiu a comunidade e trouxe novos desafios",
  "Um ano de inovação e equipas maiores",
  "Uma edição totalmente online que pôs a criatividade à prova",
  "De volta ao formato presencial, mais fortes do que nunca",
  "A participação internacional atingiu um novo patamar",
  "Submissões e prémios em números recorde",
  "Um festival maduro com alcance global",
  "A nossa edição mais ambiciosa até agora"
];

function updateTimeline(index) {
  currentIndex = index;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");

  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");

  const year = dots[index].dataset.year;
  yearDisplay.style.opacity = "0";
  yearDisplay.style.transform = "translateY(-10px)";

  setTimeout(() => {
    yearDisplay.textContent = year;
    yearDisplay.style.opacity = "1";
    yearDisplay.style.transform = "translateY(0)";
  }, 200);

  topText.style.opacity = "0";
  topText.style.transform = "translateY(10px)";

  setTimeout(() => {
    topText.textContent = topTexts[index];
    topText.style.opacity = "1";
    topText.style.transform = "translateY(0)";
  }, 200);

  alignDotToYear(index);
}

function alignDotToYear(index) {
  const yearRect = yearDisplay.getBoundingClientRect();
  const yearCenterX = yearRect.left + yearRect.width / 2;

  const containerRect = document.querySelector('.timeline-dots-container').getBoundingClientRect();
  const containerCenterX = containerRect.left + containerRect.width / 2;
  
  const yearOffset = yearCenterX - containerCenterX;
  
  const totalDots = dots.length;
  const gap = 123;
  const normalDotSize = 48; 
  const activeDotSize = 80;
  
  let totalWidth = 0;
  for (let i = 0; i < totalDots; i++) {
    if (i === index) {
      totalWidth += activeDotSize;
    } else {
      totalWidth += normalDotSize;
    }
    if (i < totalDots - 1) {
      totalWidth += gap;
    }
  }
  
  let dotPosition = 0;
  for (let i = 0; i < index; i++) {
    dotPosition += normalDotSize + gap;
  }
  dotPosition += activeDotSize / 2;
  
  const dotOffsetFromCenter = dotPosition - (totalWidth / 2);
  
  const finalOffset = yearOffset - dotOffsetFromCenter;
  
  dotsWrapper.style.transform = `translateX(${finalOffset}px)`;
}

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    updateTimeline(Number(dot.dataset.index));
  });
});

window.addEventListener('resize', () => {
  alignDotToYear(currentIndex);
});

updateTimeline(0);
