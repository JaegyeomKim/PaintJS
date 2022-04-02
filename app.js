const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const clear = document.getElementById("jsClear");


const INITIAL_COLOR = "white"; 
const CANVAS_SIZE = 700;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle= INITIAL_COLOR;
ctx.fillStyle= INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(event){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x= event.offsetX;
    const y= event.offsetY;
    if(!painting){
        ctx.beginPath()
        ctx.moveTo(x, y);
    } else{
        ctx.lineTo(x, y)
        ctx.stroke();
    }
}

function onMouseUp(event){
    stopPainting()
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    if(filling === false){
        ctx.fillStyle = color;
        ctx.fillRect(0 ,0 , canvas.width ,canvas.height)
    }

}

function handleRangeInput(evnet){
    const range = evnet.target.value;
    ctx.lineWidth = range;
}

function buttonChange(event){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"

    }else{
        filling = true;
        mode.innerText = "Paint"
        handleCanvasClick();
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0 ,0 , canvas.width ,canvas.height)
    }
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

function saveFuntion(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "myPainting";
    link.click();
}

function clearCanvas(){

    ctx.fillRect(0 ,0 , canvas.width ,canvas.height);
}


if(colors){
    Array.from(colors).forEach(color=>
        color.addEventListener("click", handleColorClick));
}

if(range){
    range.addEventListener("input", handleRangeInput)
}

if(mode){
    mode.addEventListener("click", buttonChange)
}

if(save){
    save.addEventListener("click", saveFuntion);
}

if(clear){
    clear.addEventListener("click", clearCanvas)
}