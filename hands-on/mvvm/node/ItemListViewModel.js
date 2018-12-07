class ItemListViewModel {
  constructor(items) {
    this.items = items;
    this.items.forEach(item => item.setDoneListener(this._onItemDone.bind(this, item)));
  }

  setItemsChangedListener(itemsChangedListener) {
    this.itemsChangedListener = itemsChangedListener;
  }

  setMarkableIdsChangedListener(markableIdsChangedListerner) {
    this.markableIdsChangedListerner = markableIdsChangedListerner;
  }

  setQuestionVisibilityChangedListener(questionVisibilityChanged) {
    this.questionVisibilityChanged = questionVisibilityChanged;
  }

  async start() {
    if (this.itemsChangedListener) {
      await this.itemsChangedListener(this.items);
    }
    if (this.markableIdsChangedListerner) {
      const markableIds = this._getMarkableIds();
      await this.markableIdsChangedListerner(markableIds);
    }
    if (this.questionVisibilityChanged) {
      await this.questionVisibilityChanged(true);
    }
  }

  async markDone(id) {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      await item.markDone();
    }
  }

  async _onItemDone() {
    if (this.itemsChangedListener) {
      await this.itemsChangedListener(this.items);
    }
    if (this.questionVisibilityChanged) {
      await this.questionVisibilityChanged(true);
    }
  }

  _getMarkableIds() {
    return this.items.map(item => item.id);
  }
}

module.exports = ItemListViewModel;
