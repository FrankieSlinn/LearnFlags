import { daysElapsed} from "./daysElapsed.js";
function clipboard() {
    document.querySelectorAll(".share").forEach((item) => {
        item.addEventListener("click", async function () {
            const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

            if (isSafari) {
                // Safari-specific clipboard handling
                try {
                    await navigator.clipboard.write([
                        new ClipboardItem({
                            "image/png": new Promise(async (resolve, reject) => {
                                try {
                                    const shareResultsArray = JSON.parse(localStorage.getItem("shareResultsArray"));
                                    if (!shareResultsArray || !shareResultsArray.length) {
                                        alert("No images to share");
                                        return;
                                    }

                                    // Create the imageBlob here using the existing code
                                    const imageBlob = await createCombinedImageBlob(shareResultsArray); 
                                    resolve(new Blob([imageBlob], { type: "image/png" }));
                                } catch (err) {
                                    reject(err);
                                }
                            }),
                        }),
                    ]);
                    alert("FLAGL Results Copied To Clipboard (Safari)");
                    return; // Exit the function after handling Safari-specific logic
                } catch (err) {
                    console.error("Failed to copy images in Safari: ", err);
                    alert("Failed to copy images to clipboard in Safari");
                    return; // Exit the function after handling Safari-specific logic
                }
            }

            // If not Safari, proceed with the general clipboard handling
            try {
                await handleShareClick();
            } catch (err) {
                console.error("An error occurred: ", err);
            }
        });
    });
}

async function handleShareClick() {
    try {
        const shareResultsArray = JSON.parse(localStorage.getItem("shareResultsArray"));
        if (!shareResultsArray || !shareResultsArray.length) {
            alert("No images to share");
            return;
        }

        // Process and create the image blob here
        const combinedBlob = await createCombinedImageBlob(shareResultsArray);

        if (combinedBlob) {
            await copyImageToClipboard(combinedBlob);
        } else {
            alert("Failed to create image blob");
        }
    } catch (err) {
        console.error("Failed to copy images: ", err);
        alert("Failed to copy images to clipboard");
    }
}

async function createCombinedImageBlob(shareResultsArray) {
    const imageBitmaps = [];
    const imageSize = 80; // Size of each image in pixels
    const padding = 10; // Padding between images
    const titleHeight = 50; // Height of the title area
    const footerHeight = 25; // Height of the footer area

    for (const src of shareResultsArray) {
        try {
            const blob = await fetch(src).then(response => response.blob());
            const imageBitmap = await createImageBitmap(blob);
            imageBitmaps.push(imageBitmap);
        } catch (err) {
            console.error(`Failed to process image from URL: ${src}`, err);
        }
    }

    if (imageBitmaps.length === 0) {
        alert("No valid images to copy to clipboard");
        return null;
    }

    const imagesPerRow = Math.floor((1200 - padding) / (imageSize + padding));
    const rows = Math.ceil(imageBitmaps.length / imagesPerRow);
    const canvasWidth = (Math.min(imagesPerRow, imageBitmaps.length) * (imageSize + padding)) + padding;
    const canvasHeight = titleHeight + (rows * (imageSize + padding)) + padding + footerHeight;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx.fillStyle = '#ffffff'; // White background
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas with white

    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#353839'; // Set text color 
    ctx.fillText(`FLAGL ${daysElapsed}`, canvasWidth / 2, 40);

    let x = padding; // Start drawing from the left with padding
    let y = titleHeight + padding; // Start drawing below the title with padding

    imageBitmaps.forEach((bitmap) => {
        if (x + imageSize + padding > canvasWidth) {
            x = padding;
            y += imageSize + padding;
        }
        ctx.drawImage(bitmap, x, y, imageSize, imageSize);
        x += imageSize + padding; // Move to the next position in the row
    });

    ctx.font = '15px Arial';
    ctx.fillText('flagl.net', canvasWidth / 2, canvasHeight - 10);

    return await new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 1.0));
}

async function copyImageToClipboard(imageBlob) {
    const clipboardItem = new ClipboardItem({ 'image/png': imageBlob });
    try {
        await navigator.clipboard.write([clipboardItem]);
        alert("FLAGL Results Copied To Clipboard");
    } catch (err) {
        console.error("Failed to copy images: ", err);
        alert("Failed to copy images to clipboard");
    }
}




export{
    clipboard, copyImageToClipboard
  }







