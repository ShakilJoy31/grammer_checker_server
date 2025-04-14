const express = require("express");
const { createGrammerPrompt, getAllGrammerPrompts, deleteGrammerPrompts } = require("../controller/service/doctorInformation");
const router = express.Router();

router.post("/grammer-correction", createGrammerPrompt);

router.get("/grammer-correction-history", getAllGrammerPrompts);


module.exports = serviceRoutes = router;