import {format} from "date-fns"
import { el } from "date-fns/locale";
import Colcade from 'colcade'

// main classes for this proyect
import{DomManipulator} from "./ClassDomManipulator";
import{ToDosManager} from "./ClassToDosManager";

export class NotesManager{

  constructor(){

  }

  static createNote(title, text) {
    return {
        title,
        text
    }
  }

  static arrangeNotes(notes){
    let colc;

    document.querySelector('.main').innerHTML = `<div class="grid">
                                                        <div class="grid-col grid-col--1">

                                                        </div>
                                                        <div class="grid-col grid-col--2">

                                                        </div>
                                                        <div class="grid-col grid-col--3">

                                                     </div>`
        const grid = document.querySelector('.grid');
       
        // if there is a colc grid already built, delete it so can make a new one.
        // i tried so many ways to update the grid and this is what works.
        if (typeof colc !== 'undefined') {
            colc.destroy();
            grid.innerHTML = `<div class="grid-col grid-col--1">

                                  </div>
                                  <div class="grid-col grid-col--2">

                                  </div>
                                  <div class="grid-col grid-col--3">

                              </div>`;

        }

        // inititialise colcade masonry layout
        colc = new Colcade( '.grid', {
          columns: '.grid-col',
          items: '.note'
          });

        

        // create note elements and append to colc
        notes.forEach((note, i) => {
        const noteBody = document.createElement('div');
        noteBody.classList.add('note');
        // associate element with position in array
        noteBody.setAttribute('data-index', i);

        const noteClose = document.createElement('div');
        noteClose.classList.add('note__close');
        noteClose.innerHTML = '&times;';
        noteClose.addEventListener('click', e => NotesManager.deleteNote(e, notes));

        const noteTitle = document.createElement('div');
        noteTitle.classList.add('note__title');
        noteTitle.textContent = note.title;
        noteTitle.setAttribute('contenteditable', 'true');
        noteTitle.setAttribute('spellcheck', 'false');
        // edit title event listener
        noteTitle.addEventListener('input', e => NotesManager.editNote(e, notes));

        const noteText = document.createElement('div');
        noteText.classList.add('note__text');
        noteText.textContent = note.text;
        noteText.setAttribute('contenteditable', 'true');
        noteText.setAttribute('spellcheck', 'false');
        // edit title event listener
        noteText.addEventListener('input', e => NotesManager.editNote(e, notes));

        noteBody.appendChild(noteClose);
        noteBody.appendChild(noteTitle);
        noteBody.appendChild(noteText);

        colc.append(noteBody);     
        })
  }

  static createNote(title, text){
    return {
      title,
      text
    }
  }

  static addNewNote(e, notes, overlay, form, display){
    const noteTitle = document.querySelector('#new-note-title').value;
    const noteText = document.querySelector('#new-note-text').value;

    const newNote = NotesManager.createNote(noteTitle, noteText);
    notes.unshift(newNote);

    NotesManager.arrangeNotes(notes);
    // sets nav active link to 'notes' 
    document.querySelector('#notes-nav').click();
    
    // closes the form and removes the overlay after submission
    overlay.classList.toggle('overlay-new-invisible');
    form.classList.toggle('create-new-open');

    // I want the form to fade out before the inputs are reset
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }
    
    sleep(300).then(() => {
        // clear inputs after submission 
        form.reset();
        // reset add new form to show add todo
        document.querySelector('#new-note-menu').style.display = "none";
    
        document.querySelector('#new-todo-menu').style.display = "flex";
    })

    // save notes to local storage
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  // delete selected note and refresh the notes
  static deleteNote(e, notes){
    const i = e.target.parentElement.dataset.index;
    notes.splice(i, 1);
    NotesManager.arrangeNotes(notes);

    // save notes to local storage
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  static editNote(e, notes){
    // toEdit returns "title" or "note" depending on what is changed
    const toEdit = e.target.classList[0].slice(6);
    const i = e.target.parentElement.dataset.index;
    const newText = e.target.textContent;

    if (toEdit === "title") {
        notes[i].title = newText;  
    } else if (toEdit ==="text") {
        notes[i].text = newText;
    }
    // console.log('editing note');

    // save notes to local storage
    localStorage.setItem("notes", JSON.stringify(notes));
  }
}