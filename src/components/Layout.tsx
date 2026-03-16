import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Home, Map as MapIcon, User, Globe, Trophy } from 'lucide-react';

const Layout: React.FC = () => {
    const { language, setLanguage, t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ko' : 'en');
    };

    const navItems = [
        { id: 'home', path: '/', icon: Home, label: { en: 'Home', ko: '홈' } },
        { id: 'map', path: '/map', icon: MapIcon, label: { en: 'Map', ko: '지도' } },
        { id: 'archive', path: '/archive', icon: Trophy, label: { en: 'Record', ko: '기록' } },
        { id: 'profile', path: '/profile', icon: User, label: { en: 'My', ko: '마이' } },
    ];

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* 상단 헤더 */}
            <header
                className="glass-panel sticky top-0 z-50 px-4 py-3 flex justify-between items-center"
                style={{ borderBottom: '1px solid rgba(241,245,249,0.8)' }}
            >
                <div className="cursor-pointer flex items-center gap-1.5" onClick={() => navigate('/')}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 22, color: '#1A237E', letterSpacing: '-0.5px' }}>
                        Quest<span style={{ color: '#D32F2F' }}>K</span>
                    </span>
                </div>
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold transition-all active:scale-95"
                    style={{ letterSpacing: '0.05em' }}
                >
                    <Globe size={14} />
                    {language.toUpperCase()}
                </button>
            </header>

            {/* 메인 콘텐츠 */}
            <main className="flex-1 w-full max-w-md mx-auto px-4 pt-4 pb-36">
                <Outlet />
            </main>

            {/* 하단 광고 배너 + 내비게이션 */}
            <div className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
                {/* ── 광고 배너 슬롯 (AdSense / AdMob WebView 대응) ── */}
                <div style={{
                    maxWidth: 448, margin: '0 auto',
                    background: '#f8fafc', borderTop: '1px solid #e2e8f0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    height: 50, position: 'relative', overflow: 'hidden',
                }}>
                    {/* 실제 AdSense 코드는 아래 주석 부분을 대체하세요 */}
                    {/* <ins className="adsbygoogle" style={{display:'block'}} data-ad-client="ca-pub-XXXXXX" data-ad-slot="XXXXXX" data-ad-format="auto"></ins> */}
                    <div style={{
                        width: '100%', height: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: 8, background: 'linear-gradient(90deg,#f8fafc,#eef2ff,#f8fafc)',
                    }}>
                        <span style={{ fontSize: 9, color: '#cbd5e1', fontWeight: 700, letterSpacing: '0.08em' }}>AD</span>
                        <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>광고 영역 — 배너 320×50</span>
                    </div>
                </div>

                {/* ── 하단 탭 바 ── */}
                <div className="glass-panel border-t border-slate-100 px-2 py-2 max-w-md mx-auto">
                    <div className="flex justify-around items-center">
                        {navItems.map((item) => {
                            const active = isActive(item.path);
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => navigate(item.path)}
                                    className="flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all active:scale-90 flex-1"
                                    style={{
                                        background: active ? '#EEF2FF' : 'transparent',
                                        color: active ? '#1A237E' : '#94a3b8',
                                    }}
                                >
                                    <Icon
                                        size={22}
                                        strokeWidth={active ? 2.5 : 1.8}
                                        style={{ color: active ? '#1A237E' : '#94a3b8' }}
                                    />
                                    <span
                                        className="text-[10px] font-bold"
                                        style={{
                                            color: active ? '#1A237E' : '#94a3b8',
                                            letterSpacing: '0.05em',
                                        }}
                                    >
                                        {t(item.label)}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Layout;
