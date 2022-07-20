const grid = document.getElementById('grid');

//color change
let mousedown = false;
grid.onmousedown = () => (mousedown = true);
grid.onmouseup = () => (mousedown = false);

var currentColor = 'draw-black';
const COLORS = ['draw-black', 'draw-purple', 'draw-violet', 'draw-blue', 'draw-green', 'draw-yellow', 'draw-orange', 'draw-red', 'draw-white'];

function scratchColorOff(e){
    var currentColorIndex = COLORS.indexOf(currentColor, 0);
    e.target.classList.remove(COLORS[currentColorIndex]);
    currentColorIndex++;
    if(currentColorIndex > COLORS.length - 1){
        currentColorIndex = COLORS.length - 1;
    }
    currentColor = COLORS[currentColorIndex];
    console.log(currentColor);
    return currentColor;
}

function changeColor(e){
    if(e.type === 'mouseover' && !mousedown) return;
    currentColor = e.target.classList[1];
    e.target.classList.add(scratchColorOff(e));
}

function makeGrid(size){
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(let i = 0; i < size * size; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell', 'draw-black');
        cell.addEventListener('mouseover', changeColor);
        cell.addEventListener('mousedown', changeColor);
        grid.appendChild(cell);
    }
}

makeGrid(16);

//clear the grid when clear grid btn is clicked
const clearBtn = document.querySelector('.btn-clear');


function clearGrid(){
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.remove(cell.classList[1]));
    cells.forEach(cell => cell.classList.add(COLORS[0]));
}

clearBtn.addEventListener('click', clearGrid);

//change the size of the grid from prompt
const newGridSizeBtn = document.querySelector('.btn-new');

function removeAllChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}
function newGrid(size){
    removeAllChildNodes(grid);
    makeGrid(size);
}

function promptForSize(){
    var size = prompt("Please provide a size of the grid (min size: 16, max size: 100)");
    
    if(size > 100){
        size = 100;
    }
    if(size <= 16){
        size = 16;
    }
    if(isNaN(size)){
        size = 16;
        console.log("Not a number");
    }
    console.log(size);
    newGrid(size);
}

newGridSizeBtn.addEventListener('click', promptForSize);