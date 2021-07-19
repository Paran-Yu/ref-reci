### SSAFY-SERVER

###

#### 스켈레톤

```
"실시간 선호도 조사"은 투표를 통해 유저들끼리의 커뮤니티를 형성 할 수있는 가상의
주제로써 이 프로젝트를 통해 React, Node.js, Mysql, Hw등 다양한 기술을
접하는것을 목표로한다.
```

#### directory

```
/env
    - env.json
/middleware
    - db.js

/route
    /base
	    - auth.js
        - base.js
/sql
    /base
	    - base.xml
- README.md
- server.js
```

### description

```
node.js에서 express프레임워크를 사용하여 백엔드를 구축한다.
express에서 제공되는 기능으로
- 라우팅
- 미들웨어
- 에러처리
- 디버깅등으로

심플하지만 강력한 기능을 제공한다.
- https://expressjs.com/

다양한 미들웨어
- https://expressjs.com/en/resources/middleware.html


추가로 DB와 연동하기위해 Sequelize라이브러리를 사용하며
추가로 mybatis-mapper라는 라이브러리를 통해 XML로 된 SQL를 분리하여 사용한다.

- https://sequelize.org/master/
- https://github.com/OldBlackJoe/mybatis-mapper#readme

```

#### run

```
npm install
npm start

- http://localhost:3001

```

### routes

```
GET     http://localhost:3001/
GET     http://localhost:3001/base
GET     http://localhost:3001/base/auth/users/:id

POST    http://localhost:3001/base
PUT     http://localhost:3001/base
DELETE  http://localhost:3001/base
```
