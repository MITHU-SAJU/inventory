includeHTML(() => {
    const toggleBtn = document.getElementById("sidebarToggle");
    const sidebar = document.getElementById("sidebar");

    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Unified toggle behavior: desktop -> collapse, mobile -> slide-in
    function handleToggleClick(e) {
        if (isMobile()) {
            sidebar.classList.toggle("show");
        } else {
            document.body.classList.toggle("sidebar-collapsed");
            toggleBtn.classList.toggle("rotate");
        }
    }

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener("click", handleToggleClick);
    }

    // Add a mobile hamburger into the page header if present (for consistent UX)
    const header = document.querySelector("header.header-bar");
    if (header && !header.querySelector("#mobileMenuToggle")) {
        const mobileBtn = document.createElement("button");
        mobileBtn.id = "mobileMenuToggle";
        mobileBtn.className = "btn btn-light d-md-none me-2";
        mobileBtn.setAttribute("aria-label", "Open menu");
        mobileBtn.innerHTML = '<i class="bi bi-list"></i>';
        // Insert before header title
        const title = header.querySelector("h2");
        if (title) header.insertBefore(mobileBtn, title);

        mobileBtn.addEventListener("click", () => {
            if (sidebar) sidebar.classList.toggle("show");
        });
    }

    // Close mobile menu when a sidebar link is clicked (so navigation hides the menu)
    const sidebarLinks = sidebar ? sidebar.querySelectorAll(".sidebar-menu a") : [];
    sidebarLinks.forEach(a => {
        a.addEventListener("click", () => {
            if (isMobile() && sidebar) sidebar.classList.remove("show");
        });
    });

    // On resize, remove mobile-only classes when switching to desktop
    window.addEventListener("resize", () => {
        if (!isMobile()) {
            if (sidebar) sidebar.classList.remove("show");
        }
    });
});
