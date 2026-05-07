import { Router, type IRouter } from "express";
import healthRouter from "./health";
import assistantRouter from "./assistant";
import menuAssistantRouter from "./menu-assistant";

const router: IRouter = Router();

router.use(healthRouter);
router.use(assistantRouter);
router.use(menuAssistantRouter);

export default router;
