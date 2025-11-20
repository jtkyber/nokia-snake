import App from './app';

const canvas = document.getElementById('display_canvas') as HTMLCanvasElement;

const app = new App(canvas);
app.init();
app.start();

window.addEventListener('resize', () => app.resize());
