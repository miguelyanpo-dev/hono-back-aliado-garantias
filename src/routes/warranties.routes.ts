import { OpenAPIHono } from '@hono/zod-openapi';
import { getWarranties } from '../controllers/warranties/get_warranties';
import { createWarranty } from '../controllers/warranties/create_warranty';

const router = new OpenAPIHono();

router.get('/', getWarranties);
router.post('/', createWarranty);

export default router;
