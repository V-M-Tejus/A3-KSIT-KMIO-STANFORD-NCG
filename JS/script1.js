let currentSlide = 1;
showSlide(currentSlide);

function navigateSlide(n) {
    showSlide(currentSlide += n);
}



function showSlide(n) {
    let slides = document.getElementsByClassName("slidenxtSection");
    if (n > slides.length) { currentSlide = 1 }
    if (n < 1) { currentSlide = slides.length }
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slides[currentSlide - 1].classList.add("active");

    // Update slide number
    document.getElementById("slideNumber").innerText = currentSlide;

    console.log(`Showing slide ${currentSlide}`);
}

function toggleFullScreen() {
    let elem = document.getElementById("presentation");
    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}

function endPresentation() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    // Optionally, navigate to the first slide or another section
    currentSlide = 1;
    showSlide(currentSlide);
    console.log("Presentation ended");
}

document.addEventListener("keydown", function(event) {
    console.log(`Key pressed: ${event.key}`);
    if (event.key === "ArrowRight") {
        navigateSlide(1);
    } else if (event.key === "ArrowLeft") {
        navigateSlide(-1);
    } else if (event.key === "f" || event.key === "F") {
        toggleFullScreen();
    } else if (event.key === "Escape") {
        endPresentation();
    }
});
