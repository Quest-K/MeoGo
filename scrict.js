/**
 * K-Quest Main Script
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('K-Quest Web App Loaded');
    
    // 초기 애니메이션 혹은 데이터 로딩 로직을 여기에 추가할 수 있습니다.
});

/**
 * 알림 버튼 클릭 핸들러
 */
function handleNotification() {
    // 실제 앱에서는 Native 알림 센터를 호출하거나 웹 푸시 목록을 보여줍니다.
    console.log('Notification clicked');
    // 임시 토스트 메시지 등으로 대체 가능
}

/**
 * 프로필 버튼 클릭 핸들러
 */
function handleProfile() {
    console.log('Profile clicked');
    // 마이페이지 이동 로직
}

/**
 * 지역 선택 핸들러
 * @param {string} regionName 
 */
function selectRegion(regionName) {
    console.log(`Region selected: ${regionName}`);
    // 해당 지역 미션 필터링 로직 추가 예정
}

/**
 * 광고 배너 클릭 (수익화 포인트)
 */
const adBanner = document.querySelector('.ad-banner');
if (adBanner) {
    adBanner.addEventListener('click', () => {
        console.log('Ad banner clicked - Triggering rewards');
        // 광고 시청 리워드 지급 API 호출 로직
    });
}

// 하단 내비게이션 인터랙션
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        const menuName = item.querySelector('span').innerText;
        console.log(`Navigating to: ${menuName}`);
        // 실제 페이지 전환 또는 섹션 변경 로직
    });
});
