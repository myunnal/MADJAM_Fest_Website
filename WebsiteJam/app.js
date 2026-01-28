



/* Preivous years img side scrolls*/
document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    if (!reveals.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                   
                    entry.target.getBoundingClientRect();

                    entry.target.classList.add("active");

                
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            root: null,
            threshold: 0.15,
            rootMargin: "0px 0px -80px 0px"
        }
    );

    reveals.forEach(el => observer.observe(el));
});
