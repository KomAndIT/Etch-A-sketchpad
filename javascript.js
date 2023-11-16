const grid = document.querySelector("#grid_container");
const sideLength = document.querySelector("#side_length");
const switchToColor = document.querySelector("#switchToColor");
const switchToBlack = document.querySelector("#switchToBlack");
const eraseBtn = document.querySelector("#erase");
const eraseAllBtn = document.querySelector("#eraseAll");

var currentSideLength = 16;
var isCurrentColored = false;

createGrid(currentSideLength);
colorGridDivs(isCurrentColored);

sideLength.addEventListener("click", () => {
    removeAllChildNodes(grid);
    currentSideLength = document.querySelector("input").value;
    createGrid(currentSideLength);
    colorGridDivs(isCurrentColored);
});

switchToColor.addEventListener("click", () => {
    isCurrentColored = true;
    console.log("after clicked button isColored is: " + isCurrentColored)
    colorGridDivs(isCurrentColored);
});

switchToBlack.addEventListener("click", () => {
    isCurrentColored = false;
    colorGridDivs(isCurrentColored);
});

eraseBtn.addEventListener("click", () => {
    erasePaintedDivs();
});

eraseAllBtn.addEventListener("click", () => {
    removeAllChildNodes(grid);
    createGrid(currentSideLength);
    colorGridDivs(isCurrentColored);
});

function colorGridDivs(isColored) {
    const gridItem = document.querySelectorAll(".grid-item");
    gridItem.forEach((gridItem) => {
        gridItem.addEventListener('mouseover', (item) => {
            console.log("isColored is: " + isCurrentColored)
            if (isColored) {
                item.target.style.backgroundColor = randomRgbColor();
            } else {
                console.log("entering black")
                item.target.style.backgroundColor = "rgb(0, 0, 0)";
            }

        });
    });
}

function erasePaintedDivs() {
    const gridItem = document.querySelectorAll(".grid-item");
    gridItem.forEach((gridItem) => {
        gridItem.addEventListener('mouseover', (item) => {
            item.target.style.backgroundColor = "white";

        });
    });
}

function eraseAllPaintedDivs(parentElement) {
    console.log("removing clore node");
    while (parentElement.firstChild) {
        console.log("removing clore node");
        const secondChild = parentElement.firstChild.firstChild;
        while (secondChild.firstChild) {
            console.log("removing clore node");
            firstChild.target.style.backgroundColor = "white";
        }
    }
}

function createGrid(length) {
    for (let row = 0; row < length; row++) {
        const gridRow = document.createElement('div');
        gridRow.classList.add("grid-row");
        for (let column = 0; column < length; column++) {
            const gridColumn = document.createElement('div');
            gridColumn.classList.add("grid-item");
            gridColumn.style.backgroundColor = "rgb(255, 255, 255)";
            gridRow.appendChild(gridColumn);
        }
        grid.appendChild(gridRow);
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        console.log("removing child node");
        parent.removeChild(parent.firstChild);
    }
}

function randomRgbColor() {
    let r = Math.floor(Math.random() * 256); // Random between 0-255
    let g = Math.floor(Math.random() * 256); // Random between 0-255
    let b = Math.floor(Math.random() * 256); // Random between 0-255
    return 'rgb(' + r + ',' + g + ',' + b + ')';
};
