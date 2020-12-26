package pl.edu.ug.inf.lexica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.ug.inf.lexica.domain.TaskType;

import java.util.UUID;

@Repository
public interface TaskTypeRepository extends JpaRepository<TaskType, UUID> { }
