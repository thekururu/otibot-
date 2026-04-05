const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Crea un embed personalizado")

        // OBLIGATORIOS
        .addStringOption(option =>
            option.setName("titulo")
                .setDescription("Título del embed")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("texto")
                .setDescription("Contenido del embed")
                .setRequired(true)
        )

        // OPCIONALES
        .addStringOption(option =>
            option.setName("thumbnail")
                .setDescription("URL del thumbnail")
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName("imagen")
                .setDescription("URL de imagen grande")
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName("footer")
                .setDescription("Texto del pie de página")
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName("color")
                .setDescription("Color del embed")
                .setRequired(false)
                .addChoices(
                    { name: "Rojo", value: "rojo" },
                    { name: "Azul Rey", value: "azul" },
                    { name: "Verde", value: "verde" },
                    { name: "Blanco", value: "blanco" },
                    { name: "Negro", value: "negro" }
                )
        ),

    run: async (client, interaction) => {

        const titulo = interaction.options.getString("titulo");
        const texto = interaction.options.getString("texto");
        const thumbnailUrl = interaction.options.getString("thumbnail");
        const imageUrl = interaction.options.getString("imagen");
        const footerText = interaction.options.getString("footer");
        const colorSeleccionado = interaction.options.getString("color");

        const colores = {
            rojo: "#FF0000",
            azul: "#0033A0",
            verde: "#00FF00",
            blanco: "#FFFFFF",
            negro: "#000000"
        };

        const embed = new EmbedBuilder()
            .setTitle(titulo)
            .setDescription(texto)
            .setColor(colores[colorSeleccionado] || "#FFD700");

        // Thumbnail opcional
        if (thumbnailUrl) {
            if (!thumbnailUrl.startsWith("http")) {
                return interaction.reply({
                    content: "❌ La URL del thumbnail no es válida.",
                    ephemeral: true
                });
            }
            embed.setThumbnail(thumbnailUrl);
        }

        // Imagen opcional
        if (imageUrl) {
            if (!imageUrl.startsWith("http")) {
                return interaction.reply({
                    content: "❌ La URL de la imagen no es válida.",
                    ephemeral: true
                });
            }
            embed.setImage(imageUrl);
        }

        // Footer opcional
        if (footerText) {
            embed.setFooter({ text: footerText });
        }

        await interaction.channel.send({ embeds: [embed] });

        await interaction.reply({
            content: "✅ Embed enviado correctamente.",
            ephemeral: true
        });
    }
};