import { NextApiRequest, NextApiResponse } from 'next'
import { Error } from 'src/types/api/error'

export type ApiHandler<P> = (args: {
  request: NextApiRequest
  response: NextApiResponse
  parameters: P
}) => Promise<Object | undefined>

export type RequestValidationResult<P> = P | Error
export type RequestValidator<P> = (
  request: NextApiRequest,
) => RequestValidationResult<P>

export const asHandler =
  <P>(
    handler: ApiHandler<P>,
    options: {
      validator?: RequestValidator<P>
      headers?: Partial<
        Record<DefaultHeaderNames, string | number | readonly string[]>
      >
    } = {},
  ) =>
  async (request: NextApiRequest, response: NextApiResponse) => {
    const { validator, headers } = options
    try {
      const parameters = validator ? validator(request) : request.query
      if (
        parameters &&
        typeof parameters == 'object' &&
        'error' in parameters
      ) {
        response.status(400).json(jsonify(parameters))
        return
      }
      const res = await handler({
        parameters: parameters as P,
        request,
        response,
      })
      setHeaders(response, headers)
      if (!res) {
        response.status(404).json(jsonify(DEFAULT_NOT_FOUND_RESPONSE))
        return
      }
      response.status(200).json(jsonify(res))
    } catch (e) {
      console.error(e)
      response.status(500).json(jsonify(DEFAULT_ERROR_RESPONSE))
    }
  }

export const cacheControl = (sMaxAge: number, staleWhileRevalidate: number) =>
  `s-maxage=${sMaxAge}, stale-while-revalidate=${staleWhileRevalidate}`

const DEFUALT_HEADERS = [
  { name: 'Cache-Control', value: cacheControl(300, 600) },
  { name: 'Access-Control-Allow-Origin', value: '*' },
  { name: 'Access-Control-Allow-Headers', value: '*' },
  { name: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS' },
] as const

type DefaultHeaderNames = typeof DEFUALT_HEADERS[number]['name']

const setHeaders = (
  response: NextApiResponse,
  overrides: Partial<
    Record<DefaultHeaderNames, string | number | readonly string[]>
  > = {},
) => {
  DEFUALT_HEADERS.forEach(({ name, value }) => {
    response.setHeader(name, overrides[name] || value)
  })
}

const DEFAULT_ERROR_RESPONSE: Error = { error: 'Something went wrong...' }
const DEFAULT_NOT_FOUND_RESPONSE: Error = { error: 'Not found.' }

const jsonify = (obj: any) => JSON.parse(JSON.stringify(obj))
