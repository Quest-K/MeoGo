import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { QUESTS, REGIONS } from '../data/quests';
import { ArrowLeft, Camera, CheckCircle2, Map as MapIcon, Star, Heart } from 'lucide-react';

// ── 난이도 라벨 (5단계) ────────────────────────────────────────────────────
const DIFF_LABELS: Record<number, { ko: string; en: string; color: string }> = {
    1: { ko: '입문', en: 'Beginner', color: '#22c55e' },
    2: { ko: '쉬움', en: 'Easy', color: '#84cc16' },
    3: { ko: '보통', en: 'Normal', color: '#f59e0b' },
    4: { ko: '어려움', en: 'Hard', color: '#ef4444' },
    5: { ko: '맨투탑', en: 'Extreme', color: '#a855f7' },
};

// ── 후기 평점 선택지 (5단계) ───────────────────────────────────────────────
const RATE_OPTIONS = [
    { stars: 5, ko: '⭐⭐⭐⭐⭐ 완벽해요!', en: '⭐⭐⭐⭐⭐ Perfect!' },
    { stars: 4, ko: '⭐⭐⭐⭐ 좋아요', en: '⭐⭐⭐⭐ Good' },
    { stars: 3, ko: '⭐⭐⭐ 보통이에요', en: '⭐⭐⭐ Okay' },
    { stars: 2, ko: '⭐⭐ 아쉬워요', en: '⭐⭐ Disappointing' },
    { stars: 1, ko: '⭐ 다음엔 패스할게요', en: '⭐ Would skip next time' },
];

const QuestDetail: React.FC = () => {
    const { questId } = useParams();
    const { t, language } = useLanguage();
    const { completeQuest, toggleSave, user } = useUser();
    const navigate = useNavigate();

    const quest = QUESTS.find(q => q.id === questId);
    const region = quest ? REGIONS.find(r => r.id === quest.region) : null;

    const alreadyDone = questId ? user.completedQuests.includes(questId) : false;
    const isSaved = questId ? (user.savedQuests ?? []).includes(questId) : false;

    const [phase, setPhase] = useState<'photo' | 'rate' | 'done'>(alreadyDone ? 'done' : 'photo');
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [saveAnim, setSaveAnim] = useState(false);

    if (!quest || !region) {
        return (
            <div style={{ padding: 32, textAlign: 'center' }}>
                <p style={{ color: '#94a3b8', fontWeight: 700 }}>Quest not found</p>
                <button
                    onClick={() => navigate(-1)}
                    style={{ marginTop: 16, padding: '10px 20px', borderRadius: 12, background: '#1A237E', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                >
                    {t({ en: 'Go Back', ko: '돌아가기' })}
                </button>
            </div>
        );
    }

    const diff = DIFF_LABELS[quest.difficulty ?? 3] ?? DIFF_LABELS[3];

    const handlePhotoUpload = () => setPhase('rate');

    const handleRate = (stars: number) => {
        setSelectedRating(stars);
        if (questId) {
            completeQuest(questId, quest.points);
            setPhase('done');
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3500);
        }
    };

    const handleToggleSave = () => {
        if (questId) {
            toggleSave(questId);
            setSaveAnim(true);
            setTimeout(() => setSaveAnim(false), 600);
        }
    };

    const cardStyle: React.CSSProperties = {
        background: 'white', borderRadius: 20, padding: '20px 16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 16 }}>

            {/* ── 이미지 헤더 ── */}
            <div style={{ position: 'relative', margin: '0 -16px', height: 260, overflow: 'hidden' }}>
                <img
                    src={quest.image}
                    alt={t(quest.title)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(248,250,252,1) 0%, transparent 55%)' }} />

                {/* 뒤로 가기 */}
                <button
                    onClick={() => navigate(-1)}
                    className="active:scale-90 transition-transform"
                    style={{ position: 'absolute', top: 16, left: 16, width: 40, height: 40, borderRadius: 14, background: 'rgba(255,255,255,0.92)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', backdropFilter: 'blur(8px)' }}
                >
                    <ArrowLeft size={18} color="#475569" />
                </button>

                {/* ❤️ 찜 버튼 */}
                <button
                    onClick={handleToggleSave}
                    className="active:scale-90 transition-transform"
                    style={{
                        position: 'absolute', top: 16, right: 16,
                        width: 40, height: 40, borderRadius: 14,
                        background: isSaved ? 'rgba(239,68,68,0.9)' : 'rgba(255,255,255,0.92)',
                        border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.25s ease',
                        transform: saveAnim ? 'scale(1.35)' : 'scale(1)',
                    }}
                >
                    <Heart
                        size={18}
                        fill={isSaved ? 'white' : 'none'}
                        color={isSaved ? 'white' : '#ef4444'}
                        strokeWidth={2}
                    />
                </button>

                {/* 완료 배지 */}
                {alreadyDone && (
                    <div style={{ position: 'absolute', bottom: 16, left: 16, background: 'rgba(34,197,94,0.9)', backdropFilter: 'blur(8px)', borderRadius: 99, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <CheckCircle2 size={13} color="white" />
                        <span style={{ fontSize: 11, fontWeight: 800, color: 'white' }}>{t({ en: 'Completed', ko: '완료한 미션' })}</span>
                    </div>
                )}
            </div>

            {/* ── 제목 영역 ── */}
            <div style={{ marginTop: -8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 11, fontWeight: 800, color: '#D32F2F', letterSpacing: '0.08em', margin: '0 0 4px' }}>
                            {quest.category.toUpperCase()}
                            {quest.district && <span style={{ marginLeft: 8, color: region.color }}>#{quest.district}</span>}
                        </p>
                        <h2 style={{ fontWeight: 900, fontSize: 22, color: '#1e293b', margin: 0, letterSpacing: '-0.5px', lineHeight: 1.25 }}>
                            {t(quest.title)}
                        </h2>
                    </div>

                    {/* 난이도 5단계 표시 */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                        <div style={{ display: 'flex', gap: 2 }}>
                            {[1, 2, 3, 4, 5].map(i => (
                                <Star
                                    key={i}
                                    size={12}
                                    fill={i <= (quest.difficulty ?? 3) ? diff.color : '#e2e8f0'}
                                    stroke="none"
                                />
                            ))}
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 800, color: diff.color, letterSpacing: '0.04em' }}>
                            {language === 'ko' ? diff.ko : diff.en}
                        </span>
                    </div>
                </div>

                <p style={{ fontSize: 14, color: '#64748b', marginTop: 10, lineHeight: 1.6 }}>
                    {t(quest.description)}
                </p>

                {/* 인증 힌트 */}
                {quest.verificationHint && (
                    <div style={{ marginTop: 10, padding: '10px 14px', background: `${region.color}0e`, borderRadius: 12, borderLeft: `3px solid ${region.color}` }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: region.color, margin: 0 }}>
                            📸 {t({ en: 'How to verify:', ko: '인증 방법:' })} {t(quest.verificationHint)}
                        </p>
                    </div>
                )}
            </div>

            {/* ── 정보 태그 ── */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ padding: '6px 12px', borderRadius: 99, fontSize: 11, fontWeight: 800, background: '#EEF2FF', color: '#1A237E' }}>
                    🏆 {quest.points} XP
                </span>
                {quest.cost && (
                    <span style={{ padding: '6px 12px', borderRadius: 99, fontSize: 11, fontWeight: 700, background: '#f8fafc', color: '#475569', border: '1px solid #e2e8f0' }}>
                        💰 {quest.cost}
                    </span>
                )}
                <span style={{ padding: '6px 12px', borderRadius: 99, fontSize: 11, fontWeight: 700, background: '#f8fafc', color: '#475569', border: '1px solid #e2e8f0' }}>
                    📅 {quest.season}
                </span>
                {/* 찜 상태 태그 */}
                <span
                    onClick={handleToggleSave}
                    style={{
                        padding: '6px 12px', borderRadius: 99, fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                        background: isSaved ? '#FEF2F2' : '#f8fafc',
                        color: isSaved ? '#ef4444' : '#94a3b8',
                        border: `1px solid ${isSaved ? '#FCA5A5' : '#e2e8f0'}`,
                    }}
                >
                    {isSaved ? '❤️ 찜 완료' : '🤍 찜하기'}
                </span>
            </div>

            {/* ── 네이버 지도 버튼 ── */}
            <a
                href={quest.naverMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 16px', background: 'white', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1.5px solid #f1f5f9', fontSize: 13, fontWeight: 800, color: '#475569', textDecoration: 'none' }}
                className="active:scale-95 transition-transform"
            >
                <MapIcon size={17} color="#22c55e" />
                {t({ en: 'View on Naver Map', ko: '네이버 지도로 보기' })}
            </a>

            {/* ── 사진 인증 단계 ── */}
            {phase === 'photo' && (
                <div style={{ ...cardStyle, borderColor: '#DCFCE7' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                        <span style={{ width: 28, height: 28, borderRadius: 10, background: '#22c55e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, flexShrink: 0 }}>1</span>
                        <span style={{ fontWeight: 800, fontSize: 15, color: '#1e293b' }}>{t({ en: 'Photo Verification', ko: '사진 인증' })}</span>
                    </div>
                    <p style={{ fontSize: 13, color: '#64748b', marginBottom: 14, lineHeight: 1.5 }}>
                        {quest.verificationHint ? t(quest.verificationHint) : t({ en: 'Upload a photo to certify your visit!', ko: '방문 인증 사진을 업로드해주세요!' })}
                    </p>
                    <button
                        onClick={handlePhotoUpload}
                        className="active:scale-95 transition-transform"
                        style={{ width: '100%', padding: '36px 0', borderRadius: 18, border: '2px dashed #22c55e', background: '#F0FDF4', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, cursor: 'pointer' }}
                    >
                        <Camera size={36} color="#22c55e" />
                        <span style={{ fontSize: 13, fontWeight: 800, color: '#16a34a' }}>
                            {t({ en: 'TAP TO UPLOAD PHOTO', ko: '📷 사진 업로드하기' })}
                        </span>
                    </button>
                </div>
            )}

            {/* ── 후기 / 평점 단계 (5단계) ── */}
            {phase === 'rate' && (
                <div style={cardStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                        <span style={{ width: 28, height: 28, borderRadius: 10, background: '#f59e0b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, flexShrink: 0 }}>2</span>
                        <span style={{ fontWeight: 800, fontSize: 15, color: '#1e293b' }}>
                            {t({ en: 'Rate Your Experience', ko: '후기 & 평점 남기기' })}
                        </span>
                    </div>
                    <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>
                        {t({ en: 'How was this mission? (5 stars)', ko: '이 미션은 어땠나요? (5단계)' })}
                    </p>

                    {/* 별점 5단계 항목 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {RATE_OPTIONS.map(opt => (
                            <button
                                key={opt.stars}
                                onClick={() => handleRate(opt.stars)}
                                className="active:scale-97 transition-all"
                                style={{
                                    padding: '13px 16px', borderRadius: 14, cursor: 'pointer',
                                    border: selectedRating === opt.stars ? '2px solid #f59e0b' : '1.5px solid #f1f5f9',
                                    background: selectedRating === opt.stars ? '#FFFBEB' : 'white',
                                    fontSize: 14, fontWeight: 700, color: '#475569',
                                    textAlign: 'left', transition: 'all 0.15s',
                                    display: 'flex', alignItems: 'center', gap: 10,
                                }}
                            >
                                <span style={{ fontSize: 18 }}>{opt.stars === 5 ? '🤩' : opt.stars === 4 ? '😊' : opt.stars === 3 ? '😐' : opt.stars === 2 ? '😕' : '😞'}</span>
                                <span>{language === 'ko' ? opt.ko : opt.en}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* ── 완료 상태 ── */}
            {phase === 'done' && (
                <div style={{ ...cardStyle, background: '#F0FDF4', borderColor: '#DCFCE7', textAlign: 'center', padding: '32px 24px' }}>
                    <CheckCircle2 size={48} color="#22c55e" style={{ margin: '0 auto 12px' }} />
                    <h3 style={{ fontWeight: 900, fontSize: 18, color: '#16a34a', margin: 0 }}>
                        {t({ en: '🎉 Mission Completed!', ko: '🎉 미션 완료!' })}
                    </h3>
                    {selectedRating && (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 3, marginTop: 10 }}>
                            {[1, 2, 3, 4, 5].map(i => (
                                <Star key={i} size={16} fill={i <= selectedRating ? '#f59e0b' : '#e2e8f0'} stroke="none" />
                            ))}
                        </div>
                    )}
                    <p style={{ fontSize: 13, color: '#4ade80', marginTop: 10 }}>
                        +{quest.points} EXP {t({ en: 'recorded!', ko: '획득!' })}
                    </p>
                    <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                        <button
                            onClick={() => navigate(-1)}
                            style={{ flex: 1, padding: '12px 0', borderRadius: 14, background: '#22c55e', color: 'white', border: 'none', fontWeight: 800, fontSize: 14, cursor: 'pointer' }}
                            className="active:scale-95 transition-transform"
                        >
                            {t({ en: 'Back', ko: '← 목록으로' })}
                        </button>
                        <button
                            onClick={handleToggleSave}
                            style={{ flex: 1, padding: '12px 0', borderRadius: 14, background: isSaved ? '#FEF2F2' : '#f8fafc', color: isSaved ? '#ef4444' : '#94a3b8', border: `1.5px solid ${isSaved ? '#FCA5A5' : '#e2e8f0'}`, fontWeight: 800, fontSize: 14, cursor: 'pointer' }}
                            className="active:scale-95 transition-transform"
                        >
                            {isSaved ? '❤️ 찜됨' : '🤍 찜하기'}
                        </button>
                    </div>
                </div>
            )}

            {/* ── 완료 축하 오버레이 ── */}
            {showSuccess && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'linear-gradient(135deg,#1A237E,#4F46E5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
                    <div style={{ fontSize: 72, marginBottom: 12 }}>🏆</div>
                    <h2 style={{ fontWeight: 900, fontSize: 30, color: 'white', letterSpacing: '-1px', marginBottom: 6 }}>
                        {t({ en: 'Awesome!', ko: '대단해요!' })}
                    </h2>
                    {selectedRating && (
                        <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
                            {[1, 2, 3, 4, 5].map(i => (
                                <Star key={i} size={20} fill={i <= selectedRating ? '#FFD700' : 'rgba(255,255,255,0.2)'} stroke="none" />
                            ))}
                        </div>
                    )}
                    <p style={{ fontSize: 24, color: '#FFD700', fontWeight: 900, marginBottom: 40 }}>
                        +{quest.points} EXP
                    </p>
                    <button
                        onClick={() => { setShowSuccess(false); navigate('/'); }}
                        style={{ width: '100%', maxWidth: 320, padding: '16px 24px', borderRadius: 18, background: '#FFD700', border: 'none', color: '#1A237E', fontSize: 16, fontWeight: 900, cursor: 'pointer' }}
                        className="active:scale-95 transition-transform"
                    >
                        {t({ en: 'Back to Home', ko: '홈으로 돌아가기' })}
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuestDetail;
