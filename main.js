const btn = document.querySelector('button');
const box = document.querySelector('#box');
const speed = 500;
const targetVal = 100;
let num = 0;
let startTime = 0;
let count = 0;

btn.addEventListener('click', () => {
	startTime = performance.now();
	requestAnimationFrame(move);
});

function move(time) {
	// requestAnimationFrame에 의해서 콜백함수가 반복돌때마다의 누적시간값이 인수로 전달됨
	let timelast = time - startTime;
	let progress = timelast / speed;
	console.log('누적시간', timelast);
	console.log('진행률', progress);
	console.log('반복횟수', count++);

	progress < 0 && (progress = 0);
	progress > 1 && (progress = 1);
	progress < 1 && requestAnimationFrame(move);

	box.style.marginLeft = targetVal * progress + 'px';
}
