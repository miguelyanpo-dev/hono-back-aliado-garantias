import { Context } from "hono/dist/types/context";
import { WarrantiesService } from "../../services/warranties.service";

export const createWarranty = async (c: Context) => {
  const body = await c.req.json();
  const data = await WarrantiesService.create(body);
  return c.json({ success: true, data }, 201);
};
