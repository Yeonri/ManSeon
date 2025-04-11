package com.mansun;

import com.mansun.common.auth.refresh.repository.RefreshRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;


@SpringBootApplication
@EnableRedisRepositories(
		basePackages = "com.mansun.common.auth.refresh.repository",
		includeFilters = @ComponentScan.Filter(
				type = FilterType.ASSIGNABLE_TYPE,
				classes = RefreshRepository.class
		)
)
public class MansunApplication {

	public static void main(String[] args) {
		SpringApplication.run(MansunApplication.class, args);
	}

}
