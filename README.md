# 🎉 개성 있는 스타일을 공유할 수 있는 플랫폼 개발
- 프로젝트명: CozyCords
- 총 개발기간 : 2024/01/02 ~ ing
## 📌목차
- [프로젝트 개요](#-프로젝트-개요)
- [Project Architecture](#-project-architecture)
- [ERD](#-erd)
- [개발환경](#-개발환경)
- [Frontend Library](#-frontend-library)
- [Backend Library](#-backend-library)
- [프로젝트 주요 기능 및 구현 세부사항](#-프로젝트-주요-기능-및-구현-세부사항)
- [미래 개선 방안](#-미래-개선-방안)
- [참조 사이트](#-참조-사이트)


## 📝 프로젝트 개요

## 🌐 Project Architecture
![image](https://github.com/Youkwangjin/FullStack/assets/117841714/4b078f02-bc52-48d9-a7bf-21669a725abe)

## 🏬 ERD
- 작성중..

## 🛠 개발환경 

📌 **Front-end** 

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">

📌 **Back-end**

<img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=Spring Boot&logoColor=white"> <img src="https://img.shields.io/badge/JPA-2E5E82?style=for-the-badge&logo=JPA&logoColor=white"> <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">

📌 **DataBase**

<img src="https://img.shields.io/badge/mariadb-003545?style=for-the-badge&logo=mariadb&logoColor=white"> <img src="https://img.shields.io/badge/amazonrds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white">

📌 **Development Tool** 

<img src="https://img.shields.io/badge/intellijidea-000000?style=for-the-badge&logo=intellijidea&logoColor=white">

## 🔧 Frontend Library

| Library                          | Description                                                 |
|----------------------------------|-------------------------------------------------------------|
| axios                            | HTTP 클라이언트, React에서 REST API 호출을 위해 사용          |
| React                            | 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리        |
| react-router-dom                 | SPA(Single Page Application) 라우팅을 위해 사용              |
| redux                            | 애플리케이션의 상태 관리를 위한 JavaScript 라이브러리          |
| react-redux                      | React와 Redux를 연결하기 위한 라이브러리                      |
| redux-thunk                      | 비동기 작업을 처리하기 위해 Redux 미들웨어로 사용              |
| styled-components                | CSS-in-JS 라이브러리, 컴포넌트 기반의 스타일링을 위해 사용     |
| material-ui                      | React 컴포넌트 라이브러리, Material Design을 따르는 UI        |

## 🔧 Backend Library

| Library                          | Description                                                 |
|----------------------------------|-------------------------------------------------------------|
| spring-boot-starter-web          | 웹 애플리케이션 개발을 위한 스프링 부트 스타터 (MVC)            |
| spring-boot-starter-data-jpa     | JPA를 사용하여 데이터베이스 작업을 쉽게 처리하기 위한 스타터     |
| spring-boot-starter-security     | 인증 및 권한 부여를 위한 스프링 기반의 보안 프레임워크          |
| spring security test             | 스프링 시큐리티 관련 테스트를 위한 라이브러리                   |
| jjwt-api                         | JWT (JSON Web Tokens) 생성 및 검증을 위해 사용                |
| lombok                           | 코드 간소화를 위해 Getter, Setter, Builder 등 자동 생성        |
| mariadb-java-client              | MariaDB 데이터베이스 연결을 위한 JDBC 드라이버                 |
| spring-boot-starter-test         | 스프링 부트 기반 테스트를 위한 스타터 키트                     |
| swagger-ui                       | REST API 문서화를 위한 Swagger UI 라이브러리                  |
| springfox-swagger2               | Spring Boot 프로젝트에서 Swagger 2를 구현하기 위한 라이브러리  |
| AWS SDK for Java                 | AWS 서비스를 Java 애플리케이션에서 사용하기 위한 SDK            |
| spring-cloud-aws                 | AWS 서비스를 쉽게 통합할 수 있도록 지원하는 라이브러리          |


## ✨ 프로젝트 주요 기능 및 구현 세부사항

## 😲 미래 개선 방안

## ✅ 참조 사이트

## 🔒 Spring Security + Json Web Token(JWT)
![image](https://github.com/Youkwangjin/FullStack/assets/117841714/830c3780-ed43-40f4-808f-1e87e4616623)

**HTTP Request** : 사용자가 서버에 JWT를 포함해서 요청을 보냅니다.

**JwtAuthFilter** : Spring Security는 JwtAuthFilter를 사용하여 들어오는 요청에서 JWT를 검사합니다.

**Check JWT Token** : JWT의 유효성을 검사합니다. 이 때, JWT가 올바른지 확인하는 로직이 실행됩니다.

**Invalid JWT Token** : 제공된 JWT가 유효하지 않으면, 사용자는 오류 메시지와 함께 거부됩니다.

**UserDetailsService** : 유효한 JWT가 확인되면, 사용자의 상세 정보를 가져오기 위해 UserDetailsService가 호출됩니다. 이 서비스는 사용자 정보를 데이터베이스(MariaDB)에서 검색합니다.

**Missing JWT / User does not exist** : JWT가 누락되었거나 사용자가 존재하지 않는 경우, 403 Forbidden 응답이 반환됩니다.

**Update the SecurityContextHolder** : 사용자의 상세 정보가 성공적으로 검색되면, SecurityContextHolder가 업데이트되어 사용자의 인증 정보를 Spring Security 컨텍스트에 저장합니다.

**DispatcherServlet** : 이후 요청은 Spring의 DispatcherServlet을 거쳐 적절한 컨트롤러로 라우팅됩니다.

**Controller** : 요청은 마지막으로 컨트롤러에 도달하여 실제 비즈니스 로직을 처리합니다.

**성공적인 인증의 경우** : HTTP 200: 모든 인증 및 권한 부여 과정이 성공적으로 완료되면, 서버는 HTTP 200 상태 코드와 함께 요청된 JSON 데이터를 반환합니다.
