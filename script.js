(function () {
  // Utility selectors
  const filters = Array.from(
    document.querySelectorAll(".filters .category-btn"),
  );
  const cards = Array.from(document.querySelectorAll(".project-card"));
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalTool = document.getElementById("modal-tool");
  const modalDesc = document.getElementById("modal-desc");
  const downloadBtn = document.getElementById("download-btn");

  // Initialize: set first filter active
  function setActiveFilterButton(btn) {
    filters.forEach((b) => {
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-pressed", b === btn ? "true" : "false");
    });
  }
  setActiveFilterButton(filters[0]);

  // Filtering logic
  function applyFilter(category) {
    cards.forEach((card) => {
      const cat = card.getAttribute("data-category") || "all";
      const show = category === "all" || cat === category;
      card.style.display = show ? "" : "none";
    });
  }

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveFilterButton(btn);
      applyFilter(btn.getAttribute("data-category"));
    });
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Open modal when a card is clicked or activated via keyboard
  function openModalFromCard(card) {
    const img = card.querySelector("img");
    if (!img) return;
    modalImg.src = img.src;
    modalImg.alt = img.alt || "Project preview";
    modalTitle.textContent = card.querySelector("h3")?.textContent || "Project";
    modalTool.textContent = card.querySelector(".meta p")?.textContent || "";
    modalDesc.textContent = ""; // optional: add more description if available
    downloadBtn.href = img.src;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    // focus close button for keyboard users
    const closeBtn = modal.querySelector(".close-btn");
    if (closeBtn) closeBtn.focus();
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => openModalFromCard(card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModalFromCard(card);
      }
    });
  });

  // Modal controls
  window.closeModal = function () {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
    modalImg.style.transform = "";
    modalImg.classList.remove("zoomed");
  };

  window.toggleZoom = function (imgEl) {
    const isZoomed = imgEl.classList.toggle("zoomed");
    imgEl.style.transform = isZoomed ? "scale(1.6)" : "";
    imgEl.classList.toggle("cursor-zoom-in", !isZoomed);
    imgEl.classList.toggle("cursor-zoom-out", isZoomed);
  };

  // Close modal with Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  // Accessibility: trap focus inside modal when open (simple)
  document.addEventListener(
    "focus",
    function (event) {
      if (!modal.classList.contains("hidden")) {
        if (!modal.contains(event.target)) {
          event.stopPropagation();
          modal.querySelector(".close-btn")?.focus();
        }
      }
    },
    true,
  );

  // Initial filter application
  applyFilter(filters[0].getAttribute("data-category"));
})();
