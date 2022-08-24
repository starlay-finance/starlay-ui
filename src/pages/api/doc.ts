import { withSwagger } from 'next-swagger-doc'

const swaggerHandler = withSwagger({
  apiFolder: 'src/pages/api',
  schemaFolders: ['src/types/api'],
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Starlay API',
      version: '0.1.0',
    },
  },
})
export default swaggerHandler()
