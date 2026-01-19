/* =====================================
   CONTACT FORM EMAILJS + SWEETALERT
===================================== */

(function () {

  emailjs.init("hk5bUoAWkvONdxNh-");

  document.addEventListener("submit", function (e) {

    const form = e.target.closest("#contactForm");
    if (!form) return;

    e.preventDefault(); // URL clean

    Swal.fire({
      title: "Sending your request...",
      text: "Please wait while we connect you with our expert.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    emailjs.sendForm(
      "service_8bi1fgi",
      "template_1b3livo",
      form
    ).then(() => {

      Swal.fire({
        icon: "success",
        title: "Request Sent!",
        text: "Our dermatologist will contact you within 24 hours."
      });

      form.reset();

    }).catch((error) => {

      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Please try again later."
      });

    });

  });

})();
