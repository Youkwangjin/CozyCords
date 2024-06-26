package com.example.fullstack.entity.member;


import com.example.fullstack.dto.member.MemberDTO;
import com.example.fullstack.role.UserRole;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Table(name = "user")
/*
    1. Entity 는 일종의 테이블 역할(DB의 테이블을 일종의 자바 객체처럼 사용할 수 있다.)
*/
public class MemberEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_no")
    private Long userNo;

    @Column(name = "user_id", unique = true, nullable = false, length = 50)
    private String userId;

    @Column(name = "user_pwd", nullable = false)
    private String userPwd;

    @Column(name = "user_name", nullable = false, length = 10)
    private String userName;

    @Column(name = "user_age", nullable = false, length = 5)
    private int userAge;

    @Column(name = "user_gender", nullable = false, length = 5)
    private String userGender;

    @Column(name = "user_tel", nullable = false, length = 20)
    private String userTel;

    @Column(name = "user_height", nullable = false, length = 5)
    private int userHeight;

    @Column(name = "user_weight", nullable = false, length = 5)
    private int userWeight;

    @Column(name = "user_shoe_size", nullable = false, length = 5)
    private String userShoeSize;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_role")
    private UserRole userRole;

    @CreationTimestamp
    @Column(name = "user_created", updatable = false)
    private LocalDateTime userCreated;

    @UpdateTimestamp
    @Column(name = "user_updated")
    private LocalDateTime userUpdated;

    public static MemberEntity toMemberEntity(MemberDTO memberDTO) {
        return MemberEntity.builder()
                .userId(memberDTO.getUserId())
                .userPwd(memberDTO.getUserPwd())
                .userName(memberDTO.getUserName())
                .userAge(memberDTO.getUserAge())
                .userGender(memberDTO.getUserGender())
                .userTel(memberDTO.getUserTel())
                .userHeight(memberDTO.getUserHeight())
                .userWeight(memberDTO.getUserWeight())
                .userShoeSize(memberDTO.getUserShoeSize())
                .build();
    }
}
