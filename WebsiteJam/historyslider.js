const container = document.getElementById("history-container");
const dots = document.querySelectorAll(".dot");

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    const index = dot.dataset.index;
    container.scrollTo({
      left: container.offsetWidth * index,
      behavior: "smooth"
    });
  });
});

container.addEventListener("scroll", () => {
  const index = Math.round(container.scrollLeft / container.offsetWidth);

  dots.forEach(dot => dot.classList.remove("active"));
  if (dots[index]) dots[index].classList.add("active");
});
