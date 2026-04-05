const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

// Ruta correcta a datos.txt desde src/slashCommands/generales/datos.js
const filePath = path.join(__dirname, "../../data/datos.txt");

const datos = {};

try {
    if (!fs.existsSync(filePath)) {
        console.error("❌ datos.txt no encontrado en la ruta:", filePath);
        process.exit(1);
    }

    const contenido = fs.readFileSync(filePath, "utf-8");
    const lineas = contenido.split("\n");

    for (const linea of lineas) {
        if (!linea.trim()) continue;
        const [cuerpo, tema, dato] = linea.split("|");

        if (!cuerpo || !tema || !dato) continue;

        if (!datos[cuerpo]) datos[cuerpo] = {};
        if (!datos[cuerpo][tema]) datos[cuerpo][tema] = [];

        datos[cuerpo][tema].push(dato);
    }

    console.log(`✅ datos.js cargó ${lineas.length} líneas desde datos.txt`);
} catch (err) {
    console.error("❌ Error al leer datos.txt:", err);
    process.exit(1);
}

// Lista de cuerpos celestes
const cuerpos = [
    { name: "Marte", value: "mars" },
    { name: "Júpiter", value: "jupiter" },
    { name: "Venus", value: "venus" },
    { name: "Luna", value: "moon" },
    { name: "Mercurio", value: "mercury" },
    { name: "Saturno", value: "saturn" },
    { name: "Urano", value: "uranus" },
    { name: "Neptuno", value: "neptune" },
    { name: "Plutón", value: "pluto" },
    { name: "Ceres", value: "ceres" },
    { name: "Io", value: "io" },
    { name: "Europa", value: "europa" },
    { name: "Titán", value: "titan" },
    { name: "Encélado", value: "enceladus" },
    { name: "Ganimedes", value: "ganymede" },
    { name: "Calisto", value: "callisto" }
];

// Lista de temas
const temas = [
    { name: "Clima", value: "clima" },
    { name: "Composición", value: "composicion" },
    { name: "Gravedad", value: "gravedad" },
    { name: "Curiosidades", value: "curiosidades" },
    { name: "Historia / Exploración", value: "historia" }
];

// Comando /datoespacial
const command = {
    data: new SlashCommandBuilder()
        .setName("datoespacial")
        .setDescription("Obtiene un dato random del universo")
        .addStringOption(option =>
            option.setName("cuerpo")
                .setDescription("Elige un cuerpo celeste")
                .setRequired(true)
                .addChoices(...cuerpos)
        )
        .addStringOption(option =>
            option.setName("tema")
                .setDescription("Elige el tema del dato")
                .setRequired(true)
                .addChoices(...temas)
        ),

    run: async (client, interaction) => {
        const cuerpo = interaction.options.getString("cuerpo");
        const tema = interaction.options.getString("tema");

        if (!datos[cuerpo] || !datos[cuerpo][tema]) {
            return interaction.reply(`❌ No hay datos para ${cuerpo} en ${tema}.`);
        }

        const lista = datos[cuerpo][tema];
        const datoRandom = lista[Math.floor(Math.random() * lista.length)];

        const embed = new EmbedBuilder()
            .setTitle(`🌌 ${cuerpo.toUpperCase()} - ${tema.charAt(0).toUpperCase() + tema.slice(1)}`)
            .setDescription(datoRandom)
            .setColor("#ffffff")
            .setFooter({ text: "ØTI DATABASE" });

        await interaction.reply({ embeds: [embed] });
    }
};

module.exports = command;