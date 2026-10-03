package com.samuelmonneh.backend.Controller;

import com.samuelmonneh.backend.Model.NoteModel;
import com.samuelmonneh.backend.Service.NoteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class NoteController {
    private NoteService noteService;

    public NoteController(NoteService noteService) {
       this.noteService = noteService;
    }

    //Add new note
    @PostMapping("/addNote")
    public NoteModel addNote(@RequestBody NoteModel body) {
       return noteService.addNote(body);
    }


    //Remove note by ID
    @DeleteMapping("/deleteNote/{id}")
    public void deleteNoteById(@PathVariable Long id) {
        noteService.deleteNoteById(id);
    }

    //Change Note
    @PutMapping("/changeNote/{id}")
    public NoteModel changeNoteById(@PathVariable Long id, @RequestBody NoteModel body) {
        return noteService.changeNote(id, body);
    }

    //Get all notes by UserId
    @GetMapping("/getNotes/{userId}")
    public List<NoteModel> getNotesByUserId(@PathVariable Long userId) {
        return noteService.getAllNotesByUser(userId);
    }


    //Get all notes in DB
    @GetMapping("/getAllNotes")
    public List<NoteModel> getAllNotes() {
        return noteService.getAllNotes();
    }

}
