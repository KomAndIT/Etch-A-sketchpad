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
                let transparency = increaseTransparency(item).toString();
                let backgroundColor = item.target.style.backgroundColor;
                if(backgroundColor !== "rgb(255, 255, 255)"){
                    let rgbaParts = backgroundColor.substr(0, 18);
                    console.log("rgbaParts: " + rgbaParts);
                    const increasedBackgroundColor =  rgbaParts+transparency+')';
                    console.log("increased background color is : " + increasedBackgroundColor);
                    item.target.style.backgroundColor = increasedBackgroundColor;
                }else{
                    item.target.style.backgroundColor = randomRgbColor(transparency);
                }
                
            } else {
                let transparency = increaseTransparency(item);
                item.target.style.backgroundColor = "rgba(0, 0, 0,"+transparency+")";//black
            }
        });
    });
}

function increaseTransparency(item) {
    console.log("background color is: " + item.target.style.backgroundColor);
    let transparency = parseFloat(item.target.getAttribute("transparency"));
    console.log("transparency is: " + transparency);
    if (transparency < 1) {
        item.target.setAttribute("transparency", transparency + 0.1);
    }
    if (transparency > 1) {
        item.target.setAttribute("transparency", 1);
    }
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
                gridColumn.setAttribute("transparency",0.1)
                gridColumn.style.backgroundColor = "rgb(255, 255, 255)";
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

function randomRgbColor(transparency) {
    let r = Math.floor(Math.random() * 256); // Random between 0-255
    let g = Math.floor(Math.random() * 256); // Random between 0-255
    let b = Math.floor(Math.random() * 256); // Random between 0-255
    return 'rgba(' + r + ',' + g + ',' + b + ','+transparency+')';
};
