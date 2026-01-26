/* ===============================
   QUIZ LOGIC + SMOOTH TRANSITIONS
   =============================== */

function initRecommendationQuiz() {

  const steps = document.querySelectorAll(".quiz-step");
  if (!steps.length) return; // 🔥 IMPORTANT

  const nextBtn = document.querySelector(".quiz-next");
  const backBtn = document.querySelector(".quiz-back");
  const progressFill = document.querySelector(".progress-fill");
  const stepText = document.querySelector(".step-text");

  let currentStep = 0;

  const userProfile = {
    category: null,
    skinType: null,
    concerns: [],
    severity: null,
    preferences: []
  };

  // INIT
  showStep(0);
  updateProgress();

  // NAVIGATION
  nextBtn.onclick = () => {
    if (currentStep < steps.length - 1) {
      goToStep(currentStep + 1);
    } else {
      console.log("User Profile:", userProfile);
      // sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
      // loadPage("../PAGES/recommendation-result.html");
    }
  };

  backBtn.onclick = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  };

  function goToStep(index) {
    const current = steps[currentStep];
    const next = steps[index];

    current.classList.remove("active");
    current.classList.add("exit-left");

    setTimeout(() => {
      current.classList.remove("exit-left");
      next.classList.add("active");
      currentStep = index;
      updateProgress();
    }, 300);
  }

  function showStep(index) {
    steps.forEach(step => step.classList.remove("active"));
    steps[index].classList.add("active");
  }

  function updateProgress() {
    const percent = ((currentStep + 1) / steps.length) * 100;
    progressFill.style.width = percent + "%";
    stepText.textContent = `Step ${currentStep + 1} of ${steps.length}`;

    backBtn.style.visibility =
      currentStep === 0 ? "hidden" : "visible";
  }

  // OPTION SELECTION
  document.querySelectorAll(".quiz-option").forEach(option => {
    option.onclick = () => {
      const stepEl = option.closest(".quiz-step");
      const stepIndex = [...steps].indexOf(stepEl);
      const isMulti =
        stepEl.querySelector(".quiz-options").classList.contains("multi");

      if (isMulti) {
        option.classList.toggle("selected");
      } else {
        stepEl.querySelectorAll(".quiz-option")
          .forEach(o => o.classList.remove("selected"));
        option.classList.add("selected");
      }

      saveAnswer(stepIndex);
    };
  });

  function saveAnswer(stepIndex) {
    const selected =
      steps[stepIndex].querySelectorAll(".quiz-option.selected");
    const values = [...selected].map(o => o.textContent.trim());

    if (stepIndex === 0) userProfile.category = values[0] || null;
    if (stepIndex === 1) userProfile.skinType = values[0] || null;
    if (stepIndex === 2) userProfile.concerns = values;
    if (stepIndex === 3) userProfile.severity = values[0] || null;
    if (stepIndex === 4) userProfile.preferences = values;
  }
}
