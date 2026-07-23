window.addEventListener("load", () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".logo", { y: -24, opacity: 0, duration: 0.8 })
        .from(".nav-menu li", { y: -16, opacity: 0, stagger: 0.08, duration: 0.55 }, "-=0.35")
        .from(".hero-tag", { x: -30, opacity: 0, duration: 0.7 }, "-=0.2")
        .from(".hero h1", { y: 28, opacity: 0, duration: 0.8 }, "-=0.2")
        .from(".hero p", { y: 20, opacity: 0, duration: 0.7 }, "-=0.35")
        .from(".hero-buttons", { y: 18, opacity: 0, duration: 0.55 }, "-=0.2")
        .from(".hero-stats", { y: 24, opacity: 0, duration: 0.6 }, "-=0.25")
        .from(".hero-right .brand-showcase", { x: 50, opacity: 0, duration: 0.9 }, "-=0.55");
});

const header = document.querySelector("header");

const setHeaderState = () => {
    if (!header) return;

    if (window.scrollY > 80) {
        header.style.background = "rgba(6, 15, 30, .95)";
        header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, .30)";
    } else {
        header.style.background = "transparent";
        header.style.boxShadow = "none";
    }
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

gsap.registerPlugin(ScrollTrigger);

const revealGroup = (targets, trigger, options = {}) => {
    gsap.from(targets, {
        scrollTrigger: {
            trigger,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 28,
        scale: 0.98,
        opacity: 0,
        filter: "blur(8px)",
        duration: 0.85,
        stagger: 0.12,
        ease: "power4.out",
        force3D: true,
        ...options
    });
};

const revealText = (targets, trigger) => {
    revealGroup(targets, trigger, {
        y: 22,
        scale: 1,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out"
    });
};

const revealCards = (targets, trigger, options = {}) => {
    revealGroup(targets, trigger, {
        y: 38,
        scale: 0.94,
        rotationX: 8,
        transformOrigin: "50% 80%",
        duration: 0.95,
        stagger: 0.1,
        ease: "back.out(1.35)",
        ...options
    });
};

revealText(".services-header-area > *", ".services-cards");
revealCards(".service-card", ".cards-grid");
revealText(".section-header > *", ".equipment-section");
revealCards(".equip-card", ".equipment-grid-4col", { stagger: 0.08 });
revealGroup(".why-left", ".why-choose-section", { x: -24, y: 0, duration: 0.85 });
revealGroup(".why-right", ".why-choose-section", { x: 24, y: 0, duration: 0.85 });
revealCards(".feature-card", ".features-list", { y: 24, duration: 0.85 });
revealCards(".pricing-highlight-box", ".why-choose-section", { y: 28, duration: 0.9 });
revealText(".faq-header > *", ".faq-section");
revealCards(".faq-card", ".faq-section", { y: 24, duration: 0.85 });
revealText(".contact-copy > *", ".contact-section");
revealCards(".contact-detail, .application-form", ".contact-section", { y: 26, stagger: 0.09 });
revealCards(".footer-inner-grid > *", ".site-footer", { y: 28, duration: 0.85, stagger: 0.12 });

document.querySelectorAll(".gs-reveal").forEach((element) => {
    gsap.fromTo(element, { opacity: 0, y: 24 }, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
});

const faqToggles = document.querySelectorAll(".faq-toggle");
faqToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
        const card = toggle.closest(".faq-card");
        const isActive = card.classList.contains("active");

        document.querySelectorAll(".faq-card").forEach((item) => item.classList.remove("active"));
        if (!isActive) {
            card.classList.add("active");
        }
    });
});

document.querySelectorAll(".equip-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    });
});

const applicationForm = document.querySelector("#application-form");
const formStatus = document.querySelector(".form-status");

const nav = document.querySelector("nav");
const navToggle = document.querySelector(".nav-toggle");
if (nav && navToggle) {
    const closeMobileNav = () => {
        nav.classList.remove("nav-open");
        navToggle.classList.remove("active");
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", false);
        navToggle.setAttribute("aria-label", "Open navigation");
    };

    navToggle.addEventListener("click", () => {
        nav.classList.toggle("nav-open");
        navToggle.classList.toggle("active");
        document.body.classList.toggle("nav-open");
        const isExpanded = navToggle.classList.contains("active");
        navToggle.setAttribute("aria-expanded", isExpanded);
        navToggle.setAttribute("aria-label", isExpanded ? "Close navigation" : "Open navigation");
    });

    document.querySelectorAll(".nav-menu a, .nav-actions a").forEach((link) => {
        link.addEventListener("click", () => {
            if (nav.classList.contains("nav-open")) {
                closeMobileNav();
            }
        });
    });

    const backdrop = document.querySelector(".mobile-menu-backdrop");
    if (backdrop) {
        backdrop.addEventListener("click", closeMobileNav);
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && nav.classList.contains("nav-open")) {
            closeMobileNav();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900 && nav.classList.contains("nav-open")) {
            closeMobileNav();
        }
    });
}

if (applicationForm && formStatus) {
    applicationForm.addEventListener("submit", (event) => {
        event.preventDefault();
        formStatus.textContent = "Thanks! We will contact you shortly.";
        applicationForm.reset();
    });
}
