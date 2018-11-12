const Item = require('./Item');
const ItemListPresenter = require('./ItemListPresenter');
const ItemListView = require('./ItemListView');

const item1 = new Item(1, 'Create MVP with one item', false);
const item2 = new Item(2, 'Enhance with a list', false);
const presenter = new ItemListPresenter([item1, item2]);
const view = new ItemListView(presenter);
presenter.setView(view);

async function main() {
  view.start();
}
main();
