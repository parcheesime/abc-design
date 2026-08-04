(() => {
  "use strict";

  const contactFormSubmissionKey = "abcDesignContactFormSubmission";

  function track(eventName, parameters) {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, parameters);
    }
  }

  function saveContactFormSubmission(projectType) {
    try {
      sessionStorage.setItem(
        contactFormSubmissionKey,
        JSON.stringify({ project_type: projectType }),
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    if (!link) {
      return;
    }

    const ctaLabel = link.dataset.analyticsCta;

    if (ctaLabel) {
      track("cta_click", {
        label: ctaLabel,
        location: link.dataset.analyticsLocation || "Unknown",
      });
      return;
    }

    if (link.protocol === "tel:") {
      track("phone_click", {
        phone_number: decodeURIComponent(link.pathname),
      });
    } else if (link.protocol === "mailto:") {
      track("email_click", {
        email_address: decodeURIComponent(link.pathname),
      });
    }
  });

  const contactForm = document.querySelector("[data-contact-form]");

  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const submitButton = contactForm.querySelector('[type="submit"]');
      const formData = new FormData(contactForm);

      if (submitButton) {
        submitButton.disabled = true;
      }

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error("Contact form submission failed");
        }

        const projectType = formData.get("project-type") || "not_selected";

        if (!saveContactFormSubmission(projectType)) {
          track("contact_form_submit", { project_type: projectType });
        }

        window.location.assign(contactForm.dataset.successUrl);
      } catch (error) {
        if (submitButton) {
          submitButton.disabled = false;
        }

        contactForm.submit();
      }
    });
  }

  let storedSubmission = null;

  try {
    storedSubmission = sessionStorage.getItem(contactFormSubmissionKey);
  } catch (error) {
    // Storage can be unavailable in privacy-restricted browsing contexts.
  }

  if (storedSubmission) {
    try {
      sessionStorage.removeItem(contactFormSubmissionKey);
    } catch (error) {
      // The event can still be sent if removing stored data is unavailable.
    }

    try {
      const { project_type: projectType } = JSON.parse(storedSubmission);
      track("contact_form_submit", {
        project_type: projectType,
      });
    } catch (error) {
      // Ignore invalid storage data without affecting the thank-you page.
    }
  }
})();
