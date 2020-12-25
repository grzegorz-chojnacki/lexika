package pl.edu.ug.inf.lexica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.ug.inf.lexica.domain.Progress;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProgressRepository extends JpaRepository<Progress, Integer> {
    Optional<Progress> findById(Integer id);
    List<Progress> findAll();
}