import {format} from "date-fns"
import { el } from "date-fns/locale";
import Colcade from 'colcade'

// main classes for this proyect
import{NotesManager} from "./ClassNotesManager";
import{ToDosManager} from "./ClassToDosManager";

export class DomManipulator{

  constructor(){

  }

  // render all to-dos from all projects 
  static renderAllTodos(toDoObject,element){
    // clear out display before redisplaying all to-dos
    element.innerHTML = "";

    for(const project in toDoObject){
      // create a to-do element for each todo stored in the passed array 

      // and append them to the dom element supplied to the function

      toDoObject[project].forEach((todo, i) => {

        // create main body of the to-do item;
        const toDoBody = document.createElement('div');
        toDoBody.classList.add('todo');
        toDoBody.classList.add(`priority-${todo.priority}`);

        // give each to-do element a unique value that corresponds to it's data's position in the array
        toDoBody.setAttribute('data-index', i);

        // set data atrribute to the to-do items project name
        toDoBody.setAttribute('data-project', `${todo.project}`)

        // create to-do item checkbox 
        const toDoCheckBox = document.createElement('div');
        toDoCheckBox.classList.add('todo__complete');
        toDoCheckBox.addEventListener('click', e => DomManipulator.toggleCheckBox(e, toDoObject, element));

        // create to-do item title
        const toDoTitle = document.createElement('div');
        toDoTitle.classList.add('todo__title');
        toDoTitle.textContent = todo.name;

        // create to-do item details button
        const toDoDetails = document.createElement('div');
        toDoDetails.classList.add('todo__detail');
        toDoDetails.textContent = 'details';
        
        toDoDetails.addEventListener('click', (e) => {
            DomManipulator.renderDetails(e, toDoObject[project]);
        })

        // create a to-do due date label.
        // displays a human readable representation of the date input string
        const toDoDate = document.createElement('div');
        toDoDate.classList.add('todo__date');

        // convert date string into a date the form of "Jan 12th"
        const dateObject = new Date(todo.date);
        const dateMonth = format(dateObject, 'MMM');
        const dateDay = format(dateObject, 'do');
        const dateFormated = `${dateMonth} ${dateDay}`;
        toDoDate.textContent = dateFormated;

        // create a edit icon for the to-do item
        const toDoEdit = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        toDoEdit.classList.add('todo__icon-edit');
        toDoEdit.classList.add('todo__icon');
        toDoEdit.addEventListener('click', e => DomManipulator.renderEdit(e, toDoObject[project], element));
        const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
        use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './assets/img/edit.svg#icon-edit')
        toDoEdit.appendChild(use);

        // create a delete icon for the to-do item
        const toDoDelete = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        toDoDelete.classList.add('todo__icon');
        toDoDelete.classList.add('todo__icon-bin');
        toDoDelete.addEventListener('click', e => ToDosManager.deleteToDo(e, toDoObject, element));
        const use2 = document.createElementNS("http://www.w3.org/2000/svg", "use");
        use2.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '/assets/img/icons.svg#icon-bin')
        toDoDelete.appendChild(use2);

        toDoBody.appendChild(toDoCheckBox);
        toDoBody.appendChild(toDoTitle);
        toDoBody.appendChild(toDoDetails);
        toDoBody.appendChild(toDoDate);
        toDoBody.appendChild(toDoEdit);
        toDoBody.appendChild(toDoDelete);

        //apply checked status 
        if (todo.checked) {
          DomManipulator.applyCheckedOnReaload(toDoBody)
        }
        element.appendChild(toDoBody);
      });
    }
    // save todos to local storage
    localStorage.setItem("todos", JSON.stringify(toDoObject));  
  }

  // applies modified styling to each element of a checked off to-do item 
  static toggleCheckBox(e, toDoObject, display){
    // grabs all sibling elements of the clicked checkbox
    const toDo = e.target.parentElement;
    const toDoItems = toDo.children;

    // todo checkbox
    toDoItems[0].classList.toggle('todo__complete-checked');
    // todo title
    toDoItems[1].classList.toggle('todo__title-checked');
    // todo details button
    toDoItems[2].classList.toggle('todo__detail-checked');
    // todo date
    toDoItems[3].classList.toggle('todo__date-checked');
    // todo edit icon
    toDoItems[4].classList.toggle('todo__icon-checked');
    // todo delete icon
    toDoItems[5].classList.toggle('todo__icon-checked');

    // toggle checked status on todo item data
    const project = toDo.dataset.project;
    const index = toDo.dataset.index;

    //Changed the checked status after click
    toDoObject[project][index].checked = !toDoObject[project][index].checked;

    // save todos to local storage
    localStorage.setItem("todos", JSON.stringify(toDoObject));

    // update project count
    DomManipulator.renderProjectNames(toDoObject, display);
  }

  // render the project names to the side bar
  static renderProjectNames(todos, display){
    const projectContainer = document.querySelector('.projects');
    // clear list before appending all items
    projectContainer.innerHTML = ""
        
    // get an object of only the custom projects
    const projectsObject = Object.assign({}, todos);
    delete projectsObject.home;
    delete projectsObject.today;
    delete projectsObject.week;

    // console.log("custom projects", projectsObject);

    // display project names and counts to the sidebar
    for (const project in projectsObject) {

      // container around project name and count
      const projectNameCount = document.createElement('li');
      projectNameCount.classList.add('projects__item');
      //projectNameCount.classList.add('projects__item--custom');
      projectNameCount.classList.add('nav__item--link');
      projectNameCount.classList.add('custom-project-count-container');
      projectNameCount.addEventListener("click", e => DomManipulator.changeFolder2(e, todos, display));
      projectNameCount.addEventListener("click", e => DomManipulator.updateActiveNavMain(e));

      // project name
      const projectName = document.createElement('span');
      projectName.classList.add('todo-folder');
      projectName.classList.add('project-name');
      projectName.textContent = project;
      // event listner to change working folder / page display
      projectName.addEventListener("click", e => DomManipulator.changeFolder(e, todos, display));

      // project count
      const projectCount = document.createElement('div');
      projectCount.classList.add('project-count');

      // count how many non checked items there are in the project
      // and assign this value to the count value
      let n = 0;
      projectsObject[project].forEach(todo => {
          if(!todo.checked) {
              n++
          }
      })
      
      projectCount.textContent = n;

      projectNameCount.appendChild(projectName);
      // only show count if greater than 0
      if (n > 0) {
          projectNameCount.appendChild(projectCount);
      }
      
      projectContainer.appendChild(projectNameCount);

      
      // this re-applys nav link selected status to selected custom project,
      // since the entire custom project names div is re-rendered each time. 
      if(ToDosManager.getCurrentProject() == project) {
          projectNameCount.classList.add('nav__selected')
      }
    }


    // update home / today / week folders. only count non checked items
    const homeCount = document.querySelector('.home-count');
    // sums number of non checked item in project array and displays count text as this sum
    // this will only count the items that are specifically saved to home folder,
    // i want to count all todos.

    // homeCount.textContent = todos.home.reduce((total, value) => {
    //     return total + !value.checked;
    // }, 0);

    let homeCountNumber = 0;
    for (const todoList in todos) {
        todos[todoList].forEach(todo => {
            if (!todo.checked) {
                homeCountNumber++;
            }
        })
    }
    homeCount.textContent = homeCountNumber;
    // re-set count display
    homeCount.style.display = 'inline-flex';
    if (homeCount.textContent < 1) {
        // hide count display if 0
        homeCount.style.display = 'none';
    }

    const weekCount = document.querySelector('.week-count');
    // sums number of non checked item in project array and displays count text as this sum
    weekCount.textContent = todos.week.reduce((total, value) => {
        return total + !value.checked;
    }, 0);
    // re-set count display
    weekCount.style.display = 'inline-flex';
    if (weekCount.textContent < 1) {
        // hide count display if 0
        weekCount.style.display = 'none';
    }
    
    const todayCount = document.querySelector('.today-count');
    // sums number of non checked item in project array and displays count text as this sum
    todayCount.textContent = todos.today.reduce((total, value) => {
        return total + !value.checked;
    }, 0);
    // re-set count display
    todayCount.style.display = 'inline-flex';
    if (todayCount.textContent < 1) {
        // hide count display if 0
        todayCount.style.display = 'none';
    }
  }
  
  // function to handle clicks on the wider navigation area.
  static changeFolder2(e, todos, display){

    if (e.target.tagName == 'li' || e.target.tagName == 'LI') {

      // sets the current folder variable to nav item that was clicked
      if (['Home', 'Week', 'Today'].includes(e.target.childNodes[0].textContent)) {
        ToDosManager.changeCurrentProject(e.target.childNodes[0].textContent.toLowerCase());
      } else {
        ToDosManager.changeCurrentProject(e.target.childNodes[0].textContent);
      }
      
      // render all to-dos from all projects if on the home page. otherwise
      // only render the relevent to-do items
      if (ToDosManager.getCurrentProject() === 'home') {
        DomManipulator.renderAllTodos(todos, display);
        DomManipulator.updateActiveNavMain(e);
      } else {
          
        DomManipulator.renderToDos(todos, display);
        DomManipulator.updateActiveNavMain(e);
      }

      // if changing to a new empty custom project, display placeholder screen
      if (!['home', 'week', 'today'].includes(ToDosManager.getCurrentProject())) {
          if (todos[ToDosManager.getCurrentProject()].length < 1) {
            DomManipulator.renderEmptyProjectPlaceholder(todos, display);
        }
      }
    }
  }

  // turn off selected styling for all nav items and apply to the selected item
  static updateActiveNavMain(e) {
    const navItems = document.querySelectorAll('.nav__item--link');
    navItems.forEach(item => {
        item.classList.remove("nav__selected");
    })
    
    if (e.target.textContent === 'Notes') {
        e.target.classList.add('nav__selected');
    } else {
        if (e.target.tagName == "span" || e.target.tagName == "SPAN") {
            e.target.parentElement.classList.add('nav__selected');
        } else if (e.target.tagName == "li" || e.target.tagName == "LI") {
            e.target.classList.add('nav__selected');
      }
    }
  }

  // displays all todos stored in array to the dom
  static renderToDos(todos, element){ //este
    // grab relevent todo items
    const toDoList = todos[ToDosManager.getCurrentProject()];
    // console.log(toDoList);
  
    // clear out display before redisplaying all to-dos
    element.innerHTML = "" 
    
    // dont render an empty list
    if (toDoList.length == 0) {
        return
    }

    // create a to-do element for each todo stored in the passed array 
    // and append them to the dom element supplied to the function
    toDoList.forEach((todo, i) => {

      // create main body of the to-do item
      const toDoBody = document.createElement('div');
      toDoBody.classList.add('todo');
      toDoBody.classList.add(`priority-${todo.priority}`);
      // give each to-do element a unique value that corresponds to
      // it's data's position in the array
      toDoBody.setAttribute('data-index', i);
      // set data atrribute to the to-do items project name
      toDoBody.setAttribute('data-project', `${todo.project}`)
      
      // create to-do item checkbox 
      const toDoCheckBox = document.createElement('div');
      toDoCheckBox.classList.add('todo__complete');
      toDoCheckBox.addEventListener('click', e => DomManipulator.toggleCheckBox(e, todos, element));
      
      // create to-do item title
      const toDoTitle = document.createElement('div');
      toDoTitle.classList.add('todo__title');
      toDoTitle.textContent = todo.name;
      
      // create to-do item details button
      const toDoDetails = document.createElement('div');
      toDoDetails.classList.add('todo__detail');
      toDoDetails.textContent = 'details';
      toDoDetails.addEventListener('click', (e) => {
          DomManipulator.renderDetails(e, toDoList);
      })

      // create a to-do due date label.
      // displays a human readable representation of the date input string
      const toDoDate = document.createElement('div');
      toDoDate.classList.add('todo__date');
      // convert date string into a date the form of "Jan 12th"
      const dateObject = new Date(todo.date);
      const dateMonth = format(dateObject, 'MMM');
      const dateDay = format(dateObject, 'do');
      const dateFormated = `${dateMonth} ${dateDay}`;
      toDoDate.textContent = dateFormated;

      // create a edit icon for the to-do item
      const toDoEdit = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      toDoEdit.classList.add('todo__icon-edit');
      toDoEdit.classList.add('todo__icon');
      toDoEdit.addEventListener('click', e => DomManipulator.renderEdit(e, toDoList, element));
      const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './assets/img/edit.svg#icon-edit')
      toDoEdit.appendChild(use);
        
      // create a delete icon for the to-do item
      const toDoDelete = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      toDoDelete.classList.add('todo__icon');
      toDoDelete.classList.add('todo__icon-bin');
      toDoDelete.addEventListener('click', e => ToDosManager.deleteToDo(e, todos, element));
      const use2 = document.createElementNS("http://www.w3.org/2000/svg", "use");
      use2.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './assets/img/icons.svg#icon-bin')
      toDoDelete.appendChild(use2);
        
      toDoBody.appendChild(toDoCheckBox);
      toDoBody.appendChild(toDoTitle);
      toDoBody.appendChild(toDoDetails);
      toDoBody.appendChild(toDoDate);
      toDoBody.appendChild(toDoEdit);
      toDoBody.appendChild(toDoDelete);

      //apply checked status 
      if (todo.checked) {
        DomManipulator.applyCheckedOnReaload(toDoBody);
      }

      element.appendChild(toDoBody);
    })

    // save todos to local storage
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // retrieve the details for a selected to-do item and render them in a popup
  static renderDetails(e, todos){
    const i = e.target.parentElement.dataset.index;
    const overlay = document.querySelector('.overlay-details');
    const display = document.querySelector('.details-popup__content');
    const popup = document.querySelector('.details-popup');

    // clear out the popup details information
    display.innerHTML = "";

    // create elements needed to build a details popup
    // main display of popup
    const body = document.createElement('div');
    body.classList.add('details-popup__content');

    // create title element
    const name = document.createElement('div');
    name.classList.add('details-popup__title');
    name.textContent = todos[i].name;

    // create project element
    // element made up of 2 spans. title and content
    const project = document.createElement('div');
    project.classList.add('details-popup__project');
    const projectTitle = document.createElement('span');
    projectTitle.textContent = 'Project:';
    projectTitle.classList.add('details-popup__catagory');
    const projectContent = document.createElement('span');
    projectContent.textContent = todos[i].project;
    project.appendChild(projectTitle);
    project.appendChild(projectContent);


    // create priority element
    const priority = document.createElement('div');
    priority.classList.add('details-popup__priority');
    const priorityTitle = document.createElement('span');
    priorityTitle.textContent = "Priority:";
    priorityTitle.classList.add('details-popup__catagory');
    const priorityContent = document.createElement('span');
    priorityContent.textContent = todos[i].priority[0].toUpperCase() + todos[i].priority.slice(1);
    priority.appendChild(priorityTitle);
    priority.appendChild(priorityContent);

    // create date element
    const date = document.createElement('div');
    date.classList.add('details-popup__due');
    const dateTitle = document.createElement('span');
    dateTitle.textContent = 'Due Date:';
    dateTitle.classList.add('details-popup__catagory');
    const dateContent = document.createElement('span');
    // display human readable date
    const day = format(new Date(todos[i].date), 'do');
    const month = format(new Date(todos[i].date), 'MMMM');
    const year = format(new Date(todos[i].date), 'yyyy');
    const formatedDate = `${month} ${day}, ${year}`;
    dateContent.textContent = formatedDate;
    date.appendChild(dateTitle);
    date.appendChild(dateContent);
    

    // create details element
    const details = document.createElement('div');
    details.classList.add('details-popup__details');
    const detailsTitle = document.createElement('span');
    detailsTitle.classList.add('details-popup__details-title');
    detailsTitle.textContent = "Details:";
    const detailsContent = document.createElement('span');
    detailsContent.textContent = todos[i].details;
    details.appendChild(detailsTitle);
    details.appendChild(detailsContent);

    body.appendChild(name);
    body.appendChild(project);
    body.appendChild(priority);
    body.appendChild(date);
    body.appendChild(details);

    display.appendChild(body);

    // show popup
    popup.classList.toggle("details-popup-open");
    overlay.classList.toggle("overlay-details-invisible");
  }

  static renderEdit(e, todos){
    const element = e.target;
    // sometimes the event target is the svg element, other times it is the use element.
    // this ensures i get index of the to-do body item 
    let i;
    let project;

    if (element.tagName === 'svg') {
        i = element.parentElement.dataset.index;
    } else if (element.tagName === 'use') {
        i = element.parentElement.parentElement.dataset.index;
    }

    if (element.tagName === 'svg') {
        project = element.parentElement.dataset.project;
    } else if (element.tagName === 'use') {
        project = element.parentElement.parentElement.dataset.project;
    }

    const overlay = document.querySelector('.overlay-edit');
    const display = document.querySelector('.edit-popup__entry');
    const popup = document.querySelector('.edit-popup');

    // clear out the popup edit information
    display.innerHTML = "";

    // retreive name of todo and display it in a text area
    const title = document.createElement('textarea');
    title.classList.add('edit-popup__input');
    title.setAttribute('maxlength', '40');
    title.required = true;
    title.textContent = todos[i].name;
    // attatch index to title element so i can grab it when confirming edit
    // and change the array data for that to-do item
    title.dataset.index = i;
    // attach project name to title element so i can grab it when confirming edits
    title.dataset.project = project;

    // retreive details of todo and display it in a text area
    const details = document.createElement('textarea');
    details.classList.add('edit-popup__input', 'edit-popup__input-big');
    details.setAttribute("placeholder", "Details:")
    details.textContent = todos[i].details;

    // create the elements that make up the date section
    const dateContainer = document.createElement('div');
    dateContainer.classList.add('edit-popup__date');

    const dateContainerTitle = document.createElement('div');
    dateContainerTitle.classList.add('edit-popup__date-title');
    dateContainerTitle.textContent = 'Due Date:';

    const dateContainerInput = document.createElement('input');
    dateContainerInput.classList.add('edit-popup__date-input');
    dateContainerInput.setAttribute('type', 'date');
    dateContainerInput.required = true;
    dateContainerInput.setAttribute('value', todos[i].date);

    dateContainer.appendChild(dateContainerTitle);
    dateContainer.appendChild(dateContainerInput);

    // create the priority buttons section
    const footer = document.createElement('div');
    footer.classList.add('edit-popup__wrapper-priority-submit');

    const priorityContainer = document.createElement('div');
    priorityContainer.classList.add('edit-popup__priority');

    const priorityTitle = document.createElement('div');
    priorityTitle.classList.add('edit-popup__priority-title');
    priorityTitle.textContent = 'Priority:';
    // low priority input
    const priorityLowInput = document.createElement('input');
    priorityLowInput.setAttribute('type', 'radio');
    priorityLowInput.setAttribute('id', 'low');
    priorityLowInput.setAttribute('name', 'edit-priority');
    priorityLowInput.setAttribute('value', 'low');
    if (todos[i].priority === 'low') {
        priorityLowInput.checked = true;
    }
        priorityLowInput.required = true;
        // low priority label
        const priorityLowLabel = document.createElement('label');
        priorityLowLabel.setAttribute("for", "low");
        priorityLowLabel.classList.add('edit-popup__priority-btn', 'edit-popup__priority-btn--low');
        if (todos[i].priority === 'low') {
            priorityLowLabel.classList.add('edit-popup__priority-btn--low-active');
        }
        priorityLowLabel.textContent = "Low";
        // medium priority input
        const priorityMediumInput = document.createElement('input');
        priorityMediumInput.setAttribute('type', 'radio');
        priorityMediumInput.setAttribute('id', 'medium');
        priorityMediumInput.setAttribute('name', 'edit-priority');
        priorityMediumInput.setAttribute('value', 'medium');
        if (todos[i].priority === 'medium') {
            priorityMediumInput.checked = true;
        }
        priorityMediumInput.required = true;
        // Medium priority label
        const priorityMediumLabel = document.createElement('label');
        priorityMediumLabel.setAttribute("for", "medium");
        priorityMediumLabel.classList.add('edit-popup__priority-btn', 'edit-popup__priority-btn--medium');
        if (todos[i].priority === 'medium') {
            priorityMediumLabel.classList.add('edit-popup__priority-btn--medium-active');
        }
        priorityMediumLabel.textContent = "Medium";
        // high priority input
        const priorityHighInput = document.createElement('input');
        priorityHighInput.setAttribute('type', 'radio');
        priorityHighInput.setAttribute('id', 'high');
        priorityHighInput.setAttribute('name', 'edit-priority');
        priorityHighInput.setAttribute('value', 'high');
        if (todos[i].priority === 'high') {
            priorityHighInput.checked = true;
        }
        priorityHighInput.required = true;
        // high priority label
        const priorityHighLabel = document.createElement('label');
        priorityHighLabel.setAttribute("for", "high");
        priorityHighLabel.classList.add('edit-popup__priority-btn', 'edit-popup__priority-btn--high');
        if (todos[i].priority === 'high') {
            priorityHighLabel.classList.add('edit-popup__priority-btn--high-active');
        }

        priorityHighLabel.textContent = "High";
        priorityContainer.appendChild(priorityTitle);
        priorityContainer.appendChild(priorityLowInput);
        priorityContainer.appendChild(priorityLowLabel);
        priorityContainer.appendChild(priorityMediumInput);
        priorityContainer.appendChild(priorityMediumLabel);
        priorityContainer.appendChild(priorityHighInput);
        priorityContainer.appendChild(priorityHighLabel);

        // submit button (is in same footer as the piority buttons container)
        const submit = document.createElement("input");
        submit.setAttribute('type', "submit");
        submit.setAttribute('id', 'todo-edit-submit')
        submit.setAttribute('value', 'Confirm Edit')
        submit.classList.add("edit-popup__todo-submit");

        footer.appendChild(priorityContainer);
        footer.appendChild(submit);

        // append created elements to the DOM
        display.appendChild(title);
        display.appendChild(details);
        display.appendChild(dateContainer);
        display.appendChild(footer);

        //listener that changes the highlighted priority button
        const priorityBtns = document.querySelectorAll('.edit-popup__priority-btn');
        priorityBtns.forEach(btn => {
            btn.addEventListener('click', e =>{
                DomManipulator.editPriority(e);
            });
        })
        // show popup
        popup.classList.toggle("edit-popup-open");
        overlay.classList.toggle("overlay-edit-invisible");
  }

  static applyCheckedOnReaload(toDoItem){
    const toDoItems = toDoItem.children;

    // todo checkbox
    toDoItems[0].classList.toggle('todo__complete-checked');
    // todo title
    toDoItems[1].classList.toggle('todo__title-checked');
    // todo details button
    toDoItems[2].classList.toggle('todo__detail-checked');
    // todo date
    toDoItems[3].classList.toggle('todo__date-checked');
    // todo edit icon
    toDoItems[4].classList.toggle('todo__icon-checked');
    // todo delete icon
    toDoItems[5].classList.toggle('todo__icon-checked');
  }

  // function to handle clicks on the navigation
  static changeFolder(e, todos, display){
    // sets the current folder variable to nav item that was clicked
        // because i set everything to be lowercase in my code, it woudl crash when i used uppercase
        // letters in my custom projects. this allows uppercase project names
        
        if (['Home', 'Week', 'Today'].includes(e.target.textContent)) {
          ToDosManager.changeCurrentProject(e.target.textContent.toLowerCase());
      } else {
          ToDosManager.changeCurrentProject(e.target.textContent);
      }
     
      // render all to-dos from all projects if on the home page. otherwise
      // only render the relevent to-do items
      if (ToDosManager.getCurrentProject() === 'home') {
          DomManipulator.renderAllTodos(todos, display);
          DomManipulator.updateActiveNavMain(e);
      } else {
          
        DomManipulator.renderToDos(todos, display);
        DomManipulator.updateActiveNavMain(e);
      }

      // if changing to a new empty custom project, display placeholder screen
      if (!['home', 'week', 'today'].includes(ToDosManager.getCurrentProject())) {
          if (todos[ToDosManager.getCurrentProject()].length < 1) {
              DomManipulator.renderEmptyProjectPlaceholder(todos, display);
          }
      }        
  }

  static renderEmptyProjectPlaceholder(todos, display){
    document.querySelector('.main').innerHTML = 
        `<div class="add-or-remove">
            <div class="add-or-remove__heading">Empty Project!</div>
            <div class="add-or-remove__content">
                <div class="add-or-remove__content-text">
                    Create a new to-do item or delete project.
                </div>
                <div class="add-or-remove__content-btn">
                    Delete Project
                </div>
            </div>
        </div>`

      // remove project button
      document.querySelector('.add-or-remove__content-btn').addEventListener("click", () => {
          
      // delete project from todos data
      delete todos[ToDosManager.getCurrentProject()];
      
      document.querySelector('.main').innerHTML = "";
      // save todos to local storage
      localStorage.setItem("todos", JSON.stringify(todos));
      DomManipulator.renderProjectNames(todos, display);
      // change folder to home
      ToDosManager.changeCurrentProject('home');
      DomManipulator.renderAllTodos(todos, display);
      // update nave link to show home active
      document.querySelector('.nav').children.item(0).classList.add('nav__selected');
      console.log(document.querySelector('.nav').children.item(0));
    })
  }

  // applies checked status to checked items on reload
  static applyCheckedOnReaload(toDoItem){
    const toDoItems = toDoItem.children;
    // todo checkbox
    toDoItems[0].classList.toggle('todo__complete-checked');
    // todo title
    toDoItems[1].classList.toggle('todo__title-checked');
    // todo details button
    toDoItems[2].classList.toggle('todo__detail-checked');
    // todo date
    toDoItems[3].classList.toggle('todo__date-checked');
    // todo edit icon
    toDoItems[4].classList.toggle('todo__icon-checked');
    // todo delete icon
    toDoItems[5].classList.toggle('todo__icon-checked');
  }

  // toggle active visual styling to priority buttons in create new to-do menu
  static activePriority(e){
    // removes active status from all buttons
    DomManipulator.removeActivePriority();
    // apply active status to the selected button
    const priority = e.target.textContent.toLowerCase();
    e.target.classList.add(`create-new__priority-btn--${priority}-active`);
  }

  static removeActivePriority(){
    // removes active status from all buttons
    const btns = document.querySelectorAll('.create-new__priority-btn');
    btns.forEach(btn => {
        btn.classList.remove(`create-new__priority-btn--${btn.textContent.toLowerCase()}-active`)
    })
  }

  // change priority button sytling in edit menu
  static editPriority(e){
    // removes active status from all buttons
    const btns = document.querySelectorAll('.edit-popup__priority-btn');
    btns.forEach(btn => {
        btn.classList.remove(`edit-popup__priority-btn--${btn.textContent.toLowerCase()}-active`)
    })
    // apply active status to the selected button
    const priority = e.target.textContent.toLowerCase();
    e.target.classList.add(`edit-popup__priority-btn--${priority}-active`);
  }
  // display the amount of todo items next to the project title
  static renderProjectCount(todos, display){
  }

  // scroll project names to top
  static projectNamesScrollTop(){
    const projectsDiv = document.querySelector('.projects');
    projectsDiv.scrollTop = 0;
  }

  // scroll project names to bottom
  static projectNamesScrollBottom(){
    const projectsDiv = document.querySelector('.projects');
    projectsDiv.scrollTop = projectsDiv.scrollHeight;
  }

  static renderEmptyProjectPlaceholder(todos, display){
    document.querySelector('.main').innerHTML = 
        `<div class="add-or-remove">
            <div class="add-or-remove__heading">Empty Project!</div>
            <div class="add-or-remove__content">
                <div class="add-or-remove__content-text">
                    Create a new to-do item or delete project.
                </div>
                <div class="add-or-remove__content-btn">
                    Delete Project
                </div>
            </div>
        </div>`

        
    // remove project button
    document.querySelector('.add-or-remove__content-btn').addEventListener("click", () => {
      // delete project from todos data
      delete todos[ToDosManager.getCurrentProject()];
      document.querySelector('.main').innerHTML = "";
      // save todos to local storage
      localStorage.setItem("todos", JSON.stringify(todos));
      DomManipulator.renderProjectNames(todos, display);
      // change folder to home
      ToDosManager.changeCurrentProject('home');
      DomManipulator.renderAllTodos(todos, display);
      // update nave link to show home active
      document.querySelector('.nav').children.item(0).classList.add('nav__selected');
      console.log(document.querySelector('.nav').children.item(0));
    })
  }

  static resetActiveFormLink(){
    const createNewOptions = document.querySelectorAll('.create-new__options-items');
    createNewOptions.forEach(option => {
        option.classList.remove('create-new__options-items-active');
    });
    createNewOptions[0].classList.add('create-new__options-items-active');
  }
}