import { Context } from 'hono/dist/types/context';
import { CreateWarrantySchema } from '../../schemas/warranties.schemas';
import { WarrantiesService } from '../../services/warranties.service';
import { getDb } from '../../config/db';

export const createWarranty = async (c: Context) => {
  const ref = c.req.query('ref')?.trim();
  if (ref && process.env.NODE_ENV === 'production' && process.env.ENABLE_DB_REF !== 'true') {
    return c.json({ success: false, error: 'Not Found' }, 404);
  }
  const db = getDb(ref);

  const body = await c.req.json().catch(() => null);
  const parsed = CreateWarrantySchema.safeParse(body);

  if (!parsed.success) {
    return c.json(
      { success: false, error: 'Bad Request', message: parsed.error.message },
      400
    );
  }

  const data = await WarrantiesService.create(db, parsed.data);
  return c.json({ success: true, data }, 201);
};
