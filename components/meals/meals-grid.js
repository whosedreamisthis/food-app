import styles from './meals-grid.module.css';
import MealItem from './meal-item.js';
export default function MealsGrid({ meals }) {
	return (
		<ul className={styles.meals}>
			{meals.map((meal) => {
				return (
					<li key={meal.id}>
						<MealItem {...meal}></MealItem>
					</li>
				);
			})}
		</ul>
	);
}
