import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserLevel = 'Stranger' | 'Tourist' | 'Explorer' | 'Local Friend' | 'Korea Master';

interface UserState {
    nickname: string;
    exp: number;
    completedQuests: string[];
    savedQuests: string[];       // ❤️ 찜한 미션 ID 목록
    checkInStreak: number;
    lastCheckIn: string | null;
}

interface UserContextType {
    user: UserState;
    level: UserLevel;
    levelProgress: number;
    addExp: (amount: number) => void;
    completeQuest: (id: string, exp: number) => void;
    toggleSave: (id: string) => void;
    checkIn: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const LEVEL_THRESHOLDS = {
    'Stranger': 0,
    'Tourist': 501,
    'Explorer': 1501,
    'Local Friend': 3501,
    'Korea Master': 7001
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserState>(() => {
        const saved = localStorage.getItem('user_state');
        const parsed = saved ? JSON.parse(saved) : null;
        return parsed ?? {
            nickname: 'Traveler',
            exp: 0,
            completedQuests: [],
            savedQuests: [],
            checkInStreak: 0,
            lastCheckIn: null
        };
    });

    // 기존 데이터에 savedQuests 없는 경우 마이그레이션
    React.useEffect(() => {
        if (!user.savedQuests) {
            setUser(prev => ({ ...prev, savedQuests: [] }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        localStorage.setItem('user_state', JSON.stringify(user));
    }, [user]);

    const getLevel = (exp: number): UserLevel => {
        if (exp >= LEVEL_THRESHOLDS['Korea Master']) return 'Korea Master';
        if (exp >= LEVEL_THRESHOLDS['Local Friend']) return 'Local Friend';
        if (exp >= LEVEL_THRESHOLDS['Explorer']) return 'Explorer';
        if (exp >= LEVEL_THRESHOLDS['Tourist']) return 'Tourist';
        return 'Stranger';
    };

    const getLevelProgress = (exp: number): number => {
        const currentLevel = getLevel(exp);
        const thresholds = Object.values(LEVEL_THRESHOLDS);
        const currentIndex = Object.keys(LEVEL_THRESHOLDS).indexOf(currentLevel);

        if (currentIndex === thresholds.length - 1) return 100;

        const min = thresholds[currentIndex];
        const max = thresholds[currentIndex + 1];
        return Math.min(100, Math.max(0, ((exp - min) / (max - min)) * 100));
    };

    const addExp = (amount: number) => {
        setUser(prev => ({ ...prev, exp: prev.exp + amount }));
    };

    const toggleSave = (id: string) => {
        setUser(prev => {
            const already = (prev.savedQuests ?? []).includes(id);
            return {
                ...prev,
                savedQuests: already
                    ? (prev.savedQuests ?? []).filter(q => q !== id)
                    : [...(prev.savedQuests ?? []), id],
            };
        });
    };

    const completeQuest = (id: string, exp: number) => {
        setUser(prev => {
            if (prev.completedQuests.includes(id)) return prev;
            return {
                ...prev,
                exp: prev.exp + exp,
                completedQuests: [...prev.completedQuests, id]
            };
        });
    };

    const checkIn = () => {
        const today = new Date().toISOString().split('T')[0];
        if (user.lastCheckIn === today) return;

        setUser(prev => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            const newStreak = prev.lastCheckIn === yesterdayStr ? prev.checkInStreak + 1 : 1;
            const streakBonus = newStreak % 7 === 0 ? 50 : 0;

            return {
                ...prev,
                lastCheckIn: today,
                checkInStreak: newStreak,
                exp: prev.exp + 10 + streakBonus
            };
        });
    };

    return (
        <UserContext.Provider value={{
            user,
            level: getLevel(user.exp),
            levelProgress: getLevelProgress(user.exp),
            addExp,
            completeQuest,
            toggleSave,
            checkIn
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within UserProvider');
    return context;
};
