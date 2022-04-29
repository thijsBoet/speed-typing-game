import React from 'react';
import useWordGame from './useWordGame';

const App = () => {
  const {
		STARTING_TIME,
		text,
		handleChange,
		isTimeRunning,
		timeRemaining,
		textareaRef,
		startGame,
		wordCount,
		letterCount,
  } = useWordGame(30);

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
