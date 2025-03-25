const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2348165846414",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Asia/Colombo",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicU5HMFpNdWJEN3I0c21VTkhWVDRxRDdkWUh2VkFUOWx2cXRzYVJTcXVXOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVVFsQlFEUmt0UldXQjdKWG53K2F0cXhod3J6WTlJcW5FVjAxeXZ6a2ZVaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRQzAzQ0xJY04wVytHNTRGTGx0QjQwNWZRQnJVUkJZQlUrRzkyTXdYRVZNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsZkhIek13Q2xrUERUU0I1STcyNUJQNnJON2dhQ1l6MHllOWdySUs5L21BPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNMWm9EZlNFcHcxdVdpcmVQV29pYUl5ekxpdTFLcnRpbGtvMUE3d3FORkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFFcWtaY3JkcTlYQnAyemhVT2Y4RGtoVG5NOVI4OXRkaUozUzZNcENiQjA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUNYVlBwQnRvaTdtU3pjNGtEZVptbFRyQ0JkWUpNZHZZMEx6TE53cDhYYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1BzTWg5QkJ3UElSYjhKeWhIL3dXd0VRUVZ6a2Jsd2RJQ2JzM2ZaSlVHZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InQyeCtiQ1EyUHVwNUZCaUNnRmdRRjZZRlVxK1pCSDZBQTVIZlBNb3htQTk5a082UVNkQklHUXEwN1h3cThTOEZjTEpmVjhBa1JsaU1Za3JxdWFFNkJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjU0LCJhZHZTZWNyZXRLZXkiOiJlNHR5TGh6dUk5eWU4TTZQdG5TRCtvd0hxOHBEOFdOY2JUNGV0VTNwckljPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiI3VkdUQjJZNyIsIm1lIjp7ImlkIjoiOTQ3Nzk1NzIzODc6MjlAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiI2MzQ5NzQxNzI4OTgxOToyOUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0p1Q3Q5NEhFTmJaakw4R0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ijh1Tjk2L3I0bU9zNXpGL29WTThIaGhMNkFkT0VrTHNYUzJtVlJWS0ZIeEk9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlBBRVc2Q0ZSSEhwUFJWN1NKODN3S1RhZ1A4STNHY3NKN2FyOUxqOFQ0VXVoRndJYVFMQ0dhaVdZc1F5QkJ4QXdzRHJBZU0xYkdGQ3ZFemNScU1WL0JRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJtWi9KWTRSNGVqQnZ6dFluVjE4Tkx6c1drT3JCczlGQmx1R0t6L3FCeXZ5VkpZUThNOWw5T25va2prNGhybVlKVTlMdkRTK3orZTVoM3U3MUxtY0pCUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0Nzc5NTcyMzg3OjI5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZMamZldjYrSmpyT2N4ZjZGVFBCNFlTK2dIVGhKQzdGMHRwbFVWU2hSOFMifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lFZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0Mjk0MTQxMCwibGFzdFByb3BIYXNoIjoiUFdrNUIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUVQQyJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
