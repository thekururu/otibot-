const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Información de un usuario")
        .addUserOption(option =>
            option.setName("usuario")
                .setDescription("Usuario")
                .setRequired(false)
        ),

    run: async (client, interaction) => {

        const user = interaction.options.getUser("usuario") || interaction.user;
        const member = interaction.guild.members.cache.get(user.id);

        const embed = new EmbedBuilder()
            .setTitle(user.username)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: "ID", value: user.id },
                { name: "Cuenta creada", value: `<t:${parseInt(user.createdTimestamp / 1000)}:R>` },
                { name: "Se unió", value: `<t:${parseInt(member.joinedTimestamp / 1000)}:R>` }
            )
            .setColor("#00FFAA");

        await interaction.reply({ embeds: [embed] });
    }
};