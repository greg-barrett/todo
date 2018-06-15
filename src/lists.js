

function List(title) {
  var btitle=title;
  this.title= (function(){
    return btitle[0].toUpperCase() + btitle.slice(1);
  })()
  this.objects=[];
  this.swim = function() {
    console.log("swimming");
  }
}


// export area
export {List};
