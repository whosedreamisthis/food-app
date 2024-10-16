import React from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import MealsGrid from '@/components/meals/meals-grid';

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
				<MealsGrid meals={[]}></MealsGrid>
			</main>
		</>
	);
}
