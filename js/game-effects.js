const blockPage = function(disappear = true, message = "", emojiMain = "!", emojiArray = ["@", "#", "$", "%", "&"]) {
    blockPageDiv = document.getElementById("block-page");
    messageDiv = document.getElementById("block-page-message");
    emojiMainDiv = document.getElementById("block-page-emoji-main");
    emojiSubDivs = document.getElementById("block-page-emoji-subs").children;

    blockPageDiv.classList.remove("hidden");

    messageDiv.innerHTML = message;
    emojiMainDiv.innerHTML = emojiMain;

    for (i = 0; i < emojiSubDivs.length; i++) {
        emojiSubDivs[i].innerHTML =  emojiArray[i % emojiArray.length];
    }

    setTimeout(() => {
        blockPageDiv.addEventListener("click", () => {
            blockPageDiv.classList.add("hidden");
        });
    }, 1000);

    if (disappear) {
        setTimeout(() => {
            blockPageDiv.classList.add("hidden");
        }, 2000);
    }
}