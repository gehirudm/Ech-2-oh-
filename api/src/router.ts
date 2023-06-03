import { Client } from '@neondatabase/serverless';
import { IRequest, Router, createCors, error, json, withContent } from 'itty-router';

type User = {
	id: string,
	username: string
}

type LoginRequest = {
	username: string
} & IRequest

// declare what's available in our env
type Env = {
	DATABASE_URL: string
}

// create a convenient duple
type CF = [env: Env, context: ExecutionContext]

// then pass them to the Router
const router = Router()

export const { preflight, corsify } = createCors({
	methods: ['GET', 'POST']
})

router
	// register the preflight middleware
	.all('*', preflight)

	// Login
	.post<LoginRequest, CF>('/api/login', withContent, async (request, env, ctx) => {
		const client = new Client(env.DATABASE_URL);
		await client.connect();

		if (!request.content) {
			ctx.waitUntil(client.end());
			return error(400, 'No body provided')
		}

		if (!request.content.username) {
			ctx.waitUntil(client.end());
			return error(400, 'No username provided')
		}

		const { rows } = await client.query<User>(`
	SELECT * FROM "public"."User" WHERE username = $1
	`, [request.content.username]);

		if (rows.length > 0) {
			// User exists with username return user object
			ctx.waitUntil(client.end());
			return json(rows[0])
		}

		// Else, create a new user
		const res = await client.query<User>(`
	INSERT INTO "User"(username) VALUES ($1) RETURNING id, username;
	`, [request.content.username]);

		ctx.waitUntil(client.end());
		return json(res.rows[0])
	})

	// Get today's drink count
	.get<IRequest, CF>('/api/:id/today', async ({ params }, env, ctx) => {
		const client = new Client(env.DATABASE_URL);
		await client.connect();

		const { rows } = await client.query<{ count: number }>(`
	SELECT COUNT(*)
	FROM "Drink"
	WHERE "userId" = $1
  	AND date::date = CURRENT_DATE;
	`, [params.id]);
		ctx.waitUntil(client.end());
		return json({ count: +(rows[0].count)})
	})

	// Create new Drink record
	.get<IRequest, CF>('/api/:id/drink', async ({ params }, env, ctx) => {
		const client = new Client(env.DATABASE_URL);
		await client.connect();

		const { rows } = await client.query<{ count: number }>(`
	INSERT INTO "Drink"("userId") VALUES ($1);
	`, [params.id]);
		ctx.waitUntil(client.end());
		return json(rows[0])
	})

	// 404 for everything else
	.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
