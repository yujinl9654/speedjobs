package com.jobseek.speedjobs.aop;

import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
public class ServiceLoggingAspect {

	@Pointcut("execution(* com.jobseek.speedjobs..*Service.*(..))")
	public void loggerPointCut() { }

	@Around("loggerPointCut()")
	public Object methodLogger(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
		Object result = proceedingJoinPoint.proceed();

		String serviceName = proceedingJoinPoint.getSignature().getDeclaringType().getSimpleName();
		String methodName = proceedingJoinPoint.getSignature().getName();

		Map<String, Object> params = new HashMap<>();

		try {
			params.put("service", serviceName);
			params.put("method", methodName);
			params.put("params", Arrays.toString(proceedingJoinPoint.getArgs()));
			params.put("log_time", new Date());
		} catch (Exception e) {
			log.error("LoggingAspect error", e);
		}

		log.info("params : {}", params);
		return result;
	}
}
