package pl.edu.ug.inf.lexica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.edu.ug.inf.lexica.domain.Team;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {
    Optional<Team> findById(Integer id);
    List<Team> findAll();
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO team (name, leader_id,description) VALUES (?1, ?2, ?3)", nativeQuery = true)
    void save(String name, int leaderID, String description);
}