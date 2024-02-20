const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click', () => {
	anime(box, {
		prop: 'width',
		value: 300,
		duration: 500,
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
	const currentValue = parseInt(getComputedStyle(selector)[option.prop]);
	requestAnimationFrame(move);

	function move(time) {
		// requestAnimationFrame에 의해서 콜백함수가 반복돌때마다의 누적시간값이 인수로 전달됨
		let timelast = time - startTime;
		let progress = timelast / option.duration;

		progress < 0 && (progress = 0);
		progress > 1 && (progress = 1);
		progress < 1
			? requestAnimationFrame(move)
			: option.callback && option.callback();

		const result = currentValue + (option.value - currentValue) * progress;
		selector.style[option.prop] = result + 'px';
	}
}
