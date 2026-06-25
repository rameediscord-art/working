import { Router } from "express";
import { db } from "../db";
import { membershipPlansTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

// GET /plans — public active plans for checkout form
router.get("/plans", async (_req, res) => {
  const plans = await db
    .select({
      id: membershipPlansTable.id,
      name: membershipPlansTable.name,
      price: membershipPlansTable.price,
      billingCycle: membershipPlansTable.billingCycle,
      description: membershipPlansTable.description,
      features: membershipPlansTable.features,
      isFeatured: membershipPlansTable.isFeatured,
    })
    .from(membershipPlansTable)
    .where(eq(membershipPlansTable.isActive, true))
    .orderBy(membershipPlansTable.id);

  res.json(plans);
});

export default router;
