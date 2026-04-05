const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('otiweb')
        .setDescription('Muestra el sitio web oficial de Ø𝐓𝐈'),

    run: async (client, interaction) => {
        const embed = new EmbedBuilder()
            .setTitle('🌐 Sitio web oficial de Ø𝐓𝐈')
            .setDescription('Haz clic en el botón de abajo para visitar la página oficial del bot.')
            .setColor('#00ffe0') // Aqua
            .setFooter({
                text: 'Ø𝐓𝐈 • Código abierto y en expansión',
                iconURL: client.user.displayAvatarURL()
            })
            .setTimestamp();

        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel('Ir al sitio web')
                .setStyle(ButtonStyle.Link)
                .setURL('https://thekururu.github.io/-/')
        );

        await interaction.reply({
            embeds: [embed],
            components: [button],
            ephemeral: true // 🔒 Solo lo ve quien ejecuta el comando
        });
    }
};