function rollDice() {
    const dice = [...document.querySelectorAll(".die-list")];
    let total = 0;
    dice.forEach(die => {
        toggleClasses(die);
        const roll = getRandomNumber(1, 6);
        die.dataset.roll = roll;
        total += roll;
    });
    // Display the total result
    document.querySelector(".result-display").style.display = "block";
    document.getElementById("result-display").innerHTML = `Total Result is: ${total}`;
}

function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playSound() {
    const diceSound = document.getElementById("dice-sound");
    diceSound.play();
}

function handleRollEvent(){
    playSound();
    rollDice();
}

    const diceContainer = document.querySelector(".dice");
    document.getElementById("roll-button").addEventListener("click", handleRollEvent);
    diceContainer.addEventListener("click", handleRollEvent);

document.getElementById("add-dice-button").addEventListener("click", function() {
    addDice();
});

function addDice() {
    const maxDice = 5; // Set the maximum number of dice
    const diceContainer = document.querySelector(".dice");

    // Check the current number of dice
    const currentDiceCount = diceContainer.querySelectorAll(".dice-container").length;
    
    if (currentDiceCount >= maxDice) {
        alert(`You can only add up to ${maxDice} dice.`);
        return; // Exit the function if the limit is reached
    }

    // Clone the existing dice container that includes the animation class
    const existingDieContainer = document.querySelector(".dice-container");
    const newDieContainer = existingDieContainer.cloneNode(true);

    // Update IDs and reset the die state
    const dieCount = currentDiceCount + 1; // Updated count for new die
    const newDieList = newDieContainer.querySelector(".die-list");
    newDieList.id = 'die-' + dieCount;
    newDieList.dataset.roll = 1;

    // Append the new die container to the dice container
    diceContainer.appendChild(newDieContainer);
}


document.getElementById("remove-dice-button").addEventListener("click", function() {
    removeDice();
});

function removeDice() {
    const diceContainer = document.querySelector(".dice");
    const diceContainers = diceContainer.querySelectorAll(".dice-container");
    if (diceContainers.length > 1) { // Ensure at least one die remains
        const lastDieContainer = diceContainers[diceContainers.length - 1];
        diceContainer.removeChild(lastDieContainer);
    } else {
        alert("At least one die must remain.");
    }
}

