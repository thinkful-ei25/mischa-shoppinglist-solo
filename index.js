'use strict';

const STORE = {
  items : [
    {name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: false},
    {name: 'eggs', checked: true}
  ],
  hideCompleted : false,
};


//each item in STORE generate HTML <li> string --> 
//item name as inner text
//item's index as data attr
//item's checked state (t/f) rendered as /shopping-item__checked css
//join the items strings into one long string .join then .html


function generateItemElement(item, itemIndex){
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-iem js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
          <span class="buttong-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
        </button>
        <button class="shopping-item-edit js-item-edit">
          <span class="button-label">edit</span>
        </button>
      </div>
    </li>
    `;
}

function generateShoppingItemsString(shoppingList) {
  const items = shoppingList.map(function (item,index){
    if (item.name === ''){
      return generateItemFormElement(index);
    }else {
      return generateItemElement(item, index);
    }
  });
  return items.join('');
}

function renderShoppingList() {
  let filteredItems = [...STORE.items];
  if (STORE.hideCompleted) {
    //if is true --> alter filteredItems list to only include where items = false
    // filteredItems = filteredItems.filter(item => item.checked === false)
    filteredItems = filteredItems.filter(item => !item.checked);
  }
  //if editing then find nameless entry and generate form else geneterateShoppingItemsString

  // console.log('`renderShoppingList` ran');
  const handleShoppingListItemsString = generateShoppingItemsString(filteredItems);
  // console.log(STORE.editing);
  //insert html into DOM
  $('.js-shopping-list').html(handleShoppingListItemsString);

}

function addItemToShoppingList(itemName){
  const newItem = {name : itemName, checked: false};
  STORE.items.push(newItem);
}

function handleNewItemSubmit() {
  // this function will be responsible for when users add a new shopping list item
  $('#js-shopping-list-form').submit(function(event){
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function getItemIndexFromElement(item){
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);

}

function handleItemCheckClicked() {
  // this function will be responsible for when users click the "check" button on
  // a shopping list item.
  // --- Listen for when a user clicks the 'check' button on an item.
  // --- Retrieve the item's index in STORE from the data attribute.
  // - Toggle the checked property for the item at that index in STORE.
  // Re-render the shopping list.
  $('.js-shopping-list').on('click', '.js-item-toggle', (event)=>{
    const itemIndex = getItemIndexFromElement(event.target);
    STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
    renderShoppingList();
  });
  
}

function deleteItem(itemIndex){
  //remove lement from array
  STORE.items.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // const index = getItemIndexFromElement(event.target);
  // $('.js-shopping-list').on('click','.js-item-delete', event => {
  $('.js-shopping-list').on('click', '.js-item-delete', (event)=>{
    const itemIndex = getItemIndexFromElement(event.target);
    deleteItem(itemIndex);
    renderShoppingList();
  });

  // console.log('`handleDeleteItemClicked` ran');
}

function toggleHideFilter(){
  STORE.hideCompleted = !STORE.hideCompleted;
  // console.log(STORE.hideCompleted);
  return;
}

function handleToggleHideClick(){
  $('#toggle-completed-filter').click(( ) => {
    toggleHideFilter();
    renderShoppingList();
  });
}

function searchDatabaseForNameMatches(searchTerm){
  const matches = STORE.items.filter(item => item.name.includes(searchTerm));
  let htmlMatchesStrings = generateShoppingItemsString(matches);
  return htmlMatchesStrings;
}

function handleSearchClick(){
  $('#search-submit').click((event) => {
    event.preventDefault();
    const searchTerm = $('.js-search-names-entry').val();
    $('#js-search-names-form').val('');
    const htmlMatchesStrings = searchDatabaseForNameMatches(searchTerm);
    $('.js-shopping-list').html(htmlMatchesStrings);
  });
}
function generateItemFormElement(index){
  return `
    <li class="js-item-index-element" data-item-index="${index}">
    <form id=rename-shopping-list-form-at-${index} class="rename-shopping-list-form">
      <label for="rename-shopping-list-entry">Rename</label>
      <input type="text" name="rename-shopping-list-entry" class="js-rename-form" placeholder="e.g., broccoli">
      <button type="submit">Add item</button>
    </form> 
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle js-item-toggle">
        <span class="buttong-label">check</span>
      </button>
      <button class="shopping-item-delete js-item-delete">
        <span class="button-label">delete</span>
      </button>
      <button class="shopping-item-edit js-item-edit">
        <span class="button-label">edit</span>
      </button>
    </div>
  </li>
  `;
}

function updateName(index, itemName){
  STORE.items[index].name = itemName;
}
function nameIsEmpty(itemIndex){
  return !STORE.items[itemIndex].name ?  true : false;
}

function handleRenameFormSubmit(){
  $('.js-shopping-list').on('submit','.rename-shopping-list-form',(event) => {
    event.preventDefault();
    const index = getItemIndexFromElement(event.target);
    const newName = $(`#rename-shopping-list-form-at-${index} > input`).val();
    if(!newName) return;
    updateName(index, newName);
    renderShoppingList();
  });
}
function removeNameAtIndex(itemIndex){
  if (STORE.items[itemIndex].name === '') return false;
  else STORE.items[itemIndex].name = '';
}

function handleEditClick(){
  //get form html
  //replace name span with for
  //on submit 
  // get the value 
  // replace name with the value
  $('.js-shopping-list').on('click','.js-item-edit',(event) =>{
    const itemIndex = getItemIndexFromElement(event.target);
    if(nameIsEmpty(itemIndex)) return;
    removeNameAtIndex(itemIndex);
    renderShoppingList();
  });
  // console.log('done!');
}
// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleToggleHideClick();
  handleEditClick();
  handleRenameFormSubmit();
  handleSearchClick();
}

$(handleShoppingList());


//for new cahllenge ==> add new form elements to .html
//how to edit is up to you!
// ==> add edit button? OR as double click? 