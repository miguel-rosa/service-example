import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { JanusClient } from '@vtex/api'
import { stringify } from 'qs'

import type { Product } from '../typings'
// import { searchEncodeURI } from '../utils/search'

const inflightKey = ({ baseURL, url, params, headers }: RequestConfig) =>
  `${
    baseURL! +
    url! +
    stringify(params, { arrayFormat: 'repeat', addQueryPrefix: true })
  }&segmentToken=${headers['x-vtex-segment']}`

export default class Catalog extends JanusClient {
  private base = 'api/catalog'

  private get routes() {
    return {
      product: (productId: string) => `${this.base}/pvt/product/${productId}`,
    }
  }

  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        'x-vtex-user-agent': ctx.userAgent,
        VtexIdclientAutCookie: ctx.adminUserAuthToken ?? ctx.authToken ?? '',
      },
    })
  }

  public product = (args: string) =>
    this.get<Product>(this.routes.product(args), {
      metric: 'get-product',
    })

  private get = <T = any>(url: string, config: RequestConfig = {}) => {
    config.inflightKey = inflightKey

    return this.http.get<T>(`${url}`, config)
  }
}
