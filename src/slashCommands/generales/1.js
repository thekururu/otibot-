const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Muestra información básica del servidor.'),

    run: async (client, interaction) => {
        await interaction.reply(`📌 Este servidor se llama **${interaction.guild.name}** y tiene **${interaction.guild.memberCount} miembros**.`);
    }
};