const readline = require('readline');

class ItemListView {
  constructor(itemListPresenter) {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.itemListPresenter = itemListPresenter;
  }

  async start() {
    await this.itemListPresenter.start();
  }

  showItems(items) {
    items.forEach(item => console.log(`#${item.id} '${item.description}' - Done? ${item.done ? 'yes' : 'no'}`));
  }

  async askDone(markableIds) {
    let answer = 0;
    do {
      answer = await new Promise((resolve) => {
        this.rl.question(`Which item is done? [${markableIds.toString()}] `, resolve);
      });
    } while (!this._isValid(answer, markableIds));
    const id = parseInt(answer, 10);
    await this.itemListPresenter.markDone(id);
  }

  _isValid(value, validValues) {
    const valueInt = parseInt(value, 10);
    return valueInt != NaN && validValues.indexOf(valueInt) != -1;
  }
}

module.exports = ItemListView;
