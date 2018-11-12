const Item = require('./Item');
const ItemListController = require('./ItemListController');
const ItemListView = require('./ItemListView');

const item1 = new Item(1, 'Create MVC with one item', false);
const item2 = new Item(2, 'Enhance with a list', false);
const controller = new ItemListController([item1, item2]);
const view = new ItemListView(controller);

async function main() {
  await view.start();
}
main();
