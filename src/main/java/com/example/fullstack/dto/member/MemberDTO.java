package com.example.fullstack.dto.member;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor // 기본 생성자를 자동으로 만들어준다.
@AllArgsConstructor
@ToString
public class MemberDTO {
    /*
        1. React에서 작성한 name필드명과 Spring에서 작성한 DTO필드가 동일해야 한다.
        2. 동일하다면 자동적으로 스프링이 DTO 객체를 생성해서 Setter 메서드를 각각 호출하면서 React에서 작성한 값을 알아서 담아준다.
        3. private으로 필드를 설정한 이유는 Getter, Setter 메서드들은 이용해서 접근하고 사용가능 하도록 하기 위해 적었음.
     */
    private String userId;
    private String userPwd;
    private String userName;
    private String userNickname;
    private String userAge;
    private String userGender;
    private String userTel;
    private String userAddress;
    private String userCreated;
    private String userUpdated;
}
