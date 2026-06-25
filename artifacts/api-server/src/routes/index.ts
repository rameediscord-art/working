import { Router, type IRouter } from "express";
import healthRouter from "./health";
import adminAuthRouter from "./admin/auth";
import adminForgotPasswordRouter from "./admin/forgot-password";
import adminPlansRouter from "./admin/plans";
import adminPacksRouter from "./admin/packs";
import adminSettingsRouter from "./admin/settings";
import adminDashboardRouter from "./admin/dashboard";
import adminAuditLogsRouter from "./admin/audit-logs";
import ordersRouter from "./orders";
import contactRouter from "./contact";
import publicPlansRouter from "./public-plans";

const router: IRouter = Router();

router.use(healthRouter);
router.use(adminAuthRouter);
router.use(adminForgotPasswordRouter);
router.use(adminPlansRouter);
router.use(adminPacksRouter);
router.use(adminSettingsRouter);
router.use(adminDashboardRouter);
router.use(adminAuditLogsRouter);
router.use(ordersRouter);
router.use(contactRouter);
router.use(publicPlansRouter);

export default router;
