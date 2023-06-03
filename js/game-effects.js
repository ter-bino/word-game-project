let blockPageDiv = document.getElementById("block-page");
let messageDiv = document.getElementById("block-page-message");
let emojiMainDiv = document.getElementById("block-page-emoji-main");
let emojiSubDivs = document.getElementById("block-page-emoji-subs").children;

const hideBlockPage = function () {
    blockPageDiv.classList.add("hidden");
    blockPageDiv.removeEventListener("click", hideBlockPage);
}

const blockPage = function(disappear = true, message = "", emojiMain = "!", emojiArray = ["@", "#", "$", "%", "&"]) {
    blockPageDiv.classList.remove("hidden");

    messageDiv.innerHTML = message;
    emojiMainDiv.innerHTML = emojiMain;

    for (i = 0; i < emojiSubDivs.length; i++) {
        emojiSubDivs[i].innerHTML =  emojiArray[i % emojiArray.length];
    }

    setTimeout(() => {
        blockPageDiv.addEventListener("click", hideBlockPage);
    }, 1000);

    if (disappear) setTimeout(() => { hideBlockPage(); }, 2000);
}