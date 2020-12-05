package pl.edu.ug.inf.lexica;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import pl.edu.ug.inf.lexica.domain.*;
import pl.edu.ug.inf.lexica.service.EntityService;

import java.util.List;

@SpringBootApplication
public class LexicaApplication {

	public static void main(String[] args) {
		SpringApplication.run(LexicaApplication.class, args);
	}

	@Bean
	@Autowired
	CommandLineRunner init(
			EntityService<Task<SimpleCard>> taskService, List<Task<SimpleCard>> tasks,
			EntityService<Team> teamService, List<Team> teams,
			EntityService<User> userService, List<User> users,
			EntityService<Progress<SimpleCard>> progressService, List<Progress<SimpleCard>> progresses) {
		return (args) -> {
			taskService.addAll(tasks);
			teamService.addAll(teams);
			userService.addAll(users);
			progressService.addAll(progresses);
		};
	}
}