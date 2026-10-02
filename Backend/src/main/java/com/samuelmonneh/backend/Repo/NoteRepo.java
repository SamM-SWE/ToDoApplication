package com.samuelmonneh.backend.Repo;

import com.samuelmonneh.backend.Model.NoteModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepo extends JpaRepository<NoteModel, Long> {
    List<NoteModel> findByUserId(Long userId);
}
