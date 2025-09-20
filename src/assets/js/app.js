// Header active
$(document).ready(function () {
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 10) {
      $(".header__wrapper").addClass("active");
    } else {
      $(".header__wrapper").removeClass("active");
    }
  });
});

// Humbuger Toogle button
const toggleBtn = document.getElementById("humguberBtn");
const box = document.getElementById("humbugerMenu");

toggleBtn.addEventListener("click", () => {
  box.classList.toggle("show");
  toggleBtn.classList.toggle("close");
});

//Navbar Link Active
document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname.split("/").pop();
  const links = document.querySelectorAll(".nav_list_main a");

  links.forEach((link) => {
    const linkPath = link.getAttribute("href").split("/").pop();
    if (
      linkPath === currentPath ||
      (linkPath === "index.html" && currentPath === "")
    ) {
      link.classList.add("active");
    }
  });

  // Initialize Lenis
  const lenis = new Lenis({
    duration: 1.8, // scroll animation duration (seconds)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easing
    orientation: "vertical", // vertical scrolling
    wheelMultiplier: 1, // wheel speed multiplier
    smoothTouch: false, // leave true if you want smooth touch on mobile
    infinite: false,
    autoResize: true,
  });

  // Required RAF loop that drives Lenis
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Language Dropdown
  const langToggle = document.getElementById("langToggle");
  const langMenu = document.getElementById("langMenu");
  const selectedLang = document.getElementById("selectedLang");
  const selectedFlag = langToggle.querySelector("img.flag");
  const rotateIcon = document.querySelector(".lang_btn");

  langToggle.addEventListener("click", () => {
    langMenu.style.display =
      langMenu.style.display === "block" ? "none" : "block";
    rotateIcon.classList.add("rotate");
  });

  langMenu.querySelectorAll("li").forEach((item) => {
    item.addEventListener("click", () => {
      const code = item.getAttribute("data-code");
      const flag = item.getAttribute("data-flag");
      selectedLang.textContent = code;
      selectedFlag.src = flag;
      langMenu.style.display = "none";
      rotateIcon.classList.remove("rotate");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".language_dropdown")) {
      langMenu.style.display = "none";
      rotateIcon.classList.remove("rotate");
    }
  });
});
