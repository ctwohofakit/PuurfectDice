document.addEventListener("DOMContentLoaded", function() {
    const diceContainer = document.querySelector(".dice-area");
    const resultDisplay = document.getElementById("result-display");
    const rollButton = document.getElementById("roll-button");
    const addDiceButton = document.getElementById("add-dice-button");
    const removeDiceButton = document.getElementById("remove-dice-button");

    let numberOfDice = 1;
    let maxDice = 5;

    // Function to add dice
    function addDice() {
        if (numberOfDice < maxDice) {
            numberOfDice++;
            const newDice = document.createElement("div");
            newDice.classList.add("pyramid_box");
            newDice.innerHTML = `
            <div class="ikosaeder">
                <div class="side side-1"></div>
                <div class="side side-2"></div>
                <div class="side side-3"></div>
                <div class="side side-4"></div>
                <div class="side side-5"></div>
                <div class="side side-6"></div>
                <div class="side side-7"></div>
                <div class="side side-8"></div>
                <div class="side side-9"></div>
                <div class="side side-10"></div>
                <div class="side side-11"></div>
                <div class="side side-12"></div>
                <div class="side side-13"></div>
                <div class="side side-14"></div>
                <div class="side side-15"></div>
                <div class="side side-16"></div>
                <div class="side side-17"></div>
                <div class="side side-18"></div>
                <div class="side side-19"></div>
                <div class="side side-20"></div> 
                </div>`;
            diceContainer.appendChild(newDice);
        } else {
            alert("You can only add up to 5 dice.");
        }
    }

    // Function to remove a die
    function removeDice() {
        if (numberOfDice > 1) {
            numberOfDice--;
            diceContainer.removeChild(diceContainer.lastChild);
        } else {
            alert("At least one die must remain.");
        }
    }

    // Function to roll all D20 dice
    function rollDice() {
        let total = 0;
        const dice = diceContainer.querySelectorAll(".ikosaeder");
    
        dice.forEach((die) => {
            // Remove the animation class before adding it again to restart the animation
            die.classList.remove("rolling");
    
            // Trigger a reflow to allow re-adding the animation class
            void die.offsetWidth;
    
            // Add the animation class to start the animation
            die.classList.add("rolling");
    
            // Generate a random result between 1 and 20
            const result = Math.floor(Math.random() * 20) + 1;
            total += result;
        });
    
        // Wait for the animations to complete before displaying the result
        setTimeout(() => {
            resultDisplay.textContent = `Result: ${total}`;
            resultDisplay.style.display = "block";
    
            dice.forEach((die) => {
                die.classList.add("sineMovement");
            });
        }, 3000);
    }

    // Function to handle the roll event
    function handleRollEvent() {
        playSound(); // Play the sound when rolling dice
        rollDice();  // Roll the dice
    }

    // Attach event listeners to buttons
    addDiceButton.addEventListener("click", addDice);
    removeDiceButton.addEventListener("click", removeDice);
    rollButton.addEventListener("click", handleRollEvent);
    diceContainer.addEventListener("click", handleRollEvent);
});

// Play sound function
function playSound() {
    const diceSound = document.getElementById("dice-sound");
    if (diceSound) {
        diceSound.play().catch((error) => {
            console.error("Error playing sound:", error);
        });
    }
}

window.onload=handleRollEvent;