const readline = require('readline');

class ItemListView {
  constructor(itemListController) {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.itemListController = itemListController;
  }

  async start() {
    const items = this.itemListController.getItems();
    items.forEach(item => item.setDoneListener(this._onItemDone.bind(this)));
    this._showItems(items);

    const markableIds = this.itemListController.getMarkableIds();
    const chosenId = await this._askDone(markableIds);
    await this.itemListController.markDone(chosenId);
  }

  async _onItemDone() {
    const items = this.itemListController.getItems();
    items.forEach(item => item.setDoneListener(this._onItemDone.bind(this)));
    this._showItems(items);

    const markableIds = this.itemListController.getMarkableIds();
    const chosenId = await this._askDone(markableIds);
    await this.itemListController.markDone(chosenId);
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
