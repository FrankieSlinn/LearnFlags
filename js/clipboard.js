import { daysElapsed} from "./daysElapsed.js";


let clipboard = function(){
    document.querySelectorAll(".share").forEach((item) => {
        item.addEventListener("click", async function () {
            try {
                const shareResultsArray = JSON.parse(localStorage.getItem("shareResultsArray"));
                if (!shareResultsArray || !shareResultsArray.length) {
                    alert("No images to share");
                    return;
                }
    
                const imageBitmaps = [];
                const imageSize = 80; // Size of each image in pixels
                const padding = 10; // Padding between images
                const titleHeight = 50; // Height of the title area
                const footerHeight = 25; // Height of the footer area
    
                // Fetch and process each image
                for (const src of shareResultsArray) {
                    try {
                        const response = await fetch(src);
                        if (!response.ok) {
                            throw new Error(`Network response was not ok for URL: ${src}`);
                        }
    
                        const blob = await response.blob();
                        let imageBitmap;
    
                        // Handle SVG images separately by modifying their color
                        if (blob.type === "image/svg+xml") {
                            const text = await blob.text();
                            const modifiedSvgText = text.replace(/fill="[^"]*"/g, 'fill="red"'); // Change color to red
                            const svgBlob = new Blob([modifiedSvgText], { type: "image/svg+xml" });
                            const url = URL.createObjectURL(svgBlob);
                            const img = new Image();
                            img.src = url;
                            await new Promise((resolve, reject) => {
                                img.onload = () => resolve();
                                img.onerror = () => reject(new Error('Error loading modified SVG image'));
                            });
                            const tempCanvas = document.createElement("canvas");
                            tempCanvas.width = imageSize;
                            tempCanvas.height = imageSize;
                            const tempCtx = tempCanvas.getContext("2d");
                            tempCtx.drawImage(img, 0, 0, imageSize, imageSize);
                            imageBitmap = await createImageBitmap(tempCanvas);
                            URL.revokeObjectURL(url); // Clean up object URL
                        } else {
                            imageBitmap = await createImageBitmap(blob);
                        }
    
                        imageBitmaps.push(imageBitmap);
                    } catch (innerError) {
                        console.error(`Failed to process image from URL: ${src}`, innerError);
                    }
                }
    
                if (imageBitmaps.length === 0) {
                    alert("No valid images to copy to clipboard");
                    return;
                }
    
                // Calculate the required canvas dimensions
                const imagesPerRow = Math.floor((1200 - padding) / (imageSize + padding));
                const rows = Math.ceil(imageBitmaps.length / imagesPerRow);
                const canvasWidth = (Math.min(imagesPerRow, imageBitmaps.length) * (imageSize + padding)) + padding;
                const canvasHeight = titleHeight + (rows * (imageSize + padding)) + padding + footerHeight;
    
                // Create a canvas with the calculated dimensions
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;
    
                // Set the background to white
                ctx.fillStyle = '#ffffff'; // White background
                ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas with white
    
                // Enable image smoothing for better quality
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
    
                // Draw the title and daysElapsed onto the canvas
                ctx.font = 'bold 30px Arial';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#353839'; // Set text color to #353839
                ctx.fillText(`FLAGL ${daysElapsed}`, canvasWidth / 2, 40);
    
                // Draw images onto the canvas
                let x = padding; // Start drawing from the left with padding
                let y = titleHeight + padding; // Start drawing below the title with padding
    
                imageBitmaps.forEach((bitmap) => {
                    if (x + imageSize + padding > canvasWidth) {
                        // Move to next row if the image doesn't fit in the current row
                        x = padding;
                        y += imageSize + padding;
                    }
    
                    ctx.drawImage(bitmap, x, y, imageSize, imageSize);
                    x += imageSize + padding; // Move to the next position in the row
                });
    
                // Draw the footer text onto the canvas
                ctx.font = '15px Arial'; // Half the size of the title
                ctx.fillText('flagl.net', canvasWidth / 2, canvasHeight - 10);
    
                // Convert the canvas content to a Blob
                const combinedBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 1.0));
    
                if (combinedBlob) {
                    // Create a ClipboardItem with the combined Blob
                    const clipboardItem = new ClipboardItem({ 'image/png': combinedBlob });
    
                    // Write the ClipboardItem to the clipboard
                    await navigator.clipboard.write([clipboardItem]);
    
                    alert("FLAGL Results Copied To Clipboard");
                } else {
                    alert("Failed to create image blob");
                }
            } catch (err) {
                console.error("Failed to copy images: ", err);
                alert("Failed to copy images to clipboard");
            }
        });
    });
};


export{
    clipboard
  }







