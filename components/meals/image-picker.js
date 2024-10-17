'use client';
import React, { useRef, useState } from 'react';
import styles from './image-picker.module.css';
import Image from 'next/image';
export default function ImagePicker({ label, name }) {
	const [pickedImage, setPickedImage] = useState('');
	const imageInputRef = useRef();
	function handleClickPick() {
		imageInputRef.current.click();
	}

	function handleImageChange(event) {
		const file = event.target.files[0];

		if (!file) {
			setPickedImage(null);
			return;
		}

		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPickedImage(fileReader.result);
		};
		fileReader.readAsDataURL(file);
	}
	return (
		<div className={styles.picker}>
			<label htmlFor={name}>{label}</label>
			<div className={styles.controls}>
				<div className={styles.preview}>
					{!pickedImage && <p>No image picked yet.</p>}
					{pickedImage && (
						<Image
							fill
							src={pickedImage}
							alt="The image selected by the user."
						/>
					)}
				</div>
				<input
					className={styles.input}
					type="file"
					id={name}
					accept="image/png,image/jpg"
					name={name}
					ref={imageInputRef}
					onChange={handleImageChange}
					required
				/>
				<button
					className={styles.button}
					type="button"
					onClick={handleClickPick}
				>
					Pick an Image
				</button>
			</div>
		</div>
	);
}
