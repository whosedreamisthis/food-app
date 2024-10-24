import fs from 'node:fs';
import sql2 from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { sql } from '@vercel/postgres';
import { createTableIfNotExists } from './create-table';
export const dynamic = 'force-dynamic';
//export const revalidate = 1;
export const fetchCache = 'force-no-store';
createTableIfNotExists();
export async function getMeals() {
	const { rows } = await sql`SELECT * FROM meals10 where slug != 'a';`; // where '101'='101';`;
	return rows;
}

export async function getMeal(slug) {
	const { rows } = await sql`SELECT * FROM meals10 WHERE slug = ${slug}`;

	return rows[0];
}

export async function saveMeal(meal) {
	meal.slug = slugify(meal.title, { lower: true });
	meal.instructions = xss(meal.instructions);

	const extension = meal.image.name.split('.').pop();
	const filename = `${meal.slug}.${extension}`;
	const stream = fs.createWriteStream(`public/images/${filename}`);
	const bufferedImage = await meal.image.arrayBuffer();

	stream.write(Buffer.from(bufferedImage), (error) => {
		if (error) {
			throw new Error('saving image failed!');
		}
	});

	meal.image = `/images/${filename}`;
	await sql`INSERT INTO meals10
				(id, slug, title, image, summary, instructions, creator, creator_email)
				VALUES(
				uuid_generate_v4(),
				${meal.slug},
				${meal.title},
				${meal.image},
				${meal.summary},
				${meal.instructions},
				${meal.creator},
				${meal.creator_email}
				)`;
}
