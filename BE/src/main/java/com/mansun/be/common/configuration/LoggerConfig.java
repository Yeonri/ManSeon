package com.mansun.be.common.configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LoggerConfig {

    @Bean
    public Logger defaultLogger() {
        return LoggerFactory.getLogger("GlobalLogger");
    }
}
