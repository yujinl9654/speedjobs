package com.jobseek.speedjobs.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobseek.speedjobs.common.exception.UnauthorizedException;
import com.jobseek.speedjobs.domain.user.Role;
import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.dto.user.UserSaveRequest;
import com.jobseek.speedjobs.domain.user.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public User findById(Long userId) {
		return userRepository.findById(userId)
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다. id=" + userId));
	}

	public Boolean existsByEmail(String email) {
		return userRepository.existsByEmail(email);
	}

	@Transactional
	public Long saveUser(UserSaveRequest request) {
		if (request.getRole() == Role.ROLE_ADMIN) {
			throw new UnauthorizedException("권한이 없습니다.");
		}

		User user = User.builder()
			.name(request.getName())
			.email(request.getEmail())
			.password(passwordEncoder.encode(request.getPassword()))
			.role(request.getRole())
			.build();

		return userRepository.save(user).getId();
	}

}
