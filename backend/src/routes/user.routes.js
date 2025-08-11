import { Router } from 'express';
import { login, register, addToHistory, getUserHistory } from '../controllers/user.controllers.js';


const router = Router();

router.route("/login").post(login);
router.route("/register").post(register);

// Add handlers here if needed:
router.route("/add-to-activity").post((req, res) => {
  res.send("Add to activity placeholder");
});

router.route("/get-all-activity").get((req, res) => {
  res.send("Get all activity placeholder");
});
router.route("/add_to_activity").post(addToHistory)
router.route("/get_all_activity").get(getUserHistory)
export default router;
