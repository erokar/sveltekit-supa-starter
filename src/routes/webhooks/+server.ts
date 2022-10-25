import { json, type RequestHandler, RequestEvent } from '@sveltejs/kit'
import { error } from '@sveltejs/kit'
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private'
import Stripe from 'stripe'

if (!STRIPE_SECRET_KEY) {
	throw new Error('Stripe secret not set.')
}

function toBuffer(ab: ArrayBuffer): Buffer {
	const buf = Buffer.alloc(ab.byteLength)
	const view = new Uint8Array(ab)
	for (let i = 0; i < buf.length; i++) {
		buf[i] = view[i]
	}
	return buf
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2022-08-01'
})

export async function POST({ request }: { request: Request }) {
	// const body = await request.json()

	// if (!body) {
	// 	throw error(400)
	// }

	const rawBody = await request.arrayBuffer()
	const payload = toBuffer(rawBody)

	const sig = request.headers.get('stripe-signature') || ''
	//console.log('** REQUEST: ', request)
	//console.log('*** SIG: ', sig)

	let event

	try {
		event = stripe.webhooks.constructEvent(payload, sig, STRIPE_WEBHOOK_SECRET)
		console.log('*** EVENT: ', event)
	} catch (err) {
		console.error(err)
		throw error(400, `Webhook Error: ${err.message}`)
	}

	// Handle the event
	switch (event.type) {
		case 'checkout.session.completed':
			const session = event.data.object
			// Then define and call a function to handle the event checkout.session.completed
			break
		// ... handle other event types
		default:
			console.log(`Unhandled event type ${event.type}`)
	}

	return json({ message: 'ok' })
}
