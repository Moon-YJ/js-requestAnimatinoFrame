const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click', () => {
	anime(box, {
		prop: 'margin-left',
		value: 100,
		duration: 1000,
		callback: () => {
			anime(box, {
				prop: 'margin-top',
				value: 200,
				duration: 500,
			});
		},
	});
});

function anime(selector, option) {
	startTime = performance.now();
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

		selector.style[option.prop] = option.value * progress + 'px';
	}
}
