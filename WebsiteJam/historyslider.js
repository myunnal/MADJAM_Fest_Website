const dots = document.querySelectorAll(".dot");
const dotsWrapper = document.querySelector(".timeline-dots-wrapper");
const yearDisplay = document.querySelector(".timeline-year-display");

let currentIndex = 0;

function updateTimeline(index) {
  currentIndex = index;

  dots.forEach(dot => dot.classList.remove("active"));
  const activeDot = dots[index];
  activeDot.classList.add("active");

  const dotSize = 48;
  const activeDotSize = 80;
  const gap = 123;

  const yearRect = yearDisplay.getBoundingClientRect();
  const yearCenterX = yearRect.left + yearRect.width / 2;

  const dotCenterX =
    index * (dotSize + gap) +
    activeDotSize / 2;

  const cicleShiftToLeft = 34; 

  const offset = yearCenterX - dotCenterX - cicleShiftToLeft;

  dotsWrapper.style.transform = `translateX(${offset}px)`;

  const year = activeDot.dataset.year;

  yearDisplay.style.opacity = "0";
  yearDisplay.style.transform = "translateY(-10px)";

  setTimeout(() => {
    yearDisplay.textContent = year;
    yearDisplay.style.opacity = "1";
    yearDisplay.style.transform = "translateY(0)";
  }, 200);
}

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    updateTimeline(parseInt(dot.dataset.index));
  });
});

updateTimeline(0);
