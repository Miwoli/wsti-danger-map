/**
 * event controller
 */

import { factories } from '@strapi/strapi'
import { parseMultipartData } from '@strapi/utils'

export default factories.createCoreController(
  'api::event.event',
  ({ strapi }) => ({
    async create(ctx) {
      let entity
      if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx)
        data.CreatedBy = ctx.state.user.id
        entity = await strapi.services.event.create(data, { files })
      } else {
        ctx.request.body.data.CreatedBy = ctx.state.user.id
        entity = await strapi
          .service('api::event.event')
          .create(ctx.request.body)
      }

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx)
      return this.transformResponse(sanitizedEntity)
    },

    async find(ctx) {
      const query = ctx.request.querystring.split('&').map(param => {
        const [key, value] = param.split('=')
        return { key, value }
      })

      const queryObject = query.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.key]: cur.value
        }),
        {}
      )

      const dateFrom =
        queryObject.DateFrom === '' || queryObject.DateFrom === 'null'
          ? new Date(1970, 0, 1).toISOString()
          : queryObject.DateFrom

      const dateTo =
        queryObject.DateTo === '' || queryObject.DateTo === 'null'
          ? new Date(9999, 11, 11).toISOString()
          : queryObject.DateTo

      const entries = await strapi.entityService.findMany('api::event.event', {
        sort: {
          Date: 'asc'
        },
        filters: {
          $and: [
            { Title: { $containsi: queryObject.Title } },
            { Description: { $containsi: queryObject.Description } },
            {
              Date: {
                $between: [dateFrom, dateTo]
              }
            }
          ]
        },
        populate: {
          CreatedBy: {
            fields: ['username']
          },
          repeatableComponent: {
            populate: {
              CreatedBy: {
                fields: ['username']
              }
            }
          }
        }
      })

      return this.transformResponse(entries)
    },

    async update(ctx) {
      const { id } = ctx.params

      const event = await strapi.entityService.findOne('api::event.event', id, {
        populate: {
          CreatedBy: {
            fields: ['id']
          }
        }
      })

      if (!event || event.CreatedBy.id !== ctx.state.user.id) {
        return ctx.unauthorized()
      }

      const response = await super.update(ctx)
      return response
    },

    async delete(ctx) {
      const { id } = ctx.params

      const event = await strapi.entityService.findOne('api::event.event', id, {
        populate: {
          CreatedBy: {
            fields: ['id']
          }
        }
      })

      if (!event || event.CreatedBy.id !== ctx.state.user.id) {
        return ctx.unauthorized()
      }

      const response = await super.delete(ctx)
      return response
    }
  })
)
