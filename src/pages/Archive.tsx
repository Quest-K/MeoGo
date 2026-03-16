import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { QUESTS } from '../data/quests';
import { Camera, Target, CheckCircle } from 'lucide-react';

const Archive: React.FC = () => {
    const { t } = useLanguage();
    const { user } = useUser();
    const navigate = useNavigate();

    const completedQuests = QUESTS.filter(q => user.completedQuests.includes(q.id));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 16 }}>

            {/* 헤더 */}
            <header style={{ padding: '12px 0 4px' }}>
                <h2 style={{ fontWeight: 900, fontSize: 24, color: '#1e293b', letterSpacing: '-0.5px', margin: 0 }}>
                    {t({ en: '🗂 Travel Archive', ko: '🗂 기록 아카이브' })}
                </h2>
                <p style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600, margin: '6px 0 0' }}>
                    {completedQuests.length} {t({ en: 'memories saved', ko: '개의 여행 기록' })}
                </p>
            </header>

            {completedQuests.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {completedQuests.map(quest => (
                        <button
                            key={quest.id}
                            onClick={() => navigate(`/quest/${quest.id}`)}
                            style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
                            className="active:scale-95 transition-transform"
                        >
                            {/* 이미지 영역 */}
                            <div style={{ position: 'relative', aspectRatio: '4/5', background: '#f1f5f9', overflow: 'hidden' }}>
                                <img src={quest.image} alt={t(quest.title)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                {/* 지역 태그 */}
                                <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', borderRadius: 99, padding: '3px 10px', color: 'white', fontSize: 10, fontWeight: 800, letterSpacing: '0.04em' }}>
                                    #{quest.region}
                                </div>
                                {/* 완료 체크 */}
                                <div style={{ position: 'absolute', top: 8, right: 8, width: 24, height: 24, borderRadius: '50%', background: 'rgba(34,197,94,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <CheckCircle size={14} color="white" />
                                </div>
                                {/* 하단 그라데이션 */}
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }}>
                                    <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10, color: 'white' }}>
                                        <p style={{ fontSize: 12, fontWeight: 800, margin: 0, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{t(quest.title)}</p>
                                        <p style={{ fontSize: 10, opacity: 0.8, margin: '3px 0 0', fontWeight: 600 }}>+{quest.points} XP</p>
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <div style={{ padding: '60px 24px', border: '2px dashed #e2e8f0', borderRadius: 32, textAlign: 'center', marginTop: 12 }}>
                    <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 0 0 8px white' }}>
                        <Camera size={28} color="#cbd5e1" />
                    </div>
                    <h4 style={{ fontWeight: 800, fontSize: 18, color: '#94a3b8', margin: '0 0 8px', letterSpacing: '-0.3px' }}>
                        {t({ en: 'Your Archive is Empty', ko: '아직 기록이 없어요' })}
                    </h4>
                    <p style={{ fontSize: 13, color: '#cbd5e1', margin: '0 0 24px', lineHeight: 1.6 }}>
                        {t({ en: 'Complete missions to fill your travel photo archive!', ko: '미션을 완료하고 여행 사진첩을 채워보세요!' })}
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        style={{ padding: '12px 24px', borderRadius: 14, background: '#1A237E', color: 'white', border: 'none', fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}
                        className="active:scale-95 transition-transform"
                    >
                        <Target size={15} /> {t({ en: 'Find Missions', ko: '미션 찾기' })}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Archive;
