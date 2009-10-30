function recalculate() {
  var totalRent = parseFloat( $("#total_rent").val() );
  var roomOneSize = parseFloat( $("#bdrm_1_size").val() );
  var roomTwoSize = parseFloat( $("#bdrm_2_size").val() );
  var totalArea = roomOneSize + roomTwoSize;

  $("#bdrm_2_rent").text(totalRent * roomTwoSize / totalArea);
  $("#bdrm_1_rent").text(totalRent * roomOneSize / totalArea);
}

$( function() {
  $("h1").click( function() {
    recalculate();
  });
});
