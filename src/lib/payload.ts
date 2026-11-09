import config from '@payload-config'
import { getPayload } from 'payload'

/** Shared Payload Local API client for server components and server actions. */
export const getPayloadClient = () => getPayload({ config })
