const grid = document.getElementById('grid');

let mousedown = false;
grid.onmousedown = () => (mousedown = true);
grid.onmouseup = () => (mousedown = false);

function changeColor(e){
    if(e.type === 'mouseover' && !mousedown) return;
    e.target.classList.add('draw');
}

function makeGrid(size){
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(let i = 0; i < size * size; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
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
    cells.forEach(cell => cell.classList.remove('draw'));
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