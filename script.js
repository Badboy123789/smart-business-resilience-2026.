/* ==================================================
   SMART BUSINESS RESILIENCE
   PREMIUM INTERACTIVE EXPERIENCE
   JavaScript Animation Engine
================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* ================================================
       1. AUTOMATIC COPYRIGHT YEAR
    ================================================= */

    document.querySelectorAll(".current-year").forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    /* ================================================
       2. PREMIUM SCROLL REVEAL
    ================================================= */

    const revealElements = document.querySelectorAll(
        ".service-card, .about-section, .contact-cta"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry, index) => {

                    if (!entry.isIntersecting) return;

                    const element = entry.target;

                    element.animate(
                        [
                            {
                                opacity: 0,
                                transform: "translateY(35px)"
                            },
                            {
                                opacity: 1,
                                transform: "translateY(0)"
                            }
                        ],
                        {
                            duration: 800,
                            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                            fill: "both"
                        }
                    );

                    observer.unobserve(element);

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            element.style.opacity = "0";
            revealObserver.observe(element);
        });

    }


    /* ================================================
       3. PREMIUM NUMBER COUNTERS
       Activate on elements with data-count
    ================================================= */

    const counters = document.querySelectorAll("[data-count]");

    if ("IntersectionObserver" in window) {

        const counterObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const element = entry.target;
                    const target = Number(element.dataset.count);

                    if (!Number.isFinite(target) || target < 0) {
                        observer.unobserve(element);
                        return;
                    }

                    const duration = 1800;
                    const startTime = performance.now();

                    function updateCounter(now) {

                        const progress = Math.min(
                            (now - startTime) / duration,
                            1
                        );

                        const easedProgress =
                            1 - Math.pow(1 - progress, 4);

                        const value = Math.round(
                            target * easedProgress
                        );

                        element.textContent =
                            value.toLocaleString();

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        }

                    }

                    requestAnimationFrame(updateCounter);

                    observer.unobserve(element);

                });

            },
            {
                threshold: 0.5
            }
        );

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });

    }


    /* ================================================
       4. ACTIVE NAVIGATION LINK
    ================================================= */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("nav a[href]").forEach(link => {

        const linkPath = new URL(
            link.getAttribute("href"),
            window.location.href
        ).pathname;

        const linkPage = linkPath.split("/").pop();

        if (linkPage === currentPage) {

            link.setAttribute("aria-current", "page");

        }

    });


    /* ================================================
       5. PREMIUM PROJECT IMAGE INTERACTION
    ================================================= */

    const projectCards = document.querySelectorAll(
        ".service-card, .project-card"
    );

    projectCards.forEach(card => {

        card.addEventListener("pointerenter", () => {

            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                return;
            }

            card.style.willChange = "transform";

        });

        card.addEventListener("pointerleave", () => {

            card.style.willChange = "auto";

        });

    });


    /* ================================================
       6. SMOOTH SCROLL FOR SAME-PAGE LINKS
    ================================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "start"
            });

        });

    });


    /* ================================================
       7. PREMIUM BUTTON FEEDBACK
    ================================================= */

    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("pointerdown", () => {
            button.style.transform = "scale(0.97)";
        });

        const resetButton = () => {
            button.style.transform = "";
        };

        button.addEventListener("pointerup", resetButton);
        button.addEventListener("pointerleave", resetButton);
        button.addEventListener("pointercancel", resetButton);

    });


    /* ================================================
       8. PAGE READY
    ================================================= */

    document.documentElement.classList.add("js-ready");

    console.log(
        "Smart Business Resilience: Premium experience initialized."
    );

});
