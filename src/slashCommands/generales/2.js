const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mensaje")
        .setDescription("Envía un mensaje al canal")
        .addStringOption(option =>
            option.setName("mensaje")
                .setDescription("Contenido del mensaje")
                .setRequired(true)
        ),

    run: async (client, interaction) => {
        const mensaje = interaction.options.getString("mensaje");

        await interaction.channel.send(mensaje);

        await interaction.reply({ content: "✅ Mensaje enviado.", ephemeral: true });
    }
};
