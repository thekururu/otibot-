const {
    Client,
    Collection,
    GatewayIntentBits,
} = require("discord.js");
const { readdirSync } = require("node:fs");
const express = require("express"); // ✅ Import Express
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});
const config = require(`${process.cwd()}/src/json/client/bot.json`);

module.exports = client;

// Collections
client.slashCommands = new Collection();
client.slashArray = [];

/* Handlers */
for (const folder of readdirSync(`${process.cwd()}/src/handlers`)) {
    const files = readdirSync(`${process.cwd()}/src/handlers/${folder}`).filter(
        (file) => file.endsWith(".js")
    );

    for (const file of files) {
        require(`${process.cwd()}/src/handlers/${folder}/${file}`)(client);
    }
}

/* -------------------- */
/* Servidor web simple  */
/* -------------------- */
const app = express();

// Endpoint raíz para recibir pings
app.get("/", (req, res) => {
    res.send("Bot activo 👍"); // mensaje simple
});

// Escucha en el puerto que Replit asigna
app.listen(process.env.PORT || 3000, () => {
    console.log("🌐 Servidor web activo para mantener bot 24/7");
});

/* -------------------- */
/* Inicio del bot       */
/* -------------------- */
client.eventos();
// client.mongoose()

client.login(config.BOT_TOKEN).then(() => {
    client.builder();
    console.log("🤖 Bot conectado y listo!");
});

/* Opcional: log para saber que sigue vivo cada minuto */
setInterval(() => {
    console.log("🟢 Bot sigue activo...");
}, 60000);
/* -------------------- */
/* Comandos desde shell */
/* -------------------- */

process.stdin.on("data", async (data) => {
    const input = data.toString().trim();

    if (!input.toLowerCase().startsWith("say:")) return;

    const textMatch = input.match(/say:\s*(.*?)\s*(id:|$)/i);
    const idMatch = input.match(/id:\s*(\d{17,20})/i);

    if (!textMatch || !idMatch) {
        console.log("❌ Uso correcto: say: MENSAJE id:CANAL_ID");
        return;
    }

    const mensaje = textMatch[1];
    const canalId = idMatch[1];

    try {
        const canal = await client.channels.fetch(canalId);
        if (!canal) {
            console.log("❌ Canal no encontrado");
            return;
        }

        await canal.send(mensaje);
        console.log("✅ Mensaje enviado desde la shell");
    } catch (err) {
        console.error("❌ Error enviando mensaje:", err);
    }
});