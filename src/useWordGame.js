import { useState, useEffect, useRef } from 'react';

const useWordGame = (STARTING_TIME = 10) => {
		const textareaRef = useRef(null);

		const [text, setText] = useState('');
		const [wordCount, setWordCount] = useState(0);
		const [letterCount, setLetterCount] = useState(0);
		const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
		const [isTimeRunning, setIsTimeRunning] = useState(false);

		const handleChange = e => setText(e.target.value);

		const calculateWordCount = text =>
			text
				.trim()
				.split(' ')
				.filter(word => word !== '').length;
		const calculateLetterCount = text =>
			text
				.trim()
				.split('')
				.filter(word => word !== '')
				.filter(word => word !== ' ').length;

		const startGame = () => {
			setIsTimeRunning(true);
			setTimeRemaining(STARTING_TIME);
			setText('');
			textareaRef.current.disabled = false;
			textareaRef.current.focus();
		};

		function endGame () {
			setIsTimeRunning(false);
			setTimeRemaining(STARTING_TIME);
		};

		useEffect(() => {
			if (timeRemaining > 0 && isTimeRunning) {
				setTimeout(
					() => setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 1),
					1000
				);
				setWordCount(calculateWordCount(text));
				setLetterCount(calculateLetterCount(text));
			}
			if (timeRemaining <= 0) {
				endGame();
			}
    }, [timeRemaining, isTimeRunning]);

	return {
		STARTING_TIME,
		text,
		handleChange,
		isTimeRunning,
		timeRemaining,
		textareaRef,
		startGame,
		wordCount,
		letterCount,
	};
}

export default useWordGame;