import { Pagination } from './Pagination'

export interface EventsList {
  data: Event[]
  meta: {
    pagination: Pagination
  }
}

export interface EventResponse {
  data: Event
  meta: {}
}

export interface Event {
  id: number
  attributes: EventAttributes
}

export interface EventAttributes {
  Title: string
  Description: string
  Date: string
  Coordinates: number[]
  CreatedBy?: Author
}

export type EventsListMode = 'list' | 'create' | 'edit'

interface Author {
  data: {
    id: number
    attributes: {
      username: string
    }
  }
}
