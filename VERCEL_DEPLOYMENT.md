# 🚀 Vercel 배포 가이드

## ✅ GitHub 푸시 완료!

저장소 URL: https://github.com/brainstickstory-hue/singer.git  
브랜치: main  
상태: ✅ 모든 파일 푸시 완료

---

## 🎯 Vercel 배포 단계

### 방법 1: Vercel 웹사이트 (추천) ⭐

브라우저가 자동으로 열렸습니다: https://vercel.com/new

**단계별 진행:**

1. **로그인/회원가입**
   - GitHub 계정으로 로그인 (권장)
   - 또는 이메일로 가입

2. **저장소 Import**
   - "Import Git Repository" 클릭
   - GitHub 연동 허용
   - `brainstickstory-hue/singer` 저장소 선택
   - "Import" 클릭

3. **프로젝트 설정**
   ```
   Project Name: singer-website (또는 원하는 이름)
   Framework Preset: Other
   Root Directory: ./
   Build Command: (비워둠)
   Output Directory: (비워둠)
   Install Command: (비워둠)
   ```

4. **Deploy 클릭**
   - 약 30초 후 배포 완료!
   - URL: `https://singer-website-xxx.vercel.app`

---

### 방법 2: Vercel CLI (고급 사용자)

```bash
# Vercel CLI 설치 (한 번만)
npm install -g vercel

# 배포 실행
vercel

# 프로덕션 배포
vercel --prod
```

**CLI 설정 시 답변:**
```
? Set up and deploy "~/singer"? Y
? Which scope do you want to deploy to? (Your Account)
? Link to existing project? N
? What's your project's name? singer-website
? In which directory is your code located? ./
? Want to override the settings? N
```

---

## 📊 배포 후 확인사항

### 자동으로 제공되는 기능
- ✅ **HTTPS** 자동 적용
- ✅ **CDN** 전 세계 배포
- ✅ **자동 배포** (Git 푸시 시)
- ✅ **프리뷰 URL** (PR마다)
- ✅ **Analytics** (방문자 통계)

### 배포 URL 형식
```
Production: https://singer-website.vercel.app
Preview: https://singer-website-git-branch.vercel.app
```

---

## 🔧 배포 후 설정

### 1. 커스텀 도메인 연결 (선택사항)

Vercel Dashboard에서:
1. 프로젝트 선택
2. "Settings" > "Domains"
3. 도메인 입력 (예: leejieun.com)
4. DNS 설정 안내에 따라 진행

**DNS 설정 예시:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 2. 환경 변수 설정 (필요시)

```
Settings > Environment Variables

예시:
SITE_URL=https://leejieun.com
CONTACT_EMAIL=contact@leejieun.com
```

### 3. Analytics 활성화

```
Analytics > Enable
```

---

## 🎨 자동 배포 설정 완료

이제 다음과 같이 작동합니다:

```bash
# 로컬에서 수정
git add .
git commit -m "Update content"
git push

# Vercel이 자동으로:
# 1. 변경사항 감지
# 2. 빌드 시작
# 3. 배포 완료
# 4. 알림 발송
```

---

## 📱 배포 상태 확인

### Vercel Dashboard
- URL: https://vercel.com/dashboard
- 실시간 배포 로그 확인
- 성능 모니터링
- 방문자 통계

### GitHub Integration
- 각 커밋에 배포 상태 표시
- PR에 프리뷰 URL 자동 생성
- 배포 성공/실패 알림

---

## 🚨 문제 해결

### 배포 실패 시
1. Vercel Dashboard에서 로그 확인
2. `vercel.json` 설정 확인
3. GitHub 연동 상태 확인

### 페이지 404 에러
- `index.html`이 루트에 있는지 확인
- `vercel.json`의 routes 설정 확인

### 이미지 안 보임
- 이미지 경로가 상대 경로인지 확인
- 대소문자 구분 확인 (Vercel은 대소문자 구분)

---

## 📊 예상 성능

### Vercel 성능 지표
- ⚡ **First Byte**: < 100ms
- ⚡ **CDN**: 전 세계 70+ 지역
- ⚡ **Uptime**: 99.99%
- ⚡ **대역폭**: 100GB/월 (무료)

### Lighthouse 점수 (예상)
- 🟢 Performance: 95+
- 🟢 Accessibility: 95+
- 🟢 Best Practices: 95+
- 🟢 SEO: 95+

---

## 🎉 배포 완료 체크리스트

배포 후 다음을 확인하세요:

- [ ] Vercel에서 배포 성공 확인
- [ ] 프로덕션 URL 접속 테스트
- [ ] 모든 페이지 작동 확인
- [ ] 모바일 반응형 확인
- [ ] 이미지 로딩 확인
- [ ] 네비게이션 링크 확인
- [ ] 폼 제출 테스트 (contact 페이지)
- [ ] Google Lighthouse 테스트
- [ ] 소셜 미디어 공유 테스트

---

## 🔗 유용한 링크

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Documentation**: https://vercel.com/docs
- **GitHub Repository**: https://github.com/brainstickstory-hue/singer
- **Support**: https://vercel.com/support

---

## 💡 추가 팁

### 배포 속도 최적화
```json
// vercel.json에 추가 가능
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 리다이렉트 설정
```json
{
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ]
}
```

---

**배포 준비 완료!** 🎊

Vercel 페이지에서 저장소를 import하고 Deploy 버튼을 클릭하면 됩니다!

약 30초 후 전 세계에서 접속 가능한 웹사이트가 완성됩니다! 🚀

