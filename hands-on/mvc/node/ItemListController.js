class ItemListController {
  constructor(items) {
    this.items = items;
  }

  getItems() {
    return this.items;
  }

  async markDone(id) {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      await item.markDone();
    }
  }

  getMarkableIds() {
    return this.items.map(item => item.id);
  }
}

module.exports = ItemListController;
