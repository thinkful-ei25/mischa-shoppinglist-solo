'use strict';
const STORE = [
  {name: "apples", checked: false},
  {name: "oranges", checked: false},
  {name: "milk", checked: true},
  {name: "bread", checked: false}
];

//each item in STORE generate HTML <li> string --> 
//item name as inner text
//item's index as data attr
//item's checked state (t/f) rendered as /shopping-item__checked css
//join the items strings into one long string .join then .html

function renderShoppingList() {
  // this function will be responsible for rendering the shopping list in
  // the DOM
  //find .js-shopping-list UL item ==> insert into UL

  console.log('`renderShoppingList` ran');
  const handleShoppingListItemsString = '<li>apples</li>';
  $('.js-shopping-list').html(handleShoppingListItemsString);

}


function handleNewItemSubmit() {
  // this function will be responsible for when users add a new shopping list item
  console.log('`handleNewItemSubmit` ran');
}


function handleItemCheckClicked() {
  // this function will be responsible for when users click the "check" button on
  // a shopping list item.
  console.log('`handleItemCheckClicked` ran');
}


function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  console.log('`handleDeleteItemClicked` ran');
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
}

$(handleShoppingList());