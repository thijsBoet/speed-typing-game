import React, { useState, useEffect } from 'react';

const App = () => {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);

  const handleChange = e => setText(e.target.value);

  const calculateWordCount = (text) => text.trim().split(' ').filter(word => word !== "").length;

  useEffect(() => {
    if (timeRemaining > 0)
      setTimeout(() => setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 1), 1000)
      setWordCount(calculateWordCount(text));
	}, [timeRemaining]);

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
			/>
			<h4>Time remaining {timeRemaining} seconds</h4>
			<button onClick={handleChange}>Start</button>
			<h1>Word count: {wordCount === 0 ? '???' : wordCount}</h1>
		</div>
	);
}

export default App;
