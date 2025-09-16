if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const cursorInner = document.querySelector('.cursor-inner');
  const cursorOuter = document.querySelector('.cursor-outer');

  let mouseX = 0, mouseY = 0;
  let outerX = 0, outerY = 0;

  function animate() {
    outerX += (mouseX - outerX) * 0.12;
    outerY += (mouseY - outerY) * 0.12;

    cursorOuter.style.left = `${outerX}px`;
    cursorOuter.style.top = `${outerY}px`;

    cursorInner.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

    requestAnimationFrame(animate);
  }
  animate();

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    createStarTrail(mouseX, mouseY);
  });

  function createStarTrail(x, y) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.background = `#fff`;

    document.body.appendChild(star);

    setTimeout(() => {
      star.remove();
    }, 800);
  }
}
