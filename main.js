// DOM elements
const elIndividualBtn = document.querySelector(".individual-button");
const elHiddenItems = document.querySelectorAll(".game-level, .game-level-select, .game-time, .game-time-select, .game-start-button");
const elIntialItems = document.querySelectorAll(".welcome-message, .individual-button, .create-room-button, .join-button");
const elGameSection = document.querySelector(".game-section");
const elSignsImageTemplate = document.querySelector(".js-sings-template").content;
const elSignsList = document.querySelector(".js-signs-list");
const elSignsTitle = document.querySelector(".js-signs-title");
const elSingsMainSection = document.querySelector(".js-signs-section");
const elSignsLevelSelect = document.querySelector(".game-level-select");


// Function to render signs
function renderSigns(arr, node) {
    
    node.innerHTML = "";
    
    arr.forEach(item => {
        const signsImageTemplateNodes = elSignsImageTemplate.cloneNode(true);
        const signsImage = signsImageTemplateNodes.querySelector(".signs-image");
        signsImage.src = item.symbol_img;
        signsImage.dataset.symbolTitle = item.symbol_title;
        node.appendChild(signsImageTemplateNodes);
    });
    
}


// Function to handle game level
function handleGameLevel(selectVal) {
    let currentImageRange;
    if (selectVal == "easy") {
        currentImageRange = roadSymbol.slice(0, 20);
    } else if (selectVal == "medium") {
        currentImageRange = roadSymbol.slice(0, 40);
    } else if (selectVal == "hard") {
        currentImageRange = roadSymbol.slice(0, 60);
    }
    return currentImageRange;
}

let chances = 5;
let currentRange = []; 


// Event listener for game start
elGameSection.addEventListener("click", function(evt) {
    if (evt.target.matches(".individual-button")) {
        elHiddenItems.forEach(item => {
            item.classList.remove("hidden");
        });
        elIntialItems.forEach(item => {
            item.classList.add("hidden");
        });
    }
    
    if (evt.target.matches(".game-start-button")) {
        elHiddenItems.forEach(item => {
            item.classList.add("hidden");
        });
        elSingsMainSection.classList.remove("hidden");
        elSingsMainSection.classList.add("mt-[-210px]");
        
        currentRange = handleGameLevel(elSignsLevelSelect.value);
        renderSigns(currentRange, elSignsList);
        
        randomizedArray(currentRange);

        const currentTitle = currentRange.pop();
        elSignsTitle.textContent = currentTitle.symbol_title;
    }
});


// Event listener for finding the correct sign image
elSignsList.addEventListener("click", function(evt) {
    if (evt.target.matches(".signs-image")) {
        const clickedImageTitle = evt.target.dataset.symbolTitle;

        const findMatchedImg = roadSymbol.find(item => item.symbol_title === clickedImageTitle && elSignsTitle.textContent == clickedImageTitle);

        if (findMatchedImg) {
            const checkmarkGif = evt.target.parentNode.querySelector(".checkmark-gif");
            checkmarkGif.classList.remove("hidden");

            const checkmarkAudio = evt.target.parentNode.querySelector(".checkmark-audio");
            checkmarkAudio.autoplay = true;
            checkmarkAudio.play();

            setTimeout(() => {
                evt.target.classList.add("hidden");
                checkmarkGif.classList.add("hidden");

                if (currentRange.length == 0) {
                    elSingsMainSection.classList.add("hidden");
                    document.querySelector(".youWin-message-section").classList.remove("hidden");
                } else {
                    const currentTitle = currentRange.pop();
                    elSignsTitle.textContent = currentTitle.symbol_title;
                }
            }, 500);
        } else {
            const errorImage =  evt.target.parentNode.querySelector(".error-image");
            errorImage.classList.remove("hidden");

            const errorAudio = evt.target.parentNode.querySelector(".error-audio");
            errorAudio.autoplay = true;
            errorAudio.play();

            setTimeout(() => {
                errorImage.classList.add("hidden");
            }, 800);

            chances--;
            if (chances === 0) {
                elSingsMainSection.classList.add("hidden");
                document.querySelector(".gameOver-message-section").classList.remove("hidden");
            }
        }
    }
});


// Function to shuffle an array 
function randomizedArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

















