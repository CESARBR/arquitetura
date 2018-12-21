class ItemListViewModel {
  constructor(items) {
    this._items = items;
  }

  get items() {
    return this._items.map(item => ({
      id: item.id,
      description: item.description,
      done: item.done ? 'yes' : 'no',
    }));
  }

  get markableIds() {
    return this._items.map(item => item.id);
  }

  get markableIdsList() {
    return this.markableIds.toString();
  }
}

module.exports = ItemListViewModel;
