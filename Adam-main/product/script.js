document.addEventListener('DOMContentLoaded', function() {
    // Hero section fade-in effect
    const heroSection = document.querySelector('.hero');
    setTimeout(() => {
        heroSection.classList.add('visible');
    }, 500);

    // Collapsible header functionality
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    const banner = document.querySelector('.banner');

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            header.style.top = '-60px';
            if (banner) {
                banner.style.top = '0';
            }
        } else {
            header.style.top = '0';
            if (banner) {
                banner.style.top = '60px';
            }
        }
        lastScrollTop = scrollTop;
    });

    // Heart icon functionality
    const heartIcons = document.querySelectorAll('.heart-icon');
    heartIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            toggleFavorite(icon);
        });
    });

    // Slider functionality
    const slider = document.querySelector('.hero-content .slider');
    if (slider) {
        const slideLis = slider.querySelectorAll('li');
        const moveButton = document.querySelector('.hero-content .arrow');
        
        let currentIdx = 0;
        const liWidth = slideLis[0].clientWidth;
        const totalSlides = slideLis.length;

        moveButton.addEventListener('click', function(event) {
            event.preventDefault();
            if (event.target.classList.contains('next')) {
                if (currentIdx < totalSlides - 1) {
                    currentIdx++;
                    slider.style.transform = `translateX(${-liWidth * currentIdx}px)`;
                }
            } else if (event.target.classList.contains('prev')) {
                if (currentIdx > 0) {
                    currentIdx--;
                    slider.style.transform = `translateX(${-liWidth * currentIdx}px)`;
                }
            }
        });
    }

    // Fetch session information and update user info
    fetch('/session-user')
        .then(response => response.json())
        .then(data => {
            const userInfo = document.getElementById('user-info');
            if (data.userName) {
                userInfo.innerHTML = `<span>${data.userName}</span> <form action="/logout" method="POST" style="display:inline;"><button type="submit">로그아웃</button></form>`;
            } else {
                userInfo.innerHTML = `<a href="../login/login.html">로그인</a> <a href="../login/signup.html">회원가입</a>`;
            }
        })
        .catch(error => console.error('세션 정보를 가져오는 중 오류 발생:', error));
});

function toggleFavorite(element) {
    console.log("하트 클릭됨"); // 클릭 이벤트 확인용 로그
    const img = element.querySelector('img');

    if (!img) {
        console.error("이미지 요소를 찾을 수 없습니다.");
        return;
    }

    const isFavorited = element.classList.toggle('favorited');
    img.src = isFavorited ? '../images/heartfill.jpg' : '../images/heartempty.jpg';
    console.log(`하트 아이콘 상태: ${isFavorited ? '채워짐' : '비어있음'}`);
}
