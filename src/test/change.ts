const fs = require('fs');

// Чтение конфигурационного файла
const configFile = 'C:/Users/Ivan/ris-app-server/ris-app-server/src/test/data.json';
const rawData = fs.readFileSync(configFile, 'utf8');

// Преобразование JSON в объект
const config = JSON.parse(rawData);

console.log("Config as object:", config);