import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const STARTING_TIME = 30;
  const textareaRef = useRef(null);

  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);

  const handleChange = e => setText(e.target.value);

  const calculateWordCount = text =>
    text
      .trim()
      .split(' ')
      .filter(word => word !== "").length;
  const calculateLetterCount = text =>
    text
      .trim()
			.split('')
			.filter(word => word !== '')
			.filter(word => word !== ' ').length;

  const startGame = () => {
    setIsTimeRunning(true);
    setTimeRemaining(STARTING_TIME);
    setText("");
    textareaRef.current.disabled = false;
    textareaRef.current.focus();
  }

  const endGame = () => {
    setIsTimeRunning(false);
		setTimeRemaining(STARTING_TIME);
  }

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

  return (
		<div>
			<h1>How fast do you type?</h1>
			<textarea
				name='textarea'
				id='textarea'
				cols='30'
				rows='10'
				value={text}
				onChange={handleChange}
				autoFocus
				disabled={!isTimeRunning}
				ref={textareaRef}
			/>
			<h4>
				Time remaining{' '}
				{timeRemaining === STARTING_TIME
					? '???'
					: timeRemaining >= 10
					? `0:${timeRemaining}`
					: `0:0${timeRemaining}`}
			</h4>
			<button disabled={isTimeRunning} onClick={startGame}>
				Start
			</button>
			<h1>
				Word count: {wordCount === 0 ? '???' : wordCount} | Letter count:{' '}
				{letterCount === 0 ? '???' : letterCount}
			</h1>
		</div>
	);
}

export default App;
