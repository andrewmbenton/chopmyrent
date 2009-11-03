Array.prototype.sum = function() {
  return (! this.length) ? 0 : this.slice(1).sum() + (parseFloat(this[0]));
};

if (!Array.prototype.forEach)
{
  Array.prototype.forEach = function(fun /*, thisp*/)
  {
    var len = this.length;
    if (typeof fun != "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this)
        fun.call(thisp, this[i], i, this);
    }
  };
}

RentCalculator = function() {

  this.bdrms = 2.0;
  
  this.recalculate = function() {
    var totalRent = parseFloat( $("#total-rent").val() );
    var totalArea = parseFloat( $("#total-area").val() );
//    var commonWeight = parseFloat( $("#common-weight").val() );
    var bdrmAreas = [];
    $("input[name='bdrm-area']").each( function() {
      bdrmAreas.push(parseFloat($(this).val()));
    });
    this.bdrms = bdrmAreas.length;
    totalBdrmArea = bdrmAreas.sum();
    totalOtherArea = totalArea - totalBdrmArea;
    bdrmAreas.forEach( function(value, index, array) {
      $("#bdrm-"+(index+1)+"-rent").text(
        totalRent * ( (totalOtherArea/totalArea/array.length) + (value/totalArea) )
      );
    });
  };
  
}

$( function() {
  rentCalc = new RentCalculator();
  $("input").change( function() {
    rentCalc.recalculate();
  });
  $("#add-bdrm-link").click( function() {
    $("#add-bdrm").before(
      '<tr id="bdrm-'+(rentCalc.bdrms+1)+'">\
         <td><span>area of bedroom '+(rentCalc.bdrms+1)+':</span></td>\
         <td><input type="text" name="bdrm-area" id="bdrm-'+(rentCalc.bdrms+1)+'-area" size="6"></td>\
         <td><span>rent for bedroom '+(rentCalc.bdrms+1)+':</span></td>\
         <td><span id="bdrm-'+(rentCalc.bdrms+1)+'-rent"></span></td>\
       </tr>'
    );
    $("input").change( function() {
      rentCalc.recalculate();
    });
  });
});
