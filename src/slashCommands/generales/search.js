const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("search")
        .setDescription("Asistente IA gratis")
        .addStringOption(option =>
            option.setName("pregunta")
                .setDescription("¿Qué quieres preguntar?")
                .setRequired(true)
        ),

    run: async (client, interaction) => {
        try {
            // 🔥 RESPUESTA INMEDIATA (ANTI 10062)
            await interaction.reply("⏳ Pensando...");

            const pregunta = interaction.options.getString("pregunta");

            let texto;

            try {
                const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(pregunta)}`);
                texto = await res.text();
            } catch (err) {
                console.error("💥 ERROR FETCH:", err);
                texto = "❌ Error al conectar con la IA.";
            }

            // 🔥 EVITA MENSAJE VACÍO
            if (!texto || texto.trim().length === 0) {
                texto = "⚠️ La IA no respondió. Intenta otra pregunta.";
            }

            // 🔥 LIMITE DISCORD
            texto = texto.slice(0, 2000);

            await interaction.editReply(texto);

        } catch (error) {
            console.error("💥 ERROR GENERAL:", error);

            try {
                if (interaction.replied) {
                    await interaction.editReply("❌ Error general.");
                } else {
                    await interaction.reply("❌ Error general.");
                }
            } catch {}
        }
    }
};