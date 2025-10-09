/*
La Epica Hora de Aventura
Juego desarrollado por Alexander Andaluz
Utilizando el Lenguaje "JavaScript" 2025
*/

const readline = require("readline-sync");


// Title
console.log("Bienvenido al juego de Aventura")

// Welcome
console.log("Preparate para una aventura epica")

let playerName = "";
let health = 100;
let playerGold = 20;
let location = "Aldea";
let gameRunning = true;
let inventory = [];

// Get player name using readline-sync
playerName = readline.question("Cual es tu nmbre, aventurero? ");
// // Check if input is valid using if/else
if (playerName.trim() === "") {
    playerName = "Aventurero Desconocido";
    console.log("No has introducido un nombre. Tu nombre por defecto es 'Aventurero Desconocido'.");
// Display welcome message and starting stats
} else {
    console.log(`Bienvenido, ${playerName}! Que comience la aventura!`);
}

// Create variables for player stats
let strength = 10;
let agility = 10;
let intelligence = 10;
let weaponDamage = 0;

// Create variable to track weapon damage
let weapon = "Puño";
let weaponptions = {
    "Espada": 15,
    "Arco": 12,
    "Baculo": 10
};




// Function to display current stats
function displayStats() {
    console.log(`\n--- Estadisticas de ${playerName} ---`);
    console.log(`Salud: ${health}`);
    console.log(`Oro: ${playerGold}`);
    console.log(`Ubicacion: ${location}`);
    console.log(`Fuerza: ${strength}`);
    console.log(`Agilidad: ${agility}`);
    console.log(`Inteligencia: ${intelligence}`);
    console.log(`Arma: ${weapon} (Daño: ${weaponDamage})`);
    console.log(`Inventario: ${inventory.length > 0 ? inventory.join(", ") : "Vacio"}`);
    console.log('-----------------------------------\n');
}


 // Setup a simple monster defense value
let monsterDefense = 5;

// Function to handle combat
function combat() {
    console.log("¡Un monstruo aparece!");
    let monsterHealth = 50;
    while (monsterHealth > 0 && health > 0) {   
        let action = readline.question("Que quieres hacer? (atacar/hablar/huir): ").toLowerCase();
        if (action === "atacar") {
            let damage = strength + weaponDamage - monsterDefense;
            monsterHealth -= damage;
            console.log(`Atacas al monstruo y le haces ${damage} de daño. Salud del monstruo: ${monsterHealth}`);
            if (monsterHealth <= 0) {
                if (Math.random() < 0.3) {
                    console.log("¡El monstruo ha dejado caer una pocion de salud!");
                    inventory.push("Pocion de salud");
                }
                if (Math.random() < 0.2) {
                    console.log("¡El monstruo ha dejado caer una arma!");
                    let droppedWeapon = Object.keys(weaponptions)[Math.floor(Math.random() * Object.keys(weaponptions).length)];
                    inventory.push(droppedWeapon);
                    console.log(`Has recogido un ${droppedWeapon}.`);
                }

                console.log("¡Has derrotado al monstruo!");
                let goldEarned = Math.floor(Math.random() * 20) + 10;
                playerGold += goldEarned;
                console.log(`Has ganado ${goldEarned} de oro. Oro total: ${playerGold}`);
                return;
            }
            // Monster attacks back
            let monsterDamage = 10;
            health -= monsterDamage;
            console.log(`El monstruo te ataca y te hace ${monsterDamage} de daño. Tu salud: ${health}`);
            if (health <= 0) {
                console.log("¡Has sido derrotado por el monstruo!");
                gameRunning = false;
                return;
            }
        } else if (action === "hablar") {
            console.log("Intentas hablar con el monstruo, pero n entiende.");
        } else if (action === "huir") {
            console.log("Huyes del combate.");
            return;
        }
    }
}



// Set healing potion restoration value
let healingPotionValue = 30;


//location village, blacksmith, market, forest
function visitLocation() {
    console.log(`\nEstas en la ${location}. A donde quieres ir?`);
    console.log("1. Aldea");
    console.log("2. Herreria");
    console.log("3. Mercado");
    console.log("4. Bosque");
    console.log("5. Salir del juego");
    let choice = readline.question("Elige una opcion (1-5): ");
    switch (choice) {
        case "1":
            location = "Aldea";
            console.log("Regresas a la Aldea.");
            break;
        case "2":
            location = "Herreria";
            console.log("Visitas la Herreria.");
            break   ;
        case "3":
            location = "Mercado";
            console.log("Visitas el Mercado.");
            break;
        case "4":
            location = "Bosque";
            console.log("Te adentras en el Bosque.");
            break;
        case "5":
            gameRunning = false;
            console.log("Gracias por jugar. ¡Hasta la proxima aventura!");
            break;
        default:
            console.log("Opcion n valida. Permanece en la ubicacion actual.");
            return
    }

    // variable to track if it's the first visit
    let firstVisit = true;

    if (location === "Herreria") {
        if (firstVisit) {
            console.log("Bienvenido a la Herreria. Aqui puedes comprar armas.");
            firstVisit = false;
        }
        console.log("Armas disponibles:");
        Object.keys(weaponptions).forEach((w, index) => {
            console.log(`${index + 1}. ${w} (Daño: ${weaponptions[w]}, Costo: 15 oro)`);
        });
        let weaponChoice = readline.question("Que arma quieres comprar? (numero o 'salir' para salir): ");
        if (weaponChoice.toLowerCase() === "salir") {
            return;
        }
        let weaponIndex = parseInt(weaponChoice) - 1;
        let selectedWeapon = Object.keys(weaponptions)[weaponIndex];
        if (selectedWeapon && playerGold >= 15) {
            weapon = selectedWeapon;
            weaponDamage = weaponptions[selectedWeapon];
            playerGold -= 15;
            console.log(`Has comprado un ${weapon}. Tu oro restante: ${playerGold}`);
        } else {
            console.log("no tienes suficiente oro o la opcion es invalida.");
        }   
    } else if (location === "Mercado") {
        console.log("Bienvenido al Mercado. Aqui puedes comprar pociones de salud.");
        console.log("Pocion de salud (Restaura 30 de salud) - Costo: 10 oro");
        let potionChoice = readline.question("Quieres comprar una pocion? (si/n): ").toLowerCase();
        if (potionChoice === "s" && playerGold >= 10) {
            inventory.push("Pocion de salud");
            playerGold -= 10;
            console.log(`Has comprado una pocion de salud. Tu oro restante: ${playerGold}`);
        }
    } else if (location === "Bosque") {
        combat();
    } else if (location === "Aldea") {
        console.log("Estas en la Aldea. Puedes descansar aqui.");
        let restChoice = readline.question("Quieres descansar para recuperar salud? (s/n): ").toLowerCase();
        if (restChoice === "s") {
            health = Math.min(100, health + 20);
            console.log(`Has descansado y recuperado salud. Salud actual: ${health}`);
        }
    }
}

 // Create for loop to check inventory slots
function usePotion(){
 for (let i = 0; i < inventory.length; i++) {
    if (inventory[i] === "Pocion de salud") {
        let usePotion = readline.question("Quieres usar una pocion de salud? (s/n): ").toLowerCase();   
        if (usePotion === "s") {
            health = Math.min(100, health + healingPotionValue);
            inventory.splice(i, 1);
            console.log(`Has usado una pocion de salud. Salud actual: ${health}`);
            break; // Exit loop after using one potion
        }
    }
 }
 };
 

            




// Initial Game
gameRunning = true;
while (gameRunning) {
    displayStats();
    visitLocation();
    usePotion();
    
    if (health <= 0) {
        console.log("Has perdido toda tu salud. Fin del juego.");
        gameRunning = false;
    }
    let continueChoice = readline.question("Quieres continuar jugando? (s/n): ").toLowerCase();
    if (continueChoice !== "s") {
        gameRunning = false;
        console.log("Gracias por jugar. ¡Hasta la proxima aventura!");
    }
} 