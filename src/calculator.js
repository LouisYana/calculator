import { useState } from 'react';

const Calculator = () => {
	const [text, setText] = useState('0');
	const [errorText, setErrorText] = useState(' ');
	const operators = ['*', '/', '+', '-', '.'];

	let tokens = [];
	let operatorStack = [];
	let outputQueue = [];
	let outputFinal = [];

	const equals = () => {
		tokens = text.match(/[^\d()]+|[\d.]+/g);
		for (let i = 0; i < tokens.length; i++) {
			let value = tokens[i];
			if (!isNaN(parseFloat(value)) && isFinite(value)) {
				outputQueue.push(tokens[i]);
			} else {
				if (tokens[i] === '+' || tokens[i] === '-') {
					while (
						operatorStack[operatorStack.length - 1] === '*' ||
						operatorStack[operatorStack.length - 1] === '/'
					) {
						outputQueue.push(operatorStack.pop());
					}
				}
				operatorStack.push(tokens[i]);
			}
		}
		while (operatorStack.length > 0) {
			outputQueue.push(operatorStack.pop());
		}
		console.log(text);
		console.log(outputQueue);

		let left = 0;
		let right = 0;

		console.log('Start');

		for (let i = 0; i < outputQueue.length; i++) {
			let value = outputQueue[i];
			//console.log(outputQueue[i]);
			if (!operators.includes(value)) {
				outputFinal.push(value);
			} else {
				right = outputFinal.pop();
				left = outputFinal.pop();
				if (value == '+') {
					outputFinal.push(parseFloat(left) + parseFloat(right));
				} else if (value == '-') {
					outputFinal.push(parseFloat(left) - parseFloat(right));
				} else if (value == '*') {
					outputFinal.push(parseFloat(left) * parseFloat(right));
				} else if (value == '/') {
					outputFinal.push(parseFloat(left) / parseFloat(right));
				}
			}
		}

		setText(outputFinal.toString());
	};

	const buttonClick = (value) => {
		if (!isNaN(parseFloat(value)) && isFinite(value)) {
			if (text === 'NaN' || text === 'Infinity') {
				setText(value);
			} else {
				setText(text + value);
			}
			setErrorText(' ');
		} else if (operators.includes(value)) {
			if (operators.includes(text.charAt(text.length - 1))) {
				setErrorText('Cant have 2 operators in a row');
			} else if (text === 'NaN' || text === 'Infinity') {
				setErrorText('Cant perform on Nan or Infinity');
			} else {
				setText(text + value);
			}
		}
	};

	const backButton = (value) => {
		if (value === 1) {
			if (text.length === 1 || text === 'NaN' || text === 'Infinity') {
				setText('0');
			} else {
				setText(text.slice(0, -1));
			}
		} else {
			setText('0');
		}
		setErrorText('');
	};

	const createDigits = () => {
		const digits = [];
		for (let i = 0; i < 10; i++) {
			digits.push(
				<button key={i} onClick={() => buttonClick(i.toString())}>
					{i}
				</button>
			);
		}
		return digits;
	};

	return (
		<div className='calculator'>
			<div className='heading'>
				<h2 style={{}}>Calculator</h2>
				<h2>Louis Yanagisawa</h2>
			</div>

			<div className='output'>
				<h2 className='text'>{text}</h2>
			</div>

			<div className='buttons'>
				<div className='operators'>
					<button onClick={() => buttonClick('+')}>+</button>
					<button onClick={() => buttonClick('-')}>-</button>
					<button onClick={() => buttonClick('*')}>*</button>
					<button onClick={() => buttonClick('/')}>/</button>
					<button onClick={() => backButton(1)}>DEL</button>
					<button onClick={() => backButton(2)}>C</button>
				</div>
				<div className='digits'>
					{createDigits()}
					<button onClick={() => buttonClick('.')}>.</button>
					<button onClick={() => equals()}>=</button>
				</div>
			</div>

			<div className='bottom'>
				<h2 className='errors'>{errorText}</h2>
			</div>
		</div>
	);
};

export default Calculator;
