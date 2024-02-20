const btn = document.querySelector('button');
const box = document.querySelector('#box');
let num = 0;
let startTime = 0;

btn.addEventListener('click', () => {
	startTime = performance.now();
	console.log('시작 시간', startTime);
	requestAnimationFrame(move);
});

function move() {
	num++;
	box.style.marginLeft = num + 'px';
	if (num >= 100) return;
	requestAnimationFrame(move);
}
