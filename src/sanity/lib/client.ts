import { createClient } from '@sanity/client'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // perspective: 'published',
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  // stega: { studioUrl: '/studio' },
  // stega: { studioUrl: 'https://sa-gnu.netlify.app/studio' },
})
