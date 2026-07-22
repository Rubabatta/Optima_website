//======================================
// GSAP HERO ANIMATION
//======================================

window.addEventListener("load", () => {

    const tl = gsap.timeline();

    tl.from(".logo", {
        y: -40,
        opacity: 0,
        duration: .8
    })

    .from(".nav-menu li", {
        y: -30,
        opacity: 0,
        stagger: .12,
        duration: .6
    }, "-=.4")

    .from(".nav-btn", {
        scale: .8,
        opacity: 0,
        duration: .6
    }, "-=.4")

    .from(".hero-tag", {
        x: -60,
        opacity: 0,
        duration: .7
    })

    .from(".hero h1", {
        y: 60,
        opacity: 0,
        duration: .9
    }, "-=.3")

    .from(".hero p", {
        y: 40,
        opacity: 0,
        duration: .8
    }, "-=.4")

    .from(".hero-buttons a", {
        y: 30,
        opacity: 0,
        stagger: .2,
        duration: .6
    }, "-=.3")

    .from(".stat-box", {
        y: 40,
        opacity: 0,
        stagger: .15,
        duration: .6
    }, "-=.2")

    .from(".hero-right img", {
        x: 100,
        opacity: 0,
        duration: 1
    }, "-=.8");

});


//======================================
// HEADER SCROLL EFFECT
//======================================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.style.background = "rgba(6,15,30,.95)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.30)";

    } else {

        header.style.background = "transparent";
        header.style.boxShadow = "none";

    }

});


