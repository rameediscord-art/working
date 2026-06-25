import { Router, type IRouter } from "express";
import healthRouter from "./health";
import adminAuthRouter from "./admin/auth";
import adminPlansRouter from "./admin/plans";
import adminPacksRouter from "./admin/packs";
import adminSettingsRouter from "./admin/settings";
import adminDashboardRouter from "./admin/dashboard";
import adminAuditLogsRouter from "./admin/audit-logs";

const router: IRouter = Router();

router.use(healthRouter);
router.use(adminAuthRouter);
router.use(adminPlansRouter);
router.use(adminPacksRouter);
router.use(adminSettingsRouter);
router.use(adminDashboardRouter);
router.use(adminAuditLogsRouter);

export default router;
