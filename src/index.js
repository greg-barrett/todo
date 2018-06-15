//imports

import {Item} from "./items";
import {List} from "./lists";
import {Board} from "./board";
List.prototype = Object.create(Board.prototype);
// import calls
const item1= new Item("buy milk", "shopping", 3);
const item2= new Item("buy eggs", "shopping", 3);
const list1=new List("First list");
list1.addObject(item1);
list1.addObject(item2);
const theBoard = new Board();
theBoard.addObject(list1);
//console.log(theBoard);

//dom manipulation
const listArea= document.querySelector("#list-area")
const listAdder= document.querySelector("#adder");

// click functions
adder.addEventListener("click", newList);

//outputs the data in the theBoard object
//also adds event listeners to the list divs.

function showBoard() {
  listArea.innerHTML="";

  for (var i=0; i< theBoard.objects.length; i++) {
    var listDiv= document.createElement("div");
    listDiv.classList.add("list-div");
    listDiv.id= i;
    listDiv.classList.add("list-small");



    var listTitle=document.createElement("h2");
    //listTitle.addEventListener("click", zoom, {once: true});
    listTitle.textContent=theBoard.objects[i].title;
    listDiv.appendChild(listTitle);
    listArea.appendChild(listDiv);

    if (theBoard.objects[i].objects.length !== 0) {
      for (var a=0; a< theBoard.objects[i].objects.length; a++) {
        var itemDiv= document.createElement("div");
        itemDiv.classList.add("item-div");
        itemDiv.id=a;

        itemDiv.addEventListener("click", setComplete);

        var itemName=document.createElement("p");
        itemName.textContent= "+  " + theBoard.objects[i].objects[a].name;

        var itemCatgory=document.createElement("p");
        itemCatgory.textContent="Category: " + theBoard.objects[i].objects[a].category;

        var itemPriority=document.createElement("p");
        itemPriority.textContent="Priority: " + theBoard.objects[i].objects[a].priority;

        var itemComplete=document.createElement("p");
        itemComplete.textContent=theBoard.objects[i].objects[a].complete;


        itemDiv.appendChild(itemName);
        itemDiv.appendChild(itemCatgory);
        itemDiv.appendChild(itemPriority);
        //itemDiv.appendChild(itemComplete);
        listDiv.appendChild(itemDiv);

      } }
      var addButton= document.createElement("div");
      addButton.innerText="+...";
      addButton.classList.add("add-item")
      addButton.addEventListener("click", zoom, {once: true});
      listDiv.appendChild(addButton);
  }
}


//triggers the procesing of the form and restors the page
function submit () {
  while (!checkForm()){return}
  processForm();
  removeForm();
  unZoom();
}

function checkForm() {
  var pass = false;
    if (document.querySelector(".item-name").value.length > 0 && document.querySelector(".item-category").value.length > 0 && document.querySelector(".item-priority").value.length >0) {
      pass=true;
    } else {
      alert("You need to fill in all the fields");
    }
    return pass;
}
//collects the data from the form calls a function to save the data
function processForm() {
  var itemInfo= saveDate();
  var newItem = createItem(itemInfo);
  saveItem(newItem);
  showBoard();
}

// runs on click of the submit button- collects the values from the form and reutrns an array
function saveDate(){
  var item=[]
  var name= document.querySelector(".item-name").value;
  var category= document.querySelector(".item-category").value;
  var priority= document.querySelector(".item-priority").value;
  item.push(name, category, priority);
  return item;
}

//makes the new item for the list out off the array from the previsou function
function createItem(array){
  let newItem= new Item();
  newItem.name=array[0];
  newItem.category=array[1];
  newItem.priority= array[2];
  return newItem;
}

//finds the title of the current div zoomed in.
//uses this to find the list object and then adds the new item to the lists objects
function saveItem (item) {
  var heading=document.querySelector(".list-zoom > h2")
  var title= heading.innerHTML;

  var theList= theBoard.objects.find(function(object){
    if (object.title === title){
      return object;
    }
  })
  theList.addObject(item);
}

//finds the zoomed div and restors it to its origanl location
function unZoom () {
  var zoomed=document.querySelector(".list-zoom")
  zoomed.classList.remove("list-zoom");
  zoomed.classList.add("list-small");
}

//finds the zommed div and removes the form from it
function removeForm() {
  var zoomed=document.querySelector(".list-zoom")
  zoomed.innerHTML="";
}

//creates a new list when the + button is clickeed.
function newList() {
  var listName= prompt("What is the name of the new List?");
  while (listName.length ===0) { listName= prompt("You have to name the List.");}
  var newList = new List(listName);
  theBoard.addObject(newList);
  showBoard();
}

//function for enlarging the list and showing the form
function zoom (){
    this.parentNode.classList.remove("list-small");
    this.parentNode.classList.add("list-zoom");
    this.classList.toggle("hide");
    showForm(this.parentNode);
}

// this function renders the form within the current list
function showForm(aDiv){
  const form= document.createElement("form");
  form.setAttribute('method', "post");
  form.setAttribute('action', "submit");

  var nameLabel = document.createElement("p"); //input element, text
  nameLabel.innerText="Task";

  var name = document.createElement("input"); //input element, text
  name.setAttribute('type',"text");
  name.setAttribute('name',"name");
  name.classList.add("item-name");

  var categoryLabel = document.createElement("p"); //input element, text
  categoryLabel.innerText="Category";

  var category = document.createElement("select");
  category.classList.add("item-category");
  //category.setAttribute('name',"categories");
  var shopping =document.createElement("option");
  shopping.text="Shopping";
  shopping.value="Shopping";
  category.appendChild(shopping);
  var work =document.createElement("option");
  work.text="Work";
  work.value="Work";
  category.appendChild(work);

  var school =document.createElement("option");
  school.text="School";
  school.value="School";
  category.appendChild(school);

  var home =document.createElement("option");
  home.text="Home";
  home.value="Home";
  category.appendChild(home);

  var cleaning =document.createElement("option");
  cleaning.text="Cleaning";
  cleaning.value="Cleaning";
  category.appendChild(cleaning);

  var diy =document.createElement("option");
  diy.text="DIY";
  diy.value="DIY";
  category.appendChild(diy);

  var priorityLabel = document.createElement("p"); //input element, text
  priorityLabel.innerText="Priority";

  var priority = document.createElement("select");
  priority.classList.add("item-priority");
  //category.setAttribute('name',"categories");
  var one =document.createElement("option");
  one.text="1";
  one.value="1";
  priority.appendChild(one);
  var two =document.createElement("option");
  two.text="2";
  two.value="2";
  priority.appendChild(two);
  var three =document.createElement("option");
  three.text="3";
  three.value="3";
  priority.appendChild(three);
  var four =document.createElement("option");
  four.text="4";
  four.value="4";
  priority.appendChild(four);
  var five =document.createElement("option");
  five.text="5";
  five.value="5";
  priority.appendChild(five);

  var s = document.createElement("button"); //input element, Submit button
  s.setAttribute('type',"button");
  s.setAttribute('value', "Add to List");
  s.textContent="Add";
  s.classList.add("item-submit");
  s.addEventListener("click", submit);

  var close = document.createElement("button");
  close.textContent="Close";
  close.setAttribute('type', "button");
  close.addEventListener("click", cancel);

  form.appendChild(nameLabel);
  form.appendChild(name);
  form.appendChild(categoryLabel);
  form.appendChild(category);
  form.appendChild(priorityLabel);
  form.appendChild(priority);
  form.appendChild(s);
  form.appendChild(close);
  aDiv.appendChild(form);

}

//shrinks the form without adding an item
function cancel () {
  removeForm();
  unZoom();
  showBoard();
}
function setComplete() {
  var listIndex=this.parentNode.id;
  var itemIndex=this.id;
  var theItem=theBoard.objects[listIndex].objects[itemIndex];
  var result=theBoard.objects[listIndex].objects[itemIndex].toggleComplete();
  this.classList.toggle("done");
}
//test area for caps

var mylist = new List("todo");
