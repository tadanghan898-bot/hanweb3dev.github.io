# 🚀 DEPLOY WEBSITE HOÀN TOÀN FREE - GitHub Pages + Cloudflare

## TỔNG QUAN CHI PHÍ

| Dịch vụ | Chi phí | Notes |
|----------|---------|-------|
| GitHub Pages | **FREE** | Hosting static website |
| Cloudflare | **FREE** | DNS, CDN, SSL |
| Domain (.github.io) | **FREE** | Username.github.io |
| Custom Domain | ~$10/năm | Tùy chọn |
| **TỔNG** | **$0** | Không tốn gì! |

---

## BƯỚC 1: TẠO GITHUB REPOSITORY

### 1.1. Đăng ký GitHub (nếu chưa có)
1. Vào https://github.com
2. Click "Sign up"
3. Điền email: `tadanghan9@gmail.com`
4. Tạo username: `hanweb3dev` (hoặc username bạn thích)

### 1.2. Tạo Repository mới
1. Click "+" → "New repository"
2. Điền thông tin:
   - **Repository name:** `hanweb3dev.github.io` (username.github.io)
   - **Description:** "Hân Nguyễn - Senior Web3 Developer Vietnam"
   - **Public** ✅
   - **Add a README file** ✅
3. Click "Create repository"

---

## BƯỚC 2: UPLOAD WEBSITE LÊN GITHUB

### Cách 1: Dùng GitHub Desktop (Dễ nhất)

1. **Download GitHub Desktop:** https://desktop.github.com

2. **Clone repository:**
   - Mở GitHub Desktop
   - File → Clone Repository
   - Chọn `hanweb3dev.github.io`

3. **Copy files:**
   - Copy `index.html` vào thư mục cloned repository
   - (Tạo og-image.png ở bước 4)

4. **Commit & Push:**
   - Viết message: "Initial commit - Web3 Portfolio"
   - Click "Commit to main"
   - Click "Push origin"

### Cách 2: Dùng Git Command Line

```bash
# Di chuyển vào thư mục website
cd C:/Users/han/hanweb3-site

# Khởi tạo git
git init

# Thêm tất cả files
git add index.html

# Commit
git commit -m "Initial commit - Web3 Portfolio"

# Thêm remote (thay username bằng username GitHub của bạn)
git remote add origin https://github.com/hanweb3dev/hanweb3dev.github.io.git

# Push lên GitHub
git branch -M main
git push -u origin main
```

### Cách 3: Upload trực tiếp (Không cần Git)

1. Vào repository trên GitHub.com
2. Click "Add file" → "Upload files"
3. Kéo thả `index.html` vào
4. Click "Commit changes"

---

## BƯỚC 3: ENABLE GITHUB PAGES

1. Vào repository: `hanweb3dev/hanweb3dev.github.io`
2. Click **Settings** (tab bên phải)
3. Scroll xuống **Pages** (bên trái)
4. Cấu hình:
   - **Source:** Deploy from a branch
   - **Branch:** main / (root)
   - **Save**
5. Đợi 2-5 phút
6. Truy cập: `https://hanweb3dev.github.io`

---

## BƯỚC 4: TẠO SOCIAL IMAGE (og-image.png)

### Kích thước: 1200x630px (cho Facebook/LinkedIn)

### Cách 1: Canva (Miễn phí) - Khuyến nghị

1. Vào https://www.canva.com
2. Đăng ký với email: tadanghan9@gmail.com
3. Tạo design mới: "Facebook Post" (1200x630)
4. Thiết kế:
   - Background: Gradient màu xanh dương (#1a1a2e → #16213e)
   - Avatar: Hình tròn 150px
   - Text: "HÂN NGUYỄN | Senior Web3 Developer"
   - Subtext: "Smart Contract | DeFi | NFT | GameFi"
   - Contact: tadanghan9@gmail.com
5. Download PNG
6. Upload lên GitHub repository

### Cách 2: Figma (Miễn phí)

1. Vào https://figma.com
2. Tạo frame: 1200x630
3. Thiết kế tương tự Canva
4. Export PNG

### Cách 3: Tạo bằng HTML (đã có sẵn)

Tạo file `og-image.html` và screenshot:
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; background: linear-gradient(135deg, #1a1a2e, #16213e); height: 630px; display: flex; align-items: center; justify-content: center; font-family: 'Segoe UI', sans-serif; }
    .container { text-align: center; color: white; }
    .avatar { width: 150px; height: 150px; background: linear-gradient(135deg, #00d9ff, #00ff88); border-radius: 50%; margin: 0 auto 30px; display: flex; align-items: center; justify-content: center; font-size: 60px; }
    h1 { font-size: 48px; margin: 0 0 20px; }
    .subtitle { font-size: 28px; color: #00d9ff; margin: 0 0 30px; }
    .services { font-size: 22px; color: #aaa; }
    .contact { font-size: 20px; margin-top: 40px; color: #00ff88; }
  </style>
</head>
<body>
  <div class="container">
    <div class="avatar">👨‍💻</div>
    <h1>HÂN NGUYỄN</h1>
    <p class="subtitle">Senior Web3 Developer</p>
    <p class="services">Smart Contract | DeFi | NFT | GameFi</p>
    <p class="contact">tadanghan9@gmail.com</p>
  </div>
</body>
</html>
```

---

## BƯỚC 5: SETUP CLOUDFLARE (DNS + CDN)

### 5.1. Đăng ký Cloudflare

1. Vào https://dash.cloudflare.com
2. Đăng ký với email: tadanghan9@gmail.com
3. Click "Add a site"
4. Nhập domain: `hanweb3.dev` (hoặc domain bạn mua)

### 5.2. Thêm DNS Records

1. Trong Cloudflare Dashboard → DNS
2. Thêm records:

```
Type: CNAME
Name: www
Target: hanweb3dev.github.io
Proxy: DNS only (grey cloud) ← Quan trọng!

Type: CNAME
Name: @
Target: hanweb3dev.github.io
Proxy: DNS only (grey cloud) ← Quan trọng!
```

3. **Lưu ý:** Không enable Proxy (orange cloud) cho GitHub Pages vì GitHub Pages không hỗ trợ.

### 5.3. Update Nameservers

Cloudflare sẽ cung cấp nameservers:
```
ns1.cloudflare.com
ns2.cloudflare.com
```

Update tại nơi bạn mua domain (Namecheap, GoDaddy...)

---

## BƯỚC 6: CUSTOM DOMAIN (Tùy chọn)

### Nếu muốn dùng domain riêng:

1. Trong GitHub repository → Settings → Pages
2. Custom domain: `hanweb3.dev`
3. GitHub sẽ tự động tạo SSL certificate
4. Cloudflare đã cấu hình ở bước 5

### Kiểm tra:
- 🌐 https://hanweb3.dev → Website!
- 🌐 https://www.hanweb3.dev → Website!

---

## BƯỚC 7: CẬP NHẬT LIÊN KẾT

### 7.1. Update index.html

Sửa `og:url` trong index.html:
```html
<meta property="og:url" content="https://hanweb3.dev/">
<meta property="og:image" content="https://hanweb3.dev/og-image.png">
```

### 7.2. Update Telegram Bot

Sửa `server.js`:
```javascript
const BASE_URL = 'https://hanweb3.dev';
```

---

## CẬP NHẬT WEBSITE SAU NÀY

```bash
# Edit files locally
# Sau đó:
git add .
git commit -m "Update content"
git push
```

GitHub Pages sẽ tự động deploy trong 2-5 phút.

---

## COMMANDS HỮU ÍCH

```bash
# Kiểm tra deploy status
# Vào: Repository → Actions tab

# Xem website
curl -I https://hanweb3dev.github.io

# Kiểm tra SSL
# Vào: https://www.ssllabs.com/ssltest/
# Nhập: hanweb3.dev
```

---

## SEO SAU KHI DEPLOY

### 1. Đăng ký Google Search Console
1. Vào https://search.google.com/search-console
2. Thêm property: `https://hanweb3.dev`
3. Xác minh bằng DNS record (Cloudflare)
4. Submit sitemap: `https://hanweb3.dev/sitemap.xml`

### 2. Tạo Sitemap
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://hanweb3.dev/</loc>
    <lastmod>2026-04-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 3. Tạo Robots.txt
```
User-agent: *
Allow: /
Sitemap: https://hanweb3.dev/sitemap.xml
```

### 4. Submit lên Google
1. Search Console → URL Inspection
2. Nhập: `https://hanweb3.dev`
3. Click "Request indexing"

---

## PROBLEMS & SOLUTIONS

### Website không load?
```bash
# Kiểm tra GitHub Pages settings
# Repository → Settings → Pages

# Kiểm tra custom domain
# Đảm bảo DNS đúng

# Kiểm tra file có trong repository không
# Repository → Code → index.html
```

### SSL lỗi?
```
# GitHub Pages tự động cấp SSL
# Đợi 24-48 giờ sau khi thêm custom domain

# Kiểm tra: https://hanweb3.dev/.well-known/acme-challenge/
```

### 404 Error?
```
# Đảm bảo index.html ở root của repository
# Không phải trong thư mục con
```

---

## TỔNG HỢP LINKS

### Đăng ký:
- GitHub: https://github.com
- Cloudflare: https://cloudflare.com
- Canva: https://canva.com
- Google Search Console: https://search.google.com/search-console

### Công cụ:
- SSL Check: https://www.ssllabs.com/ssltest/
- Mobile Test: https://search.google.com/test/mobile-friendly
- Structured Data: https://search.google.com/structured-data/testing-tool

---

## SAU KHI SETUP XONG

1. ✅ Test website: https://hanweb3dev.github.io
2. ✅ (Tùy chọn) Setup custom domain
3. ✅ Submit sitemap lên Google Search Console
4. ✅ Update LinkedIn bio: "Web: https://hanweb3.dev"
5. ✅ Update Twitter bio: "Web3 Dev → https://hanweb3.dev"
6. ✅ Update Telegram bot description
7. ✅ Share lên các groups

---

## CHI PHÍ CUỐI CÙNG

| Phương án | Chi phí |
|-----------|---------|
| **GitHub Pages + Cloudflare** | **$0/năm** |
| + Custom Domain | ~$10/năm |
| **Tổng tối thiểu** | **$0** |

**Kết quả:** Website professional, HTTPS, CDN, analytics - hoàn toàn FREE!
