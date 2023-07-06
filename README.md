# 자연을 키우다: 깃헙 기여도 & 커밋 확인

## 개요

GitHub 커밋과 기여도 개수를 표시하도록 설계되어 개발의 동기부여를 합니다. 전반적으로 우리 애플리케이션은 GitHub 커밋을 추적하고 리포지토리 변경 사항을 최신 상태로 유지하기 위한 사용하기 쉬운 인터페이스를 제공합니다. 개발자, 프로젝트 관리자 또는 호기심 많은 사용자이든 관계없이 GitHub 활동을 쉽게 모니터링하고 개발의 동기부여를 할 수 있습니다.
[여기](https://chrome.google.com/webstore/detail/%EC%9E%90%EC%97%B0%EC%9D%84-%ED%82%A4%EC%9A%B0%EB%8B%A4-%EA%B9%83%ED%97%99-%EA%B8%B0%EC%97%AC%EB%8F%84-%EC%BB%A4%EB%B0%8B-%ED%99%95%EC%9D%B8/bcgnmmmgdnlgbadndlmdglmeadgdogeb?hl=ko)를 눌러서 크롬에 추가하세요!

## 💡 사용법

크롬 확장프로그램을 사용하려면 다음 단계를 따르십시오.

1. 크롬 확장프로그램에서 애플리케이션을 엽니다.
2. 커밋을 추적하려는 GitHub 계정의 사용자 이름을 입력합니다.
3. 확장 프로그램은 최근 10일간의 커밋과 기여도 개수를 목록으로 보여주고, 10일 간의 총 커밋과 기여도의 개수를 보여줍니다.
4. 안녕 깃헙 식잡사, @username을 클릭하면 깃헙 프로필로 이동합니다.

** 처음 아이디를 설정하시고 새로고침을 눌러주세요. **

## ✅ 업데이트 사항

v0.1.0 2023. 3. 24

- 첫 릴리즈

v0.1.1 2023.4.14

- 팝업 창에 영문을 추가하였습니다.
- 처음 아이디를 설정한 이후 새로고침을 안 해도 업데이트되게 수정하였습니다.
- 처음 아이디를 설정 안 한 상태에서 "안녕 깃헙 식집사"를 클릭 시 github.com으로 이동하는 것이 아닌 아이디를 설정할 수 있는 페이지로 이동하게 하였습니다.

## 개발 팀

김영민 ([99mini](https://github.com/99mini)) 개인 프로젝트

## 개발 환경/도구

0. 공통
   - IDE: VSCode
   - Lang: Vanilla JS
   - 형상관리: Git, Github
1. FE
   - Lang/Framework: Vanilla JS, HTML5, CSS
   - API: [Chrome Extension API](https://developer.chrome.com/docs/extensions/)
2. BE
   - Lang/Framework: nodeJS v16.16.0, express, cheerio
