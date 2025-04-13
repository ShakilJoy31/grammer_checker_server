const express = require("express");
const { processGrammarCorrection } = require("../controller/service/doctorInformation");
const router = express.Router();

router.post("/grammer-correction", processGrammarCorrection);


module.exports = serviceRoutes = router;