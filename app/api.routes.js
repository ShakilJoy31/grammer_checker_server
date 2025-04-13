const router = require("express").Router();
const serviceRoutes = require("../routes/doctor.routes");

// Grammer correciton with AI
router.use("/text", serviceRoutes);

module.exports = router;