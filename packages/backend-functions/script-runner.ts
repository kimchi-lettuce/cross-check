import { log, select, isCancel } from '@clack/prompts'
import admin from 'firebase-admin'
import serviceAccount from './service-account.json' with { type: 'json' }

if (!serviceAccount) {
	log.error('Service account not found. Please request for a service account key from the team. and place it in the root of the project.')
	Deno.exit(1)
}

// This requires the service account key to work
admin.initializeApp({ credential: admin.credential.cert(serviceAccount as admin.ServiceAccount) })

// List out the files in ./scripts using deno API
const files = Deno.readDirSync('./scripts')
const scriptFiles = Array.from(files).filter(file => file.name !== 'script-example.ts')

if (!scriptFiles.length) {
	log.error('No scripts found. Please create a script in the ./scripts directory. Use the script-example.ts file as a template.')
	Deno.exit(1)
}

const selectedFile = await select({
	message: 'Choose a script to execute:',
	options: scriptFiles.map(file => ({
		value: file.name,
		label: file.name
	}))
})

if (isCancel(selectedFile)) {
	console.log('No script selected. Exiting...')
	Deno.exit(1)
}

log.info('🚀 SCRIPT STARTING - Firebase app initialized 🚀')
console.log()
await import(`./scripts/${selectedFile}`)
console.log()
log.success('✅ SCRIPT FINISHED ✅')
