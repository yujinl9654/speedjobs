package com.jobseek.speedjobs.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobseek.speedjobs.config.auth.LoginUser;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.user.UserInfoResponse;
import com.jobseek.speedjobs.dto.user.UserSaveRequest;
import com.jobseek.speedjobs.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Api(tags = {"1. User"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

	private final UserService userService;

	@ApiOperation(value = "회원가입", notes = "개인 회원, 기업 회원 모두 가입할 수 있다.")
	@PostMapping("/signup")
	public ResponseEntity<Void> saveCustomUser(@Valid @RequestBody UserSaveRequest request) {
		userService.saveUser(request);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value = "회원 정보 조회", notes = "로그인된 자신의 정보를 조회한다.")
	@GetMapping("/me")
	public ResponseEntity<UserInfoResponse> getLoginUserInfo(@LoginUser User user) {
		return ResponseEntity.ok(UserInfoResponse.from(user));
	}

}
