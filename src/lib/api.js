import { createClient } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_TOKEN,
})

const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
  host: 'preview.contentful.com',
})

const getClient = preview => (preview ? previewClient : client)

/**
 * Get all projects
 * @param  {boolean} preview [are we in preview mode?]
 * @return {object}         [projects]
 */
export async function getProjects(preview) {
  const entries = await getClient(preview).getEntries({
    'sys.contentType.sys.id[in]': 'project',
    include: 3
  })
  return entries.items.reverse()
}

/**
 * Get about page
 * @param  {boolean} preview [are we in preview mode?]
 * @return {object}         [projects list]
 */
export async function getAboutPage(preview) {
  const entries = await getClient(preview).getEntries({
    'sys.contentType.sys.id[in]': 'aboutPage',
    include: 3
  })
  return entries.items[0].fields
}

/**
 * Get homepage projects
 * @param  {boolean} preview [are we in preview mode?]
 * @return {object}         [projects list]
 */
export async function getHomepageProjects(preview) {
  const entries = await getClient(preview).getEntries({
    'sys.contentType.sys.id[in]': 'homepage',
    include: 3
  })
  return entries.items[0].fields.projects
}
