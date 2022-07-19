import {format, set} from "date-fns"
import { el } from "date-fns/locale";
import Colcade from 'colcade'

// main classes for this proyect
import{DomManipulator} from "./ClassDomManipulator";
import{NotesManager} from "./ClassNotesManager";
import { get } from "jquery";

let currentProject = 'home';

// To Do data manager 
export class ToDosManager{

  constructor(){
  }

  // To-do factory function
  static createToDo(name, priority, date, details, project, checked=false) {
    return {
        name,
        priority,
        date,
        details,
        project,
        checked
    }
  }

  // change currentProject
  static changeCurrentProject(newProject) {

    currentProject = newProject;

  }

  static getCurrentProject() {
    return currentProject;
  }

  //retrieves the data entered to the new to-do form and creates a new to-do
  // and then displays it to the dom
  static addNewToDo(e, toDoList, display, overlay, form){
    // stop page from refreshing after each submit
    e.preventDefault();
         
    const toDoTitle = (document.querySelector('#new-todo-title')).value;
    const toDoDetails = (document.querySelector('#new-todo-details')).value;
    const toDoDate = (document.querySelector('#new-todo-date')).value;
    const toDoPriority = (document.querySelector('[name="create-new-priority"]:checked')).value;
    // get the current project so can store new to-do item in the correct sub array.
    const toDoProject = ToDosManager.getCurrentProject();
    
    const newToDo = ToDosManager.createToDo(toDoTitle, toDoPriority, toDoDate, toDoDetails, toDoProject);
    toDoList[toDoProject].push(newToDo);


    // render all to-dos from all projects if on the home page. otherwise
    // only render the relevent to-do items
    if (ToDosManager.getCurrentProject() === 'home') {
        DomManipulator.renderAllTodos(toDoList, display);
        
    } else {
      DomManipulator.renderToDos(toDoList, display);
    }
    
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
        // removes active status from all buttons
        DomManipulator.removeActivePriority();
    })
    // update project name counter 
    DomManipulator.renderProjectNames(toDoList, display);
  }

  static editToDo(e, toDoList, display, overlay, form){
    e.preventDefault();
    // retrieve the position of the to-do item in the data array
    const i = e.target.firstElementChild.dataset.index;
    // retrieve the project the to-do was assigned to
    
    const project = e.target.firstElementChild.dataset.project;

    // update the to-do item data
    toDoList[project][i].name = (document.querySelector('.edit-popup__input')).value;
    toDoList[project][i].details = (document.querySelector('.edit-popup__input-big')).value;
    toDoList[project][i].date = (document.querySelector('.edit-popup__date-input')).value;
    toDoList[project][i].priority = (document.querySelector('[name="edit-priority"]:checked')).value;

    // render all to-dos from all projects if on the home page. otherwise
    // only render the relevent to-do items
    if (ToDosManager.getCurrentProject() === 'home') {
        DomManipulator.renderAllTodos(toDoList, display);
    } else {
        DomManipulator.renderToDos(toDoList, display);
    }
    overlay.classList.toggle('overlay-edit-invisible');
    form.classList.toggle('edit-popup-open');
  }

  // removes selected to-do item from the array and re renders the display
  static deleteToDo(e, toDoList, display){
    const element = e.target;
    let i;
    let project;
    // sometimes the event target is the svg element, other times it is the use element.
    // this ensures i get index of the to-do body item 
    if (element.tagName === 'svg') {
        i = element.parentElement.dataset.index;
    } else if (element.tagName === 'use') {
        i = element.parentElement.parentElement.dataset.index;
    }

    // sometimes the event target is the svg element, other times it is the use element.
    // this ensures i get project of the to-do body item 
    if (element.tagName === 'svg') {
        project = element.parentElement.dataset.project;
    } else if (element.tagName === 'use') {
        project = element.parentElement.parentElement.dataset.project;
    }

    // render all to-dos from all projects if on the home page. otherwise
    // only render the relevent to-do items
    if (ToDosManager.getCurrentProject() === 'home') {
        // if in home
        toDoList[project].splice(i, 1);
        DomManipulator.renderAllTodos(toDoList, display);
        // logs the entire to-do object
        // console.log(toDoList);
    } else {
        // console.log(toDoList[toDosManager.getCurrentProject()]);
        // logs just the project array
        
        toDoList[ToDosManager.getCurrentProject()].splice(i, 1);
        
        DomManipulator.renderToDos(toDoList, display);
    }
    //check if a project is now empty, and delete the project if true
    ToDosManager.checkEmptyProject(toDoList, display);
    // save todos to local storage
    localStorage.setItem("todos", JSON.stringify(toDoList));
    // update project name counter 
    DomManipulator.renderProjectNames(toDoList, display);
  }

  // add new project to-dos object
  static addNewProject(e, todos, overlay, form, display){
    const newProject = (document.querySelector('.create-new__project-input')).value;
    // if text was entered in the input and project doesnt already exist
    if (newProject && !(newProject.toLowerCase() in todos)) {

      todos[newProject] = [];

      // render project names in sidebar
      DomManipulator.renderProjectNames(todos, display);
      
      // sets the current folder variable to nav item that was clicked
      ToDosManager.changeCurrentProject(newProject);

      // render all to-dos from all projects if on the home page. otherwise
      // only render the relevent to-do items
      if (ToDosManager.getCurrentProject() === 'home') {
          DomManipulator.renderAllToDos(todos, display);
      } else {
          DomManipulator.renderToDos(todos, display);
      }

      // sets nav active status to newly created project
      const navItems = document.querySelectorAll('.nav__item--link');
      navItems.forEach(item => {
        item.classList.remove("nav__selected");
      })
      document.querySelector('.projects').lastChild.classList.add('nav__selected');

      // scrolls to bottom of custom projects div
      DomManipulator.projectNamesScrollBottom();

      // if the created project already exists, change folder to that project  
    } else if (newProject && (newProject.toLowerCase() in todos)) {

      // render all to-dos from all projects if on the home page. otherwise
      // only render the relevent to-do items
      if (newProject.toLowerCase() === 'home') {
          ToDosManager.changeCurrentProject(newProject.toLowerCase());
          DomManipulator.renderAllToDos(todos, display);
      } else {
        ToDosManager.changeCurrentProject(newProject.toLowerCase());
        DomManipulator.renderToDos(todos, display);
      }       
    }

    // closes the form and removes the overlay after submission
    overlay.classList.toggle('overlay-new-invisible');
    form.classList.toggle('create-new-open');

    // I want the form to fade out before the input is reset
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    
    sleep(300).then(() => {
      // clear input after form closes 
      form.reset();
      // reset add new form to show add todo
      document.querySelector('#new-project-menu').style.display = "none";
      document.querySelector('#new-todo-menu').style.display = "flex";
    })

    // show a placeholder screen after a new empty project has been created
    DomManipulator.renderEmptyProjectPlaceholder(todos, display);

    //update local storage
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  static checkEmptyProject(todos, display){

    // get an object of only the custom projects
    const projectsObject = Object.assign({}, todos);
    delete projectsObject.home;
    delete projectsObject.today;
    delete projectsObject.week;

    // only delete empty custom projects
    if (!['home', 'week', 'today'].includes(ToDosManager.getCurrentProject())) {
      // deletes only the current empty project
      if (projectsObject[ToDosManager.getCurrentProject()].length < 1) {
        delete todos[ToDosManager.getCurrentProject()];
        DomManipulator.renderProjectNames(todos, display);
        
        // change folder to home
        
        ToDosManager.changeCurrentProject('home');
        DomManipulator.renderAllToDos(todos, display);

        // update nave link to show home active
        document.querySelector('.nav').children.item(0).classList.add('nav__selected');
        console.log(document.querySelector('.nav').children.item(0));
      }
    }      
  }
}