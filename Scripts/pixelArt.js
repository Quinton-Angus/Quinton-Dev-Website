const pixelGrid = document.querySelector("#pixelGrid");


// ==============================
// Configuration
// ==============================

const rows = 15;
const pixelSize = 16;

const baseColour = "#202020";
const lightGrey = "#282828";
const accentColour = "#9EA6FF";


// ==============================
// Colour helper
// ==============================

function mixColour(base, target, amount) {

    const baseRGB = base
        .match(/\w\w/g)
        .map(value => parseInt(value, 16));

    const targetRGB = target
        .match(/\w\w/g)
        .map(value => parseInt(value, 16));

    const result = baseRGB.map((value, index) =>
        Math.round(
            value + (targetRGB[index] - value) * amount
        )
    );

    return `rgb(${result.join(", ")})`;
}


// ==============================
// Determine grid size
// ==============================

const gridWidth = pixelGrid.parentElement.clientWidth;

const columns = Math.ceil(gridWidth / pixelSize);

pixelGrid.style.setProperty("--columns", columns);
pixelGrid.style.setProperty("--rows", rows);
pixelGrid.style.setProperty("--pixel-size", `${pixelSize}px`);


// ==============================
// Generate pixels
// ==============================

for (let row = 0; row < rows; row++) {

    // 0 = top
    // 1 = bottom
    const height = row / (rows - 1);

    // Sparse at the top.
    // Dense at the bottom.
    const density = 0.15 + (height * 0.8);


    for (let column = 0; column < columns; column++) {

        // Decide whether this location
        // contains a pixel.
        if (Math.random() > density) {
            continue;
        }


        // ==============================
        // Create pixel
        // ==============================

        const pixel = document.createElement("span");

        pixel.classList.add("pixel");

        pixel.style.gridColumn = column + 1;
        pixel.style.gridRow = row + 1;


        // ==============================
        // Colour
        // ==============================

        // Only a small number of pixels
        // are coloured.
        const colourChance =
            0.01 + (height * 0.04);

        if (Math.random() < colourChance) {

            pixel.style.backgroundColor = accentColour;

        } else {

            // Generate a shade between the
            // background and light grey.
            //
            // Squaring the random value means
            // darker greys occur much more often.
            const amount = Math.random() ** 2.2;

            pixel.style.backgroundColor =
                mixColour(
                    baseColour,
                    lightGrey,
                    amount
                );
        }


        // ==============================
        // Add pixel
        // ==============================

        pixelGrid.appendChild(pixel);
    }
}