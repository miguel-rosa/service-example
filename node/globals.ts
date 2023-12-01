/* eslint-disable no-unused-vars */
import type { ServiceContext, RecorderState } from '@vtex/api'
import { MetricsAccumulator } from '@vtex/api'

import type { Clients } from './clients'

if (!global.metrics) {
  console.error('No global.metrics at require time')
  global.metrics = new MetricsAccumulator()
}

declare global {
  type Context = ServiceContext<Clients, State>

  type Params = string

  interface State extends RecorderState {
    productId: string
  }

  interface CustomContext {
    cookie: string
    originalPath: string
  }
}
