import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { REGIONS, QUESTS } from '../data/quests';
import { ArrowLeft, CheckCircle, Star, Clock, SlidersHorizontal } from 'lucide-react';

type CategoryFilter = 'All' | 'Food' | 'Activity' | 'Lifestyle' | 'Hot Spot';
type SeasonFilter = 'All Seasons' | 'Spring' | 'Summer' | 'Autumn' | 'Winter';

const CATEGORY_CHIPS: { value: CategoryFilter; icon: string }[] = [
    { value: 'All', icon: '🗂' },
    { value: 'Food', icon: '🍱' },
    { value: 'Activity', icon: '🏃' },
    { value: 'Hot Spot', icon: '📸' },
    { value: 'Lifestyle', icon: '🏠' },
];

const SEASON_CHIPS: { value: SeasonFilter; icon: string }[] = [
    { value: 'All Seasons', icon: '🗓' },
    { value: 'Spring', icon: '🌸' },
    { value: 'Summer', icon: '☀️' },
    { value: 'Autumn', icon: '🍂' },
    { value: 'Winter', icon: '❄️' },
];

const RegionDetail: React.FC = () => {
    const { regionId } = useParams<{ regionId: string }>();
    const { t } = useLanguage();
    const { user } = useUser();
    const navigate = useNavigate();

    const [activeCat, setActiveCat] = useState<CategoryFilter>('All');
    const [activeSeason, setActiveSeason] = useState<SeasonFilter>('All Seasons');

    const region = REGIONS.find(r => r.id === regionId);
    const allQuests = QUESTS.filter(q => q.region === regionId);

    if (!region) {
        return (
            <div style={{ padding: 32, textAlign: 'center', color: '#94a3b8' }}>
                Region not found
            </div>
        );
    }

    // ── 필터 적용 ──────────────────────────────────────────────────────────
    const filteredQuests = allQuests.filter(q => {
        const catOk = activeCat === 'All' || q.category === activeCat;
        const seasonOk =
            activeSeason === 'All Seasons' ||
            q.season === activeSeason ||
            q.season === 'All';
        return catOk && seasonOk;
    });

    const completedCount = allQuests.filter(q => user.completedQuests.includes(q.id)).length;
    const progress = allQuests.length > 0 ? (completedCount / allQuests.length) * 100 : 0;

    // ── 칩 버튼 공통 스타일 ────────────────────────────────────────────────
    const chipStyle = (active: boolean): React.CSSProperties => ({
        flexShrink: 0,
        padding: '8px 14px',
        borderRadius: 99,
        fontSize: 12,
        fontWeight: 700,
        background: active ? '#1A237E' : 'white',
        color: active ? 'white' : '#64748b',
        border: `1.5px solid ${active ? '#1A237E' : '#e2e8f0'}`,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        whiteSpace: 'nowrap' as const,
        transition: 'all 0.15s ease',
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 16 }}>

            {/* ── 헤더 ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
                <button
                    onClick={() => navigate(-1)}
                    className="active:scale-90 transition-transform"
                    style={{
                        width: 40, height: 40, borderRadius: 14,
                        background: 'white', border: '1px solid #f1f5f9',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        flexShrink: 0,
                    }}
                >
                    <ArrowLeft size={18} color="#475569" />
                </button>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <h2 style={{ fontWeight: 900, fontSize: 20, color: '#1e293b', letterSpacing: '-0.5px', margin: 0 }}>
                        {t(region.name)}
                    </h2>
                    <p style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, margin: '2px 0 0', letterSpacing: '0.04em' }}>
                        {allQuests.length} {t({ en: 'MISSIONS', ko: '개의 미션' })}
                    </p>
                </div>
                <div style={{
                    width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                    background: `${region.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                }}>
                    {region.symbol}
                </div>
            </div>

            {/* ── 정복도 카드 ── */}
            <section style={{
                background: 'white', borderRadius: 20, padding: '20px 16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 }}>
                    <div>
                        <p style={{ fontSize: 32, fontWeight: 900, color: '#1e293b', letterSpacing: '-1px', margin: 0 }}>
                            {Math.round(progress)}%
                        </p>
                        <p style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, letterSpacing: '0.06em', marginTop: 2 }}>
                            {t({ en: 'MASTERY', ko: '지역 정복도' })}
                        </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: 15, fontWeight: 800, color: region.color, margin: 0 }}>
                            {completedCount} / {allQuests.length}
                        </p>
                        <p style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, marginTop: 2 }}>
                            {t({ en: 'Completed', ko: '완료' })}
                        </p>
                    </div>
                </div>
                <div style={{ height: 6, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{
                        height: '100%', width: `${progress}%`,
                        background: region.color, borderRadius: 99, transition: 'width 1s ease',
                    }} />
                </div>
            </section>

            {/* ── 카테고리 필터 (가로 스크롤) ── */}
            <div style={{ margin: '0 -16px' }}>
                <div
                    style={{
                        display: 'flex', gap: 8, overflowX: 'auto',
                        padding: '2px 16px 6px',
                        msOverflowStyle: 'none', scrollbarWidth: 'none',
                    } as React.CSSProperties}
                >
                    {CATEGORY_CHIPS.map(chip => (
                        <button
                            key={chip.value}
                            onClick={() => setActiveCat(chip.value)}
                            style={chipStyle(activeCat === chip.value)}
                            className="active:scale-95 transition-transform"
                        >
                            {chip.icon} {chip.value === 'All' ? t({ en: 'All', ko: '전체' }) : chip.value}
                        </button>
                    ))}
                    <div style={{ flexShrink: 0, width: 1 }} /> {/* 오른쪽 여백 spacer */}
                </div>
            </div>

            {/* ── 시즌 필터 (가로 스크롤) ── */}
            <div style={{ margin: '0 -16px', marginTop: -8 }}>
                <div
                    style={{
                        display: 'flex', gap: 8, overflowX: 'auto',
                        padding: '2px 16px 4px',
                        msOverflowStyle: 'none', scrollbarWidth: 'none',
                    } as React.CSSProperties}
                >
                    {SEASON_CHIPS.map(chip => (
                        <button
                            key={chip.value}
                            onClick={() => setActiveSeason(chip.value)}
                            style={{
                                ...chipStyle(activeSeason === chip.value),
                                background: activeSeason === chip.value ? `${region.color}22` : 'white',
                                color: activeSeason === chip.value ? region.color : '#64748b',
                                border: `1.5px solid ${activeSeason === chip.value ? region.color : '#e2e8f0'}`,
                            }}
                            className="active:scale-95 transition-transform"
                        >
                            {chip.icon} {chip.value === 'All Seasons' ? t({ en: 'All Seasons', ko: '전 시즌' }) : t({ en: chip.value, ko: chip.value })}
                        </button>
                    ))}
                    <div style={{ flexShrink: 0, width: 1 }} />
                </div>
            </div>

            {/* ── 결과 개수 ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 2px' }}>
                <SlidersHorizontal size={14} color="#94a3b8" />
                <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
                    {filteredQuests.length} {t({ en: 'missions', ko: '개의 미션' })}
                    {activeCat !== 'All' && ` · ${activeCat}`}
                    {activeSeason !== 'All Seasons' && ` · ${activeSeason}`}
                </span>
            </div>

            {/* ── 미션 목록 ── */}
            {filteredQuests.length === 0 ? (
                <div style={{ padding: '40px 24px', textAlign: 'center', border: '2px dashed #e2e8f0', borderRadius: 20 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#94a3b8', margin: 0 }}>
                        {t({ en: 'No missions for this filter', ko: '해당 필터에 맞는 미션이 없어요' })}
                    </p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {filteredQuests.map(quest => {
                        const isCompleted = user.completedQuests.includes(quest.id);
                        return (
                            <button
                                key={quest.id}
                                onClick={() => navigate(`/quest/${quest.id}`)}
                                style={{
                                    display: 'flex', gap: 14, padding: 14,
                                    background: 'white', border: 'none', cursor: 'pointer',
                                    textAlign: 'left', width: '100%',
                                    borderRadius: 20, boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                                    borderLeft: isCompleted ? `4px solid ${region.color}` : '4px solid transparent',
                                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                                }}
                                className="active:scale-[0.98]"
                            >
                                {/* 이미지 */}
                                <div style={{
                                    position: 'relative', width: 96, height: 96,
                                    flexShrink: 0, borderRadius: 14, overflow: 'hidden', background: '#f1f5f9',
                                }}>
                                    <img
                                        src={quest.image}
                                        alt={t(quest.title)}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        loading="lazy"
                                    />
                                    {isCompleted && (
                                        <div style={{
                                            position: 'absolute', inset: 0,
                                            background: 'rgba(34,197,94,0.55)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            <CheckCircle size={28} color="white" />
                                        </div>
                                    )}
                                    <div style={{
                                        position: 'absolute', top: 6, left: 6,
                                        background: 'rgba(26,35,126,0.9)', backdropFilter: 'blur(4px)',
                                        borderRadius: 8, padding: '2px 6px',
                                        fontSize: 9, fontWeight: 900, color: 'white', letterSpacing: '0.04em',
                                    }}>
                                        {quest.points} XP
                                    </div>
                                </div>

                                {/* 텍스트 */}
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
                                    <div>
                                        {/* 카테고리 · 시즌 */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                                            <span style={{ fontSize: 10, fontWeight: 800, color: '#D32F2F', letterSpacing: '0.06em' }}>
                                                {quest.category.toUpperCase()}
                                            </span>
                                            <span style={{ fontSize: 10, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
                                                <Clock size={10} /> {quest.season}
                                            </span>
                                        </div>
                                        {/* 제목 */}
                                        <h4 style={{
                                            fontWeight: 800, fontSize: 14, color: '#1e293b',
                                            margin: 0, letterSpacing: '-0.3px', lineHeight: 1.3,
                                            overflow: 'hidden', display: '-webkit-box',
                                            WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
                                        }}>
                                            {t(quest.title)}
                                        </h4>
                                        {/* 구 태그 */}
                                        {quest.district && (
                                            <span style={{
                                                display: 'inline-block', marginTop: 4,
                                                fontSize: 10, fontWeight: 700, color: region.color,
                                                background: `${region.color}12`, borderRadius: 6, padding: '2px 6px',
                                            }}>
                                                #{quest.district}
                                            </span>
                                        )}
                                    </div>
                                    {/* 난이도 별점 (5단계) */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 8 }}>
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <Star
                                                key={i}
                                                size={10}
                                                fill={i <= (quest.difficulty ?? 1) ? region.color : '#e2e8f0'}
                                                stroke="none"
                                            />
                                        ))}
                                        {quest.cost && (
                                            <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 700, color: '#94a3b8' }}>
                                                {quest.cost}
                                            </span>
                                        )}
                                        {isCompleted && (
                                            <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 800, color: '#22c55e' }}>
                                                ✓ {t({ en: 'Done', ko: '완료' })}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default RegionDetail;
