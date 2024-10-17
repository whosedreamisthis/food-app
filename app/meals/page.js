import React, { Suspense } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';

export const metadata = {
	title: 'All Meals',
	description: 'Browse the delicious meals shared by our vibrant community.',
};

async function Meals() {
	console.log('fetching meals');
	const meals = await getMeals();
	return <MealsGrid meals={meals} />;
}
export default function MealsPage() {
	return (
		<>
			<header className={styles.header}>
				<h1>
					Delicious Meals, created{' '}
					<span className={styles.highlight}>by you</span>
				</h1>
				<p>
					Choose your favorite recipe and cook it yourself. It is easy
					and fun!
				</p>
				<p className={styles.cta}>
					<Link href="/meals/share">Share Your Favourite Recipe</Link>
				</p>
			</header>
			<main className={styles.main}>
				<Suspense
					fallback={
						<p className={styles.loading}>Fetching meals ...</p>
					}
				>
					<Meals />
				</Suspense>
			</main>
		</>
	);
}
