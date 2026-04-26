const Jimp = require('jimp');
const fs = require('fs');

async function createOgImage() {
    const W = 1200, H = 630;

    const image = new Jimp(W, H, 0x0a0a1aff);

    // Gradient background
    for (let y = 0; y < H; y++) {
        const ratio = y / H;
        const r = Math.floor(10 + ratio * 16);
        const g = Math.floor(10 + ratio * 22);
        const b = Math.floor(26 + ratio * 50);
        const color = Jimp.rgbaToInt(r, g, b, 255);
        for (let x = 0; x < W; x++) {
            image.setPixelColor(color, x, y);
        }
    }

    // Subtle grid
    for (let x = 0; x < W; x += 60) {
        for (let y = 0; y < H; y++) {
            const px = image.getPixelColor(x, y);
            const r2 = (px >> 24) & 0xFF;
            const g2 = (px >> 16) & 0xFF;
            const b2 = (px >> 8) & 0xFF;
            image.setPixelColor(Jimp.rgbaToInt(r2, g2, b2, 15), x, y);
        }
    }
    for (let y = 0; y < H; y += 60) {
        for (let x = 0; x < W; x++) {
            const px = image.getPixelColor(x, y);
            const r2 = (px >> 24) & 0xFF;
            const g2 = (px >> 16) & 0xFF;
            const b2 = (px >> 8) & 0xFF;
            image.setPixelColor(Jimp.rgbaToInt(r2, g2, b2, 15), x, y);
        }
    }

    // Avatar circle
    const cx = 200, cy = 240, cr = 85;
    for (let y = cy - cr; y <= cy + cr; y++) {
        for (let x = cx - cr; x <= cx + cr; x++) {
            const dist = Math.sqrt((x-cx)*(x-cx) + (y-cy)*(y-cy));
            if (dist <= cr) {
                image.setPixelColor(Jimp.rgbaToInt(0, 217, 255, 255), x, y);
            } else if (dist <= cr + 3) {
                image.setPixelColor(Jimp.rgbaToInt(0, 255, 136, 255), x, y);
            }
        }
    }

    // Avatar glow
    for (let y = cy - cr - 10; y <= cy + cr + 10; y++) {
        for (let x = cx - cr - 10; x <= cx + cr + 10; x++) {
            const dist = Math.sqrt((x-cx)*(x-cx) + (y-cy)*(y-cy));
            if (dist > cr + 3 && dist <= cr + 12) {
                const alpha = Math.floor(40 * (1 - (dist - cr - 3) / 9));
                image.setPixelColor(Jimp.rgbaToInt(0, 217, 255, alpha), x, y);
            }
        }
    }

    // Bottom contact bar
    for (let y = H - 60; y < H; y++) {
        for (let x = 0; x < W; x++) {
            image.setPixelColor(Jimp.rgbaToInt(0, 217, 255, 255), x, y);
        }
    }

    // Border
    for (let x = 0; x < W; x++) {
        image.setPixelColor(Jimp.rgbaToInt(0, 217, 255, 255), x, 0);
        image.setPixelColor(Jimp.rgbaToInt(0, 217, 255, 255), x, H-1);
    }
    for (let y = 0; y < H; y++) {
        image.setPixelColor(Jimp.rgbaToInt(0, 217, 255, 255), 0, y);
        image.setPixelColor(Jimp.rgbaToInt(0, 217, 255, 255), W-1, y);
    }

    // Load font
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    const fontB = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
    const fontS = await Jimp.loadFont(Jimp.FONT_SANS_12_WHITE);

    // Title: HÂN NGUYỄN
    const title = "HÂN NGUYỄN";
    image.print(font, 0, 165, { text: title, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, W, 60);

    // Line
    for (let x = 300; x < 900; x++) {
        image.setPixelColor(Jimp.rgbaToInt(0, 217, 255, 200), x, 220);
    }

    // Subtitle
    const subtitle = "Senior Web3 Developer";
    image.print(fontB, 0, 235, { text: subtitle, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, W, 40);

    // Services
    const services = "Smart Contract  |  DeFi  |  NFT  |  GameFi";
    image.print(fontS, 0, 285, { text: services, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, W, 30);

    // Stats
    const s1 = "5+ Years";
    const s2 = "$100M+ TVL";
    const s3 = "50+ Projects";
    image.print(fontB, 0, 350, { text: s1, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, 400, 30);
    image.print(fontB, 400, 350, { text: s2, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, 400, 30);
    image.print(fontB, 800, 350, { text: s3, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, 400, 30);

    // Labels under stats
    const fontL = await Jimp.loadFont(Jimp.FONT_SANS_10_WHITE);
    image.print(fontL, 0, 378, { text: "Experience", alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, 400, 25);
    image.print(fontL, 400, 378, { text: "TVL Deployed", alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, 400, 25);
    image.print(fontL, 800, 378, { text: "Completed", alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, 400, 25);

    // Contact bar text
    const fontC = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
    const contact = "tadanghan9@gmail.com  |  @tadanghan9  |  hanweb3.dev";
    image.print(fontC, 0, H - 60, { text: contact, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, W, 60);

    await image.writeAsync('og-image.png');

    const size = fs.statSync('og-image.png').size;
    console.log('og-image.png created! Size: ' + (size/1024).toFixed(1) + ' KB');
}

createOgImage().catch(function(e) { console.error('Error:', e.message); process.exit(1); });
