import { Context } from 'hono';
import { WarrantiesService } from '../../services/warranties.service';
import { UpdateWarrantySchema } from '../../schemas/warranties.schemas';
import { getDb } from '../../config/db';

export const updateWarranty = async (c: Context) => {
  const ref = c.req.query('ref')?.trim();
  if (ref && process.env.NODE_ENV === 'production' && process.env.ENABLE_DB_REF !== 'true') {
    return c.json({ success: false, error: 'Not Found' }, 404);
  }
  const db = getDb(ref);

  const idParam = c.req.param('id');
  const id = Number(idParam);

  if (!Number.isInteger(id)) {
    return c.json(
      { success: false, error: 'Bad Request', message: 'Invalid id' },
      400
    );
  }

  const body = await c.req.json().catch(() => null);
  const parsed = UpdateWarrantySchema.safeParse(body);

  if (!parsed.success) {
    return c.json(
      { success: false, error: 'Bad Request', message: parsed.error.message },
      400
    );
  }

  const data = await WarrantiesService.update(db, id, parsed.data);
  if (!data) {
    return c.json(
      { success: false, error: 'Not Found', message: 'Warranty not found' },
      404
    );
  }

  return c.json({ success: true, data });
};
