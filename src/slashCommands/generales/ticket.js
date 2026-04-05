const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket")
        .setDescription("Sistema de tickets")
        .addSubcommand(subcommand =>
            subcommand
                .setName("setup")
                .setDescription("Configura el panel de tickets")
                .addChannelOption(option =>
                    option.setName("canal")
                        .setDescription("Canal donde crear el panel")
                        .setRequired(true)
                )
        ),

    run: async (client, interaction) => {
        if (interaction.options.getSubcommand() === 'setup') {
            // Verificar permisos de administrador
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                return interaction.reply({ 
                    content: '❌ Necesitas permisos de administrador para usar este comando.', 
                    ephemeral: true 
                });
            }

            const channel = interaction.options.getChannel('canal');

            // Crear embed del panel de tickets
            const ticketEmbed = new EmbedBuilder()
                .setTitle('🎫 Sistema de Tickets')
                .setDescription('¿Necesitas ayuda o tienes alguna consulta?\n\n' +
                             '**Instrucciones:**\n' +
                             '• Haz clic en el botón "Crear Ticket"\n' +
                             '• Se creará un canal privado para ti\n' +
                             '• Describe tu problema o consulta\n' +
                             '• El staff te ayudará lo antes posible')
                .addFields(
                    { name: '📋 Tipos de Soporte', value: '• Soporte técnico\n• Reportar problemas\n• Consultas generales\n• Sugerencias', inline: true },
                    { name: '⏰ Tiempo de Respuesta', value: 'Generalmente respondemos\nen menos de 24 horas', inline: true }
                )
                .setColor('#ffffff')
                .setFooter({ 
                    text: `${interaction.guild.name} • Sistema de Tickets`, 
                    iconURL: interaction.guild.iconURL() 
                })
                .setTimestamp();

            // Crear botón para crear ticket
            const ticketButton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('create_ticket')
                        .setLabel('Crear Ticket')
                        .setStyle(ButtonStyle.Success)
                        .setEmoji('🎫')
                );

            try {
                await channel.send({ 
                    embeds: [ticketEmbed], 
                    components: [ticketButton] 
                });

                await interaction.reply({ 
                    content: `✅ Panel de tickets configurado correctamente en ${channel}`, 
                    ephemeral: true 
                });
            } catch (error) {
                console.error('Error al enviar el panel de tickets:', error);
                await interaction.reply({ 
                    content: '❌ Error al configurar el panel de tickets. Verifica los permisos del bot.', 
                    ephemeral: true 
                });
            }
        }
    }
};