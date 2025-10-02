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

// function formatDateInput(input) {
//   let value = input.value.replace(/\D/g, ""); // Remove non-digits

//   // Format as MM/DD/YYYY
//   if (value.length > 2 && value.length <= 4) {
//     value = value.slice(0, 2) + "/" + value.slice(2);
//   } else if (value.length > 4) {
//     value =
//       value.slice(0, 2) + "/" + value.slice(2, 4) + "/" + value.slice(4, 8);
//   }

//   input.value = value;

//   validateDate(input);
// }

// function validateDate(input) {
//   const parentContainer = input.closest(".fields_group");
//   const errorMsg = parentContainer.querySelector(".errorMsg");
//   const value = input.value;

//   // If field is empty, hide error
//   if (value.trim() === "") {
//     errorMsg.style.display = "none";
//     input.classList.remove("invalid");
//     return;
//   }

//   // Check if we have a complete date (MM/DD/YYYY format)
//   if (value.length === 10 && value.includes("/")) {
//     const parts = value.split("/");

//     if (parts.length === 3) {
//       const day = parseInt(parts[1], 10);
//       const month = parseInt(parts[0], 10);
//       const year = parseInt(parts[2], 10);

//       if (
//          day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2999
//       ) {
//         errorMsg.style.display = "inline";
//         input.classList.add("invalid");
//         return;
//       }
//     }
//   }

//   // If we reach here, the date is valid or incomplete (still typing)
//   errorMsg.style.display = "none";
//   input.classList.remove("invalid");
// }

// document.addEventListener("DOMContentLoaded", function () {
//   // Find all elements with dateField class and add the formatting
//   const dateFields = document.querySelectorAll(".dateField");

//   dateFields.forEach(function (field) {
//     field.addEventListener("input", function (e) {
//       formatDateInput(e.target);
//     });
//   });
// });
function formatDateInput(input) {
  let value = input.value.replace(/\D/g, ""); // Remove non-digits

  // Format as DD/MM/YYYY
  if (value.length > 2 && value.length <= 4) {
    value = value.slice(0, 2) + "/" + value.slice(2);
  } else if (value.length > 4) {
    value =
      value.slice(0, 2) + "/" + value.slice(2, 4) + "/" + value.slice(4, 8);
  }

  input.value = value;

  validateDate(input);
}

function validateDate(input) {
  const parentContainer = input.closest(".fields_group");
  const errorMsg = parentContainer.querySelector(".errorMsg");
  const value = input.value;

  // If field is empty, hide error
  if (value.trim() === "") {
    errorMsg.style.display = "none";
    input.classList.remove("invalid");
    return;
  }

  // Check if we have a complete date (DD/MM/YYYY format)
  if (value.length === 10 && value.includes("/")) {
    const parts = value.split("/");

    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);

      // Validate ranges
      if (
        day < 1 ||
        day > 31 ||
        month < 1 ||
        month > 12 ||
        year < 1900 ||
        year > 2999
      ) {
        errorMsg.style.display = "inline";
        input.classList.add("invalid");
        return;
      }

      // Extra check for days in each month
      const daysInMonth = new Date(year, month, 0).getDate();
      if (day > daysInMonth) {
        errorMsg.style.display = "inline";
        input.classList.add("invalid");
        return;
      }
    }
  }

  // If we reach here, the date is valid or incomplete (still typing)
  errorMsg.style.display = "none";
  input.classList.remove("invalid");
}

document.addEventListener("DOMContentLoaded", function () {
  // Find all elements with dateField class and add the formatting
  const dateFields = document.querySelectorAll(".dateField");

  dateFields.forEach(function (field) {
    field.addEventListener("input", function (e) {
      formatDateInput(e.target);
    });
  });
});
