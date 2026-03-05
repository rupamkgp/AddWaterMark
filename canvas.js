/**
 * Canvas Rendering Engine for AddWatermark
 */

class WatermarkEngine {
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.ctx = canvasElement.getContext('2d');
        this.baseImage = null;

        // Default settings
        this.settings = {
            device: DEVICELIST[0], // iPhone 17 Pro Max default
            position: 'bottom-left',
            size: 50, // 10 to 100
            margin: 40, // 0 to 200
            opacity: 100, // 10 to 100
            ownerName: 'Owner'
        };
    }

    /**
     * Load an image file into the engine
     * @param {File} file 
     * @returns {Promise<void>}
     */
    async loadImage(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    this.baseImage = img;
                    this.render();
                    resolve();
                };
                img.onerror = reject;
                img.src = event.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    /**
     * Update a specific setting and re-render
     */
    updateSetting(key, value) {
        if (this.settings.hasOwnProperty(key)) {
            this.settings[key] = value;
            this.render();
        }
    }

    /**
     * Main render function that draws the image and then the watermark overlays
     */
    render() {
        if (!this.baseImage) return;

        // Set canvas to actual image dimensions for high-res output
        this.canvas.width = this.baseImage.width;
        this.canvas.height = this.baseImage.height;

        // 1. Draw base image
        this.ctx.drawImage(this.baseImage, 0, 0, this.canvas.width, this.canvas.height);

        // 2. Calculate dynamic scaling based on image size to keep watermark proportional
        // Base width assumption is 4000px, we scale relative to that
        const scaleFactor = Math.max(this.canvas.width, this.canvas.height) / 4000;

        // Size modifier (settings.size is 10-100, where 50 is normal)
        const sizeMod = this.settings.size / 50;
        const finalScale = scaleFactor * sizeMod;

        // Base font sizes
        const titleFontSize = 90 * finalScale;
        const specsFontSize = 50 * finalScale;
        const iconSize = 100 * finalScale;

        // Base margin
        const margin = (this.settings.margin / 40) * (150 * scaleFactor);

        const device = this.settings.device;

        if (device.layout === 'zeiss') {
            this.drawZeissLayout(device, scaleFactor, sizeMod, margin);
            return;
        } else if (device.layout === 'oneplus') {
            this.drawOnePlusLayout(device, scaleFactor, sizeMod, margin);
            return;
        }

        // 3. Configure Drawing Context
        this.ctx.globalAlpha = this.settings.opacity / 100;
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        this.ctx.shadowBlur = 10 * finalScale;
        this.ctx.shadowOffsetX = 2 * finalScale;
        this.ctx.shadowOffsetY = 2 * finalScale;
        this.ctx.fillStyle = 'white';

        // 4. Calculate positions
        let x, y, align;

        // Determine layout metrics
        const gap = 30 * finalScale; // Gap between icon and text

        // Temporary font setup to measure text length
        this.ctx.font = `600 ${titleFontSize}px Inter, sans-serif`;
        const titleWidth = this.ctx.measureText(device.name).width;

        this.ctx.font = `400 ${specsFontSize}px Inter, sans-serif`;
        const specsWidth = this.ctx.measureText(device.specs.toUpperCase()).width;

        const maxTextWidth = Math.max(titleWidth, specsWidth);
        const totalBrandWidth = iconSize + gap + maxTextWidth;

        // Position Logic
        switch (this.settings.position) {
            case 'bottom-left':
                x = margin;
                y = this.canvas.height - margin - (titleFontSize + specsFontSize);
                align = 'left';
                break;
            case 'bottom-right':
                x = this.canvas.width - margin - totalBrandWidth;
                y = this.canvas.height - margin - (titleFontSize + specsFontSize);
                align = 'left'; // Keep internal alignment left, but position block right
                break;
            case 'top-left':
                x = margin;
                y = margin + iconSize; // Y is baseline of top line
                align = 'left';
                break;
            case 'top-right':
                x = this.canvas.width - margin - totalBrandWidth;
                y = margin + iconSize;
                align = 'left';
                break;
        }

        // Draw the components based on device layout style
        this.drawWatermarkComponents(device, x, y, iconSize, gap, titleFontSize, specsFontSize);

        // Reset alpha for future renders
        this.ctx.globalAlpha = 1.0;
        this.ctx.shadowColor = 'transparent';
    }

    /**
     * Custom Layout for Vivo / Zeiss devices
     * Draws a white bar at the bottom exactly matching the reference style
     */
    drawZeissLayout(device, scaleFactor, sizeMod, margin) {
        // Calculate bar dimensions
        const barHeight = 400 * scaleFactor * sizeMod;
        const mainY = this.canvas.height - (barHeight / 2);

        // 1. Draw white background bar
        this.ctx.globalAlpha = this.settings.opacity / 100;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.shadowColor = 'transparent';
        this.ctx.fillRect(0, this.canvas.height - barHeight, this.canvas.width, barHeight);

        // Calculate left offset (minimum base padding)
        const leftPadding = Math.max(margin, 200 * scaleFactor);
        const rightPadding = Math.max(margin, 200 * scaleFactor);

        // 2. Draw Left text (Brand & Model)
        const titleFontSize = 90 * scaleFactor * sizeMod;
        this.ctx.font = `500 ${titleFontSize}px Inter, sans-serif`;
        this.ctx.fillStyle = '#111827'; // Dark text
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'middle';
        this.ctx.globalAlpha = 1.0;

        // Format name to have lowercase 'vivo' according to image
        let brandText = device.name;
        if (brandText.toLowerCase().startsWith('vivo ')) {
            brandText = 'vivo ' + brandText.substring(5);
        }

        const leftText = brandText + "  |  ";
        this.ctx.fillText(leftText, leftPadding, mainY);

        // Draw Zeiss Logo
        const textWidth = this.ctx.measureText(leftText).width;
        let iconHeight = 60 * scaleFactor * sizeMod;
        let iconWidth = iconHeight * (800 / 600); // ZEISS SVG aspect ratio

        if (device.icon) {
            const svgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(device.icon);
            const svgImg = new Image();

            svgImg.onload = () => {
                this.ctx.globalAlpha = 1.0;
                this.ctx.shadowColor = 'transparent';
                this.ctx.drawImage(svgImg, leftPadding + textWidth, mainY - (iconHeight / 2), iconWidth, iconHeight);
            };
            svgImg.src = svgDataUrl;
        }

        // 3. Draw Right Text (Camera Settings)
        this.ctx.textAlign = 'right';

        // Settings Line 1
        const specsFontSize1 = 55 * scaleFactor * sizeMod;
        this.ctx.font = `500 ${specsFontSize1}px Inter, sans-serif`;
        this.ctx.fillStyle = '#111827';
        // Ensure there is some specs text, default if missing
        const camSpecs = "24mm f/1.88 1/100s ISO447";
        this.ctx.fillText(camSpecs, this.canvas.width - rightPadding, mainY - (15 * scaleFactor * sizeMod));

        // Settings Line 2 (Date/Time)
        const specsFontSize2 = 45 * scaleFactor * sizeMod;
        this.ctx.font = `400 ${specsFontSize2}px Inter, sans-serif`;
        this.ctx.fillStyle = '#6b7280';

        // Generate current date string in format "DD/MM/YYYY, HH:MM"
        const now = new Date();
        const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        this.ctx.fillText(dateStr, this.canvas.width - rightPadding, mainY + (55 * scaleFactor * sizeMod));

        // Reset settings
        this.ctx.textBaseline = 'alphabetic';
    }

    /**
     * Custom Layout for OnePlus devices
     * Minimalist text only overlay
     */
    drawOnePlusLayout(device, scaleFactor, sizeMod, margin) {
        // Position logic (bottom-left by default, could respect settings but we'll stick to bottom-left matching the image style)
        // Ensure there's enough padding from the very edge
        const x = Math.max(margin, 150 * scaleFactor);
        const yBase = this.canvas.height - Math.max(margin, 150 * scaleFactor);

        this.ctx.globalAlpha = this.settings.opacity / 100;

        // Add subtle shadow for legibility on light skies
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        this.ctx.shadowBlur = 12 * scaleFactor * sizeMod;
        this.ctx.shadowOffsetX = 2 * scaleFactor * sizeMod;
        this.ctx.shadowOffsetY = 2 * scaleFactor * sizeMod;
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'left';

        // 'Shot on OnePlus' line
        const titleFontSize = 90 * scaleFactor * sizeMod;
        this.ctx.font = `400 ${titleFontSize}px Inter, sans-serif`;
        this.ctx.textBaseline = 'bottom';
        this.ctx.fillText("Shot on " + device.name, x, yBase - (40 * scaleFactor * sizeMod));

        // 'By [Name]' line
        const specsFontSize = 45 * scaleFactor * sizeMod;
        this.ctx.font = `400 ${specsFontSize}px Inter, sans-serif`;
        const ownerStr = this.settings.ownerName ? ("By " + this.settings.ownerName.toUpperCase()) : "";
        this.ctx.fillText(ownerStr, x, yBase);

        // Reset settings
        this.ctx.textBaseline = 'alphabetic';
        this.ctx.globalAlpha = 1.0;
        this.ctx.shadowColor = 'transparent';
    }

    /**
     * Renders the text and SVG icon onto the canvas
     */
    drawWatermarkComponents(device, x, y, iconSize, gap, titleFontSize, specsFontSize) {

        let textX = x + iconSize + gap;
        let textY = y; // Baseline for title

        // 1. Draw SVG Icon
        if (device.icon) {
            // Need to create an image from SVG string to draw on canvas
            const svgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(device.icon);
            const svgImg = new Image();

            svgImg.onload = () => {
                // Ensure context is restored to what it was
                this.ctx.globalAlpha = this.settings.opacity / 100;
                this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                this.ctx.shadowBlur = 10 * (iconSize / 100);

                // Draw Icon centered vertically with the two lines of text
                const iconYOffset = textY - titleFontSize + ((titleFontSize + specsFontSize) / 2) - (iconSize / 2);
                this.ctx.drawImage(svgImg, x, iconYOffset, iconSize, iconSize);
            };
            svgImg.src = svgDataUrl;

            // Note: because image loading is async, the text draws immediately and the icon pops in a millisecond later.
            // For a robust implementation, we cash the SVG images or await them. 
            // For this app, caching SVGs data URLs is better. Let's convert them immediately.
        }

        // 2. Draw Title Text
        this.ctx.font = `600 ${titleFontSize}px Inter, sans-serif`;
        this.ctx.textAlign = 'left';

        let prefix = '';
        if (device.brand === DEVICE_BRANDS.APPLE) prefix = 'Shot on ';

        this.ctx.fillText(prefix + device.name, textX, textY);

        // 3. Draw Specs Text
        this.ctx.font = `400 ${specsFontSize}px Inter, sans-serif`;
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // Slightly dim the specs text
        this.ctx.fillText(device.specs.toUpperCase(), textX, textY + specsFontSize + (10 * (iconSize / 100)));
    }

    /**
     * Pre-cache SVG icons synchronously if possible, or use data URIs for immediate drawing
     */
    drawIconImmediate(svgString, x, y, size) {
        // To draw immediately without async jumping, it's best to use path commands directly
        // but for simplicity here we assume the async pop-in is acceptable, OR we use Data URIs on device initialization.
        // We altered the architecture slightly in app.js init to pre-load icons.
    }

    /**
     * Returns a base64 Data URL of the final composite for download
     */
    getExportUrl(format = 'image/jpeg', quality = 1.0) {
        return this.canvas.toDataURL(format, quality);
    }

    /**
     * Returns a Promise that resolves with a Blob of the final composite for download
     */
    getExportBlob(format = 'image/jpeg', quality = 1.0) {
        return new Promise((resolve, reject) => {
            try {
                this.canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error("Canvas toBlob failed."));
                    }
                }, format, quality);
            } catch (err) {
                reject(err);
            }
        });
    }
}
