const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('developer')
        .setDescription('Accede al Developer Portal de Discord'),

    run: async (client, interaction) => {
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel('Abrir Developer Portal')
                .setStyle(ButtonStyle.Link)
                .setURL('https://discord.com/developers/applications')
        );

        await interaction.reply({
            content: 'Haz clic en el botón para abrir el **Developer Portal de Discord**:',
            components: [row],
            ephemeral: true 
        });
    }
};
