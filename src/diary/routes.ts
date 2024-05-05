import express from "express";
import * as diaryController from "./controller";

const router = express.Router();

router.post("/createEntry", diaryController.createEntry);
router.get("/getEntries", diaryController.getEntries);

export default router;
