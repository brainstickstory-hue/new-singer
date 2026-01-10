// ===================================
// Main JavaScript for Singer Website
// ===================================

(function() {
    'use strict';

    // ===================================
    // Data Loading Functions
    // ===================================
    
    async function loadJSON(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('데이터 로딩 실패:', error);
            return null;
        }
    }
    
    function showError(container, message) {
        if (!container) return;
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: hsl(var(--muted-foreground));">
                <p>${message}</p>
            </div>
        `;
    }

    // ===================================
    // Albums Page Rendering
    // ===================================
    
    async function renderAlbumsPage() {
        const data = await loadJSON('assets/data/albums.json');
        if (!data) {
            showError(document.querySelector('#albums-content'), '앨범 정보를 불러올 수 없습니다.');
            return;
        }
        
        // Render Latest Album
        renderLatestAlbum(data.latest);
        
        // Render Previous Albums
        renderPreviousAlbums(data.previous);
        
        // Render Singles
        renderSingles(data.singles);
        
        // Render Music Videos
        renderMusicVideos(data.musicVideos);
        
        // Render Streaming Platforms
        renderStreamingPlatforms(data.streamingPlatforms);
    }
    
    function renderLatestAlbum(album) {
        const container = document.querySelector('#latest-album');
        if (!container || !album) return;
        
        const tracksHTML = album.tracks.map((track, index) => 
            `<li>${track}</li>`
        ).join('');
        
        container.innerHTML = `
            <div style="display: inline-block; background-color: hsl(var(--foreground)); color: hsl(var(--background)); padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem;">
                Latest Release
            </div>
            
            <div class="hero-grid" style="gap: 2rem;">
                <div class="card-image" style="border-radius: 8px;">
                    <img src="${album.image}" alt="${album.title} 앨범 커버" onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)';">
                </div>
                
                <div style="display: flex; flex-direction: column; justify-content: center; gap: 1.5rem;">
                    <div>
                        <h2 style="font-family: var(--font-heading); font-size: 2.5rem; margin-bottom: 0.5rem;">${album.title}</h2>
                        <p style="color: hsl(var(--muted-foreground)); margin-bottom: 1rem;">
                            ${album.subtitle} · 발매일 : ${album.year}년 ${album.month} ${album.day || 1}일
                        </p>
                        <p style="color: hsl(var(--muted-foreground)); line-height: 1.6; margin-bottom: 1rem;">
                            ${album.description}
                        </p>
                        ${album.links && album.links.streaming ? `<div style="margin-bottom: 1rem;"><a href="${album.links.streaming}" class="btn btn-primary">스트리밍</a></div>` : ''}
                    </div>
                    
                    <div>
                        <h3 style="font-weight: 600; margin-bottom: 0.75rem;">수록곡</h3>
                        <ol style="color: hsl(var(--muted-foreground)); line-height: 1.8; margin-left: 1.25rem;">
                            ${tracksHTML}
                        </ol>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <a href="${album.links.streaming}" class="btn btn-primary">스트리밍</a>
                        ${album.links.purchase ? `<a href="${album.links.purchase}" class="btn btn-outline">구매하기</a>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
    
    function renderPreviousAlbums(albums) {
        const container = document.querySelector('#previous-albums');
        if (!container || !albums) return;
        
        const albumsHTML = albums.map(album => {
            const tracksHTML = album.tracks.map(track => `<li>${track}</li>`).join('');
            
            return `
                <article class="card">
                    <div class="card-image">
                        <img src="${album.image}" alt="${album.title} 앨범 커버" onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';">
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${album.title}</h3>
                        <p class="card-text">${album.subtitle} · 발매일 : ${album.year}년 ${album.month} ${album.day || 1}일</p>
                        <p style="margin: 1rem 0; color: hsl(var(--muted-foreground)); line-height: 1.6;">
                            ${album.description}
                        </p>
                        ${album.links && album.links.streaming ? `<div style="margin: 1rem 0;"><a href="${album.links.streaming}" class="btn btn-primary">스트리밍</a></div>` : ''}
                        <details style="margin-top: 1rem;">
                            <summary style="cursor: pointer; font-weight: 600; color: hsl(var(--foreground)); padding: 0.5rem 0;">
                                수록곡 보기
                            </summary>
                            <ol style="margin-top: 0.75rem; color: hsl(var(--muted-foreground)); line-height: 1.8; margin-left: 1.25rem;">
                                ${tracksHTML}
                            </ol>
                        </details>
                        <div style="margin-top: 1rem;">
                            <a href="${album.links.streaming}" class="btn btn-link">스트리밍 ›</a>
                        </div>
                    </div>
                </article>
            `;
        }).join('');
        
        container.innerHTML = albumsHTML;
    }
    
    function renderSingles(singles) {
        const container = document.querySelector('#singles');
        if (!container || !singles) return;
        
        const singlesHTML = singles.map(single => {
            // 이미지가 있으면 이미지 사용, 없으면 gradient와 icon 사용
            const imageContent = single.image 
                ? `<img src="${single.image}" alt="${single.title} 앨범 커버" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.parentElement.style.background='${single.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}'; this.parentElement.innerHTML = '<div style=\\'width: 100%; height: 100%; background: ${single.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}; display: flex; align-items: center; justify-content: center; font-size: 3rem;\\'>${single.icon || '🎵'}</div>';">`
                : `<div style="width: 100%; height: 100%; background: ${single.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}; display: flex; align-items: center; justify-content: center; font-size: 3rem;">${single.icon || '🎵'}</div>`;
            
            return `
            <article class="card">
                <div class="card-image">
                    ${imageContent}
                </div>
                <div class="card-content">
                    <h3 class="card-title">${single.title}</h3>
                    <p class="card-text">${single.type} · 발매일 : ${single.year}년 ${single.month} ${single.day || 1}일</p>
                    ${single.links && single.links.streaming ? `<div style="margin-top: 1rem; text-align: center;"><a href="${single.links.streaming}" class="btn btn-primary" style="font-size: 0.875rem; padding: 0.5rem 1rem;">스트리밍</a></div>` : ''}
                </div>
            </article>
            `;
        }).join('');
        
        container.innerHTML = singlesHTML;
    }
    
    function renderMusicVideos(videos) {
        const container = document.querySelector('#music-videos');
        if (!container || !videos) return;
        
        const videosHTML = videos.map(video => `
            <article class="card video-card">
                <div class="card-image">
                    <img src="${video.image}" alt="${video.title} 뮤직비디오" onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)';">
                    <div class="video-overlay">
                        <div class="play-button">
                            <div class="play-icon"></div>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${video.title}</h3>
                    <p class="card-text">${video.description} · ${video.year}</p>
                    <p class="card-text">조회수: ${video.views}회</p>
                </div>
            </article>
        `).join('');
        
        container.innerHTML = videosHTML;
    }
    
    function renderStreamingPlatforms(platforms) {
        const container = document.querySelector('#streaming-platforms');
        if (!container || !platforms) return;
        
        const platformsHTML = platforms.map(platform => `
            <a href="${platform.link}" class="card" style="text-decoration: none;">
                <div class="card-content text-center">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;">${platform.icon}</div>
                    <h3 class="card-title">${platform.name}</h3>
                </div>
            </a>
        `).join('');
        
        container.innerHTML = platformsHTML;
    }

    // ===================================
    // Performances Page Rendering
    // ===================================
    
    async function renderPerformancesPage() {
        const data = await loadJSON('assets/data/performances.json');
        if (!data) {
            showError(document.querySelector('#performances-videos'), '공연 영상 정보를 불러올 수 없습니다.');
            return;
        }
        
        // Render Performance Videos
        renderPerformanceVideos(data.videos);
    }
    
    function renderPerformanceVideos(videos) {
        const container = document.querySelector('#performances-videos');
        if (!container || !videos) return;
        
        // YouTube URL을 embed URL로 변환하는 함수
        function getYouTubeEmbedUrl(url) {
            if (!url) return '';
            
            // 이미 embed URL인 경우
            if (url.includes('youtube.com/embed/')) {
                return url;
            }
            
            // 일반 YouTube URL인 경우
            const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
            if (videoIdMatch && videoIdMatch[1]) {
                return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
            }
            
            return '';
        }
        
        const videosHTML = videos.map(video => {
            const embedUrl = getYouTubeEmbedUrl(video.youtubeUrl);
            const hasVideo = embedUrl !== '';
            
            return `
                <article class="card">
                    <div class="card-image" style="aspect-ratio: 16 / 9; background-color: hsl(var(--muted)); position: relative; overflow: hidden;">
                        ${hasVideo ? `
                            <iframe 
                                src="${embedUrl}" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen
                                style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;">
                            </iframe>
                        ` : `
                            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: hsl(var(--muted-foreground)); font-size: 1.5rem;">
                                영상 없음
                            </div>
                        `}
                    </div>
                    <div class="card-content" style="text-align: center; padding: 0.5rem var(--spacing-sm);">
                        <p style="color: hsl(var(--muted-foreground)); line-height: 1.4; text-align: center; margin: 0; font-size: 0.875rem;">
                            ${video.description || '설명을 입력해주세요.'}
                        </p>
                    </div>
                </article>
            `;
        }).join('');
        
        container.innerHTML = videosHTML;
    }

    // ===================================
    // Mobile Menu Toggle
    // ===================================
    
    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
        
        if (!menuToggle || !nav) return;
        
        // Toggle menu
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('active');
            const isExpanded = nav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            
            // Update icon
            const icon = menuToggle.querySelector('.menu-icon');
            if (icon) {
                icon.textContent = isExpanded ? '✕' : '☰';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('active') && 
                !nav.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                nav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                const icon = menuToggle.querySelector('.menu-icon');
                if (icon) {
                    icon.textContent = '☰';
                }
            }
        });
        
        // Close menu when pressing Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.focus();
                const icon = menuToggle.querySelector('.menu-icon');
                if (icon) {
                    icon.textContent = '☰';
                }
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    const icon = menuToggle.querySelector('.menu-icon');
                    if (icon) {
                        icon.textContent = '☰';
                    }
                }
            });
        });
        
        // Close menu on window resize to desktop
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 768 && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    const icon = menuToggle.querySelector('.menu-icon');
                    if (icon) {
                        icon.textContent = '☰';
                    }
                }
            }, 250);
        });
    }

    // ===================================
    // Active Navigation Link
    // ===================================
    
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // Remove active class from all links
            link.classList.remove('active');
            
            // Add active class to current page link
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html') ||
                (currentPage === 'index.html' && href === 'index.html')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================
    
    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if href is just "#"
                if (href === '#') return;
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Set focus to target for accessibility
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            });
        });
    }

    // ===================================
    // Form Validation
    // ===================================
    
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let isValid = true;
                const requiredFields = form.querySelectorAll('[required]');
                
                // Clear previous error messages
                const errorMessages = form.querySelectorAll('.error-message');
                errorMessages.forEach(msg => msg.remove());
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        showError(field, '이 필드는 필수입니다.');
                    } else if (field.type === 'email' && !isValidEmail(field.value)) {
                        isValid = false;
                        showError(field, '올바른 이메일 주소를 입력해주세요.');
                    }
                });
                
                if (isValid) {
                    // Show success message
                    showSuccessMessage(form);
                    form.reset();
                }
            });
        });
    }
    
    function showError(field, message) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'var(--secondary-color)';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        errorDiv.setAttribute('role', 'alert');
        field.parentNode.appendChild(errorDiv);
    }
    
    function showSuccessMessage(form) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.padding = 'var(--spacing-sm)';
        successDiv.style.backgroundColor = '#27ae60';
        successDiv.style.color = 'white';
        successDiv.style.borderRadius = '4px';
        successDiv.style.marginTop = 'var(--spacing-sm)';
        successDiv.textContent = '메시지가 성공적으로 전송되었습니다!';
        successDiv.setAttribute('role', 'alert');
        
        form.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ===================================
    // Lazy Loading Images
    // ===================================
    
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    // ===================================
    // Current Year in Footer
    // ===================================
    
    function updateFooterYear() {
        const yearElement = document.querySelector('.current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // ===================================
    // Lightbox Gallery
    // ===================================
    
    function initLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const lightboxClose = document.querySelector('.lightbox-close');
        const lightboxPrev = document.querySelector('.lightbox-prev');
        const lightboxNext = document.querySelector('.lightbox-next');
        
        if (!lightbox || !lightboxImage) return;
        
        let currentImages = [];
        let currentIndex = 0;
        
        // 갤러리 페이지의 모든 이미지 수집 (공연 영상 카드는 제외)
        function collectGalleryImages() {
            const images = [];
            // video-card는 제외하고 이미지 수집
            const cards = document.querySelectorAll('.card:not(.video-card) .card-image img, .gallery-card img');
            
            cards.forEach((img, index) => {
                // video-card 내의 이미지는 제외
                if (img.closest('.video-card')) {
                    return;
                }
                
                if (img.src && !img.src.includes('data:')) {
                    images.push({
                        src: img.src,                        
                        title: img.closest('.card')?.querySelector('.card-title')?.textContent || ''
                    });
                }
            });
            
            return images;
        }
        
        // 라이트박스 열기
        function openLightbox(index) {
            currentImages = collectGalleryImages();
            if (currentImages.length === 0) return;
            
            currentIndex = index >= 0 && index < currentImages.length ? index : 0;
            updateLightboxImage();
            
            lightbox.classList.add('active');
            document.body.classList.add('lightbox-open');
            lightbox.focus();
            
            // 이전/다음 버튼 표시 여부
            if (currentImages.length > 1) {
                lightboxPrev.style.display = 'flex';
                lightboxNext.style.display = 'flex';
            } else {
                lightboxPrev.style.display = 'none';
                lightboxNext.style.display = 'none';
            }
        }
        
        // 라이트박스 닫기
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.classList.remove('lightbox-open');
            currentImages = [];
            currentIndex = 0;
        }
        
        // 라이트박스 이미지 업데이트
        function updateLightboxImage() {
            if (currentImages.length === 0 || currentIndex < 0 || currentIndex >= currentImages.length) return;
            
            const image = currentImages[currentIndex];
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            
            // 캡션 업데이트
            if (lightboxCaption) {
                const captionText = image.title || image.alt;
                lightboxCaption.textContent = captionText;
                lightboxCaption.style.display = captionText ? 'block' : 'none';
            }
        }
        
        // 다음 이미지
        function nextImage() {
            if (currentImages.length === 0) return;
            currentIndex = (currentIndex + 1) % currentImages.length;
            updateLightboxImage();
        }
        
        // 이전 이미지
        function prevImage() {
            if (currentImages.length === 0) return;
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            updateLightboxImage();
        }
        
        // 이미지 클릭 이벤트 연결
        function attachImageClickEvents() {
            // 갤러리 카드만 선택 (공연 영상 카드는 제외)
            const cards = document.querySelectorAll('.gallery-card, .card:not(.video-card)');
            
            // video-card의 링크가 정상 작동하도록 보장
            const videoCards = document.querySelectorAll('.video-card');
            videoCards.forEach(card => {
                const links = card.querySelectorAll('a');
                links.forEach(link => {
                    // video-card 내의 링크는 항상 정상 작동
                    link.addEventListener('click', function(e) {
                        // 링크가 정상적으로 작동하도록 아무것도 방해하지 않음
                        e.stopPropagation(); // 상위 요소의 이벤트 전파만 방지
                    });
                });
            });
            
            cards.forEach((card, index) => {
                const img = card.querySelector('img');
                if (!img) return;
                
                // video-card는 라이트박스에서 제외
                if (card.classList.contains('video-card')) {
                    return;
                }
                
                // 클릭 가능하도록 스타일 추가
                card.style.cursor = 'pointer';
                
                // 갤러리 카드 내의 링크 기본 동작 방지
                const links = card.querySelectorAll('a');
                links.forEach(link => {
                    // "더 보기" 같은 버튼 링크는 제외
                    if (!link.classList.contains('btn-link') && !link.closest('.btn')) {
                        link.addEventListener('click', function(e) {
                            // 이미지나 카드 영역 클릭 시에만 링크 동작 방지
                            if (e.target === img || img.contains(e.target) || card.contains(e.target)) {
                                e.preventDefault();
                                e.stopPropagation();
                            }
                        });
                    }
                });
                
                // 이미지나 카드 클릭 시 라이트박스 열기
                function handleImageClick(e) {
                    // 버튼 클릭은 무시
                    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                        return;
                    }
                    
                    // "더 보기" 같은 버튼 링크는 무시
                    if (e.target.tagName === 'A' && (e.target.classList.contains('btn-link') || e.target.closest('.btn'))) {
                        return;
                    }
                    
                    // video-card는 무시
                    if (e.target.closest('.video-card')) {
                        return;
                    }
                    
                    // 링크 기본 동작 방지
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // 해당 이미지의 인덱스 찾기
                    const allImages = collectGalleryImages();
                    const clickedImg = card.querySelector('img');
                    if (clickedImg) {
                        const imgIndex = allImages.findIndex(img => img.src === clickedImg.src);
                        openLightbox(imgIndex >= 0 ? imgIndex : 0);
                    }
                }
                
                // 카드와 이미지에 클릭 이벤트 추가
                card.addEventListener('click', handleImageClick);
                if (img) {
                    img.addEventListener('click', handleImageClick);
                }
                
                // 터치 이벤트 지원
                let touchStartX = 0;
                let touchStartY = 0;
                
                card.addEventListener('touchstart', function(e) {
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;
                }, { passive: true });
                
                card.addEventListener('touchend', function(e) {
                    if (!touchStartX || !touchStartY) return;
                    
                    const touchEndX = e.changedTouches[0].clientX;
                    const touchEndY = e.changedTouches[0].clientY;
                    const diffX = touchStartX - touchEndX;
                    const diffY = touchStartY - touchEndY;
                    
                    // 스와이프가 아닌 탭인 경우 (5px 이내)
                    if (Math.abs(diffX) < 5 && Math.abs(diffY) < 5) {
                        const allImages = collectGalleryImages();
                        const clickedImg = card.querySelector('img');
                        if (clickedImg) {
                            const imgIndex = allImages.findIndex(img => img.src === clickedImg.src);
                            openLightbox(imgIndex >= 0 ? imgIndex : 0);
                        }
                    }
                    
                    touchStartX = 0;
                    touchStartY = 0;
                }, { passive: true });
            });
        }
        
        // 닫기 버튼 이벤트
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        
        // 배경 클릭 시 닫기
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // 이전/다음 버튼 이벤트
        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', function(e) {
                e.stopPropagation();
                prevImage();
            });
        }
        
        if (lightboxNext) {
            lightboxNext.addEventListener('click', function(e) {
                e.stopPropagation();
                nextImage();
            });
        }
        
        // 키보드 네비게이션
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    prevImage();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextImage();
                    break;
            }
        });
        
        // 라이트박스 내 이미지 스와이프 지원 (터치)
        let lightboxTouchStartX = 0;
        
        lightbox.addEventListener('touchstart', function(e) {
            if (e.target === lightboxImage || lightboxImage.contains(e.target)) {
                lightboxTouchStartX = e.touches[0].clientX;
            }
        }, { passive: true });
        
        lightbox.addEventListener('touchend', function(e) {
            if (!lightboxTouchStartX) return;
            
            const touchEndX = e.changedTouches[0].clientX;
            const diffX = lightboxTouchStartX - touchEndX;
            
            // 50px 이상 스와이프한 경우
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    nextImage(); // 오른쪽으로 스와이프 = 다음 이미지
                } else {
                    prevImage(); // 왼쪽으로 스와이프 = 이전 이미지
                }
            }
            
            lightboxTouchStartX = 0;
        }, { passive: true });
        
        // 이미지 클릭 이벤트 초기화
        attachImageClickEvents();
    }

    // ===================================
    // Initialize All Functions
    // ===================================
    
    function init() {
        initMobileMenu();
        setActiveNavLink();
        initSmoothScroll();
        initFormValidation();
        initLazyLoading();
        updateFooterYear();
        
        // Load page-specific data
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        if (currentPage === 'albums.html') {
            renderAlbumsPage();
        } else if (currentPage === 'performances.html') {
            renderPerformancesPage();
        } else if (currentPage === 'gallery.html' || currentPage === 'index.html') {
            // 갤러리 페이지와 메인 페이지의 갤러리 섹션에서 라이트박스 사용
            initLightbox();
        }
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

