import { UserInputError } from '@vtex/api'

import serializeParams from '../utils/serializeParams'

export default async function validateProductId(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    vtex: {
      route: { params },
    },
  } = ctx

  const { productId } = params

  if (!productId) {
    throw new UserInputError('Product ID is missing')
  }

  ctx.state.productId = serializeParams(productId)

  await next()
}
