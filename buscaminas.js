let grid = [];
const DIM = 15;
const numBomb = 30;

function setup() {
    createCanvas(600, 600);
    textSize(20);
    textAlign(CENTER, CENTER);
    reset();
}

function reset() {
    for (let i = 0; i < DIM; i++) {
        grid[i] = new Array(DIM).fill(0).map((x, i) => new Cell());
    }
    for (let i = 0; i < numBomb; i++) {
        x = int(random(0, DIM));
        y = int(random(0, DIM));
        grid[x][y].hasBomb = true;

    }

    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
            grid[i][j].neighbours = countNeighbours(i, j);
        }
    }

}

function isInsideGrid(x, y) {
    return x >= 0 && y >= 0 && x < DIM && y < DIM;
}

function countNeighbours(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) continue;
            newX = x + i;
            newY = y + j;
            if (isInsideGrid(newX, newY) && grid[newX][newY].hasBomb) {
                count++;
            }
        }
    }
    return count;
}

function floodFill(x, y) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) continue;
            newX = x + i;
            newY = y + j;
            if (isInsideGrid(newX, newY) && !grid[newX][newY].visible) {
                reveal(newX, newY);
            }
        }
    }
}

function reveal(x, y) {
    grid[x][y].visible = true;
    if (grid[x][y].neighbours == 0) {
        floodFill(x, y);
    }
}

function mousePressed() {
    let i = floor(mouseX / width * DIM);
    let j = floor(mouseY / height * DIM);

    if (mouseButton === RIGHT) {
        grid[j][i].visible = true;
        grid[j][i].flag = true;
        return;
    }
    if (grid[j][i].hasBomb) {
        reset();
        return;
    }
    reveal(j, i);
}

function draw() {
    background(0);
    const w = width / DIM;
    const h = height / DIM;
    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
            let x = i * w;
            let y = j * h;

            if (!grid[j][i].visible) {
                fill(255);
                stroke(0);
                rect(x, y, w, h);
            }

            else {
                fill(255, 200, 200);
                stroke(0);
                rect(x, y, w, h);

                if (grid[j][i].hasBomb && !grid[j][i].flag) {
                    fill(0);
                    ellipse(x + w / 2, y + h / 2, w / 1.5);
                }
    
                else {
                    if (grid[j][i].flag) {
                        fill(0, 200, 200);
                        stroke(0);
                        rect(x, y, w, h);
                    } 
                    else {    
                        fill(0)
                        text(grid[j][i].neighbours, x, y, w, h);
                    }
                }
            }

            
        }
    }
}