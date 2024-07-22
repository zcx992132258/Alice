import { FastifyRequest } from 'fastify'

export function getBody(req: FastifyRequest['raw']) {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })
    req.on('end', () => {
      let parsedBody: unknown
      try {
        parsedBody = JSON.parse(body)
      }
      catch (e) {
        console.error(e)
        parsedBody = body
      }
      resolve(parsedBody)
    })
  })
}
