/** @type {boolean} */
jQuery.support.cors=true;
function random(min,max) {
  return Math.floor(Math.random()*(max-min+1))+min;
}
function maxuid() {
  $.ajax({
    dataType : "json",
    url : "http://api.oboobs.ru/boobs/",
    async : false
  }).done(function(count) {
      max=count[0]['id'];
  }).fail(function(empty) {
      max=10313;
  });
  return max;
}
function buffer() {
  var min=3;
  var max=maxuid();
  var uid=random(min,max);
  var id;
  $.ajax({
    dataType:"json",
    url:"http://api.oboobs.ru/boobs/get/"+uid,
    async:true,
    success:function(data) {
    var id=data[0]['preview'];
    var img = new Image();
    img.onload = function() {
      $("#dtext").html('<p>'+id+'</p><p>'+this.width+' x '+this.height+'</p><p id="after">none</p>');
      $("#images").html('<img class="img" src="'+img.src+'">');
      if(this.width<this.height) {
        var h=this.height/(this.width/118);
        h<153?h=153:h=h;
        $(".img").width("118").height(h);
      } else {
        var w=this.width/(this.height/153);
        var m=0;
        w<118?w=118:w=w;
        $(".img").width(w).height("153");
        if(w>118) {
          $(".img").css("margin-left","-"+(w-118)/2+"px");
        }
      }
      $("#after").html($('.img').width()+" x "+$('.img').height());
    }
    img.src = "http://media.oboobs.ru/"+id+"";
    },
    error:function(data) {
      buffer();
    }
  });
}
$(document).ready(function() {
  buffer();
  /** @type {number} */
  var fx=setInterval(function() {
    buffer();
  }, 10000);
});