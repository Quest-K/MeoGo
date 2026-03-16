# Project Structure: Quest K App

## 📁 Root Directory
- `src/`: 메인 소스 코드 폴더
- `public/`: 정적 리소스 (폰트, 이미지 등)
- `dist/`: 빌드 결과물 (배포용)
- `node_modules/`: 외부 라이브러리 의존성
- `package.json`: 프로젝트 설정 및 라이브러리 목록
- `vite.config.ts`: Vite 빌드 설정
- `tsconfig.json`: TypeScript 설정
- `INSTRUCTIONS.md`: 프로젝트 요구사항 및 설계 원칙
- `STATUS_REPORT.md`: 진행 현황 보고서
- `structure.md`: (본 문서) 전체 파일 구조 정의서
- `HISTORY.md`: 프로젝트 작업 이력 (시간순)

## 📂 `src/` 내부 구조
- `assets/`: 앱에서 사용하는 로고, 일러스트 등 정적 이미지
- `components/`: 재사용 가능한 UI 컴포넌트
  - `Layout.tsx`: 상단 헤더 및 하단 네비게이션을 포함한 공통 레이아웃
- `context/`: 전역 상태 관리
  - `LanguageContext.tsx`: 한국어/영어 전환 시스템
  - `UserContext.tsx`: 경험치, 레벨, 완료한 미션 등 사용자 데이터 관리
- `data/`: 정적 데이터 관리
  - `quests.ts`: 지역(REGIONS) 및 미션(QUESTS) 데이터 정의
- `pages/`: 화면 단위 페이지
  - `Home.tsx`: 메인 대시보드 및 지역 선택 페이지
  - `RegionDetail.tsx`: 지역별 미션 목록 페이지
  - `QuestDetail.tsx`: 미션 상세 진행 (사진 인증 + 후기 작성) 페이지
  - `Profile.tsx`: 사용자 정보 및 마이 퀘스트북 페이지
  - `Archive.tsx`: 배지 및 업적 보관함 페이지
- `App.tsx`: 라우팅(React Router) 설정 및 앱 엔트리
- `index.css`: Tailwind CSS v4 기반의 디자인 시스템 정의
- `main.tsx`: React 앱 시작점
