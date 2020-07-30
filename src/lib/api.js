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

// Instead of 'data' we'd have what our content name is here
export async function getData(preview) {
  const entries = await getClient(preview).getEntries({
    'sys.contentType.sys.id[in]': 'project',
    include: 3
  })
  return entries.items.reverse()
}

// Instead of 'data' we'd have what our content name is here
export async function getHomepageProjects(preview) {
  const entries = await getClient(preview).getEntries({
    'sys.contentType.sys.id[in]': 'homepage',
    include: 3
  })
  return entries.items[0].fields.projects
}
