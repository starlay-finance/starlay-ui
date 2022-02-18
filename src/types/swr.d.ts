import { SWRResponse } from 'swr'

export interface SWRResponseWithFallback<Data = any, Error = any>
  extends SWRResponse<Data, Error> {
  data: Data
}
