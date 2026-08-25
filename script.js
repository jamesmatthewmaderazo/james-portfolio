/* =========================
   PAGE LOADER
========================= */

const loader = document.getElementById("loader");

window.addEventListener("load", () => {
    setTimeout(() => {
        loader.classList.add("hide");
    }, 500);
});


/* =========================
   PARTICLES
========================= */

const particles = document.getElementById("particles");

if (particles) {

    for (let i = 0; i < 55; i++) {

        const p = document.createElement("span");

        p.className = "particle";

        p.style.left = Math.random() * 100 + "%";
        p.style.top = Math.random() * 100 + "%";

        p.style.animationDelay =
            Math.random() * 7 + "s";

        p.style.animationDuration =
            5 + Math.random() * 7 + "s";

        p.style.transform =
            `scale(${0.4 + Math.random() * 1.5})`;

        particles.appendChild(p);
    }
}


/* =========================
   NAVBAR SCROLL
========================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    navbar.classList.toggle(
        "scrolled",
        window.scrollY > 30
    );

});


/* =========================
   MOBILE MENU
========================= */

const menuToggle =
    document.getElementById("menuToggle");

const nav =
    document.getElementById("nav");

if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

        const open =
            nav.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            open
        );

    });

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================
   ACTIVE NAV LINK
========================= */

const sections =
    [...document.querySelectorAll("section[id]")];

const navLinks =
    [...document.querySelectorAll("nav a")];

window.addEventListener("scroll", () => {

    const position =
        window.scrollY + 180;

    let current =
        sections.length
            ? sections[0].id
            : "";

    sections.forEach(section => {

        if (position >= section.offsetTop) {
            current = section.id;
        }

    });

    navLinks.forEach(link => {

        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + current
        );

    });

});


/* =========================
   REVEAL ANIMATIONS
========================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


document
    .querySelectorAll(".reveal")
    .forEach(element => {

        revealObserver.observe(element);

    });


/* =========================
   PROJECT FILTER
========================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectCards =
    document.querySelectorAll(".project-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter =
            button.dataset.filter;

        projectCards.forEach(card => {

            const category =
                card.dataset.category;

            if (
                filter === "all" ||
                category === filter
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

                // Stop video if card gets hidden
                const video =
                    card.querySelector("video");

                if (video) {
                    video.pause();
                }

            }

        });

    });

});


/* =========================
   VIDEO CARDS
========================= */

const videos =
    document.querySelectorAll(".project-thumb video");


videos.forEach(video => {

    const card =
        video.closest(".project-thumb");


    /*
      When video is clicked:
      - play
      - unmute
      - hide play button
    */

    card.addEventListener("click", async event => {

        /*
          Prevent clicking the video from
          triggering browser fullscreen behavior.
        */

        event.preventDefault();


        if (video.paused) {

            // Stop every other video first
            videos.forEach(otherVideo => {

                if (otherVideo !== video) {

                    otherVideo.pause();

                    const otherCard =
                        otherVideo.closest(".project-thumb");

                    if (otherCard) {
                        otherCard.classList.remove(
                            "playing"
                        );
                    }

                }

            });


            /*
              Enable audio.
              Browsers allow sound because this
              play() happens directly from the click.
            */

            video.muted = false;

            try {

                await video.play();

                card.classList.add("playing");

            } catch (error) {

                console.log(
                    "Video could not play:",
                    error
                );

                /*
                  If browser blocks audio,
                  try muted playback.
                */

                video.muted = true;

                try {

                    await video.play();

                    card.classList.add(
                        "playing"
                    );

                } catch (secondError) {

                    console.log(
                        "Video playback failed:",
                        secondError
                    );

                }

            }

        } else {

            video.pause();

            card.classList.remove(
                "playing"
            );

        }

    });


    /*
      When video finishes,
      return play button.
    */

    video.addEventListener("ended", () => {

        card.classList.remove(
            "playing"
        );

        video.currentTime = 0;

    });


    /*
      If the video is paused by anything else,
      restore the play button.
    */

    video.addEventListener("pause", () => {

        if (!video.ended) {

            card.classList.remove(
                "playing"
            );

        }

    });


    /*
      When video starts playing,
      hide the orange play button.
    */

    video.addEventListener("play", () => {

        card.classList.add(
            "playing"
        );

    });

});


/* =========================
   YEAR
========================= */

const year =
    document.getElementById("year");

if (year) {

    year.textContent =
        new Date().getFullYear();

}