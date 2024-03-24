const express = require("express");
const route = express.Router();
const verifyToken = require("../../middlewares/verifyToken");
// const multer = require("../../middlewares/multer");
// // Register router :  /guide/api/user/register
route.post("/register", require("./register"));

// // Login router :   /guide/api/user/login
route.post("/login", require("./login"));

// // Get all the guides : /guide/api/user/guides
route.get("/guides", require("./getGuides"));

// // Get own guides : /guide/api/user/Ownguides
route.get("/Ownguides/:id", verifyToken, require("./getOwnGuides"));

// // Get guide : /guide/api/user/guide
route.get("/guide", verifyToken, require("./getGuide"));

// choose guide: /guide/api/user/chooseGuide
route.put("/chooseGuide", verifyToken, require("./chooseGuide"));

module.exports = route;
