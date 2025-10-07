/*
La Epíca Hora de Aventura
Juego desarrollado por Alexander Andaluz
Utilizando el Lenguaje "JavaScript" 2025
*/

const readline = require("readline-sync");


// Título
console.log("Bienvenido al juego de Aventura")

// Bienvenida
console.log("Preparate para una aventura épica")

let playerName = "";
let health = 100;
let playerGold = 20;
let location = "Aldea";
let gameRunning = true;
let inventory = [];

// Get player name using readline-sync
playerName = readline.question("Cual es tu nombre, aventurero? ");


// Create variables for player stats
let strength = 10;
let agility = 10;
let intelligence = 10;

// Display welcome message and starting stats
console.log(`¡Bienvenido, ${playerName}! Tu aventura comienza ahora.`);
console.log(`Salud: ${health}, Fuerza: ${strength}, Agilidad: ${agility}, Inteligencia: ${intelligence}, Oro: ${playerGold}`);