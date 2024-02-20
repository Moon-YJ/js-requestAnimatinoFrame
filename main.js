const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click', () => {
	anime(box, {
		prop: 'top',
		value: '100%',
		duration: 1000,
		// callback: () => {
		// 	anime(box, {
		// 		prop: 'margin-top',
		// 		value: 200,
		// 		duration: 500,
		// 	});
		// },
	});
});

function anime(selector, option) {
	const startTime = performance.now();
	let currentValue = parseInt(getComputedStyle(selector)[option.prop]);

	const isString = typeof option.value;
	if (isString === 'string') {
		const parentWid = parseFloat(getComputedStyle(selector.parentElement).width);
		const parentHgt = parseFloat(getComputedStyle(selector.parentElement).height);

		const x = ['left', 'right', 'width'];
		const y = ['top', 'bottom', 'height'];
		for (let cond of x) option.prop === cond && (currentValue = (currentValue / parentWid) * 100);
		for (let cond of y) option.prop === cond && (currentValue = (currentValue / parentHgt) * 100);
		if (option.prop.includes('margin') || option.prop.includes('padding'))
			return console.error('margin, padding 속성은 %값을 적용할 수 없습니다.');

		option.value = parseFloat(option.value);
	}
	requestAnimationFrame(move);

	function move(time) {
		// requestAnimationFrame에 의해서 콜백함수가 반복돌때마다의 누적시간값이 인수로 전달됨
		let timelast = time - startTime;
		let progress = timelast / option.duration;

		progress < 0 && (progress = 0);
		progress > 1 && (progress = 1);
		progress < 1 ? requestAnimationFrame(move) : option.callback && option.callback();

		const result = currentValue + (option.value - currentValue) * progress;
		if (isString === 'string') selector.style[option.prop] = result + '%';
		else selector.style[option.prop] = result + 'px';
	}
}
