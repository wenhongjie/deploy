import fastify, { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { join } from 'path'

interface Routes {
  [path: string]: (req: FastifyRequest, reply: FastifyReply) => void
}

type Method = 'Get' | 'Post' | 'Put' | 'Delete' | 'Patch'

type RouterConfig = {
  [key in Method]?: Routes
}

export default function createRouter(prefix: string, routerConf: RouterConfig) {
  return (fastify: FastifyInstance) => {
    Object.keys(routerConf).forEach(method => {
      const handlers = routerConf[method]
      Object.keys(handlers).forEach(key => {
        fastify[method.toLowerCase()](join(`/${prefix}`, key), handlers[key])
      })
    })
  }
}
