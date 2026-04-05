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

---

## ⚠️ Puntos importantes de los comandos

> 🧠 Antes de usar el bot, debes configurar estos comandos correctamente:

---

1. Sistema de moderación

> 📂 Archivos:
```
.../generales/warnings.js
.../generales/unwarn.js
.../generales/warn.js
```

> ⚠️ IMPORTANTE:

Debes cambiar esta línea:

```js
const Database = require('');
``` 
✔️ Por una base de datos válida (ejemplo: quick.db, sqlite, etc.)

💡 Esto es necesario para:

Guardar usuarios sancionados
Llevar registro de warns
Evitar perder datos al reiniciar el bot

2. ⚠️ Debes cambiar la URL por la de tu propia web:
```
.../generales/4.js
```

```js
const url = "TU_WEB_AQUI";
```

3. Link de invitacion
```

..../generales/invite.js
```


> ⚠️ Cambia el link de invitación del bot:

```js
const invite = "TU_LINK_DE_INVITACION";
```

4. sistema de busqueda por IA 
```
.../generales/search.js
```

> ⚠️ Configura las opciones de IA:

- 🔑 API Key
- ⚙️ Modelo
- 🧠 Parámetros (opcional)

Ejemplo:

```js
const config = {
  apiKey: "TU_API_KEY",
  model: "gpt-4",
};
``` 
en el caso de Oti se usa una IA entranada por nosotros mismo utilizando Chat GPT como motor de busqueda y personalidad y funciones de Cloude Code 


[![ᖴᎥᖇᗴᔕ丅ᑌᗝᔕ](https://img.shields.io/badge/FireStudios-Official-red?style=for-the-badge&logo=google-firestore&logoColor=white)]()

---

### 🚀 Links

[![Discord](https://img.shields.io/badge/Discord-Bot-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/9zuHdxUKdY)
[![Web](https://img.shields.io/badge/Web-NKaka-red?style=for-the-badge&logo=google-chrome&logoColor=white)](https://thekururu.github.io/OtiWeb)
[![Bot](https://img.shields.io/badge/Bot-Invite-red?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/oauth2/authorize?client_id=1398747352264609822&permissions=8&integration_type=0&scope=bot+applications.commands)

---

### 💬 Mensaje final

> 🔥 *Código con fuego, proyectos con pasión.*

---
