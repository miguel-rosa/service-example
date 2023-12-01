export default (params: Params | Params[]) =>
  typeof params === 'string' ? params : params[0]
