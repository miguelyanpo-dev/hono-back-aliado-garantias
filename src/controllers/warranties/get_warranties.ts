import { Context } from 'hono';
import { WarrantiesService } from '../../services/warranties.service';

export const getWarranties = async (c: Context) => {
  const data = await WarrantiesService.getAll();
  return c.json({ success: true, data });
};
