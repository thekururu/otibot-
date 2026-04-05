const { SlashCommandBuilder } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("chiste")
        .setDescription("Te cuenta un chiste aleatorio"),
    run: async (client, interaction) => {
        try {
            // Ruta al archivo chistes.txt
            const filePath = path.join(__dirname, "../../data/chistes.txt");
            
            // Leer todos los chistes
            const contenido = fs.readFileSync(filePath, "utf-8");
            const chistes = contenido.split("\n").filter(line => line.trim() !== "");
            
            if (!chistes.length) {
                return interaction.reply("😅 No hay chistes disponibles ahora.");
            }

            // Elegir uno al azar
            const chiste = chistes[Math.floor(Math.random() * chistes.length)];
            await interaction.reply(`😂 ${chiste}`);
        } catch (err) {
            console.error("Error al leer los chistes:", err);
            await interaction.reply("❌ Ocurrió un error al obtener el chiste.");
        }
    }
};