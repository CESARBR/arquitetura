const ItemListViewModel = require('./ItemListViewModel');

class ItemListPresenter {
  constructor(items) {
    this.items = items;
    this.items.forEach(item => item.setDoneListener(this._onItemDone.bind(this, item)));
  }

  setView(view) {
    this.view = view;
  }

  async start() {
    const viewModel = new ItemListViewModel(this.items);
    this.view.showItems(viewModel);
    await this.view.askDone(viewModel);
  }

  async _onItemDone() {
    const viewModel = new ItemListViewModel(this.items);
    this.view.showItems(viewModel);
    await this.view.askDone(viewModel);
  }

  async markDone(id) {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      await item.markDone();
    }
  }
}

module.exports = ItemListPresenter;
