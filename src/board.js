function Board() {
  this.objects=[];
}

Board.prototype.addObject= function(object) {
  this.objects.push(object);
}

Board.prototype.removeObject= function(theObject) {
  const index= this.objects.findIndex(function(object) {
    if (theObject === object)
    return object;
  })
  this.objects.splice(index, 1)
}



// export area
export {Board};
