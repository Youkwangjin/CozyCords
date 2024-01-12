# 📋 Spring Securiyt + JWT System Principle
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

# 📋 System Architecture
![image](https://github.com/Youkwangjin/FullStack/assets/117841714/4b078f02-bc52-48d9-a7bf-21669a725abe)


