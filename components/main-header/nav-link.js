'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './nav-link.module.css';
export default function NavLink({ href, children }) {
	const path = usePathname();
	console.log('path', path, 'href', href);
	return (
		<Link
			href={href}
			className={
				path.startsWith(href)
					? `${styles.link} ${styles.active}`
					: styles.link
			}
		>
			{children}
		</Link>
	);
}