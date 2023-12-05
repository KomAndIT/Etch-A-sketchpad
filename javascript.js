const grid = document.querySelector("#grid_container");
// const sideLength = document.querySelector("#side_length");
// const switchToColor = document.querySelector("#switchToColor");
// const switchToBlack = document.querySelector("#switchToBlack");
// const eraseBtn = document.querySelector("#erase");
// const eraseAllBtn = document.querySelector("#eraseAll");
const inputContainer = document.querySelector("#input_container");

var currentSideLength = 16;
var isCurrentColored = false;

createGrid(currentSideLength);
colorGridDivs(isCurrentColored);

// sideLength.addEventListener("click", () => {
//     removeAllChildNodes(grid);
//     currentSideLength = document.querySelector("input").value;
//     createGrid(currentSideLength);
//     colorGridDivs(isCurrentColored);
// });

inputContainer.addEventListener('click', (event) => {
    let target = event.target;

    switch(target.id) {
        case 'side_length':
            removeAllChildNodes(grid);
            currentSideLength = document.querySelector("input").value;
            createGrid(currentSideLength);
            colorGridDivs(isCurrentColored);
            break;
        case 'switchToColor':
            this.isCurrentColored = true;
            console.log("after clicked button isColored is: " + isCurrentColored)
            colorGridDivs(isCurrentColored);
            break;
        case 'switchToBlack':
            this.isCurrentColored = false;
            console.log("after clicked button isColored is: " + isCurrentColored)
            colorGridDivs(isCurrentColored);
            break;
        case 'erase':
            erasePaintedDivs();
            break;
        case 'eraseAll':
            removeAllChildNodes(grid);
            createGrid(currentSideLength);
            colorGridDivs(isCurrentColored);
            break;
    }
});

function colorGridDivs() {
    const gridItem = document.querySelectorAll(".grid-item");
    gridItem.forEach((gridItem) => {
        gridItem.addEventListener('mouseover', (item) => {
            console.log("isColored is: " + isCurrentColored)
            if (isCurrentColored) {
                console.log("enter colored")
                const transparency = increaseTransparency(item);
                const backgroundColor = item.target.style.backgroundColor;
                if(backgroundColor === "white" || backgroundColor === "black" ){
                    item.target.style.backgroundColor = randomRgbColor()
                    item.target.style.opacity = transparency;
                }else{
                    item.target.style.backgroundColor = backgroundColor;
                    item.target.style.opacity = transparency;
                }
            } else {
                console.log("enter not colored")
                let transparency = increaseTransparency(item);
                item.target.style.backgroundColor = "black";//black
                item.target.style.opacity = transparency;
            }
        });
    });
}

function increaseTransparency(item) {
    console.log("background color is: " + item.target.style.backgroundColor);
    let transparency = parseFloat(item.target.style.opacity);
    console.log("transparency is: " + transparency+" and typeof is:"+typeof transparency);
    if (transparency < 1) {
        transparency = transparency+0.1;
        item.target.style.opacity = transparency;
    }
    if (transparency > 1) {
        transparency = 1;
        item.target.style.opacity = transparency;
    }
    console.log("new transparency is: ",transparency)
    return transparency;
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
    if (length <2) {
        window.alert("WARNING: minimun side length is: 2")
    } else if (length > 100) {
        window.alert("WARNING: maximum side length is: 100")
    } else {
        for (let row = 0; row < length; row++) {
            const gridRow = document.createElement('div');
            gridRow.classList.add("grid-row");
            for (let column = 0; column < length; column++) {
                const gridColumn = document.createElement('div');
                gridColumn.classList.add("grid-item");
                gridColumn.style.opacity = 0.1;
                gridColumn.style.backgroundColor = "white";
                gridRow.appendChild(gridColumn);
            }
            grid.appendChild(gridRow);
        }
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
    return 'rgba(' + r + ',' + g + ',' + b + ')';
};
