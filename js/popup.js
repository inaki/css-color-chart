var $tiles = $('#color-tiles');
var $tabs = $('.tabs');
var $tabContainer = $('.tabs-container');
var tilesContainerStyle = 'display: flex; flex-wrap: wrap; justify-content: center;';
// clipboard instanciation with the class 'btn' which is on every tile
var clipboard = new Clipboard('.btn', {
    target: function(trigger) {
        $('.name').hide();
        $('.copied').show();

        setTimeout(function () {
          $('.copied').hide();
          $('.name').show();
        }, 1500);

        console.log(trigger);
    }
});

// implementing the right contrast in the name of the tiles
function getContrastYIQ(hexcolor){
  var hex = hexcolor.slice(1, hexcolor.length);
	var r = parseInt(hex.substr(0,2),16);
	var g = parseInt(hex.substr(2,2),16);
	var b = parseInt(hex.substr(4,2),16);
	var yiq = ((r*299)+(g*587)+(b*114))/1000;
	return (yiq >= 200) ? 'black' : 'white';
}

// iterating through the colors object and appending the color tiles to the tool
$.each(colors, function(index, value){
  var tab = '<li class="tab-link ' + value.id + '-tab" data-tab="' + value.id + '">' + value.title + '</li>';
  var tabContent = '<div id="' + value.id + '" class="tab-content"></div>';
  var section = '<h3>'+ value.title +'</h3><div style="' + tilesContainerStyle + '" id="' + value.id + '"></div>';

  $tabs.append(tab);
  $tabContainer.append(tabContent);
  $tiles.append(section);

  $.each(value.colorArray, function(i, v){
    var textColor = getContrastYIQ(v[1]);
    $('#' + value.id + '')
      .append('<div class="tile btn" data-clipboard-text="' + v[0].toLowerCase() + '" style="background-color:' + v[0] + '"><div class="name ' + textColor + '">' + v[0] + '</div><div class="copied ' + textColor + '">copied!</div></div>');
      $('.copied').hide();
  });
});

// adding the current class to the tab link and the tiles group to be showed by clicking
$('#pinks').addClass('current');
$('.pinks-tab').addClass('current');

$('ul.tabs li').click(function(){
	var tab_id = $(this).attr('data-tab');

	$('ul.tabs li').removeClass('current');
	$('.tab-content').removeClass('current');

	$(this).addClass('current');
	$("#"+tab_id).addClass('current');
});
