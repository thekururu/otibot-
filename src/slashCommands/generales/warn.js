
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Database = require(''); //replazar por data base
const db = new Database();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Dar una advertencia a un usuario")
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuario a advertir')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('razon')
                .setDescription('Razón de la advertencia')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    
    run: async (client, interaction) => {
        const targetUser = interaction.options.getUser('usuario');
        const reason = interaction.options.getString('razon');
        const moderator = interaction.user;
        const guild = interaction.guild;
        
       
        if (targetUser.id === moderator.id) {
            return interaction.reply({
                content: '❌ No puedes advertirte a ti mismo.',
                ephemeral: true
            });
        }
        
  
        const member = await guild.members.fetch(targetUser.id).catch(() => null);
        if (!member) {
            return interaction.reply({
                content: '❌ El usuario no está en este servidor.',
                ephemeral: true
            });
        }
        
       
        const warnsKey = `warns_${guild.id}_${targetUser.id}`;
        let warns = await db.get(warnsKey) || [];
        

        const newWarn = {
            id: warns.length + 1,
            reason: reason,
            moderator: moderator.id,
            moderatorTag: moderator.tag,
            date: new Date().toISOString(),
            timestamp: Date.now()
        };
        
        warns.push(newWarn);
        await db.set(warnsKey, warns);
        
    
        const dmEmbed = new EmbedBuilder()
            .setTitle('⚠️ Has recibido una advertencia')
            .setDescription(`Has recibido una advertencia en **${guild.name}**`)
            .addFields(
                { name: '📋 Razón', value: reason, inline: false },
                { name: '👮 Moderador', value: `${moderator.tag}`, inline: true },
                { name: '📅 Fecha', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true },
                { name: '📊 Total de advertencias', value: `${warns.length}`, inline: true }
            )
            .setColor('#ffaa00')
            .setFooter({ 
                text: `${guild.name} • Advertencia #${newWarn.id}`, 
                iconURL: guild.iconURL() 
            })
            .setTimestamp();
    
        try {
            await targetUser.send({ embeds: [dmEmbed] });
        } catch (error) {
            console.log(`No se pudo enviar DM a ${targetUser.tag}`);
        }
        
      
        const confirmEmbed = new EmbedBuilder()
            .setTitle('✅ Advertencia aplicada')
            .setDescription(`Se ha advertido exitosamente a **${targetUser.tag}**`)
            .addFields(
                { name: '👤 Usuario', value: `${targetUser.tag} (${targetUser.id})`, inline: true },
                { name: '📋 Razón', value: reason, inline: true },
                { name: '📊 Total de advertencias', value: `${warns.length}`, inline: true }
            )
            .setColor('#00ff88')
            .setFooter({ 
                text: `Moderador: ${moderator.tag}`, 
                iconURL: moderator.displayAvatarURL() 
            })
            .setTimestamp();
        
        await interaction.reply({
            embeds: [confirmEmbed],
            ephemeral: false
        });
    }
};
