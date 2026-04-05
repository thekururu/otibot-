const { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, ChannelType } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  emiter: "on",
  run: async (client, interaction) => {

    // ======================
    // 📌 COMANDOS SLASH
    // ======================
    if (interaction.isChatInputCommand()) {
      const command = client.slashCommands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.run(client, interaction);
      } catch (err) {
        console.log("💥 ERROR COMANDO:", err);

        try {
          if (interaction.replied || interaction.deferred) {
            await interaction.editReply("❌ Error.");
          } else {
            await interaction.reply("❌ Error.");
          }
        } catch {}
      }
    }

    // ======================
    // 📌 BOTONES
    // ======================
    if (interaction.isButton()) {

      // 🎫 CREAR TICKET
      if (interaction.customId === "create_ticket") {
        try {
          await interaction.deferReply({ ephemeral: true });

          const existingTicket = interaction.guild.channels.cache.find(
            ch => ch.name === `ticket-${interaction.user.username.toLowerCase()}`
          );

          if (existingTicket) {
            return interaction.editReply(`❌ Ya tienes un ticket abierto: ${existingTicket}`);
          }

          const ticketChannel = await interaction.guild.channels.create({
            name: `ticket-${interaction.user.username}`,
            type: ChannelType.GuildText,
            parent: interaction.channel.parent,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel],
              },
              {
                id: interaction.user.id,
                allow: [
                  PermissionsBitField.Flags.ViewChannel,
                  PermissionsBitField.Flags.SendMessages,
                  PermissionsBitField.Flags.ReadMessageHistory
                ],
              },
              {
                id: client.user.id,
                allow: [
                  PermissionsBitField.Flags.ViewChannel,
                  PermissionsBitField.Flags.SendMessages,
                  PermissionsBitField.Flags.ReadMessageHistory
                ],
              },
            ],
          });

          const embed = new EmbedBuilder()
            .setTitle("🎫 Ticket Creado")
            .setDescription(`Hola ${interaction.user}, describe tu problema.`)
            .setColor("#00ff88")
            .setTimestamp();

          const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId("close_ticket")
              .setLabel("Cerrar Ticket")
              .setStyle(ButtonStyle.Danger)
              .setEmoji("🔒")
          );

          await ticketChannel.send({
            content: `${interaction.user}`,
            embeds: [embed],
            components: [row]
          });

          await interaction.editReply(`✅ Ticket creado: ${ticketChannel}`);

        } catch (error) {
          console.error("💥 ERROR TICKET:", error);

          if (interaction.deferred || interaction.replied) {
            await interaction.editReply("❌ Error al crear ticket.");
          } else {
            await interaction.reply({ content: "❌ Error.", ephemeral: true });
          }
        }
      }

      // 🔒 CERRAR TICKET
      if (interaction.customId === "close_ticket") {
        try {
          await interaction.reply("🔒 Cerrando ticket en 5 segundos...");

          setTimeout(() => {
            interaction.channel.delete().catch(console.error);
          }, 5000);

        } catch (error) {
          console.error("💥 ERROR CERRAR:", error);

          if (!interaction.replied) {
            await interaction.reply({ content: "❌ Error.", ephemeral: true });
          }
        }
      }
    }

  },
};