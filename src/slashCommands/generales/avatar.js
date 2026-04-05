const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Muestra el avatar de un usuario")
        .addUserOption(option =>
            option.setName("usuario")
                .setDescription("Usuario")
                .setRequired(false)
        ),

    run: async (client, interaction) => {

        const user = interaction.options.getUser("usuario") || interaction.user;

        const embed = new EmbedBuilder()
            .setTitle(`Avatar de ${user.username}`)
            .setImage(user.displayAvatarURL({ size: 1024 }))
            .setColor("#00FFFF");

        await interaction.reply({ embeds: [embed] });
    }
};