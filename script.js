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
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        force3D: true,
        ...options
    });
};

revealGroup(".services-header-area", ".services-cards");
revealGroup(".service-card", ".cards-grid", { y: 32, duration: 0.85, stagger: 0.12 });
revealGroup(".section-header", ".equipment-section", { y: 24, duration: 0.85 });
revealGroup(".equip-card", ".equipment-grid-4col", { y: 30, duration: 0.85, stagger: 0.12 });
revealGroup(".why-left", ".why-choose-section", { x: -24, y: 0, duration: 0.85 });
revealGroup(".why-right", ".why-choose-section", { x: 24, y: 0, duration: 0.85 });
revealGroup(".feature-card", ".features-list", { y: 20, duration: 0.75, stagger: 0.1 });
revealGroup(".faq-card", ".faq-section", { y: 20, duration: 0.85, stagger: 0.1 });
revealGroup(".contact-copy, .application-form", ".contact-section", { y: 24, duration: 0.85, stagger: 0.12 });

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

if (applicationForm && formStatus) {
    applicationForm.addEventListener("submit", (event) => {
        event.preventDefault();
        formStatus.textContent = "Thanks! We will contact you shortly.";
        applicationForm.reset();
    });
}