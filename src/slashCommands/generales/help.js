
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Muestra todos los comandos disponibles del bot"),
    
    run: async (client, interaction) => {
        // Obtener todos los comandos del bot
        const commands = client.slashCommands;
        
        const helpEmbed = new EmbedBuilder()
            .setTitle('📋 Lista de Comandos')
            .setDescription('Aquí tienes todos los comandos disponibles:')
            .setColor('#ffffff')
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({ 
                text: `${interaction.guild.name} • Total de comandos: ${commands.size}`, 
                iconURL: interaction.guild.iconURL() 
            })
            .setTimestamp();

        // Agrupar comandos por categorías
        const categories = {};
        
        commands.forEach((command, name) => {
            // Usar una categoría fija para evitar problemas con rutas
            const category = 'Generales';
            
            if (!categories[category]) {
                categories[category] = [];
            }
            
            categories[category].push({
                name: name,
                description: command.data.description
            });
        });

        // Agregar campos al embed por categoría
        Object.entries(categories).forEach(([category, categoryCommands]) => {
            const commandList = categoryCommands.map(cmd => 
                `\`/${cmd.name}\` - ${cmd.description}`
            ).join('\n');
            
            helpEmbed.addFields({
                name: `📁 ${category}`,
                value: commandList || 'No hay comandos en esta categoría',
                inline: false
            });
        });

        // Información adicional
        helpEmbed.addFields(
            { 
                name: '🔧 Información del Bot', 
                value: `**Versión:** Discord.js v14\n**Ping:** ${client.ws.ping}ms\n**Uptime:** <t:${Math.floor((Date.now() - client.uptime) / 1000)}:R>`, 
                inline: true 
            },
            { 
                name: '📊 Estadísticas', 
                value: `**Servidores:** ${client.guilds.cache.size}\n**Usuarios:** ${client.users.cache.size}\n**Canales:** ${client.channels.cache.size}`, 
                inline: true 
            }
        );

        await interaction.reply({
            embeds: [helpEmbed],
            ephemeral: false
        });
    }
};
