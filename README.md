![Discord](https://img.shields.io/badge/Discord-Bot-blue?style=for-the-badge&logo=discord)
[![Web](https://img.shields.io/badge/Web-OTI-blue?style=for-the-badge&logo=google-chrome)](https://thekururu.github.io/NKaka)

---

## 📌 Español / Spanish

### 📖 Info breve

> ℹ️ **Simple SlashCommandBuilder (command handler)**  
> Para mantener tu proyecto organizado y fácil de escalar.

---

### ⚙️ Configuración importante

> ⚠️ **IMPORTANTE**
>
> Debes configurar tu bot correctamente antes de usarlo.

📂 Ve a la siguiente ruta:

src/json/client/bot.json

✏️ Dentro de ese archivo agrega:

```json
{
  "token": "TU_TOKEN_AQUI",
  "clientId": "TU_CLIENT_ID_AQUI"
}
```

---

## 🧩 Estructura de un comando

> 📂 Ubicación:

src/slashCommands/generales/<nombre>

---

## 🧩 Estructura obligatoria de un comando

> ⚠️ Todo comando **DEBE tener esta estructura**:

```js
module.exports = {
  data: null,      // 📜 Aquí defines el comando
  execute: null    // ⚡ Aquí va la lógica
};
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  // 📜 DEFINICIÓN DEL COMANDO
  data: new SlashCommandBuilder()
    .setName("nombre")
    .setDescription("descripción del comando"),

  // ⚡ EJECUCIÓN DEL COMANDO
  async execute(interaction) {
    await interaction.reply("Hola mundo!");
  }
};
```
---

## 📂 Carpeta `src/data`

> 🧠 Esta carpeta se usa para **guardar información que usan los comandos**.

---

### 📌 ¿Para qué sirve?

Aquí puedes guardar datos como:

- 😂 Chistes
- 📜 Frases
- 🎮 Respuestas predefinidas
- 📊 Listas o configuraciones
- 🧾 Cualquier contenido reutilizable


