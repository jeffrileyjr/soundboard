const instructions = document.querySelector('.instructions');
window.addEventListener("load", function () {
    // check for mobile
    isMobile = navigator.userAgent.toLowerCase().match(/mobile/i);
    return isMobile;
});

function removeTransition(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("playing");
}
const keys = document.querySelectorAll(".key");
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));

if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    instructions.innerText = 'Tap a box to hear that sound.'
    keys.forEach((key) => key.innerHTML = `<p class="sound"> ${key.lastElementChild.innerText} </p>`)
    keys.forEach((key) =>
        key.addEventListener("click", function (e) {
            if (e.target.classList.contains("key")) {
                const audio = document.querySelector(
                    `audio[data-key=${e.target.dataset.key}]`
                );
                if (!audio) return; //stops function if unassigned key is hit
                audio.currentTime = 0; // resets audio so you hit the same key over and over
                audio.play();
                key.classList.add("playing");
            } else {
                const audio = document.querySelector(
                    `audio[data-key=${e.target.parentNode.dataset.key}]`
                );
                if (!audio) return; //stops function if unassigned key is hit
                audio.currentTime = 0; // resets audio so you hit the same key over and over
                audio.play();
                key.classList.add("playing");
            }
        })
    );
} else {
    instructions.innerText = 'Press A, S, D, F, G, H, J, K to hear a drum sound.'
    window.addEventListener("keydown", function (e) {
        const key = document.querySelector(
            `.key[data-key="${e.key.toLowerCase()}"]`
        );
        console.log(key);
        const audio = document.querySelector(
            `audio[data-key="${e.key.toLowerCase()}"]`
        );
        if (!audio) return; //stops function if unassigned key is hit
        audio.currentTime = 0; // resets audio so you hit the same key over and over
        audio.play();
        key.classList.add("playing");
    });
}