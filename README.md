# poemable
공유시집 제작 토이프로젝트

### 22.04.18

프로젝트의 절반 정도를 구현하였다.

DB 연동 및 배치, 라우터 설정, 슬라이드 구현 등등의 기능 구현을 마쳤고,

해야할 것은 우선적으로는 input값 동적 할당, 수정 및 삭제 기능 구현, Admin창 구현, 소개 페이지 추가 제작 등이 있다.

이것을 마무리한 뒤에는 Fullstack serverless에 대한 개념을 얼추 정리하고, Node.js 공부를 시작할 예정이다.

추가적으로 deno에 대한 궁금증이 생겨 deno도 찾아 볼 예정이다.

### 22.04.19

금일은 gitpod 사용시간 문제로 잠시 코드 작성을 접고
Node.js 책을 들었다.

디자인시스템과 인프라에 대한 관심이 생겨서 DevOps나 서버 개발에 대한 정보를 찾아보는 중이다.

### 22.04.20

전역 context로 user를 가져오는 기능을 추가하였다. ContextAPI를 처음 사용해보는 터라 미숙했지만 잘 마무리되어 다행이다.
내일 ContextAPI에 대한 사용법을 velog에 내 입맛대로 정리해 글을 게시할 예정이다.

### 22.04.21

오늘 node.js 책을 읽으면서 노드의 기본 툴들에 대해 정리하고 공부했다. 라이브러리 없이 서버를 제작하는 방법부터 노드의 기본에 대해
다질 수 있었다. 이후에 책을 통해 연습한 것을 통해 테스트 코드나 배포와 같은 내용을 다룰 예정이다.

### 22.04.25

개인 프로필과 프로필에서 자신의 글을 삭제할 수 있는 기능을 구현하였다. 이제 수정 기능을 포함하고, 수정 시에 모달창이 나와 수정한 내용을 submit할 수 있도록 만들자.

### 22.04.26

개인 프로필에서 업데이트를 할 수 있도록 모달창을 구현하였다. 또한 작성 페이지에서 아무 작성 내용이 없으면 창을 닫도록 설정했다. 
CRUD 구현을 마쳤고, 디테일들과 코드 정리, 미디어 쿼리 구현, 소개 페이지 작성이 남았다.
파이팅!!

### 22.04.27

뭐가 문제인걸까... 슬라이드를 구현하는 데 있어 무한 렌더링이 발생한다. if 문 두개를 왔다갔다 하는데, 왜 그런 것이며 어떻게 고칠 수 있을까?
그리고 소개 페이지를 어떻게 작성할지 적어두도록 하자.

### 22.04.28

POEMABLE 소개 페이지 작성을 시작했다. figma를 이용해 작업중이고, 누구나 시를 부담없이 쓰고 자신의 개성 표출의 좋은 수단이 되었으면 하는 프로젝트의 취지를
최대한 담을 예정이다.

### 22.04.29

소개 페이지 작성을 완료하였다. https://www.figma.com/file/PZnsIr34fm5oHyDMMfjCAV/Untitled
내일 소개 페이지 퍼블리싱, 라우터 연결을 하고 랜딩 페이지를 조정할 예정이다.

### 22.04.30

소게 페이지 구현과 프로필 페이지 간단한 디자인을 마쳤다. 또한 라우터 연결도 마무리하였다.
이제 해야할 일은 스크롤 구현 어떻게 할지, 텍스트 입력 시 글자 자동 조절을 구현할 것인지에 대한 내용이다.

### 22.05.01

배포를 위해 백엔드를 삭제하고 다시 구축했다. 만료된 API KEY가 없다고 이상한 오류가 자꾸 나서 어쩔 수 없는 선택이었다. 
https://master.d6zb57w1ymrb9.amplifyapp.com 여기이다.
다만 문제는 아직 최적화가 진행되지 않은 것인지 컴퓨터에서는 잘 작동하는 z-index가 모바일에서는 계속 잘못 적용된다.
다시 로딩했을 때 잘 되는 경우가 가끔 있는 것을 보면,,, 무엇이 문제인지 다시 파악해봐야한다... 잘 모르겠ㅇㅓ..

### 22.05.04

Poemable 프로젝트에 대한 글을 velog에 업로드하였다. 이제 피드백을 받고 업데이트를 꾸준히 진행하는 것이 남은 과제이다.
다른 공부도 병행하겠지만, 

### 22.06.04 

랜딩 페이지에서 시 디스플레이하는 코드 수정.

### 22.06.05

기본적인 수정 사항들을 마저 수정했다. 재 배포 예정.