package com.samuelmonneh.backend.Service;

import com.samuelmonneh.backend.Model.NoteModel;
import com.samuelmonneh.backend.Repo.NoteRepo;
import org.apache.coyote.Request;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Service
public class NoteService {
    private NoteRepo noteRepo;

    //DefaultArgs
    public NoteService(NoteRepo noteRepo) {
        this.noteRepo = noteRepo;
    }

    //Add new note
    public NoteModel addNote(NoteModel request) {
        return noteRepo.save(request);
    }

    //Delete existing note
    public void deleteNoteById(Long id) {
        noteRepo.deleteById(id);
    }

    //Change status of note
    public NoteModel changeNote(Long id, NoteModel request) {
        NoteModel currentNote = noteRepo.findById(id).orElseThrow();

        currentNote.setNote(request.getNote());
        //currentNote.setDateAdded(request.getDateDue());
        currentNote.setCompleted(request.isCompleted());
        currentNote.setDateDue(request.getDateDue());

        return noteRepo.save(currentNote);
    }

    //View all notes associated to user
    public List<NoteModel> getAllNotesByUser (Long userId){
        return noteRepo.findByUserId(userId);
    }


    //View all notes in DB
    public List<NoteModel> getAllNotes() {
        return noteRepo.findAll();
    }

}
