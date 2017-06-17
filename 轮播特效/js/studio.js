$(function() {
	$('a').focus(function() {
		$(this).blur();
	});
});

///LOGO渐显渐隐///
/*
$(function() {
	$('.header .logo').live({
	   mouseenter:
	   function()
	   {
		   $(this).fadeTo(200, 0.6);
	   },
	   mouseleave:
	   function()
	   {
		   $(this).fadeTo(200, 1);
	   }
	});
});
*/

///导航渐显渐隐///
/*
$(function() {
	$('.header .nav a').click(function() {
		$(this).addClass('current');
	});
	
	$('.header .nav a').live({
	   mouseenter:
	   function()
	   {
		   $(this).fadeTo(200, 0.6);
	   },
	   mouseleave:
	   function()
	   {
		   $(this).fadeTo(200, 1);
	   }
	});
});
*/



<!-- 首页超大banner切换效果 -->
$(function(){
	var index = 0;
	var imgWidth = $('.pics_switch .pic_box').width();//单张图片宽度
	//alert(imgWidth);
	var len = $('.pics_switch .pic_box').length;//图片数
	//alert(len)
	var totalImgWidth = imgWidth*len;//图片序列宽度
	
	//默认banne宽度是1600，低于1600的分辨率会出现位置偏差，需要调整，故在低于1600下设置banner宽度为100%；
	if($(window).width()<imgWidth) {
		$('.ps_box .pics_switch').css({'width':$(window).width()});
		$('.ps_box .pics_switch .pic_box').css({'width':$(window).width()});
		$('.ps_box .pics_switch .pic_box a').css({'width':$(window).width()});
		imgWidth = $(window).width();
	}
	
	//小按钮鼠标滑过透明度
	$('.ps_box .pics_switch_clients ul li').css({'opacity':0.3});
	$('.ps_box .pics_switch_clients ul li span.current').css({'opacity':0.8});
	$('.pics_switch_clients li').hover(function() {
			$(this).addClass('hover');
		},function() {
			$(this).removeClass('hover');
		}
	);
	
	//左右翻页按钮滑过透明度
	$('.ps_box .pics_switch .viewArrows').css({'opacity':0.4});
	$('.ps_box .pics_switch .viewArrows').hover(function() {
			$(this).fadeTo(200, 0.8);
		},function() {
			$(this).fadeTo(200, 0.4);
		}
	);
	
	//为小按钮添加鼠标滑入事件，以显示相应的内容
	$('.ps_box .pics_switch_clients ul li').css("opacity",0.4).mouseover(function() {
		index = $('.ps_box .pics_switch_clients ul li').index(this);
		showPics(index);
	}).eq(0).trigger("mouseover");
	
	//上一页按钮
	$(".ps_box .prev").click(function() {
		index -= 1;
		if(index == -1) {index = len - 1;}
		showPics(index);
	});
	
	//下一页按钮
	$(".ps_box .next").click(function() {
		index += 1;
		if(index == len) {index = 0;}
		showPics(index);
	});
	
	$('.ps_box .pb').css({'width':totalImgWidth});
	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
	$('.ps_box .pb').hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			showPics(index);
			index++;
			if(index == len) {index = 0;}
		},6000); //此4000代表自动播放的间隔，单位：毫秒
	}).trigger("mouseleave");
	
	//显示图片函数，根据接收的index值显示相应的内容
	function showPics(index) {
		var nowLeft = -index*imgWidth; //根据index值计算ul元素的left值
		$('.ps_box .pb').stop(true,false).animate({"marginLeft":nowLeft},1000,'easeInOutExpo'); //通过animate()调整ul元素滚动到计算出的position
		$('.ps_box .pics_switch_clients ul li span').stop(true,false).animate({"opacity":"0.4"},600).eq(index).stop(true,false).animate({"opacity":"1"},600); //为当前的按钮切换到选中的效果
	}
	
});




<!--异步加载处理-->
function loadPic(e, type) {
	//console.debug(e.currentTarget, type);
	var span = e.srcElement || e.target;
	if (span.tagName !== 'SPAN') {
		span = span.parentNode;
	}
	type = type ||  1;
	$.get('ajax.php?cid='+type, function(data){
		$('#picHtml').html(data);
		setMarginRightBlank();
	})
	$('.tabs span').removeClass('current');
	//var temp = type-1;
	//$('.tabs span:eq(' + temp + ')').addClass('current');
	$(span).addClass('current');
}

$(function() {
	$('.case_box .tabs span').hover(
		function() {
			$(this).children().css({'color':'#000'});
		},
		function() {
			$(this).children().css({'color':''});
		}
	);
});

<!-- Tabs异步处理 -->
$(function() {
	$('.sel_portfolio .tabs span').live('click',function() {
		var spanNum = $('.sel_portfolio .tabs span').index($(this));
		$('.sel_portfolio .tabs span').removeClass('current');
		$(this).addClass('current');
		$('.sel_portfolio .case_box .inner_ul_box ul').css({'display':'none'});
		$(this).parent().parent().next().children().children().eq(spanNum).css({'display':'block'});
	});
});


///为#picHtml_1 #picHtml_2 #picHtml_3 #picHtml_4 每第4个li设置marigin-right为0///
/*
$(function() {
	var i = 1;
	for (i=1;i<=80;i++) {
		var ulIndex = 4*i;
		caseBoxUlIndex = $('#picHtml_1 li').eq(ulIndex-1).index('#picHtml_1 li');
		$('#picHtml_1 li').eq(caseBoxUlIndex).addClass('mr0');
	}
});
$(function() {
	var i = 1;
	for (i=1;i<=80;i++) {
		var ulIndex = 4*i;
		caseBoxUlIndex = $('#picHtml_2 li').eq(ulIndex-1).index('#picHtml_2 li');
		$('#picHtml_2 li').eq(caseBoxUlIndex).addClass('mr0');
	}
});
$(function() {
	var i = 1;
	for (i=1;i<=80;i++) {
		var ulIndex = 4*i;
		caseBoxUlIndex = $('#picHtml_3 li').eq(ulIndex-1).index('#picHtml_3 li');
		$('#picHtml_3 li').eq(caseBoxUlIndex).addClass('mr0');
	}
});
$(function() {
	var i = 1;
	for (i=1;i<=80;i++) {
		var ulIndex = 4*i;
		caseBoxUlIndex = $('#picHtml_4 li').eq(ulIndex-1).index('#picHtml_4 li');
		$('#picHtml_4 li').eq(caseBoxUlIndex).addClass('mr0');
	}
});
*/


///案例图渐显渐隐///
/*
$(function() {
	$('.case_box ul li .cover').live({
	   mouseenter:
	   function()
	   {
			$(this).find('img').fadeTo(100, 0.4);
	   },
	   mouseleave:
	   function()
	   {
			$(this).find('img').fadeTo(100, 1);
	   }
	});
});
*/
///案例图滑过显示红色//
$(function() {
	var hoverMask = "<div class='hoverMask'></div>";
	$('.case_box ul li .cover').live({
	   mouseenter:
	   function()
	   {
			$(this).prepend(hoverMask);
			$('.hoverMask').css({'opacity':0});
			$('.hoverMask').fadeTo(200, 0.8);
	   },
	   mouseleave:
	   function()
	   {
			//$('.hoverMask').fadeTo(200, 0);
			$('.case_box ul li .cover .hoverMask').remove();
	   }
	});
});



///案例图Viedo添加播放图标///
$(function() {
	$('.case_box ul li .video').append('<div class="play_icon"></div>');
	var video_width = $('.case_box ul li .video img').width();
	var video_height = $('.case_box ul li .video img').height();
	$('.case_box ul li .video .play_icon').css({'position':'absolute' , 'left':(video_width-45)/2+'px' , 'top':(video_height-45)/2+'px' ,  'width':'45px' , 'height':'45px'});
	//
	$('.case_box ul li .video').live({
	   mouseenter:
	   function()
	   {
			$(this).find('div').addClass('play_icon_hover');
	   },
	   mouseleave:
	   function()
	   {
			$(this).find('div').removeClass('play_icon_hover');
	   }
	});
});



///案例详情页左右箭头///
$(function() {
	$('.item_detail .pages span').css({'opacity':0.2});
	$('.item_detail .pages span.prev').hover(
		function() {
			$(this).fadeTo(200, 0.5);
		},
		function() {
			$(this).fadeTo(200, 0.2);
		}
	);
	
	$('.item_detail .pages span.next').hover(
		function() {
			$(this).fadeTo(200, 0.5);
		},
		function() {
			$(this).fadeTo(200, 0.2);
		}
	);
});


///portfolio_all页面：异步加载中案例列表中默认让每一行的最后一个box的margin-right为0；
$(function() {
	setMarginRightBlank();
});
function setMarginRightBlank() {
	var i = 1;
	for (i=1;i<=80;i++) {
		var ulIndex = 4*i;
		caseBoxUlIndex = $('#picHtml li').eq(ulIndex-1).index('#picHtml li');
		//$('#picHtml li').eq(caseBoxUlIndex).addClass('mr0');
	}
}




//查看更多案例view_more btn
$(function() {
	$('.view_more').css({'opacity':0.9});
	$('.view_more').hover(
		function() {
			$(this).fadeTo(200, 1);
		},
		function() {
			$(this).fadeTo(200, 0.9);
		}
	);
});


//响应式针对收起导航的点击事件判断：iPhone4 横屏
$(document).ready(function()
{
	if($(window).width()==480) {
		//alert($(window).width());
		$('.header .nav a').live({
			mouseenter:
			function()
			{
				$(this).fadeTo(200, 1);
			},
			mouseleave:
			function()
			{
				$(this).fadeTo(200, 1);
			}
		});

		$(".menu").click(function() {
			$('.nav').toggle();
		});
	}
})

//响应式针对收起导航的点击事件判断：iPhone4 竖屏
$(document).ready(function()
{
	if($(window).width()==320) {
		//alert($(window).width());
		$('.header .nav a').live({
			mouseenter:
			function()
			{
				$(this).fadeTo(200, 1);
			},
			mouseleave:
			function()
			{
				$(this).fadeTo(200, 1);
			}
		});

		$(".menu").click(function() {
			$('.nav').toggle();
		});
	}
})



//文章列表滑过态
$(function() {
	$('.articles_box li').live({
		mouseenter:
		function()
		{
			$(this).addClass('hover');
		},
		mouseleave:
		function()
		{
			$(this).removeClass('hover');
		}
	});
});
