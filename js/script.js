document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE NAVIGATION
       ========================= */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

        const navLinks = mainNav.querySelectorAll("a");

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

        document.addEventListener("click", (event) => {

            if (
                !mainNav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                mainNav.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* =========================
       CURRENT YEAR
       ========================= */

    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =========================
       HEADER SHADOW
       ========================= */

    const header =
        document.querySelector(".site-header");

    const updateHeader = () => {

        if (!header) return;

        if (window.scrollY > 10) {

            header.style.boxShadow =
                "0 8px 30px rgba(8, 17, 31, 0.06)";

        } else {

            header.style.boxShadow = "none";

        }

    };

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =========================
       ESCAPE KEY
       ========================= */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (
                mainNav &&
                mainNav.classList.contains("active")
            ) {

                mainNav.classList.remove("active");

                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }

    });


    /* =========================
       SMART PACKAGE SELECTION
       ========================= */

    const packageButtons =
        document.querySelectorAll(
            'a[href="order.html"]'
        );

    packageButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const buttonText =
                button.textContent.trim().toLowerCase();

            let selectedPackage = "";

            if (buttonText.includes("starter")) {

                selectedPackage = "starter";

            } else if (
                buttonText.includes("professional")
            ) {

                selectedPackage = "professional";

            } else if (
                buttonText.includes("store") ||
                buttonText.includes("e-commerce")
            ) {

                selectedPackage = "online-store";

            }

            if (selectedPackage) {

                sessionStorage.setItem(
                    "tickerSelectedPackage",
                    selectedPackage
                );

            }

        });

    });


    /* =========================
       LOAD SELECTED PACKAGE
       ========================= */

    const packageSelect =
        document.getElementById("package");

    if (packageSelect) {

        const savedPackage =
            sessionStorage.getItem(
                "tickerSelectedPackage"
            );

        if (savedPackage) {

            packageSelect.value =
                savedPackage;

            packageSelect.dispatchEvent(
                new Event("change")
            );

            sessionStorage.removeItem(
                "tickerSelectedPackage"
            );

        }

    }


    /* =========================
       PROJECT ORDER FORM
       ========================= */

    const projectForm =
        document.getElementById("projectForm");

    if (projectForm) {

        const existingWebsite =
            document.getElementById("existingWebsite");

        const websiteUrl =
            document.getElementById("websiteUrl");

        const projectDetails =
            document.getElementById("projectDetails");


        /* =========================
           EXISTING WEBSITE FIELD
           ========================= */

        const updateWebsiteUrl = () => {

            if (!existingWebsite || !websiteUrl) {
                return;
            }

            if (existingWebsite.value === "yes") {

                websiteUrl.required = true;
                websiteUrl.disabled = false;

                websiteUrl.placeholder =
                    "https://yourwebsite.com";

            } else {

                websiteUrl.required = false;
                websiteUrl.value = "";
                websiteUrl.disabled = true;

                websiteUrl.placeholder =
                    "Not required";

            }

        };

        if (existingWebsite) {

            existingWebsite.addEventListener(
                "change",
                updateWebsiteUrl
            );

            updateWebsiteUrl();

        }


        /* =========================
           FORM VALIDATION
           ========================= */

        projectForm.addEventListener(
            "submit",
            (event) => {

                if (!projectForm.checkValidity()) {

                    projectForm.reportValidity();

                    event.preventDefault();

                    return;

                }

                const name =
                    document.getElementById("fullName")?.value.trim();

                const business =
                    document.getElementById("businessName")?.value.trim();

                if (!name || !business) {

                    event.preventDefault();

                    return;

                }

                if (projectDetails) {

                    const details =
                        projectDetails.value.trim();

                    if (details.length < 20) {

                        event.preventDefault();

                        alert(
                            "Please provide at least 20 characters describing your project."
                        );

                        projectDetails.focus();

                        return;

                    }

                }

            }
        );

    }


    /* =========================
       WHATSAPP
       ========================= */

    const whatsappNumber =
        "231772519609";

    const whatsappMessage =
        encodeURIComponent(
            "Hello Ticker Digital, I would like to discuss a website project."
        );

    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        whatsappMessage;


    /* =========================
       FLOATING WHATSAPP BUTTON
       ========================= */

    const whatsappButton =
        document.createElement("a");

    whatsappButton.href = whatsappURL;

    whatsappButton.target = "_blank";

    whatsappButton.rel =
        "noopener noreferrer";

    whatsappButton.className =
        "whatsapp-floating";

    whatsappButton.setAttribute(
        "aria-label",
        "Chat with Ticker Digital on WhatsApp"
    );

    whatsappButton.innerHTML =
        "<span>WhatsApp</span>";


    document.body.appendChild(
        whatsappButton
    );

});