document.addEventListener('DOMContentLoaded', function () {
    // Fade-in animations on scroll
    const sections = document.querySelectorAll("section");
    const options = {
        threshold: 0.3
    };

    const fadeInOnScroll = new IntersectionObserver(function(entries, fadeInOnScroll) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
                fadeInOnScroll.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        fadeInOnScroll.observe(section);
    });

    // Theme toggle
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
    });
});

const projectCards = document.querySelectorAll(".project-card");
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const closeBtn = document.querySelector(".close");

projectCards.forEach(card => {
    card.addEventListener("click", function () {
        modal.style.display = "block";
        modalTitle.textContent = this.querySelector("h3").textContent;
        modalDescription.textContent = "Project description would go here...";
    });
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});
