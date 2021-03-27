package com.jobseek.speedjobs.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.jobseek.speedjobs.config.auth.CustomAccessDeniedHandler;
import com.jobseek.speedjobs.config.auth.CustomAuthenticationEntryPoint;
import com.jobseek.speedjobs.config.auth.JwtAuthenticationFilter;
import com.jobseek.speedjobs.utils.JwtUtil;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private final CustomAccessDeniedHandler customAccessDeniedHandler;
	private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
	private final JwtUtil jwtUtil;

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.httpBasic()
			.disable()
			.csrf()
			.disable()
			.cors()

			.and()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)

			.and()
			.authorizeRequests()
			.antMatchers("/api/auth/login", "/api/auth/logout", "/api/user/signup", "/error/**")
			.permitAll()
			.antMatchers("/api/manager/**")
			.hasRole("MANAGER")
			.antMatchers("/api/admin/**")
			.hasRole("ADMIN")
			.anyRequest()
			.authenticated()

			.and()
			.exceptionHandling()
			.authenticationEntryPoint(customAuthenticationEntryPoint) // 인증
			.accessDeniedHandler(customAccessDeniedHandler) // 인가

			.and()
			.addFilterBefore(new JwtAuthenticationFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);
	}

	@Override
	public void configure(WebSecurity web) {
		web.ignoring().antMatchers("/v2/api-docs", "/swagger-resources/**",
			"/swagger-ui.html", "/webjars/**", "/swagger/**");

	}

}
