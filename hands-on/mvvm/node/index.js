const Item = require('./Item');
const ItemListViewModel = require('./ItemListViewModel');
const ItemListView = require('./ItemListView');

const item1 = new Item(1, 'Create MVVM with one item', false);
const item2 = new Item(2, 'Enhance with a list', false);
const viewModel = new ItemListViewModel([item1, item2]);
const view = new ItemListView(viewModel);

async function main() {
  view.start();
}
main();
