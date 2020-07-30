const spaceImport = require('contentful-import')

const [CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN] = process.argv.slice(2)

if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_MANAGEMENT_TOKEN) {
	throw new Error(
		[
			'Parameters missing...',
			'Please run the setup command as follows',
			'npx cross-env CONTENTFUL_SPACE_ID=XXX CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-XXX npm run setup',
		].join('\n')
	)
}

spaceImport({
	spaceId: CONTENTFUL_SPACE_ID,
	managementToken: CONTENTFUL_MANAGEMENT_TOKEN,
	content: {},
})
	.then(() => console.log('The content model of your space is set up!'))
	.catch(e => console.error(e))
