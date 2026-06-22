const fs = require("fs");
const path = require("path");

const getCampusMap = () => {
    const mapPath = path.join(__dirname, "..", "data", "campusMap.json");

    const data = fs.readFileSync(mapPath, "utf-8");

    return JSON.parse(data);
};

module.exports = {getCampusMap,};