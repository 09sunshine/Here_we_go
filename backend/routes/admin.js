import {dataController} from "../controllers/admin.js";
import express from "express";
import ensureLoggedIn from "../middleware/ensureLoggedIn.js";
import checkToken from "../middleware/checkToken.js";

const router = express.Router();

// Admin routes
router.post("/create", dataController.createAdmin);
router.post("/login", dataController.loginAdmin);
router.post("/logout", checkToken, ensureLoggedIn, dataController.logoutAdmin);
router.get("/profile", checkToken, ensureLoggedIn, dataController.getAdminProfile);

// testing
router.get("/test", checkToken, ensureLoggedIn, (req, res) => {
    res.send("Admin route is working");
});

export default router;