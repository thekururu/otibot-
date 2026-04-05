const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("Obtén el enlace de invitación del bot"),
    
    run: async (client, interaction) => {
        const inviteLink = "https://discord.com/oauth2/authorize?client_id=1398747352264609822&permissions=8&integration_type=0&scope=bot+applications.commands";
        
        const inviteEmbed = new EmbedBuilder()
            .setTitle('🤖 Invitar Bot')
            .setDescription('¡Gracias por querer invitar este bot a tu servidor!')
            .addFields(
                {
                    name: '🔗 Enlace de Invitación',
                    value: `[Haz clic aquí para invitar el bot](${inviteLink})`,
                    inline: false
                },
                {
                    name: '📋 Enlace directo:',
                    value: `\`\`\`${inviteLink}\`\`\``,
                    inline: false
                },
                {
                    name: '⚠️ Permisos requeridos:',
                    value: '• Enviar mensajes\n• Usar comandos de barra\n• Gestionar canales\n• Ver canales',
                    inline: false
                }
            )
            .setColor('#00ff88')
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({ 
                text: `${interaction.guild.name} • Bot desarrollado con Discord.js y bds2 scrip`, 
                iconURL: interaction.guild.iconURL() 
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [inviteEmbed],
            ephemeral: false
        });
    }
};