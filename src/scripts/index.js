const canvas = document.querySelector('canvas');
const ctx = canvas?.getContext('2d');
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
canvas.width = screenWidth; 
canvas.height = screenHeight;

//const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

let gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 100, canvas.width / 2, canvas.height / 2, canvas.width / 2);

gradient.addColorStop(0, 'red');
gradient.addColorStop(0.1, 'orange');
gradient.addColorStop(0.2, 'yellow');
gradient.addColorStop(0.4, 'lime');
gradient.addColorStop(0.6, 'cyan');
gradient.addColorStop(0.7, 'blue');
gradient.addColorStop(0.8, 'purple');
gradient.addColorStop(0.9, 'magenta');

class MySymbol{
    constructor(x, y, fontSize, canvasHeight){
        this.characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
        this.x_coordinate = x;
        this.y_coordinate = y;
        this.fontSize = fontSize;
        this.canvasHeight = canvasHeight;
    }
    drawSymbols(context){
        this.text = this.characters[Math.floor(Math.random() * this.characters.length)];
        context.fillText(this.text, this.x_coordinate * (this.fontSize), this.y_coordinate * (this.fontSize));
        if (this.y_coordinate * this.fontSize >= this.canvasHeight && Math.random() > .99){
            this.y_coordinate = 0;
        }
        else{
            this.y_coordinate++;
        }
    }
}

class DrawMatrix{
    constructor(windowHeight, windowWidth){
        this.canvasHeight = windowHeight;
        this.canvasWidth = windowWidth;
        this.fontSize = 18;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
    #initialize(){
        for (let a = 0; a < this.columns; a++){
            this.symbols[a] = new MySymbol(a, 0, this.fontSize, this.canvasHeight);
        }
        console.log(this.symbols);
    }
    resize(windowHeight, windowWidth){
        this.canvasHeight = windowHeight;
        this.canvasWidth = windowWidth;
        this.fontSize = 18;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}

const effect = new DrawMatrix(screenHeight, screenWidth)

let lastTime = 0;
const fps = 100;
const nextFrame = 1000 / fps;
let timer = 0;

const animate = (timeStamp) => {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame){
        ctx.fillStyle = 'rgba(0, 0, 0, .05)';
        ctx.textAlign = 'center';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = gradient;
        ctx.font = effect.fontSize + 'px monospace'
        effect.symbols.forEach((element) => element.drawSymbols(ctx));
    }
    else {
        timer += deltaTime
    }
    requestAnimationFrame(animate);
}

console.log(effect);

animate(0);

window.addEventListener('resize', () => {
    console.log('hi')
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.height, canvas.width);
    gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 100, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.1, 'orange');
    gradient.addColorStop(0.2, 'yellow');
    gradient.addColorStop(0.4, 'lime');
    gradient.addColorStop(0.6, 'cyan');
    gradient.addColorStop(0.7, 'blue');
    gradient.addColorStop(0.8, 'purple');
    gradient.addColorStop(0.9, 'magenta');
})
