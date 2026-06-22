const mapService = require("../services/mapService");

const getCampusMap = (req, res) => {
    try {
        const data = mapService.getCampusMap();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to load map data",
        });
    }
};

module.exports = {
    getCampusMap,
};
