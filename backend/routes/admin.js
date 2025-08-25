import {dataController} from "../controller/admin.js";
import express from "express";
import ensureLoggedIn from "../middleware/ensureLoggedIn.js";
import checkToken from "../middleware/checkToken.js";

const router = express.Router();

// Admin routes
router.post("/create", dataController.createAdmin);
router.post("/login", dataController.loginAdmin);

// testing
router.get("/test", checkToken, ensureLoggedIn, (req, res) => {
    res.cookie('admin', req.body.username);
    res.send("Admin route is working");
});

export default router;