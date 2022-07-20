const grid = document.getElementById('grid');

let mousedown = false;
grid.onmousedown = () => (mousedown = true);
grid.onmouseup = () => (mousedown = false);

function changeColor(e){
    if(e.type === 'mouseover' && !mousedown) return;

    console.log(e.target);
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

const clearBtn = document.querySelector('.btn-clear');
const cells = document.querySelectorAll('.cell');

function clearGrid(){
    cells.forEach(cell => cell.classList.remove('draw'));
}

clearBtn.addEventListener('click', clearGrid);