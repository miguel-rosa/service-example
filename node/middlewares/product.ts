import { ForbiddenError } from '@vtex/api'

export default class Product {
  public async index(ctx: Context) {
    const {
      clients: { catalog },
      state: { productId },
    } = ctx

    try {
      const response = await catalog.product(productId)

      if (response) {
        ctx.body = true
      } else {
        ctx.body = false
      }
    } catch (error) {
      if (error.response.status === 403) {
        throw new ForbiddenError('Forbidden')
      }

      ctx.body = false
    }
  }
}
