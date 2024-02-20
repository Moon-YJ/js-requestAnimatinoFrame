const btn = document.querySelector('button');
const box = document.querySelector('#box');
const speed = 1000;
const targetVal = 100;
let num = 0;
let startTime = 0;
let count = 0;

btn.addEventListener('click', () => {
	startTime = performance.now();
	console.log('시작 시간', startTime);
	requestAnimationFrame(move);
});

function move(time) {
	// requestAnimationFrame에 의해서 콜백함수가 반복돌때마다의 누적시간값이 인수로 전달됨
	let timelast = time - startTime;
	console.log('반복 사이클마다 누적시간', timelast);
	num++;
	box.style.marginLeft = num + 'px';
	if (num >= targetVal) return;
	requestAnimationFrame(move);
}
