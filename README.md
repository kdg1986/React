프로젝트 혼자 선행개발 하며 리액트 검색, 상세 ( 저장 등 ) 템플릿 소스 구현하며 지속적으로 업로드 예정

1. 설명

- React 구조만 선 업로드
- 이벤트 문제로 Npm달력가져와 bundle파일 내용만 수정하여 적용 ( 현재는 사용하고있지 않음 )
- Npm Spinner 로딩 패턴 사용
- React Redux, Router 사용
- Npm watch 사용으로 실시간 번들링 하여 개발
- 기존 Spring + jsp( jstl , jquery 등등 ) 페이지를 SpringBoot RestApi + React웹으로 전환
- 기능과 내용이 많은 페이지 기준으로 업로드 할 예정


2. 구현한 기능에대한 설명 ( 당장 생각나는것만 우선 기록합니다. )

- 현재 페이지 새로고침 시 입력파라미터 유지 등 기존기능 유지
- 검색이후 페이징시 현재 입력한 검색 조건에 영향을 받지않고 검색했던 데이터 기준으로 검색하도록 기존기능 유지
- 페이지 진입시 검색조건에 대한 파라미터가 있을경우 자동으로 세팅을 할수있도록 기존기능 유지
- 브라우저 이전페이지 다음페이지 기능 사용시 각 히스토리마다 검색했었던 검색조건 나오도록 기존 기능 유지
- 상세페이지의 경우 새창/화면 이동 둘다 가능하도록 하도록 개발
- 상세피이지는 페이지 전환 및 새창으로 진입 가능한 페이지로 구현
- 페이지 10 20... 개씩 보기 기능 추가

* 위 기능외 기타 기능들을 화면마다 수정할 필요없이 보여주는 항목 변경과 API 호출값 변경만으로 손쉽게 개발 할 수 있도록 작업

3. 기타
- 검색조건 필드는 랜더링 대상이 아니게 개발하였습니다. state값을 사용하지않고 ref로 기능을 구현하였습니다.

- 기본적으로 검색조건 입력시 화면 랜더링과 데이터를 가져와서 보여주는 형식이었다면 문제없었을 부분인데 사용자가 입력하고 버튼을 누르는 시점을 히스토리로 가지고 있어야 한다던가, 특정 버튼에 대한 기능이 꼭! state에 내용을 가지고 행동하지 않아야 가능한 기능등 여러가지 요인이 많았습니다.

- 화면이 처음 뜰때, 새로고침할때, 다른페이지에서 돌아오거나 갈때, 특정한 기준점을 잡기위해 여러 방법으로 개발해보았으나 기능들이 크로스하게 되어 로직이 꼬임이 발생하여 잡다한 기능을 제거하고 LifeCycle API 이용하여 현재 버전까지 왔습니다.

- 위 기능들을 맞추다보니 리스트에서 selectBox값 변경시 다른 selectBox값 내용을 갱신할때 랜더링이 들어가게되면 기존 공통기능들에 영향이 생기는 문제가 발생 하였습니다. 공통기능에 문제가 아니더래도 페이지 앞뒤 혹은 다른페이지에서 돌아오는경우 등 시점관련하여 기능들이 많이 꼬임이 발생 하였고 시점을 캐치하는 부분에서 또 라이프사이클에 문제가 생겨 정말 어쩔수 없이 랜더링을 안하는쪽으로 사용하지 말아야할 셀렉터 이용하여 엘리먼트 변경하여 사용하도록 작업

변경이 있을시 상세한 히스토리 명세와 함께 리액트 관련 소스만 업로드 후 점차 관련소스 업로드 할 예정입니다.
