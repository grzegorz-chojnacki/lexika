package pl.edu.ug.inf.lexica.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.inf.lexica.domain.Task;
import pl.edu.ug.inf.lexica.domain.Team;
import pl.edu.ug.inf.lexica.domain.User;
import pl.edu.ug.inf.lexica.service.EntityService;
import pl.edu.ug.inf.lexica.service.TeamService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/team")
public class TeamController {
    private final TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping("/{id}")
    public Team getTeam(@PathVariable Integer id) {
        return teamService.get(id).map(Team::withMoreInfo).orElse(new Team());
    }

    @GetMapping("/{id}/task")
    public List<Task> getTasks(@PathVariable Integer id) {
        return teamService.get(id).map(Team::getTasks).orElse(List.of());
    }

    @PostMapping
    public void addTeam(@RequestBody Team team) {
        teamService.add(team);
    }

    @PostMapping("/{id}/task")
    public void saveTask(@RequestBody Task task, @PathVariable Integer id) {
        teamService.get(id).ifPresent(team -> {
            team.getTasks().add(task);
            teamService.update(team);
        });
    }

    @PutMapping("/{id}")
    public void updateTeam(@RequestBody Team updated, @PathVariable Integer id) {
        teamService.get(id).ifPresent(team -> {
            team.setName(updated.getName());
            team.setDescription(updated.getDescription());
            teamService.update(team);
        });
    }

    @PostMapping("/{id}/join")
    public void joinTeam(@RequestBody User user, @PathVariable Integer id) {
        teamService.get(id).ifPresent(team -> {
            team.getMembers().add(user);
            teamService.update(team);
        });
    }

    @PostMapping("/{id}/leave")
    public void leaveTeam(@RequestBody User user, @PathVariable Integer id) {
        teamService.get(id).ifPresent(team -> {
            team.getMembers().removeIf(u -> u.getId() == user.getId());
            teamService.update(team);
        });
    }

    @DeleteMapping("/{id}")
    public void deleteTeam(@PathVariable Integer id) {
        teamService.remove(id);
    }
}
