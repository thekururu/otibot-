const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("search")
        .setDescription("Asistente IA gratis")
        .addStringOption(option =>
            option.setName("pregunta")
                .setDescription("¿Qué quieres preguntar?")
                .setRequired(true)
        ),

//configurar asistente de ia
