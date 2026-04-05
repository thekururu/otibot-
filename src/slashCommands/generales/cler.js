const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Borra mensajes")
        .addIntegerOption(option =>
            option.setName("cantidad")
                .setDescription("Número de mensajes")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    run: async (client, interaction) => {

        const cantidad = interaction.options.getInteger("cantidad");

        if (cantidad < 1 || cantidad > 100) {
            return interaction.reply({
                content: "❌ Debe ser entre 1 y 100",
                ephemeral: true
            });
        }

        await interaction.channel.bulkDelete(cantidad, true);

        await interaction.reply({
            content: `🧹 ${cantidad} mensajes borrados`,
            ephemeral: true
        });
    }
};