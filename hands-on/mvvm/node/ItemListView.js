const readline = require('readline');

class ItemListView {
  constructor(itemListViewModel) {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.itemListViewModel = itemListViewModel;
    this.itemListViewModel.setItemsChangedListener(this._onItemsChanged.bind(this));
    this.itemListViewModel.setMarkableIdsChangedListener(this._onMarkableIdsChanged.bind(this));
    this.itemListViewModel.setQuestionVisibilityChangedListener(this._onQuestionVisibilityChanged.bind(this));
  }

  async start() {
    await this.itemListViewModel.start();
  }

  async _onItemsChanged(items) {
    this._showItems(items);
  }

  async _onMarkableIdsChanged(markableIds) {
    this.markableIds = markableIds;
  }

  async _onQuestionVisibilityChanged(visible) {
    if (visible) {
      const chosenId = await this._askDone(this.markableIds);
      await this.itemListViewModel.markDone(chosenId);
    }
  }

  _showItems(items) {
    items.forEach(item => console.log(`#${item.id} '${item.description}' - Done? ${item.done ? 'yes' : 'no'}`));
  }

  async _askDone(markableIds) {
    let answer = 0;
    do {
      answer = await new Promise((resolve) => {
        this.rl.question(`Which item is done? [${markableIds.toString()}] `, resolve);
      });
    } while (!this._isValid(answer, markableIds));
    return parseInt(answer, 10);
  }

  _isValid(value, validValues) {
    const valueInt = parseInt(value, 10);
    return valueInt != NaN && validValues.indexOf(valueInt) != -1;
  }
}

module.exports = ItemListView;
