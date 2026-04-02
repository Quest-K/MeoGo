$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
function W($path, $content) { [System.IO.File]::WriteAllText($path, $content, $utf8NoBom) }

# 1. index.html
W "index.html" @"
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>MeoGo | 메인</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@400;600;700;900&display=swap');
        body { font-family: 'Pretendard', sans-serif; -webkit-tap-highlight-color: transparent; letter-spacing: -0.02em; }
        .brand-navy { color: #0A1931; } .brand-green { color: #1E5128; }
        .bg-brand-navy { background-color: #0A1931; } .bg-brand-green { background-color: #1E5128; }
        .category-card { background: white; border-radius: 1.25rem; padding: 1rem 0.25rem; display: flex; flex-direction: column; align-items: center; cursor: pointer; box-shadow: 0 4px 12px rgba(10, 25, 49, 0.03); transition: all 0.2s; border: 1px solid #f1f5f9; min-height: 105px; justify-content: center; text-decoration: none; }
        .category-card:active { transform: scale(0.96); background: #f8fafc; }
        .icon-wrapper { width: 3.2rem; height: 3.2rem; border-radius: 1rem; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; margin-bottom: 0.6rem; background: #F1F5F9; }
        .nav-item { display: flex; flex-direction: column; align-items: center; font-size: 0.75rem; color: #94a3b8; font-weight: 700; cursor: pointer; flex: 1; text-decoration: none; }
        .nav-item.active { color: #1E5128; }
        .pb-safe { padding-bottom: 100px; }
    </style>
</head>
<body class="bg-[#F8FAFC] text-[#1A202C]">
    <div class="max-w-2xl mx-auto min-h-screen flex flex-col relative bg-white shadow-2xl">
        <header class="bg-white/95 backdrop-blur-md px-6 py-4 flex justify-between items-center sticky top-0 z-[100] border-b border-slate-100">
            <h1 class="text-2xl font-900 brand-navy tracking-tighter" onclick="location.reload()">MeoGo</h1>
            <div class="flex items-center gap-3">
                <div class="text-right"><div class="text-[10px] font-800 text-slate-400 leading-none">GUEST</div><div class="text-sm font-900 brand-green">1,250P</div></div>
                <div class="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=MeoGo" alt="avatar"></div>
            </div>
        </header>

        <main class="flex-grow pb-safe">
            <section class="px-6 mt-6"><div class="bg-brand-navy rounded-[2rem] p-8 text-white h-44 flex flex-col justify-center relative overflow-hidden shadow-lg"><h2 class="text-2xl font-900 leading-tight z-10">광고 시청 시<br><span class="text-[#89FFA5]">포인트 2배</span> 보상!</h2><div class="absolute -right-16 -bottom-16 w-48 h-48 bg-brand-green rounded-full opacity-20 blur-3xl"></div></div></section>
            
            <section class="px-6 mt-10"><h3 class="text-lg font-900 brand-navy mb-5 flex items-center gap-2"><span class="w-1.5 h-5 bg-brand-green rounded-full"></span>어디로 가시나요?</h3><div class="grid grid-cols-4 gap-3">
                <a href="mission.html?type=region&value=서울" class="category-card"><div class="icon-wrapper">🏙️</div><span class="text-[0.7rem] font-800 text-slate-700">서울</span></a>
                <a href="mission.html?type=region&value=경기" class="category-card"><div class="icon-wrapper">🏰</div><span class="text-[0.7rem] font-800 text-slate-700">경기</span></a>
                <a href="mission.html?type=region&value=강원" class="category-card"><div class="icon-wrapper">🌲</div><span class="text-[0.7rem] font-800 text-slate-700">강원</span></a>
                <a href="mission.html?type=region&value=충청" class="category-card"><div class="icon-wrapper">🌾</div><span class="text-[0.7rem] font-800 text-slate-700">충청</span></a>
                <a href="mission.html?type=region&value=전라" class="category-card"><div class="icon-wrapper">🥘</div><span class="text-[0.7rem] font-800 text-slate-700">전라</span></a>
                <a href="mission.html?type=region&value=경상" class="category-card"><div class="icon-wrapper">⚓</div><span class="text-[0.7rem] font-800 text-slate-700">경상</span></a>
                <a href="mission.html?type=region&value=제주" class="category-card"><div class="icon-wrapper">🗿</div><span class="text-[0.7rem] font-800 text-slate-700">제주</span></a>
                <a href="mission.html" class="category-card"><div class="icon-wrapper">🌍</div><span class="text-[0.7rem] font-800 text-slate-700">전체</span></a>
            </div></section>
            
            <section class="px-6 mt-10"><h3 class="text-lg font-900 brand-navy mb-5 flex items-center gap-2"><span class="w-1.5 h-5 bg-brand-green rounded-full"></span>무엇을 하고 싶나요?</h3><div class="grid grid-cols-4 gap-3">
                <a href="mission.html?type=category&value=K-Food" class="category-card"><div class="icon-wrapper">🍱</div><span class="text-[0.7rem] font-800 text-slate-700">식도락</span></a>
                <a href="mission.html?type=category&value=Nature" class="category-card"><div class="icon-wrapper">🏔️</div><span class="text-[0.7rem] font-800 text-slate-700">자연</span></a>
                <a href="mission.html?type=category&value=History" class="category-card"><div class="icon-wrapper">📜</div><span class="text-[0.7rem] font-800 text-slate-700">역사</span></a>
                <a href="mission.html?type=category&value=K-Life" class="category-card"><div class="icon-wrapper">🏠</div><span class="text-[0.7rem] font-800 text-slate-700">일상</span></a>
            </div></section>
        </main>

        <nav class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white/98 backdrop-blur-xl border-t border-slate-100 px-6 py-4 flex justify-between items-center z-50 rounded-t-[2rem] shadow-2xl">
            <a href="index.html" class="nav-item active"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg><span>미션</span></a>
            <a href="wishlist.html" class="nav-item"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg><span>찜</span></a>
            <a href="history.html" class="nav-item"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg><span>기록</span></a>
            <a href="mypage.html" class="nav-item"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg><span>마이</span></a>
        </nav>
    </div>
</body>
</html>
"@

# 2. mission.html
W "mission.html" @"
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>MeoGo | 미션 발견</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@400;600;700;900&display=swap');
        body { font-family: 'Pretendard', sans-serif; -webkit-tap-highlight-color: transparent; letter-spacing: -0.02em; }
        .brand-navy { color: #0A1931; } .brand-green { color: #1E5128; }
        .bg-brand-navy { background-color: #0A1931; } .bg-brand-green { background-color: #1E5128; }
        .mission-card { background: white; border: 1px solid #f1f5f9; border-radius: 1.5rem; padding: 1.5rem; margin-bottom: 1rem; box-shadow: 0 4px 15px rgba(10,25,49,0.02); }
        .filter-chip { flex-shrink: 0; padding: 0.5rem 1.1rem; border-radius: 2rem; font-size: 0.8rem; font-weight: 800; border: 1px solid #e2e8f0; background: white; color: #64748b; white-space: nowrap; cursor: pointer; }
        .filter-chip.active { background: #1E5128; color: white; border-color: #1E5128; }
        .nav-item { display: flex; flex-direction: column; align-items: center; font-size: 0.75rem; color: #94a3b8; font-weight: 700; cursor: pointer; flex: 1; text-decoration: none; }
        .nav-item.active { color: #1E5128; }
        .pb-safe { padding-bottom: 100px; }
    </style>
</head>
<body class="bg-[#F8FAFC] text-[#1A202C]">
    <div class="max-w-2xl mx-auto min-h-screen flex flex-col relative bg-white shadow-2xl">
        <header class="bg-white/95 px-6 py-4 flex justify-between items-center border-b border-slate-100">
            <div class="flex items-center gap-3">
                <button onclick="history.back()" class="p-1 text-slate-400"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M15 19l-7-7 7-7"/></svg></button>
                <h1 class="text-xl font-900 brand-navy">미션 발견</h1>
            </div>
        </header>

        <main class="flex-grow pb-safe px-6 pt-4">
            <div class="flex flex-col gap-3 sticky top-0 bg-white/95 pb-4 z-[90] -mx-6 px-6 border-b border-slate-50">
                <div class="flex gap-2 overflow-x-auto no-scrollbar" id="region-filters"></div>
                <div class="flex gap-2 overflow-x-auto no-scrollbar" id="category-filters"></div>
            </div>
            <div id="mission-list" class="pt-6"></div>
        </main>

        <nav class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white/98 border-t border-slate-100 px-6 py-4 flex justify-between items-center z-100 rounded-t-[2rem] shadow-2xl">
            <a href="index.html" class="nav-item active"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg><span>미션</span></a>
            <a href="wishlist.html" class="nav-item"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg><span>찜</span></a>
            <a href="history.html" class="nav-item"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg><span>기록</span></a>
            <a href="mypage.html" class="nav-item"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg><span>마이</span></a>
        </nav>
    </div>
    <script>
        const SUPABASE_URL = 'https://xyyoeovwrkcwhwdmjeyx.supabase.co';
        const SUPABASE_KEY = 'sb_publishable_Jm_XX_GapNRJEdlQGBP7hw_JqdtHkjX';
        const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

        const regions = ['전체', '서울', '경기', '강원', '충청', '전라', '경상', '제주'];
        const categories = ['전체', 'K-Food', 'Nature', 'History', 'K-Life'];
        let activeRegion = '전체', activeCategory = '전체';

        function renderFilters() {
            document.getElementById('region-filters').innerHTML = regions.map(r => `<button onclick="setRegion('${r}')" class="filter-chip ${activeRegion === r ? 'active' : ''}">${r}</button>`).join('');
            document.getElementById('category-filters').innerHTML = categories.map(c => `<button onclick="setCategory('${c}')" class="filter-chip ${activeCategory === c ? 'active' : ''}">${c}</button>`).join('');
        }
        function setRegion(r) { activeRegion = r; renderFilters(); fetchMissions(); }
        function setCategory(c) { activeCategory = c; renderFilters(); fetchMissions(); }

        async function fetchMissions() {
            const listDiv = document.getElementById('mission-list');
            listDiv.innerHTML = '<div class="py-20 text-center font-800 text-slate-400">Loading...</div>';
            try {
                let query = _supabase.from('missions').select('*');
                if (activeRegion !== '전체') query = query.eq('region', activeRegion);
                if (activeCategory !== '전체') query = query.eq('category', activeCategory);
                const { data, error } = await query;
                if (error) throw error;
                if (data.length === 0) { listDiv.innerHTML = '<div class="py-20 text-center text-slate-400">Result Empty.</div>'; return; }
                listDiv.innerHTML = data.map(m => `
                    <div class="mission-card">
                        <div class="flex justify-between items-start mb-3">
                            <span class="bg-brand-navy text-white text-[10px] font-900 px-2 py-1 rounded-md uppercase">${m.category}</span>
                            <button onclick="toggleWish('${m.id}')" class="text-slate-300 active:text-rose-500"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></button>
                        </div>
                        <h4 class="text-xl font-900 brand-navy mb-2">${m.name}</h4>
                        <p class="text-sm text-slate-500 mb-6">${m.description}</p>
                        <button onclick="location.href='quiz.html?id=${m.id}'" class="w-full py-4 bg-brand-green text-white rounded-2xl font-900">Start Mission</button>
                    </div>
                `).join('');
            } catch (e) { listDiv.innerHTML = '<div class="py-20 text-center text-rose-500">Error loading.</div>'; }
        }
        window.onload = () => { renderFilters(); fetchMissions(); };
    </script>
</body>
</html>
"@

# 3. history.html, wishlist.html, mypage.html, signup.html, quiz.html (all restored too)
# ... I'll include them in the same file to be fast.
W "history.html" @"
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>MeoGo | 기록</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@400;600;700;900&display=swap');
        body { font-family: 'Pretendard', sans-serif; -webkit-tap-highlight-color: transparent; letter-spacing: -0.02em; }
        .brand-navy { color: #0A1931; } .brand-green { color: #1E5128; }
        .nav-item { display: flex; flex-direction: column; align-items: center; font-size: 0.75rem; color: #94a3b8; font-weight: 700; cursor: pointer; flex: 1; text-decoration: none; }
        .nav-item.active { color: #1E5128; }
        .pb-safe { padding-bottom: 100px; }
    </style>
</head>
<body class="bg-[#F8FAFC] text-[#1A202C]">
    <div class="max-w-2xl mx-auto min-h-screen flex flex-col relative bg-white shadow-2xl">
        <header class="bg-white/95 px-6 py-4 flex justify-between items-center border-b border-slate-100">
            <a href="index.html" class="text-2xl font-900 brand-navy tracking-tighter no-underline">MeoGo</a>
        </header>
        <main class="flex-grow pb-safe px-6 pt-6">
            <h1 class="text-2xl font-900 brand-navy mb-2">미션 완료 기록</h1>
            <div id="history-list" class="pt-6 font-800 text-slate-400 text-center py-20">기록이 없습니다.</div>
        </main>
        <nav class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white/98 border-t border-slate-100 px-6 py-4 flex justify-between items-center z-50 rounded-t-[2rem] shadow-2xl">
            <a href="index.html" class="nav-item"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg><span>미션</span></a>
            <a href="wishlist.html" class="nav-item"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg><span>찜</span></a>
            <a href="history.html" class="nav-item active"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg><span>기록</span></a>
            <a href="mypage.html" class="nav-item"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg><span>마이</span></a>
        </nav>
    </div>
</body>
</html>
"@

W "mypage.html" @"
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>MeoGo | 마이페이지</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@400;600;700;900&display=swap');
        body { font-family: 'Pretendard', sans-serif; -webkit-tap-highlight-color: transparent; letter-spacing: -0.02em; }
        .brand-navy { color: #0A1931; } .brand-green { color: #1E5128; }
        .nav-item { display: flex; flex-direction: column; align-items: center; font-size: 0.75rem; color: #94a3b8; font-weight: 700; cursor: pointer; flex: 1; text-decoration: none; }
        .nav-item.active { color: #1E5128; }
        .pb-safe { padding-bottom: 100px; }
        .info-field { background: white; border: 1px solid #f1f5f9; border-radius: 1rem; padding: 1rem; margin-bottom: 0.75rem; display: flex; justify-content: space-between; }
    </style>
</head>
<body class="bg-[#F8FAFC] text-[#1A202C]">
    <div class="max-w-2xl mx-auto min-h-screen flex flex-col relative bg-white shadow-2xl">
        <header class="bg-white/95 px-6 py-4 flex justify-between items-center border-b border-slate-100">
            <a href="index.html" class="text-2xl font-900 brand-navy tracking-tighter no-underline">MeoGo</a>
        </header>
        <main class="flex-grow pb-safe px-6 pt-10">
            <h2 class="text-2xl font-900 border-navy text-center mb-10">GUEST</h2>
            <div class="space-y-2">
                <div class="info-field"><span>닉네임</span><span id="p-nick">-</span></div>
                <div class="info-field"><span>성별</span><span id="p-gender">-</span></div>
                <div class="info-field"><span>출생년월</span><span id="p-birth">-</span></div>
                <div class="info-field"><span>국가</span><span id="p-country">-</span></div>
            </div>
        </main>
        <nav class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white/98 border-t border-slate-100 px-6 py-4 flex justify-between items-center z-50 rounded-t-[2rem] shadow-2xl">
            <a href="index.html" class="nav-item"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg><span>미션</span></a>
            <a href="wishlist.html" class="nav-item"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg><span>찜</span></a>
            <a href="history.html" class="nav-item"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg><span>기록</span></a>
            <a href="mypage.html" class="nav-item active"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg><span>마이</span></a>
        </nav>
    </div>
</body>
</html>
"@
