class ItemListPresenter {
  constructor(items) {
    this.items = items;
    this.items.forEach(item => item.setDoneListener(this._onItemDone.bind(this, item)));
  }

  setView(view) {
    this.view = view;
  }

  async start() {
    this.view.showItems(this.items);

    const markableIds = this._getMarkableIds();
    await this.view.askDone(markableIds);
  }

  async _onItemDone() {
    this.view.showItems(this.items);

    const markableIds = this._getMarkableIds();
    await this.view.askDone(markableIds);
  }

  async markDone(id) {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      await item.markDone();
    }
  }

  _getMarkableIds() {
    return this.items.map(item => item.id);
  }
}

module.exports = ItemListPresenter;
