
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Database = require(''); //remplazr por data base
const db = new Database();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warnings")
        .setDescription("Ver las advertencias de un usuario")
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuario del que ver las advertencias')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    
    run: async (client, interaction) => {
        const targetUser = interaction.options.getUser('usuario');
        const guild = interaction.guild;
        
        
        const warnsKey = `warns_${guild.id}_${targetUser.id}`;
        const warns = await db.get(warnsKey) || [];
        
        if (warns.length === 0) {
            return interaction.reply({
                content: `✅ **${targetUser.tag}** no tiene advertencias.`,
                ephemeral: true
            });
        }
        
        const warningsEmbed = new EmbedBuilder()
            .setTitle(`⚠️ Advertencias de ${targetUser.tag}`)
            .setDescription(`Usuario: ${targetUser.tag} (${targetUser.id})`)
            .setColor('#ffaa00')
            .setThumbnail(targetUser.displayAvatarURL())
            .setFooter({ 
                text: `${guild.name} • Total: ${warns.length} advertencias`, 
                iconURL: guild.iconURL() 
            })
            .setTimestamp();
        
        // Mostrar las últimas 10 advertencias
        const recentWarns = warns.slice(-10);
        
        recentWarns.forEach(warn => {
            const date = new Date(warn.date);
            warningsEmbed.addFields({
                name: `⚠️ Advertencia #${warn.id}`,
                value: `**Razón:** ${warn.reason}\n**Moderador:** ${warn.moderatorTag}\n**Fecha:** <t:${Math.floor(warn.timestamp / 1000)}:F>`,
                inline: false
            });
        });
        
        if (warns.length > 10) {
            warningsEmbed.setDescription(`Usuario: ${targetUser.tag} (${targetUser.id})\n\n*Mostrando las últimas 10 advertencias de ${warns.length} totales*`);
        }
        
        await interaction.reply({
            embeds: [warningsEmbed],
            ephemeral: true
        });
    }
};
