import fs from 'node:fs';
import sql2 from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { sql } from '@vercel/postgres';
import { createTableIfNotExists } from './create-table';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
export const dynamic = 'force-dynamic';
//import { revalidatePath } from 'next/cache';
import { revalidatePath as nextRevalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
export const revalidate = 1;
export const fetchCache = 'force-no-store';
createTableIfNotExists();
export async function getMeals() {
	const { rows } = await sql`SELECT * FROM meals10 where slug != 'argadf';`; // where '101'='101';`;
	return rows;
}

export async function getMeal(slug) {
	const { rows } = await sql`SELECT * FROM meals10 WHERE slug = ${slug}`;

	return rows[0];
}

export async function saveMeal(meal) {
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
	});

	meal.slug = slugify(meal.title, { lower: true });
	meal.instructions = xss(meal.instructions);
	const extension = meal.image.name.split('.').pop();
	const filename = `${meal.slug}.${extension}`;
	const stream = fs.createWriteStream(`public/images/${filename}`);
	const bufferedImage = await meal.image.arrayBuffer();

	await stream.write(Buffer.from(bufferedImage), (error) => {
		if (error) {
			throw new Error('saving image failed!');
		}
	});
	meal.image = `/images/${filename}`;
	const options = {
		use_filename: true,
		unique_filename: false,
		overwrite: true,
	};

	const relativePath = `public/${meal.image}`;

	// Get the absolute path
	const absolutePath = path.resolve(relativePath);
	let url;

	try {
		const result = await cloudinary.uploader.upload(absolutePath, options);
		url = result.url;

		// Upload the image
	} catch (error) {
		console.log(error);
	}
	url = url.replace('http', 'https');

	const what = await sql`INSERT INTO meals10
	(id, slug, title, image, summary, instructions, creator, creator_email)
	VALUES(
	uuid_generate_v4(),
	${meal.slug},
	${meal.title},
	${url},
	${meal.summary},
	${meal.instructions},
	${meal.creator},
	${meal.creator_email}
	)`;

	setTimeout(async () => {
		await nextRevalidatePath('/meals');
		redirect('/meals');
	}, 1);
}
