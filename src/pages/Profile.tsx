import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { QUESTS } from '../data/quests';
import { useNavigate } from 'react-router-dom';
import { Award, ChevronRight, Target, LogOut, Flame, CalendarCheck, Gift } from 'lucide-react';

// ── 레벨 메타 ─────────────────────────────────────────────────────────────
const LEVEL_INFO: Record<string, { emoji: string; color: string; ko: string }> = {
    'Stranger': { emoji: '🌱', color: '#94a3b8', ko: '낯선 여행자' },
    'Tourist': { emoji: '✈️', color: '#60a5fa', ko: '관광객' },
    'Explorer': { emoji: '🧭', color: '#34d399', ko: '탐험가' },
    'Local Friend': { emoji: '🙌', color: '#f59e0b', ko: '현지 친구' },
    'Korea Master': { emoji: '👑', color: '#a78bfa', ko: '코리아 마스터' },
};

// ── 출석 7일 배지 ─────────────────────────────────────────────────────────
const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const Profile: React.FC = () => {
    const { t, language } = useLanguage();
    const { user, level, levelProgress, checkIn } = useUser();
    const navigate = useNavigate();

    const [checkInDone, setCheckInDone] = useState(false);
    const [showCheckInAnim, setShowCheckInAnim] = useState(false);

    const today = new Date().toISOString().split('T')[0];
    const alreadyCheckedIn = user.lastCheckIn === today;

    const completedDetails = QUESTS.filter(q => user.completedQuests.includes(q.id));

    const getPersonality = () => {
        if (completedDetails.length === 0) return { tag: t({ en: '🗺 Adventurer', ko: '🗺 탐험가' }), sub: '' };
        const counts = completedDetails.reduce((acc, q) => {
            acc[q.category] = (acc[q.category] || 0) + 1; return acc;
        }, {} as Record<string, number>);
        const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
        if (top === 'Food') return { tag: t({ en: '🍱 Hungry Gourmet', ko: '🍱 배고픈 미식가' }), sub: '' };
        if (top === 'Hot Spot') return { tag: t({ en: '📸 Photo Hunter', ko: '📸 포토 헌터' }), sub: '' };
        if (top === 'Activity') return { tag: t({ en: '🏃 Action Hero', ko: '🏃 액션 히어로' }), sub: '' };
        return { tag: t({ en: '🏠 Culture Master', ko: '🏠 문화 마스터' }), sub: '' };
    };

    const personality = getPersonality();
    const levelMeta = LEVEL_INFO[level] ?? LEVEL_INFO['Stranger'];

    const handleCheckIn = () => {
        if (alreadyCheckedIn || checkInDone) return;
        checkIn();
        setCheckInDone(true);
        setShowCheckInAnim(true);
        setTimeout(() => setShowCheckInAnim(false), 2500);
    };

    // 이번 주 7일 스트릭 계산
    const todayDate = new Date();
    const weekDots = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(todayDate);
        d.setDate(d.getDate() - (6 - i));
        const dayIdx = d.getDay();
        // 스트릭 범위 내이면 완료로 표시
        const daysAgo = 6 - i;
        const filled = daysAgo < user.checkInStreak;
        const isToday = i === 6;
        return { label: WEEK_DAYS[dayIdx], filled, isToday };
    });

    const card: React.CSSProperties = {
        background: 'white', borderRadius: 20, padding: '18px 16px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 8 }}>

            {/* ── 프로필 헤더 ── */}
            <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '20px 0 8px', textAlign: 'center' }}>
                <div style={{ width: 84, height: 84, borderRadius: '50%', overflow: 'hidden', border: '4px solid white', boxShadow: '0 4px 20px rgba(0,0,0,0.12)', background: '#f1f5f9' }}>
                    <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.nickname}`}
                        alt="Avatar"
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
                <div>
                    <h2 style={{ fontWeight: 900, fontSize: 20, color: '#1e293b', letterSpacing: '-0.5px', margin: 0 }}>
                        {user.nickname}
                    </h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                        <span style={{ padding: '5px 12px', borderRadius: 99, fontSize: 12, fontWeight: 800, background: `${levelMeta.color}18`, color: levelMeta.color }}>
                            {levelMeta.emoji} {language === 'ko' ? levelMeta.ko : level}
                        </span>
                        <span style={{ padding: '5px 12px', borderRadius: 99, fontSize: 12, fontWeight: 700, background: '#fff7ed', color: '#f59e0b' }}>
                            {personality.tag}
                        </span>
                    </div>
                </div>
            </section>

            {/* ── EXP 레벨 카드 ── */}
            <section style={card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Award size={18} color="#1A237E" />
                        <span style={{ fontWeight: 800, fontSize: 14, color: '#1e293b' }}>
                            {t({ en: 'Level Progress', ko: '레벨 성장도' })}
                        </span>
                    </div>
                    <span style={{ fontWeight: 900, fontSize: 18, color: '#1A237E' }}>
                        {user.exp.toLocaleString()}
                        <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, marginLeft: 3 }}>EXP</span>
                    </span>
                </div>
                <div style={{ height: 10, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden', padding: 2 }}>
                    <div style={{ height: '100%', width: `${levelProgress}%`, background: 'linear-gradient(to right, #1A237E, #4F46E5)', borderRadius: 99, transition: 'width 1s ease' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, fontWeight: 700, color: '#94a3b8' }}>
                    <span>🏆 {t({ en: `${completedDetails.length} Missions Done`, ko: `${completedDetails.length}개 미션 완료` })}</span>
                    <span>{Math.round(levelProgress)}% → Next Level</span>
                </div>
            </section>

            {/* ── 출석체크 카드 ── */}
            <section style={{ ...card, borderColor: alreadyCheckedIn || checkInDone ? '#DCFCE7' : '#EEF2FF', position: 'relative', overflow: 'hidden' }}>
                {/* 배경 장식 */}
                <div style={{ position: 'absolute', right: -20, top: -20, width: 100, height: 100, borderRadius: '50%', background: `${alreadyCheckedIn || checkInDone ? '#22c55e' : '#1A237E'}08` }} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <CalendarCheck size={18} color={alreadyCheckedIn || checkInDone ? '#22c55e' : '#1A237E'} />
                        <span style={{ fontWeight: 800, fontSize: 14, color: '#1e293b' }}>
                            {t({ en: 'Daily Check-in', ko: '출석체크' })}
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Flame size={14} color="#f59e0b" />
                        <span style={{ fontWeight: 900, fontSize: 15, color: '#f59e0b' }}>{user.checkInStreak}</span>
                        <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>
                            {t({ en: 'day streak', ko: '일 연속' })}
                        </span>
                    </div>
                </div>

                {/* 7일 도트 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                    {weekDots.map((dot, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: '50%',
                                background: dot.filled
                                    ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                                    : dot.isToday && (alreadyCheckedIn || checkInDone)
                                        ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                                        : dot.isToday
                                            ? '#EEF2FF'
                                            : '#f1f5f9',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 14,
                                border: dot.isToday ? `2px solid ${alreadyCheckedIn || checkInDone ? '#22c55e' : '#1A237E'}` : 'none',
                                boxShadow: (dot.filled || (dot.isToday && (alreadyCheckedIn || checkInDone))) ? '0 2px 8px rgba(34,197,94,0.3)' : 'none',
                            }}>
                                {dot.filled || (dot.isToday && (alreadyCheckedIn || checkInDone)) ? '✓' : dot.isToday ? '📍' : ''}
                            </div>
                            <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700 }}>{dot.label}</span>
                        </div>
                    ))}
                </div>

                {/* 7일 보너스 안내 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, padding: '8px 12px', background: '#FFF7ED', borderRadius: 10 }}>
                    <Gift size={13} color="#f59e0b" />
                    <span style={{ fontSize: 11, color: '#f59e0b', fontWeight: 700 }}>
                        {t({ en: '7-day streak bonus: +50 EXP', ko: '7일 연속 보너스: +50 EXP' })}
                        {' '}({7 - (user.checkInStreak % 7)}{t({ en: ' days left', ko: '일 남음' })})
                    </span>
                </div>

                {/* 체크인 버튼 */}
                <button
                    onClick={handleCheckIn}
                    disabled={alreadyCheckedIn || checkInDone}
                    style={{
                        width: '100%', padding: '14px 0', borderRadius: 16, border: 'none', cursor: alreadyCheckedIn || checkInDone ? 'not-allowed' : 'pointer',
                        background: alreadyCheckedIn || checkInDone
                            ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                            : 'linear-gradient(135deg, #1A237E, #4F46E5)',
                        color: 'white', fontSize: 14, fontWeight: 900,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        opacity: 1, transition: 'all 0.2s',
                        boxShadow: alreadyCheckedIn || checkInDone ? '0 4px 16px rgba(34,197,94,0.25)' : '0 4px 16px rgba(26,35,126,0.2)',
                        letterSpacing: '-0.2px',
                    }}
                    className="active:scale-97 transition-transform"
                >
                    {alreadyCheckedIn || checkInDone
                        ? `✓ ${t({ en: 'Checked In! +10 EXP', ko: '출석 완료! +10 EXP' })}`
                        : `📅 ${t({ en: 'Check In Today (+10 EXP)', ko: '오늘 출석하기 (+10 EXP)' })}`
                    }
                </button>

                {/* 체크인 성공 파티클 */}
                {showCheckInAnim && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(2px)', borderRadius: 20 }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 40 }}>🎉</div>
                            <p style={{ fontWeight: 900, fontSize: 16, color: '#16a34a', margin: 0 }}>+10 EXP!</p>
                        </div>
                    </div>
                )}
            </section>

            {/* ── 미션 완료 기록 ── */}
            <section>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, padding: '0 2px' }}>
                    <span style={{ fontWeight: 800, fontSize: 16, color: '#1e293b', letterSpacing: '-0.3px' }}>
                        {t({ en: 'Mission History', ko: '미션 완료 기록' })}
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#1A237E', display: 'flex', alignItems: 'center', gap: 3 }}>
                        {completedDetails.length} <ChevronRight size={14} />
                    </span>
                </div>

                {completedDetails.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        {completedDetails.map(quest => (
                            <button
                                key={quest.id}
                                onClick={() => navigate(`/quest/${quest.id}`)}
                                style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                                className="active:scale-95 transition-transform"
                            >
                                <div style={{ aspectRatio: '1', background: '#f1f5f9', position: 'relative', overflow: 'hidden' }}>
                                    <img src={quest.image} alt={quest.title.en} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(26,35,126,0.85)', borderRadius: 7, padding: '2px 6px', fontSize: 9, fontWeight: 900, color: 'white' }}>
                                        +{quest.points} XP
                                    </div>
                                </div>
                                <div style={{ padding: '8px 10px', background: 'white' }}>
                                    <p style={{ fontWeight: 800, fontSize: 11, color: '#1e293b', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', margin: 0 }}>
                                        {t(quest.title)}
                                    </p>
                                    <p style={{ fontSize: 10, color: '#94a3b8', margin: '2px 0 0', fontWeight: 600 }}>
                                        {quest.district ? `#${quest.district}` : quest.region}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div style={{ padding: '36px 24px', border: '2px dashed #e2e8f0', borderRadius: 24, textAlign: 'center' }}>
                        <div style={{ width: 52, height: 52, background: '#f8fafc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                            <Target size={22} color="#cbd5e1" />
                        </div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', margin: 0 }}>
                            {t({ en: 'No missions yet', ko: '아직 완료한 미션이 없어요' })}
                        </p>
                        <p style={{ fontSize: 11, color: '#cbd5e1', marginTop: 4 }}>
                            {t({ en: 'Start your adventure!', ko: '첫 번째 미션을 시작해보세요!' })}
                        </p>
                    </div>
                )}
            </section>

            {/* ── 설정 & 로그아웃 ── */}
            <section style={card}>
                <h3 style={{ fontWeight: 800, fontSize: 12, color: '#94a3b8', letterSpacing: '0.08em', margin: '0 0 12px' }}>
                    {t({ en: 'SETTINGS', ko: '설정' })}
                </h3>
                {[
                    { label: t({ en: 'Travel Style', ko: '여행 스타일' }), val: personality.tag },
                    { label: t({ en: 'Streak', ko: '출석 스트릭' }), val: `🔥 ${user.checkInStreak}${t({ en: ' days', ko: '일' })}` },
                ].map(item => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>{item.label}</span>
                        <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>{item.val}</span>
                    </div>
                ))}
            </section>

            <button
                style={{ width: '100%', padding: '14px 0', borderRadius: 16, border: '1.5px solid #FEE2E2', background: '#FFF5F5', color: '#D32F2F', fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}
                className="active:scale-97 transition-transform"
            >
                <LogOut size={15} /> {t({ en: 'Log Out', ko: '로그아웃' })}
            </button>
        </div>
    );
};

export default Profile;
