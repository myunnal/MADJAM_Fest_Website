const dots = document.querySelectorAll(".dot");
const dotsWrapper = document.querySelector(".timeline-dots-wrapper");
const yearDisplay = document.querySelector(".timeline-year-display");
const slides = document.querySelectorAll(".history-slide");
const topText = document.getElementById("toptext-content");

let currentIndex = 0;

const topTexts = [
  "This was our 1st edition, where we grew even more, check the video from this year's JAM",
  "The second edition expanded the community and brought new challenges",
  "A year of innovation and bigger teams",
  "A fully online edition that tested creativity",
  "Back in person, stronger than ever",
  "International participation reached a new high",
  "Record-breaking submissions and prizes",
  "A mature festival with global reach",
  "Our most ambitious edition so far"
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

  const dotSize = 48;
  const activeDotSize = 80;
  const gap = 123;

  const yearRect = yearDisplay.getBoundingClientRect();
  const yearCenterX = yearRect.left + yearRect.width / 2;

  const dotCenterX =
    index * (dotSize + gap) +
    activeDotSize / 2;

  const offset = yearCenterX - dotCenterX - 34;
  dotsWrapper.style.transform = `translateX(${offset}px)`;
}

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    updateTimeline(Number(dot.dataset.index));
  });
});

updateTimeline(0);
