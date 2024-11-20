document.addEventListener("DOMContentLoaded", function() {
    const diceContainer = document.querySelector(".dice-area");
    const resultDisplay = document.getElementById("result-display");
    const rollButton = document.getElementById("roll-button");
    const addDiceButton = document.getElementById("add-dice-button");
    const removeDiceButton = document.getElementById("remove-dice-button");

    let numberOfDice = 1;
    const maxDice = 5;


    // Function to add a D4 die
    function addDice() {
        if (numberOfDice < maxDice) {
            numberOfDice++;
            const newDice = document.createElement("div");
            newDice.classList.add("pyramid_box");
            newDice.innerHTML = `
                <div class="glow_box"></div>
                <div>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `;
            diceContainer.appendChild(newDice);
        } else {
            alert("You can only add up to 5 dice.");
        }
    }

    // Function to remove a D4 die
    function removeDice() {
        if (numberOfDice > 1) {
            numberOfDice--;
            diceContainer.removeChild(diceContainer.lastChild);
        } else {
            alert("At least one die must remain.");
        }
    }

    // Function to roll all D4 dice
    function rollDice() {
        let total = 0;
        const dice = diceContainer.querySelectorAll(".pyramid_box");

        // To ensure the result is displayed after all animations are complete, use setTimeout
        dice.forEach((die) => {
            // Randomly select an animation (1, 2, or 3)
            const randomAnimation = Math.floor(Math.random() * 2) + 1;

            // Remove any existing rolling classes to reset the animation
            die.classList.remove("rolling-1", "rolling-2","rolling-3");

            // Add the selected animation class
            die.classList.add(`rolling-${randomAnimation}`);

            // Generate a random roll result between 1 and 4
            const result = Math.floor(Math.random() * 4) + 1;
            total += result;
        });

        // Wait for the animations to complete (1s) before displaying the result
        setTimeout(() => {
            resultDisplay.textContent = `Result: ${total}`;
            resultDisplay.style.display = "block";

            dice.forEach((die) => {
                die.classList.remove("rolling-1", "rolling-2", "rolling-3"); // Ensure rolling classes are removed
                die.classList.add("sineMovement"); // Re-add sine movement class
            });
        }, 3000); // This matches the animation duration of 1s
    }

    // Attach event listeners to buttons
    addDiceButton.addEventListener("click", addDice);
    removeDiceButton.addEventListener("click", removeDice);
    rollButton.addEventListener("click", function(){
        playSound(); // Play the sound when rolling dice
        rollDice();  // Roll the dice
    });
});


function playSound() {
    const diceSound = document.getElementById("dice-sound");
    if (diceSound) {
        diceSound.play().catch((error) => {
            console.error("Error playing sound:", error);
        });
    }
}