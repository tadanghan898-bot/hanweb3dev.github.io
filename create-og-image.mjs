import { Jimp, loadFont, FONT_SANS_32_WHITE, FONT_SANS_16_WHITE, FONT_SANS_12_WHITE, FONT_SANS_10_WHITE, FONT_SANS_16_BLACK, rgbaToInt, HORIZONTAL_ALIGN_CENTER, VERTICAL_ALIGN_MIDDLE } from 'jimp';
import { readFileSync, statSync, writeFileSync } from 'fs';

async function createOgImage() {
    const W = 1200, H = 630;

    // Tạo ảnh gradient
    const image = new Jimp({ width: W, height: H, color: 0x0a0a1aff });

    // Gradient background
    for (let y = 0; y < H; y++) {
        const ratio = y / H;
        const r = Math.floor(10 + ratio * 16);
        const g = Math.floor(10 + ratio * 22);
        const b = Math.floor(26 + ratio * 50);
        const color = rgbaToInt(r, g, b, 255);
        for (let x = 0; x < W; x++) {
            image.setPixelColor(color, x, y);
        }
    }

    // Grid lines
    for (let x = 0; x < W; x += 60) {
        for (let y = 0; y < H; y++) {
            const px = image.getPixelColor(x, y);
            const r2 = (px >> 24) & 0xFF;
            const g2 = (px >> 16) & 0xFF;
            const b2 = (px >> 8) & 0xFF;
            image.setPixelColor(rgbaToInt(r2, g2, b2, 15), x, y);
        }
    }
    for (let y = 0; y < H; y += 60) {
        for (let x = 0; x < W; x++) {
            const px = image.getPixelColor(x, y);
            const r2 = (px >> 24) & 0xFF;
            const g2 = (px >> 16) & 0xFF;
            const b2 = (px >> 8) & 0xFF;
            image.setPixelColor(rgbaToInt(r2, g2, b2, 15), x, y);
        }
    }

    // Avatar circle
    const cx = 200, cy = 240, cr = 85;
    for (let y = cy - cr; y <= cy + cr; y++) {
        for (let x = cx - cr; x <= cx + cr; x++) {
            const dist = Math.sqrt((x-cx)*(x-cx) + (y-cy)*(y-cy));
            if (dist <= cr) {
                image.setPixelColor(rgbaToInt(0, 217, 255, 255), x, y);
            } else if (dist <= cr + 3) {
                image.setPixelColor(rgbaToInt(0, 255, 136, 255), x, y);
            }
        }
    }

    // Avatar glow
    for (let y = cy - cr - 10; y <= cy + cr + 10; y++) {
        for (let x = cx - cr - 10; x <= cx + cr + 10; x++) {
            const dist = Math.sqrt((x-cx)*(x-cx) + (y-cy)*(y-cy));
            if (dist > cr + 3 && dist <= cr + 12) {
                const alpha = Math.floor(40 * (1 - (dist - cr - 3) / 9));
                image.setPixelColor(rgbaToInt(0, 217, 255, alpha), x, y);
            }
        }
    }

    // Bottom bar
    for (let y = H - 60; y < H; y++) {
        for (let x = 0; x < W; x++) {
            image.setPixelColor(rgbaToInt(0, 217, 255, 255), x, y);
        }
    }

    // Border
    for (let x = 0; x < W; x++) {
        image.setPixelColor(rgbaToInt(0, 217, 255, 255), x, 0);
        image.setPixelColor(rgbaToInt(0, 217, 255, 255), x, H-1);
    }
    for (let y = 0; y < H; y++) {
        image.setPixelColor(rgbaToInt(0, 217, 255, 255), 0, y);
        image.setPixelColor(rgbaToInt(0, 217, 255, 255), W-1, y);
    }

    // Fonts
    const font32 = await loadFont(FONT_SANS_32_WHITE);
    const font16 = await loadFont(FONT_SANS_16_WHITE);
    const font12 = await loadFont(FONT_SANS_12_WHITE);
    const font10 = await loadFont(FONT_SANS_10_WHITE);
    const font16b = await loadFont(FONT_SANS_16_BLACK);

    // Title
    image.print({ font: font32, x: 0, y: 165, text: { text: "HAN NGUYEN", halign: HORIZONTAL_ALIGN_CENTER } }, W, 60);

    // Line
    for (let x = 300; x < 900; x++) {
        image.setPixelColor(rgbaToInt(0, 217, 255, 200), x, 220);
    }

    // Subtitle
    image.print({ font: font16, x: 0, y: 235, text: { text: "Senior Web3 Developer", halign: HORIZONTAL_ALIGN_CENTER } }, W, 40);

    // Services
    image.print({ font: font12, x: 0, y: 285, text: { text: "Smart Contract  |  DeFi  |  NFT  |  GameFi", halign: HORIZONTAL_ALIGN_CENTER } }, W, 30);

    // Stats
    image.print({ font: font16, x: 0, y: 350, text: { text: "5+ Years", halign: HORIZONTAL_ALIGN_CENTER } }, 400, 30);
    image.print({ font: font16, x: 400, y: 350, text: { text: "$100M+ TVL", halign: HORIZONTAL_ALIGN_CENTER } }, 400, 30);
    image.print({ font: font16, x: 800, y: 350, text: { text: "50+ Projects", halign: HORIZONTAL_ALIGN_CENTER } }, 400, 30);

    // Labels
    image.print({ font: font10, x: 0, y: 378, text: { text: "Experience", halign: HORIZONTAL_ALIGN_CENTER } }, 400, 25);
    image.print({ font: font10, x: 400, y: 378, text: { text: "TVL Deployed", halign: HORIZONTAL_ALIGN_CENTER } }, 400, 25);
    image.print({ font: font10, x: 800, y: 378, text: { text: "Completed", halign: HORIZONTAL_ALIGN_CENTER } }, 400, 25);

    // Contact bar
    image.print({ font: font16b, x: 0, y: H - 60, text: { text: "tadanghan9@gmail.com  |  @tadanghan9  |  hanweb3.dev", halign: HORIZONTAL_ALIGN_CENTER } }, W, 60);

    await image.write('og-image.png');

    const size = statSync('og-image.png').size;
    console.log('og-image.png created! Size: ' + (size/1024).toFixed(1) + ' KB');
}

createOgImage().catch(function(e) { console.error('Error:', e.message, e.stack); process.exit(1); });
