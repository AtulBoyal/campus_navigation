const express = require("express");

const router = express.Router();

const {
  getCampusMap,
} = require("../controllers/mapController");

router.get("/", getCampusMap);

module.exports = router;