package com.jobseek.speedjobs.utils;

import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class RedisUtil {

	private final StringRedisTemplate redisTemplate;

	public void set(String key, String value, long milliseconds) {
		redisTemplate.opsForValue().set(key, value, milliseconds, TimeUnit.MILLISECONDS);
	}

	public String get(String key) {
		return redisTemplate.opsForValue().get(key);
	}

	public Boolean delete(String key) {
		return redisTemplate.delete(key);
	}

	public Boolean hasKey(String key) {
		return redisTemplate.hasKey(key);
	}
}
