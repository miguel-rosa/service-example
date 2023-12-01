import type { ClientsConfig, ParamsContext } from '@vtex/api'
import { method, Service } from '@vtex/api'

import { Clients } from './clients'
import validateProductId from './middlewares/validateProductId'
import Product from './middlewares/product'

const TIMEOUT_MS = 800

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 20,
      timeout: TIMEOUT_MS,
    },
  },
}

const product = new Product()

export default new Service<Clients, State, ParamsContext>({
  clients,
  routes: {
    checkIfProductExist: method({
      GET: [validateProductId, product.index],
    }),
  },
})
