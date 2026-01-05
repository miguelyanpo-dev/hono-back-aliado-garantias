import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import {
  ContactsQuerySchema,
  ContactsListResponse,
  ErrorResponse,
} from '../schemas/contacts.schemas';
import { getContacts } from '../controllers/contacts/get_contacts';

const contactsRouter = new OpenAPIHono();

// Definimos la ruta en una constante (CLAVE)
const getContactsRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['garantias de aliado'],
  summary: 'Listar garantias',
  description: 'Obtiene garantias (people) desde la API de Aliado.',
  request: {
    query: ContactsQuerySchema,
  },
  responses: {
    200: {
      description: 'Lista de garantias obtenida exitosamente',
      content: {
        'application/json': {
          schema: ContactsListResponse,
        },
      },
    },
    500: {
      description: 'Error al obtener garantias',
      content: {
        'application/json': {
          schema: ErrorResponse,
        },
      },
    },
  },
});

// MISMO patrón que sellers
// @ts-expect-error - Known issue with @hono/zod-openapi type inference
contactsRouter.openapi(getContactsRoute, getContacts);

export default contactsRouter;
