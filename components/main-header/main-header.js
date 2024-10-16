import Link from 'next/link';
import Image from 'next/image';
import logoImg from '@/assets/logo.png';

import styles from './main-header.module.css';
import MainHeaderBackground from '@/components/main-header/main-header-background';
import NavLink from './nav-link';
export default function MainHeader() {
	return (
		<>
			<MainHeaderBackground />

			<header className={styles.header}>
				<Link className={styles.logo} href="/">
					<Image
						src={logoImg}
						alt="A plate with food on it"
						priority={true}
					/>
					Next level food
				</Link>

				<nav className={styles.nav}>
					<ul>
						<li>
							<NavLink href="/meals">Browse Meals</NavLink>
						</li>
						<li>
							<NavLink href="/community">Community</NavLink>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
}
