function myTips(){
      this.tipswidth = 280;
      this.idx  = 0;
      this.tipstab =[];
      this.nexttext = "Suivant";
      this.prevtext = "Précédent";
      this.finishtext = "Terminer";
      this.back = "<div id='backtips'></div>";
      this.show = "<div style='width:"+this.tipswidth+"px;' class='tips-container center' id='tips-container'>"+
            "<div class='step'>"+
            "<span style='float:right;padding-right:8px;'><button class='close' style='font-size:14px;color:white!important;'><i class='fa fa-times' aria-hidden='true'></i></button></span>"+
            "</div>"+
            "<div class='msg'>"+
            "</div>"+
            "<div class='' style='width:80%;text-align:center;margin-left:auto;margin-right:auto'>"+
            "<hr style='margin-bottom:10px;margin-top:0px;'>"+
            "</div>"+
            "<div style='text-align:center;height:20px;' class='bottom'>"+
                  "<button class='tips-prev'>"+this.prevtext+"</button>"+
                  "<button class='tips-next'>"+this.nexttext+"</button>"+
                  "<button class='tips-finish'>"+this.finishtext+"</button>"+
            "</div>"+
            "<div style='text-align:center;padding-top:20px;font-size:11px;width:100%;' class='underbottom'>"+
                  "Powered By Codepart <img src='http://res.cloudinary.com/doyoubiz/image/upload/v1477737930/like_qmln3k.png' style='width:15px;height:auto;margin-left:4px;'>"+
            "</div>"+
      "</div>";
      var here = this;
      $('body').on('click','button.tips-next',function(){
            here.tipsnext();
      });
      $('body').on('click','button.tips-prev',function(){
            here.tipsprev();
      });

      $('body').on('click','button.close',function(){
            $(here.tipstab[here.idx]).removeClass('relative');
            here.idx = 0;
            $('#tips-container').remove();
            $('#backtips').remove();
      });

      $('body').on('click','button.tips-finish',function(){
            $(here.tipstab[here.idx]).removeClass('relative');
            here.idx = 0;
            $('#tips-container').remove();
            $('#backtips').remove();
      });

};

function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

myTips.prototype.restart =function(){
      this.idx = 0;
      this.display();
};

myTips.prototype.tipsnext =function(){
      $(this.tipstab[this.idx]).removeClass('relative');
      this.idx++;
      if(this.idx==$('.tipstools').length-1){
      }
      $('#backtips').remove();
      $('#tips-container').remove();
      this.display();
};

myTips.prototype.tipsprev =function(){
      $(this.tipstab[this.idx]).removeClass('relative');
      this.idx--;
      if(this.idx<0){
            this.idx=0;
      }
      $('#backtips').remove();
      $('#tips-container').remove();
      this.display();
};

myTips.prototype.display =function(data){
      var offset = this.tipstab[this.idx].offset();
      var elwidth = this.tipstab[this.idx].innerWidth();
      var msg = this.tipstab[this.idx].attr('tips-msg');
      var elheight = this.tipstab[this.idx].innerHeight();
      var maxwidth = $(window).width();
      var maxheight = $(window).height();

      if(Math.abs(offset.left+elwidth/2 - maxwidth) > this.tipswidth/2){
            if(offset.left+elwidth/2 > this.tipswidth/2){
                  //MILIEU
                  var topoffset = offset.top+elheight+15;
                  var leftoffset = Math.ceil(offset.left+elwidth/2) - this.tipswidth/2;
                  $('body').append(this.show);
                  $("#tips-container").offset({ top: topoffset, left: leftoffset});
                  $('#tips-container div.msg').html(msg);
                  $("#tips-container").addClass('center');
            }else{
                  var topoffset = offset.top+elheight+15;
                  var leftoffset = offset.left;
                  $('body').append(this.show);
                  $("#tips-container").offset({ top: topoffset, left: leftoffset});
                  $('#tips-container div.msg').html(msg);
                  $("#tips-container").addClass('left');
            }
      }else if(Math.abs(offset.left+elwidth/2) > this.tipswidth/2){
            // alert('a gauche');
            var topoffset = offset.top+elheight+15;
            var leftoffset = offset.left+elwidth - this.tipswidth;
            $('body').append(this.show);
            $("#tips-container").offset({ top: topoffset, left: leftoffset});
            $('#tips-container div.msg').html(msg);

            $("#tips-container").addClass('right');
      }else{
            var topoffset = offset.top+elheight+15;
            var leftoffset = offset.left;

            $('body').append(this.show);
            $("#tips-container").offset({ top: topoffset, left: leftoffset});
            $('#tips-container div.msg').html(msg);
            $("#tips-container").addClass('right');
      }
      $('#tips-container .step').prepend('<span class="big">'+(this.idx+1)+' </span>/ '+$(".tipstools").length);
      $('body').append(this.back);
      $(this.tipstab[this.idx]).addClass('relative');
      
      var visibletop = $(window).scrollTop();
      
      if($('#tips-container').offset().top+$('#tips-container').height() < (visibletop+maxheight) && $('#tips-container').offset().top>visibletop){
            // alert('visible');
      }else{
            $('html, body').animate({
                  scrollTop: $("#tips-container").offset().top-170
            }, 800);
      }
      
      if(this.idx==0){
            $('#tips-container button.tips-prev').hide();
            $('#tips-container .bottom').addClass('center');
            $('#tips-container button.tips-finish').hide();
      }
      if(this.idx==$('.tipstools').length-1){
            $('#tips-container button.tips-next').hide();
            // alert('ok');
            $('#tips-container button.tips-finish').show();
            $('#tips-container .bottom').addClass('center');
      }else{
            $('#tips-container button.tips-finish').hide();
      }
}

myTips.prototype.setTipswidth =function(data){
      this.tipswidth = data;
      this.show =
            "<div style='width:"+this.tipswidth+"px;' class='tips-container center' id='tips-container'>"+
            "<div class='step'>"+
            "<span style='float:right;padding-right:8px;'><button class='close' style='font-size:14px;color:white!important;'><i class='fa fa-times' aria-hidden='true'></i></button></span>"+
            "</div>"+
            "<div class='msg'>"+
            "</div>"+
            "<div class='' style='width:80%;text-align:center;margin-left:auto;margin-right:auto'>"+
            "<hr style='margin-bottom:10px;margin-top:0px;'>"+
            "</div>"+
            "<div style='text-align:center;height:20px;' class='bottom'>"+
                  "<button class='tips-prev'>"+this.prevtext+"</button>"+
                  "<button class='tips-next'>"+this.nexttext+"</button>"+
                  "<button class='tips-finish'>"+this.finishtext+"</button>"+
            "</div>"+
            "<div style='text-align:center;padding-top:20px;font-size:10px;width:100%;' class='underbottom'>"+
                  "Powered By <b>Codepart</b> <img src='http://res.cloudinary.com/doyoubiz/image/upload/v1477737930/like_qmln3k.png' style='width:15px;height:auto;margin-left:4px;'>"+
            "</div>"+
      "</div>";
}

myTips.prototype.setNexttext =function(data){
      this.nexttext = data;
      this.show =
            "<div style='width:"+this.tipswidth+"px;' class='tips-container center' id='tips-container'>"+
            "<div class='step'>"+
            "<span style='float:right;padding-right:8px;'><button class='close' style='font-size:14px;color:white!important;'><i class='fa fa-times' aria-hidden='true'></i></button></span>"+
            "</div>"+
            "<div class='msg'>"+
            "</div>"+
            "<div class='' style='width:80%;text-align:center;margin-left:auto;margin-right:auto'>"+
            "<hr style='margin-bottom:10px;margin-top:0px;'>"+
            "</div>"+
            "<div style='text-align:center;height:20px;' class='bottom'>"+
                  "<button class='tips-prev'>"+this.prevtext+"</button>"+
                  "<button class='tips-next'>"+this.nexttext+"</button>"+
                  "<button class='tips-finish'>"+this.finishtext+"</button>"+
            "</div>"+
            "<div style='text-align:center;padding-top:20px;font-size:10px;width:100%;' class='underbottom'>"+
                  "Powered By <b>Codepart</b> <img src='http://res.cloudinary.com/doyoubiz/image/upload/v1477737930/like_qmln3k.png' style='width:15px;height:auto;margin-left:4px;'>"+
            "</div>"+
      "</div>";
}

myTips.prototype.setPrevtext =function(data){
      this.prevtext = data;
      this.show =
            "<div style='width:"+this.tipswidth+"px;' class='tips-container center' id='tips-container'>"+
            "<div class='step'>"+
            "<span style='float:right;padding-right:8px;'><button class='close' style='font-size:14px;color:white!important;'><i class='fa fa-times' aria-hidden='true'></i></button></span>"+
            "</div>"+
            "<div class='msg'>"+
            "</div>"+
            "<div class='' style='width:80%;text-align:center;margin-left:auto;margin-right:auto'>"+
            "<hr style='margin-bottom:10px;margin-top:0px;'>"+
            "</div>"+
            "<div style='text-align:center;height:20px;' class='bottom'>"+
                  "<button class='tips-prev'>"+this.prevtext+"</button>"+
                  "<button class='tips-next'>"+this.nexttext+"</button>"+
                  "<button class='tips-finish'>"+this.finishtext+"</button>"+
            "</div>"+
            "<div style='text-align:center;padding-top:20px;font-size:10px;width:100%;' class='underbottom'>"+
                  "Powered By <b>Codepart</b> <img src='http://res.cloudinary.com/doyoubiz/image/upload/v1477737930/like_qmln3k.png' style='width:15px;height:auto;margin-left:4px;'>"+
            "</div>"+
      "</div>";
}

myTips.prototype.setFinishtext =function(data){
      this.finishtext = data;
      this.show =
            "<div style='width:"+this.tipswidth+"px;' class='tips-container center' id='tips-container'>"+
            "<div class='step'>"+
            "<span style='float:right;padding-right:8px;'><button class='close' style='font-size:14px;color:white!important;'><i class='fa fa-times' aria-hidden='true'></i></button></span>"+
            "</div>"+
            "<div class='msg'>"+
            "</div>"+
            "<div class='' style='width:80%;text-align:center;margin-left:auto;margin-right:auto'>"+
            "<hr style='margin-bottom:10px;margin-top:0px;'>"+
            "</div>"+
            "<div style='text-align:center;height:20px;' class='bottom'>"+
                  "<button class='tips-prev'>"+this.prevtext+"</button>"+
                  "<button class='tips-next'>"+this.nexttext+"</button>"+
                  "<button class='tips-finish'>"+this.finishtext+"</button>"+
            "</div>"+
            "<div style='text-align:center;padding-top:20px;font-size:10px;width:100%;' class='underbottom'>"+
                  "Powered By <b>Codepart</b> <img src='http://res.cloudinary.com/doyoubiz/image/upload/v1477737930/like_qmln3k.png' style='width:15px;height:auto;margin-left:4px;'>"+
            "</div>"+
      "</div>";
}

myTips.prototype.init_tooltips=function(){
      var here = this;

      function compare(a,b) {
            if (parseInt(a.attr('tips-pos')) <= parseInt(b.attr('tips-pos'))){
                  return -1;
            }
            if (parseInt(a.attr('tips-pos')) > parseInt(b.attr('tips-pos'))){
                  return 1;
            }
            return 0;
      }
      
      $(".tipstools").each(function( index ) {
            here.tipstab.push($(this));
            if(index==$('.tipstools').length-1){
                  here.tipstab.sort(compare);
            }
      });
}