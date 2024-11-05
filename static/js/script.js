document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("theme-toggle");

    // Load theme from localStorage if it exists, otherwise default to light-theme
    const savedTheme = localStorage.getItem("theme") || "light-theme";
    document.body.classList.add(savedTheme);

    // Update button text based on current theme
    themeToggle.innerText = savedTheme === "dark-theme" ? "Switch to Light Mode" : "Switch to Dark Mode";

    // Toggle theme on button click
    themeToggle.addEventListener("click", function() {
        if (document.body.classList.contains("dark-theme")) {
            // Switch to light theme
            document.body.classList.remove("dark-theme");
            document.body.classList.add("light-theme");
            localStorage.setItem("theme", "light-theme");
            themeToggle.innerText = "Switch to Dark Mode";
        } else {
            // Switch to dark theme
            document.body.classList.remove("light-theme");
            document.body.classList.add("dark-theme");
            localStorage.setItem("theme", "dark-theme");
            themeToggle.innerText = "Switch to Light Mode";
        }
    });
});
// Fade-in effect for skills section on scroll
window.addEventListener('scroll', function () {
    const skillsSection = document.getElementById('skills');
    const sectionPos = skillsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;
    if (sectionPos < screenPos) {
        skillsSection.classList.add('fade-in');
    }
});


// script.js

// Fade-in effect on scroll
document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".fade-in");

    const fadeInOnScroll = () => {
        fadeElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add("visible");
            }
        });
    };

    window.addEventListener("scroll", fadeInOnScroll);
    fadeInOnScroll(); // Trigger once on load
});

// Theme toggle functionality
document.getElementById("theme-toggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
});
