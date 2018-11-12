class Item {
  constructor(id, description, done) {
    this.id = id;
    this.description = description;
    this.done = done;
  }

  async markDone() {
    this.done = true;
    if (this.listener) {
      await this.listener();
    }
  }

  setDoneListener(listener) {
    this.listener = listener;
  }
}

module.exports = Item;
