const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click', () => {
	anime(box, { width: 300, left: '50%', height: '100%', opacity: 0.2 }, 1000, () => {
		anime(box, { width: 100, left: 0, height: 100, opacity: 1 }, 1000);
	});
});

function anime(selector, props, duration, callback) {
	const startTime = performance.now();
	const keys = Object.keys(props);
	const values = Object.values(props);

	keys.forEach((key, idx) => setValue(key, values[idx], selector, duration, callback));

	function setValue(key, value, selector, duration, callback) {
		let currentValue = parseFloat(getComputedStyle(selector)[key]);

		const isString = typeof value;
		if (isString === 'string') {
			const parentWid = parseFloat(getComputedStyle(selector.parentElement).width);
			const parentHgt = parseFloat(getComputedStyle(selector.parentElement).height);

			const x = ['left', 'right', 'width'];
			const y = ['top', 'bottom', 'height'];
			for (let cond of x) key === cond && (currentValue = (currentValue / parentWid) * 100);
			for (let cond of y) key === cond && (currentValue = (currentValue / parentHgt) * 100);
			if (key.includes('margin') || key.includes('padding'))
				return console.error('margin, padding 속성은 %값을 적용할 수 없습니다.');

			value = parseFloat(value);
		}
		requestAnimationFrame(move);

		function move(time) {
			// requestAnimationFrame에 의해서 콜백함수가 반복돌때마다의 누적시간값이 인수로 전달됨
			let timelast = time - startTime;
			let progress = timelast / duration;

			progress < 0 && (progress = 0);
			progress > 1 && (progress = 1);
			progress < 1 ? requestAnimationFrame(move) : callback && callback();

			const result = currentValue + (value - currentValue) * progress;
			if (isString === 'string') selector.style[key] = result + '%';
			else if (key === 'opacity') selector.style[key] = result;
			else selector.style[key] = result + 'px';
		}
	}
}
