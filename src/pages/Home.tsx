import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { REGIONS, QUESTS } from '../data/quests';
import { Trophy, MapPin } from 'lucide-react';

const Home: React.FC = () => {
    const { t } = useLanguage();
    const { user, level, levelProgress } = useUser();
    const navigate = useNavigate();
    const [selectedRegion, setSelectedRegion] = useState<string>('all');


    const filteredQuests = QUESTS.filter(q => selectedRegion === 'all' || q.region === selectedRegion);

    const renderDifficulty = (d: number) => '⭐'.repeat(d);
    
    const costLabel = (c: string | undefined) => {
        if (c === 'Free') return '무료 (Free)';
        if (c === '$') return '₩ (Low)';
        if (c === '$$') return '₩₩ (Mid)';
        if (c === '$$$') return '₩₩₩ (High)';
        return '-';
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>

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

            {/* ── 지역 선택 섹션 ── */}
            <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, padding: '0 4px' }}>
                    <MapPin size={20} color="#335495" />
                    <span style={{ fontWeight: 800, fontSize: 17, color: '#1e293b', letterSpacing: '-0.3px' }}>
                        {t({ en: 'Where are you heading?', ko: '어디로 떠나시나요?' })}
                    </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px 8px' }}>
                    <button
                        onClick={() => setSelectedRegion('all')}
                        style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '10px 4px', borderRadius: 16,
                            background: selectedRegion === 'all' ? '#335495' : 'white',
                            color: selectedRegion === 'all' ? 'white' : '#475569',
                            border: `1px solid ${selectedRegion === 'all' ? '#335495' : '#f1f5f9'}`,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            transition: 'all 0.2s',
                            cursor: 'pointer'
                        }}
                    >
                        <span style={{ fontSize: 20 }}>🌏</span>
                        <span style={{ fontSize: 11, fontWeight: 800 }}>{t({ en: 'All', ko: '전체' })}</span>
                    </button>
                    {REGIONS.map((region) => {
                        const active = selectedRegion === region.id;
                        return (
                            <button
                                key={region.id}
                                onClick={() => setSelectedRegion(region.id)}
                                style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '10px 4px', borderRadius: 16,
                                    background: active ? '#335495' : 'white',
                                    color: active ? 'white' : '#475569',
                                    border: `1px solid ${active ? '#335495' : '#f1f5f9'}`,
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                    transition: 'all 0.2s',
                                    cursor: 'pointer'
                                }}
                            >
                                <span style={{ fontSize: 20 }}>{region.symbol}</span>
                                <span style={{ fontSize: 11, fontWeight: 800 }}>{t(region.name)}</span>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* ── 미션 리스트 ── */}
            <section>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, padding: '0 4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Trophy size={18} color="#D32F2F" />
                        <span style={{ fontWeight: 800, fontSize: 17, color: '#1e293b', letterSpacing: '-0.3px' }}>
                            {t({ en: 'Quests', ko: '미션 리스트' })}
                        </span>
                    </div>
                    <span style={{ marginLeft: 'auto', fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
                        {filteredQuests.length} {t({ en: 'items', ko: '개' })}
                    </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {filteredQuests.length > 0 ? (
                        filteredQuests.map((quest) => (
                            <div
                                key={quest.id}
                                className="premium-card"
                                style={{ padding: 20, cursor: 'pointer' }}
                                onClick={() => navigate(`/quest/${quest.id}`)}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                    <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1A237E', margin: 0, lineHeight: 1.3 }}>
                                        {t(quest.title)}
                                    </h3>
                                    {user.completedQuests.includes(quest.id) && (
                                        <span style={{ background: '#4CAF50', color: 'white', fontSize: 10, fontWeight: 900, padding: '3px 8px', borderRadius: 8 }}>
                                            COMPLETED
                                        </span>
                                    )}
                                </div>
                                
                                <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#64748b', fontWeight: 600 }}>
                                        <span>난이도</span>
                                        <span style={{ color: '#f59e0b' }}>{renderDifficulty(quest.difficulty)}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#64748b', fontWeight: 600 }}>
                                        <span>예상비용</span>
                                        <span style={{ color: '#10b981' }}>{costLabel(quest.cost)}</span>
                                    </div>
                                </div>

                                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, margin: '0 0 20px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {t(quest.description)}
                                </p>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/quest/${quest.id}`);
                                    }}
                                    style={{
                                        width: '100%', padding: '12px', borderRadius: 12, background: '#335495', color: 'white', border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer'
                                    }}
                                >
                                    {t({ en: 'View Mission Details', ko: '미션 상세 보기' })}
                                </button>
                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
                            <p style={{ fontSize: 14, fontWeight: 600 }}>{t({ en: 'No quests found in this region.', ko: '이 지역에는 아직 미션이 없습니다.' })}</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
