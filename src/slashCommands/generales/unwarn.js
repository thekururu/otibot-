const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Database = require(''); //cambiar por alguna data base 
const db = new Database();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unwarn")
        .setDescription("Quitar una advertencia a un usuario")
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuario al que quitar la advertencia')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('id')
                .setDescription('ID de la advertencia a quitar')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    run: async (client, interaction) => {
        const targetUser = interaction.options.getUser('usuario');
        const warnId = interaction.options.getInteger('id');
        const moderator = interaction.user;
        const guild = interaction.guild;


        const warnsKey = `warns_${guild.id}_${targetUser.id}`;
        let warns = await db.get(warnsKey) || [];

        if (warns.length === 0) {
            return interaction.reply({
                content: `❌ **${targetUser.tag}** no tiene advertencias.`,
                ephemeral: true
            });
        }


        const warnIndex = warns.findIndex(warn => warn.id === warnId);

        if (warnIndex === -1) {
            return interaction.reply({
                content: `❌ No se encontró una advertencia con ID **${warnId}** para **${targetUser.tag}**.`,
                ephemeral: true
            });
        }


        const removedWarn = warns[warnIndex];

        
        warns.splice(warnIndex, 1);
        await db.set(warnsKey, warns);


        const unwarnEmbed = new EmbedBuilder()
            .setTitle('✅ Advertencia removida')
            .setDescription(`Se ha removido exitosamente la advertencia de **${targetUser.tag}**`)
            .addFields(
                { name: '👤 Usuario', value: `${targetUser.tag} (${targetUser.id})`, inline: true },
                { name: '🆔 ID de advertencia', value: `${warnId}`, inline: true },
                { name: '📊 Advertencias restantes', value: `${warns.length}`, inline: true },
                { name: '📋 Razón original', value: removedWarn.reason, inline: false },
                { name: '👮 Moderador original', value: removedWarn.moderatorTag, inline: true },
                { name: '📅 Fecha original', value: `<t:${Math.floor(removedWarn.timestamp / 1000)}:F>`, inline: true }
            )
            .setColor('#ff6b6b')
            .setFooter({ 
                text: `Removido por: ${moderator.tag}`, 
                iconURL: moderator.displayAvatarURL() 
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [unwarnEmbed],
            ephemeral: false
        });
    }
};
