function Item(name, category, priority) {
  this.name=name;
  this.category=category;
  this.complete=false;
  this.priority=priority;
}
Item.prototype.toggleComplete= function() {
  (this.complete) ? this.complete=false : this.complete = true;
}

// export area
export {Item};
