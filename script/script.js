function handleReset() {
  alert(
    "All the information entered will be lost. Are you sure you want to reset the form?"
  );
}

function toggleFormLink() {
  let fullFormSection = document.getElementById("contact-form");
  let formLinkElement = document.querySelector(".form-link");
  let result;
  if (fullFormSection.classList.contains("hidden")) {
    result = "Show me ";
  } else {
    result = "Hide ";
  }
  formLinkElement.innerHTML = `${result} the form`;
}

function toggleFullFormSection() {
  let fullFormSection = document.getElementById("contact-form");
  fullFormSection.classList.toggle("hidden");
}

function toggleForm() {
  let formElement = document.querySelector("form");
  formElement.classList.toggle("hidden");
}

function toggleContactForm() {
  toggleFullFormSection();
  toggleForm();
  toggleFormLink();
}

function updateFormHeading(context = "") {
  let formHeading = document.querySelector("#contact-form h5");
  let result;
  if (context == "reset form") {
    result = "Resetting form in 5 seconds";
  } else if (context == "hide form") {
    result = "Form disappearing in 2 seconds";
  } else if (context == "hide result") {
    result = "This confirmation goes poof if you click 'Okay'";
  } else {
    result = "I would love to hear from you";
  }
  formHeading.innerHTML = result;
}

function handleSubmissionOkayClick() {
  toggleFullFormSection();
  toggleFormLink();
  toggleSubmissionResult();
  updateFormHeading();
}

function resetFormSection() {
  let formElement = document.querySelector("form");
  updateFormHeading("reset form");

  setTimeout(() => {
    formElement.reset();
    updateFormHeading("hide form");
  }, 5000);
  setTimeout(() => {
    toggleForm();
    updateFormHeading("hide result");
  }, 7000);
}

function toggleSubmissionResult(responseStatus = "") {
  let submissionResultElement = document.getElementById("post-submit-section");
  submissionResultElement.classList.toggle("hidden");
  submissionResultElement.classList.toggle("mt-4");
  let result;
  if (responseStatus) {
    if (responseStatus == 200) {
      result =
        "Message sent! I'll be in touch soon (and I'm already looking forward to it)";
      resetFormSection();
    } else {
      result =
        "Hmm, something went wrong and your message didn't go through. Mind trying again?";
      setTimeout(() => {
        submissionResultElement.classList.toggle("hidden");
        submissionResultElement.classList.toggle("mt-4");
        result = "";
      }, 8000);
    }
  } else {
    result = "";
  }
  submissionResultElement.innerHTML = `${result} <br/> <button class = "btn shadow primary-link mt-3" id = "submission-okay-button" onClick = "handleSubmissionOkayClick()"> Okay </button>`;
}

function handleApiResponse(response) {
  toggleSubmissionResult(response.status);
}

function makeApiCall(form) {
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);

  const apiUrl = "https://api.web3forms.com/submit";
  let submissionResultElement = document.getElementById("post-submit-section");
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  axios
    .post(apiUrl, object, { headers: headers })
    .then(handleApiResponse)
    .catch((error) => {
      console.log(error);
      submissionResultElement.innerHTML = "Sorry something went wrong!";
    });
}

function validateCaptcha(event) {
  let formElement = document.querySelector("form");
  let hCaptcha = formElement.querySelector(
    "textarea[name=h-captcha-response]"
  ).value;
  if (!hCaptcha) {
    event.preventDefault();
    alert(
      "Hate to be a bother, but hey — gotta do what we gotta do to keep spam away! Please check the 'I am human' box to continue."
    );
    return;
  } else {
    makeApiCall(formElement);
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  validateCaptcha(event);
}

function toggleClassBasedOnViewportWidth() {
  if (detailBtnElement) {
    if (window.innerWidth < 510.5) {
      detailBtnElement.classList.remove("hidden");
    } else {
      detailBtnElement.classList.add("hidden");
    }
  }

  if (footerTextElement) {
    if (window.innerWidth < 801) {
      footerTextElement.classList.add("mb-3");
    } else {
      footerTextElement.classList.remove("mb-3");
    }
  }

  if (footerSpanElement) {
    if (window.innerWidth < 991.5) {
      footerSpanElement.classList.replace("ps-2", "ps-1");
    } else {
      footerSpanElement.classList.replace("ps-1", "ps-2");
    }
  }

  if (resumeButtonElement) {
    if (window.innerWidth < 520.5) {
      resumeButtonElement.innerText = "My resume";
    } else {
      resumeButtonElement.innerText = "View my resume";
    }
  }
}

function activateHamburger() {
  document.querySelector(".hamburger").classList.toggle("active");
  document.querySelector(".nav-menu").classList.toggle("active");
}

function openResumeTab() {
  let tabWrapper = document.getElementById("floating-tab-wrapper");
  tabWrapper.classList.add("active");
}

function closeResumeTab() {
  let tabWrapper = document.getElementById("floating-tab-wrapper");
  tabWrapper.classList.remove("active");
}

let footerTextElement = document.querySelector(".contact-me-box div");
let footerSpanElement = document.querySelector(
  ".contact-me-box span.text-muted"
);
let resumeButtonElement = document.querySelector(
  ".buttons-container a:last-child"
);
let detailBtnElement = document.querySelector(".sm-links");
toggleClassBasedOnViewportWidth();

let hamburgerElement = document.querySelector(".hamburger");
hamburgerElement.addEventListener("click", activateHamburger);
hamburgerElement.addEventListener("keypress", activateHamburger);

let logo = document.querySelector("p.logo a");
logo.addEventListener("focusout", activateHamburger);

window.addEventListener("resize", toggleClassBasedOnViewportWidth);

let openResumeTabButton = document.getElementById("open-tab-button");
openResumeTabButton?.addEventListener("click", openResumeTab);

let closeResumeTabButton = document.getElementById("close-tab-button");
closeResumeTabButton?.addEventListener("click", closeResumeTab);
