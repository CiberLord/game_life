
let cnv = document.querySelector("#canvas");
let ctx = cnv.getContext('2d');
let world_size = 60;
let canvas_size = 800;
let fps = 10;
let grid = true;
let life_game = null;
let timer = null;
let state = Menu.starting;
let frame_id = 0;

modalWindow.create("setup",".setup");
start();


Menu.run.addEventListener("click", function (event) {
    grid=false;
    this.classList.add("enable");
    if (state == Menu.editing) {
        disable();
        Menu.edit.classList.remove("enable");
        state = Menu.running;
        this.textContent = "stop";
    }
    else if (state == Menu.stoping) {
        state = Menu.running;
        this.textContent = "stop";
    }
    else if (state == Menu.running) {
        state = Menu.stoping;
        this.textContent = "run";
    }
    else if (Menu.start) {
        Menu.start=false;
        state = Menu.running;
        Anima.animate(frame_id, render);
        this.textContent = "stop";
    }
});

Menu.edit.addEventListener("click", function (event) {
    grid=true;
    this.classList.add("enable");
    Menu.run.textContent = "run";
    Menu.run.classList.remove("enable");
    state = Menu.editing;
    grid = true;
    if (Menu.start) {
        Menu.start=false;
        Anima.animate(frame_id, render);
    }
    enable();
});

Menu.setup.addEventListener("click",function(){
    if(state==Menu.editing){
        disable();
        Menu.edit.classList.remove("enable");
    }else if(state==(Menu.running||Menu.stoping)){
        Menu.run.classList.remove("anable");
    }
    Menu.run.textContent="stop";
    state=Menu.setup_opening;
    modalWindow.open("setup");
});
Menu.ok.addEventListener("click",setupAccept);
Menu.cancel.addEventListener("click",setupCancel);



function worldEdit(event) {
    let pos = getCoords(this);
    let x = event.pageX - pos.left;
    let y = event.pageY - pos.top;
    let col = Math.floor(x / life_game.unitSize);
    let row = Math.floor(y / life_game.unitSize);
    life_game.world[col][row] = !life_game.world[col][row]
}

function nexStep() {
    if (state == Menu.editing) {

        life_game.update();
    }
}
function clear() {
    if (state == Menu.editing) {

        life_game.clear();
    }
}
function setupAccept(event){
    world_size=parseInt(Menu.worldSize.value);
    canvas_size=parseInt(Menu.cnvSize.value);
    fps=parseInt(Menu.fps.value);
    grid=true;
    if(world_size<10){
        Menu.worldSize.value=10;
        world_size=10;
    }
    if(world_size>1000){
        Menu.worldSize.value=1000;
        world_size=1000;
    }
    
    if(canvas_size<200){
        Menu.cnvSize.value=200;
        canvas_size=200;
    }
    if(canvas_size>1500){
        Menu.cnvSize.value=1500;
        canvas_size=1500;
    }
    if(fps<0.2){
        Menu.fps.value=0.2;
        fps=0.2;
    }
    if(fps>60){
        Menu.fps.value=60;
        fps=60;
    }

    cnv.width = canvas_size;
    cnv.height = canvas_size;
    life_game = new LifeGame(cnv.width, world_size);
    timer = new Timer(1000/fps, function () {
        draw();
        life_game.update();
    });
    ctx.strokeStyle = Menu.gridColor;
    ctx.fillStyle = Menu.bg;
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    ctx.strokeRect(0, 0, cnv.width, cnv.height);
    if(grid)drawGrid();
    state=Menu.starting;
    modalWindow.close("setup");
    
}
function setupCancel(){

    state=Menu.starting;
    modalWindow.close("setup");
}



function start() {
    Menu.worldSize.value=world_size;
    Menu.cnvSize.value=canvas_size;
    Menu.fps.value=10;

    cnv.width = canvas_size;
    cnv.height = canvas_size;
    life_game = new LifeGame(cnv.width, world_size);
    timer = new Timer(1000/fps, function () {
        draw();
        life_game.update();
    });
    ctx.strokeStyle = Menu.gridColor;
    ctx.fillStyle = Menu.bg;
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    ctx.strokeRect(0, 0, cnv.width, cnv.height);
    if(grid)drawGrid();
}


function render(delta) {
    
    if (state == Menu.running) {
        timer.step(delta);
    }
    if (state == Menu.stoping) {
        draw()
    }
    if (state == Menu.editing) {
        draw();
    }
}
function drawGrid() {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    for (let i = 0; i < cnv.width; i += life_game.unitSize) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, cnv.height);
    }
    for (let i = 0; i < cnv.height; i += life_game.unitSize) {
        ctx.moveTo(0, i);
        ctx.lineTo(cnv.width, i);
    }
    ctx.stroke();
}
function draw() {
    ctx.fillStyle = Menu.bg;
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    ctx.strokeRect(0, 0, cnv.width, cnv.height);
    ctx.fillStyle = Menu.ceilColor;
    life_game.render(ctx);
    if (grid) {
        drawGrid();
    }
}


function disable() {
    cnv.removeEventListener("mouseup", worldEdit);
    Menu.step.removeEventListener("click", nexStep);
    Menu.step.classList.add("disable");
    Menu.clear.classList.add("disable");
    Menu.clear.removeEventListener("click", clear);
}
function enable() {
    cnv.addEventListener("mouseup", worldEdit);
    Menu.step.addEventListener("click", nexStep);
    Menu.step.classList.remove("disable");
    Menu.clear.classList.remove("disable");
    Menu.clear.addEventListener("click", clear);
}


function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}



Menu.step.addEventListener("mousedown", down);
Menu.step.addEventListener("mouseup", up);

Menu.edit.addEventListener("mousedown", down);
Menu.edit.addEventListener("mouseup", up);

Menu.run.addEventListener("mousedown", down);
Menu.run.addEventListener("mouseup", up);

Menu.setup.addEventListener("mousedown", down);
Menu.setup.addEventListener("mouseup", up);

Menu.cancel.addEventListener("mousedown", down);
Menu.cancel.addEventListener("mouseup", up);

Menu.ok.addEventListener("mousedown", down);
Menu.ok.addEventListener("mouseup", up);


function down() {
    this.style.backgroundColor = "#5c5c59";
}
function up() {
    this.style.backgroundColor = "rgb(144, 144, 144)";
}
