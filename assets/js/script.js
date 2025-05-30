'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebar && sidebarBtn) { // Ensure elements exist before adding listener
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (modalContainer && overlay) { // Ensure elements exist
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// add click event to all modal items
// Note: This loop will not run if no elements with `data-testimonials-item` exist.
// Also, if `modalImg`, `modalTitle`, or `modalText` are null (because their corresponding
// `data-modal-img`, etc. attributes are missing in the HTML), errors will occur here.
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {

    if (modalImg && this.querySelector("[data-testimonials-avatar]")) {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    }
    if (modalTitle && this.querySelector("[data-testimonials-title]")) {
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    }
    if (modalText && this.querySelector("[data-testimonials-text]")) {
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    }

    testimonialsModalFunc();

  });
}

// add click event to modal close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
if (navigationLinks.length > 0 && pages.length > 0) {
  navigationLinks.forEach(clickedLink => {
    clickedLink.addEventListener("click", function () {
      // Deactivate all links and pages
      navigationLinks.forEach(link => link.classList.remove("active"));
      pages.forEach(page => page.classList.remove("active"));

      // Activate the clicked link
      this.classList.add("active");

      // Activate the corresponding page
      const targetPageName = this.innerHTML.trim().toLowerCase();
      const targetPageElement = Array.from(pages).find(page => {
        const pageNameAttr = page.dataset.page;
        return pageNameAttr && pageNameAttr.trim().toLowerCase() === targetPageName;
      });
      
      if (targetPageElement) {
        targetPageElement.classList.add("active");
        window.scrollTo(0, 0);
      }
    });
  });
}