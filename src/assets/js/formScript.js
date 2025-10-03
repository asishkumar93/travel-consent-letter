console.log("hi there");
localStorage.clear();

const PAYMENT_TYPE = {
  PREMIUM: "premium",
  STANDARD: "standard",
};

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function handlePrePayment(type) {
  localStorage.clear();

  const formData = document.querySelectorAll("input");
  const data = {};
  formData.forEach((element) => {
    if (element.type === "radio" && element.checked) {
      data[element.name] = element.value;
    } else if (element.type === "checkbox") {
      if (element.checked) {
        data[element.id] = element.getAttribute("option");
      }
    } else {
      data[element.id] = element.value;
    }
  });

  const templateConfig = {
    category: "fr",
    subCategory: "only",
  };

  const client = {
    email: document.querySelector("#EMAIL").value,
    paymentType: type,
  };

  console.log(data, templateConfig, client);

  saveToLocalStorage("formData", JSON.stringify(data));
  saveToLocalStorage("templateConfig", JSON.stringify(templateConfig));
  saveToLocalStorage("client", JSON.stringify(client));

  console.log("done");
}

const form = document.querySelector("form");

function isFormValid(form) {
  const requiredFields = form.querySelectorAll("[required]");
  let isValid = true;
  requiredFields.forEach((field) => {
    if (!field.value) {
      isValid = false;
    }
  });
  return isValid;
}

function handleStandardFormSubmit() {
  if (isFormValid(form)) {
    handlePrePayment(PAYMENT_TYPE.STANDARD);
    //window.location.href = "https://buy.stripe.com/28E14n7tA38278T56Les002";
  }
}

function handlePremiumFormSubmit() {
  if (isFormValid(form)) {
    handlePrePayment(PAYMENT_TYPE.PREMIUM);
    //window.location.href = "https://buy.stripe.com/14A5kDcNUeQKeBl1Uzes003";
  }
}

document
  .querySelector("#Button-1--Basic")
  .addEventListener("click", handleStandardFormSubmit);
document
  .querySelector("#Button-2--Premium")
  .addEventListener("click", handlePremiumFormSubmit);
form.addEventListener("submit", function (event) {
  event.preventDefault();
});