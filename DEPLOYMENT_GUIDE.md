# 배포 가이드

## 🚀 정적 사이트 배포 옵션

이 프로젝트는 완전한 정적 웹사이트이므로 다양한 무료 호스팅 서비스에 배포할 수 있습니다.

---

## 추천 배포 방법

### 1️⃣ GitHub Pages (추천) ⭐
**장점**: 무료, 간단, GitHub 통합, 커스텀 도메인 지원

#### 배포 단계:
```bash
# 1. GitHub 저장소 생성 (github.com에서)
# 저장소 이름: singer-website (또는 원하는 이름)

# 2. 로컬 저장소를 GitHub에 연결
git remote add origin https://github.com/username/singer-website.git

# 3. 변경사항 커밋
git commit -m "feat: Complete website with SEO and accessibility improvements"

# 4. GitHub에 푸시
git push -u origin master

# 5. GitHub 저장소 Settings > Pages에서:
# - Source: Deploy from a branch
# - Branch: master / (root)
# - Save 클릭

# 배포 완료! 약 1-2분 후 접속 가능
# URL: https://username.github.io/singer-website/
```

#### 커스텀 도메인 설정:
```bash
# 1. 루트에 CNAME 파일 생성
echo "leejieun.com" > CNAME

# 2. 도메인 DNS 설정에서:
# Type: CNAME
# Name: www (또는 @)
# Value: username.github.io

# 3. GitHub Pages 설정에서 Custom domain 입력
```

---

### 2️⃣ Netlify (추천) ⭐
**장점**: 무료, 자동 배포, HTTPS, 폼 처리, 커스텀 도메인

#### 배포 단계:
```bash
# 방법 A: Drag & Drop
# 1. netlify.com 접속 및 로그인
# 2. "Add new site" > "Deploy manually"
# 3. 프로젝트 폴더를 드래그 앤 드롭
# 완료!

# 방법 B: Git 연동 (자동 배포)
# 1. GitHub에 푸시 (위의 GitHub Pages 1-4단계)
# 2. netlify.com에서 "Add new site" > "Import from Git"
# 3. GitHub 저장소 선택
# 4. Build settings:
#    - Build command: (비워둠)
#    - Publish directory: .
# 5. Deploy 클릭
# 완료!

# 배포 URL: https://random-name-123.netlify.app
# 커스텀 도메인 설정 가능
```

#### netlify.toml 설정 (선택사항):
```toml
[build]
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### 3️⃣ Vercel
**장점**: 무료, 빠른 CDN, 자동 배포, HTTPS

#### 배포 단계:
```bash
# 1. vercel.com 접속 및 로그인
# 2. "Add New" > "Project"
# 3. GitHub 저장소 import
# 4. Framework Preset: Other
# 5. Deploy 클릭
# 완료!

# 배포 URL: https://singer-website.vercel.app
```

---

### 4️⃣ Cloudflare Pages
**장점**: 무료, 빠른 CDN, 무제한 대역폭

#### 배포 단계:
```bash
# 1. pages.cloudflare.com 접속
# 2. "Create a project"
# 3. GitHub 저장소 연결
# 4. Build settings:
#    - Build command: (비워둠)
#    - Build output directory: /
# 5. Deploy 클릭
```

---

## 🎯 빠른 배포 (로컬 테스트용)

### Python 서버 (이미 실행 중)
```bash
# 현재 실행 중인 서버
python -m http.server 8000

# 접속: http://localhost:8000
```

### Node.js 서버 (선택사항)
```bash
# npx 사용 (설치 불필요)
npx serve .

# 또는 http-server
npx http-server . -p 8000
```

---

## 📋 배포 전 체크리스트

### 필수 확인 사항
- [x] robots.txt 존재
- [x] sitemap.xml 존재
- [x] 모든 HTML 파일 SEO 태그 완료
- [x] CSS/JS 파일 최적화 완료
- [ ] OG 이미지 생성 (1200×630px)
- [ ] 실제 이미지 파일 업로드
- [ ] 메타 태그 URL을 실제 도메인으로 변경

### 배포 후 확인 사항
- [ ] 모든 페이지 정상 작동
- [ ] 모바일 반응형 확인
- [ ] 이미지 로딩 확인
- [ ] 폼 제출 테스트
- [ ] 네비게이션 링크 확인
- [ ] 소셜 미디어 공유 테스트

---

## 🔧 배포 후 설정

### Google Search Console
```bash
# 1. search.google.com/search-console 접속
# 2. "속성 추가" > URL 입력
# 3. 소유권 확인 (HTML 파일 업로드 또는 메타 태그)
# 4. sitemap.xml 제출: https://yourdomain.com/sitemap.xml
```

### Google Analytics (선택사항)
```html
<!-- index.html의 </head> 전에 추가 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 💡 추천 배포 흐름

### 초보자용 (가장 쉬움)
1. **Netlify Drag & Drop**
   - 회원가입 → 폴더 드래그 → 완료
   - 시간: 2분

### 중급자용 (자동 배포)
1. **GitHub Pages + GitHub Actions**
   - Git 푸시 → 자동 배포
   - 시간: 5분

### 전문가용 (최고 성능)
1. **Cloudflare Pages + Custom Domain**
   - 빠른 CDN + 무제한 대역폭
   - 시간: 10분

---

## 🌐 커스텀 도메인 설정

### 도메인 구매처
- **Namecheap**: namecheap.com
- **Google Domains**: domains.google
- **Cloudflare**: cloudflare.com (도메인 + 호스팅)

### DNS 설정 예시
```
Type: A
Name: @
Value: 185.199.108.153 (GitHub Pages IP)

Type: CNAME
Name: www
Value: username.github.io
```

---

## 📊 배포 비교표

| 서비스 | 무료 | 속도 | 난이도 | 자동배포 | 커스텀도메인 |
|--------|------|------|--------|----------|--------------|
| GitHub Pages | ✅ | ⭐⭐⭐ | 쉬움 | ✅ | ✅ |
| Netlify | ✅ | ⭐⭐⭐⭐ | 매우쉬움 | ✅ | ✅ |
| Vercel | ✅ | ⭐⭐⭐⭐⭐ | 쉬움 | ✅ | ✅ |
| Cloudflare | ✅ | ⭐⭐⭐⭐⭐ | 보통 | ✅ | ✅ |

---

## 🎉 배포 완료 후

### 테스트 도구
1. **Google Lighthouse**: Chrome DevTools
2. **PageSpeed Insights**: pagespeed.web.dev
3. **Facebook Debugger**: developers.facebook.com/tools/debug
4. **Twitter Card Validator**: cards-dev.twitter.com/validator

### 모니터링
1. **Google Analytics**: 방문자 추적
2. **Google Search Console**: 검색 성능
3. **Uptime Robot**: 사이트 가동 시간 모니터링

---

## 🆘 문제 해결

### 404 에러
- `index.html`이 루트에 있는지 확인
- 호스팅 서비스의 publish directory 설정 확인

### 이미지 안 보임
- 이미지 경로가 상대 경로인지 확인
- `assets/images/` 폴더에 이미지 파일 존재 확인

### CSS/JS 안 적용됨
- 브라우저 캐시 삭제 (Ctrl + Shift + R)
- 파일 경로 확인

---

**배포 준비 완료!** 🚀

가장 추천하는 방법은 **Netlify Drag & Drop**입니다.
2분 안에 배포 가능하고, 자동 HTTPS와 CDN이 제공됩니다.

