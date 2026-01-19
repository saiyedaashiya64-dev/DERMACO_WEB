/* =====================================
   CTA + POPUP + SUBMIT (CLEAN VERSION)
   SINGLE SOURCE OF TRUTH
===================================== */

(function () {

  // init emailjs
  emailjs.init("hk5bUoAWkvONdxNh-");

  /* -------------------------------
     CTA BUTTON CLICK
     - Desktop  → submit
     - Mobile   → popup
  -------------------------------- */
  document.addEventListener("click", function (e) {

    const ctaBtn = e.target.closest(".cta-submit-btn");
    if (!ctaBtn) return;

    // 📱 Mobile / small screen → popup open ONLY
    if (window.innerWidth <= 991 && !ctaBtn.closest(".cta-popup")) {
      e.preventDefault();
      document.querySelector(".cta-popup-overlay").style.display = "flex";
      return;
    }

    // 🖥 Desktop OR popup submit → continue to submit handler
  });


  /* -------------------------------
     POPUP CLOSE
  -------------------------------- */
  document.addEventListener("click", function (e) {

    if (
      e.target.classList.contains("cta-close") ||
      e.target.classList.contains("cta-popup-overlay")
    ) {
      document.querySelector(".cta-popup-overlay").style.display = "none";
    }

  });


  /* -------------------------------
     SUBMIT HANDLER (DESKTOP + POPUP)
  -------------------------------- */
  document.addEventListener("click", function (e) {

    const btn = e.target.closest(".cta-submit-btn");
    if (!btn) return;

    // mobile CTA bar submit block
    if (window.innerWidth <= 991 && !btn.closest(".cta-popup")) return;

    const form = btn.closest(".cta-enquiry-form");
    if (!form) return;

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();

    if (!name || !email || !phone) {
      Swal.fire({
        icon: "warning",
        title: "Missing Details",
        text: "Please fill all required fields."
      });
      return;
    }

    Swal.fire({
      title: "Submitting...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    emailjs.sendForm(
      "service_8bi1fgi",
      "template_jtd6f2a",
      form
    ).then(() => {

      Swal.fire({
        icon: "success",
        title: "Appointment Requested!",
        text: "Our expert will contact you shortly."
      });

      form.reset();

      // close popup if submit from popup
      if (btn.closest(".cta-popup")) {
        document.querySelector(".cta-popup-overlay").style.display = "none";
      }

    }).catch(() => {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong."
      });
    });

  });

})();
