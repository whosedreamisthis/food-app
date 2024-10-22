'use client';
import React from 'react';

export default function Error({ error }) {
	return (
		<main className="error">
			<h1>An error occured!</h1>
			<p>Failed to fetch meal data. Please try again later.why?</p>
			<div>{error}</div>
		</main>
	);
}
