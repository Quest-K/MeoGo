import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { REGIONS, QUESTS } from '../data/quests';
import { ChevronRight, Award } from 'lucide-react';

const Home: React.FC = () => {
    const { t } = useLanguage();
    const { user, level, levelProgress } = useUser();
    const navigate = useNavigate();

    const getRegionProgress = (regionId: string) => {
        const regionQuests = QUESTS.filter(q => q.region === regionId);
        const completed = regionQuests.filter(q => user.completedQuests.includes(q.id)).length;
        return regionQuests.length > 0 ? (completed / regionQuests.length) * 100 : 0;
    };

    const CIRCUMFERENCE = 2 * Math.PI * 28; // r=28

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 16 }}>

            {/* ── EXP / 레벨 헤더 카드 ── */}
            <section style={{
                background: 'linear-gradient(135deg, #1A237E 0%, #283593 50%, #D32F2F 100%)',
                borderRadius: 24,
                padding: '24px 20px',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(26,35,126,0.25)',
            }}>
                {/* 배경 장식 */}
                <div style={{ position: 'absolute', right: -20, top: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                <div style={{ position: 'absolute', right: 40, bottom: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,215,0,0.08)' }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                        <div>
                            <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>
                                {t({ en: 'Hello', ko: '안녕하세요' })}, <strong>{user.nickname}</strong>
                            </p>
                            <p style={{ fontSize: 22, fontWeight: 900, fontFamily: 'var(--font-display)', letterSpacing: '-0.5px' }}>
                                {t({ en: level, ko: level })}
                            </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: 26, fontWeight: 900, color: '#FFD700', letterSpacing: '-1px' }}>
                                {user.exp.toLocaleString()}
                            </p>
                            <p style={{ fontSize: 11, opacity: 0.7, fontWeight: 700, letterSpacing: '0.1em' }}>EXP</p>
                        </div>
                    </div>

                    {/* 레벨 진행 바 */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 11, fontWeight: 700, opacity: 0.75, letterSpacing: '0.08em' }}>
                            <span>{t({ en: 'LEVEL PROGRESS', ko: '레벨 성장도' })}</span>
                            <span>{Math.round(levelProgress)}%</span>
                        </div>
                        <div style={{ height: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 99, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${levelProgress}%`, background: '#FFD700', borderRadius: 99, transition: 'width 1s ease', boxShadow: '0 0 8px rgba(255,215,0,0.5)' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 권역별 진행 대시보드 ── */}
            <section className="premium-card" style={{ padding: '20px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <Award size={20} color="#1A237E" />
                    <span style={{ fontWeight: 800, fontSize: 16, color: '#1e293b', letterSpacing: '-0.3px' }}>
                        {t({ en: 'Regional Journey', ko: '지역별 탐험 현황' })}
                    </span>
                </div>

                {/* 7개 지역 원형 그리드 */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 8px' }}>
                    {REGIONS.map((region) => {
                        const progress = getRegionProgress(region.id);
                        const stroke = CIRCUMFERENCE - (CIRCUMFERENCE * progress) / 100;
                        return (
                            <button
                                key={region.id}
                                onClick={() => navigate(`/region/${region.id}`)}
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 16 }}
                                className="active:scale-90 transition-transform"
                            >
                                <div style={{ position: 'relative', width: 64, height: 64 }}>
                                    <svg style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }} width="64" height="64">
                                        <circle cx="32" cy="32" r="28" fill="none" stroke="#f1f5f9" strokeWidth="5" />
                                        <circle
                                            cx="32" cy="32" r="28" fill="none"
                                            stroke={region.color}
                                            strokeWidth="5"
                                            strokeDasharray={CIRCUMFERENCE}
                                            strokeDashoffset={stroke}
                                            strokeLinecap="round"
                                            style={{ transition: 'stroke-dashoffset 1s ease' }}
                                        />
                                    </svg>
                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                                        {region.symbol}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ fontSize: 11, fontWeight: 700, color: '#475569', letterSpacing: '-0.2px', marginBottom: 1 }}>
                                        {t(region.name)}
                                    </p>
                                    <p style={{ fontSize: 10, color: region.color, fontWeight: 800 }}>
                                        {Math.round(progress)}%
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* ── 빠른 탐험 리스트 ── */}
            <section>
                <p style={{ fontWeight: 800, fontSize: 16, color: '#1e293b', marginBottom: 12, letterSpacing: '-0.3px', padding: '0 2px' }}>
                    {t({ en: 'Quick Explore', ko: '빠른 탐험' })}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {REGIONS.slice(0, 4).map((region) => (
                        <button
                            key={region.id}
                            onClick={() => navigate(`/region/${region.id}`)}
                            className="premium-card"
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '14px 16px', background: 'white', border: 'none', cursor: 'pointer',
                                textAlign: 'left', width: '100%',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 22, background: `${region.color}15`,
                                }}>
                                    {region.symbol}
                                </div>
                                <div>
                                    <p style={{ fontWeight: 800, fontSize: 15, color: '#1e293b', marginBottom: 2, letterSpacing: '-0.3px' }}>
                                        {t(region.name)}
                                    </p>
                                    <p style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>{region.label}</p>
                                </div>
                            </div>
                            <div style={{
                                width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: '#f8fafc', color: '#cbd5e1',
                            }}>
                                <ChevronRight size={16} />
                            </div>
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
