import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Crops } from './collections/Crops'
import { Events } from './collections/Events'
import { Producers, Products } from './collections/Marketplace'
import { Media } from './collections/Media'
import { Partners } from './collections/Partners'
import { People } from './collections/People'
import { Projects } from './collections/Projects'
import { Recipes } from './collections/Recipes'
import { Resources } from './collections/Resources'
import { StewardshipGuides } from './collections/StewardshipGuides'
import { Stories } from './collections/Stories'
import {
  EventRegistrations,
  KnowledgeSubmissions,
  ProducerInterest,
  Subscribers,
  VolunteerSignups,
} from './collections/Submissions'
import { Topics } from './collections/Topics'
import { Users } from './collections/Users'
import { HomePage, MarketplaceSettings, SiteSettings } from './globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || '',
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' — FARE Farms CMS' },
  },
  collections: [
    // Knowledge
    Resources,
    Crops,
    Topics,
    People,
    // Land & gardens
    Projects,
    StewardshipGuides,
    // Food & culture
    Recipes,
    Stories,
    // Community
    Events,
    Partners,
    // Submissions
    Subscribers,
    VolunteerSignups,
    KnowledgeSubmissions,
    ProducerInterest,
    EventRegistrations,
    // Marketplace (future, admin only)
    Producers,
    Products,
    // Settings
    Media,
    Users,
  ],
  globals: [HomePage, SiteSettings, MarketplaceSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      // Vercel's Neon integration sets DATABASE_URL; older Vercel Postgres stores set POSTGRES_URL.
      connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL || '',
    },
  }),
  storage: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
