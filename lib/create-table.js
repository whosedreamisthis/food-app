import { sql } from '@vercel/postgres';

export const createTableIfNotExists = async () => {
	try {
		await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
		// 	await sql` CREATE TABLE IF NOT EXISTS "meals3" (
		//    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
		//    slug VARCHAR(250),
		//    title VARCHAR(250),
		//    image VARCHAR(250),
		//    summary VARCHAR(250),
		//    instructions VARCHAR(250),
		//    creator VARCHAR(250),
		//    creator_email VARCHAR(250)
		// )`;
		await sql` CREATE TABLE IF NOT EXISTS "meals10" (
		id UUID DEFAULT uuid_generate_v4() PRIMARY KEY  ,
		slug VARCHAR(250),
		title VARCHAR(250),
		   image VARCHAR(250),
		   summary VARCHAR(250),
		   instructions VARCHAR(250),
		   creator VARCHAR(250),
		   creator_email VARCHAR(250)
	 )`;

		//	await sql`DELETE FROM meals10 WHERE slug='asddas'`;
		//	await sql`DELETE FROM meals10 WHERE slug='asdasd'`;

		return;
	} catch (error) {
		throw new Error(`Yikes! We ran into an error: ${error}`);
	}
};
