/**
 * Created by Emily-smile on 2017/7/13.
 */
/*轮播图*/
//获取装轮播图ul,设置宽度
//设置每个li的宽度为可视区域的宽度
var imgLiWidth = $(document).width();
$("#img>ul>li").width(imgLiWidth);
//ul的宽度为li的宽度*(li的个数+1),需要克隆元素制作轮播图
var imgUlWidth = $(document).width() * ($("#img>ul>li").length + 1);
$("#img>ul").width(imgUlWidth);

//克隆第一个li追加到ul
$("#img>ul>li:first").clone().appendTo($("#img>ul"));


//获取circle中的ol,动态创建li，为每个li标签添加点击事件处理函数
//设置变量存储ul中li的个数
var imgLiNum = $("#img>ul>li").length;
//标记点击次数
var pic = 0;

for (var i = 0; i < imgLiNum - 1; i++) {
  $("<li></li>").appendTo($("#circle>ol")).click(function () {
    //当前的li标签添加类样式，其他的兄弟元素去除类样式
    $(this).addClass("current").siblings("li").removeClass("current");

    //index()获取当前li的索引值
    pic = $(this).index();

    $("#img>ul").animate({"left": -pic * imgLiWidth + "px"}, 1000);
  });
}
//为第一个li添加类样式
$("#circle>ol>li:first").addClass("current");


//获取左右焦点，添加事件处理函数
//banner调用鼠标进入和移出事件，添加事件处理函数
$("#banner").mouseenter(function () {
  $("#arrow").css("opacity", 1);
}).mouseleave(function () {
  $("#arrow").css("opacity", 0);
});

//为左右焦点，添加点击事件处理函数
//右焦点事件处理函数
$("#arrRight").click(arrRight);
function arrRight() {
  if (pic == imgLiNum - 1) {
    pic = 0;
    $("#img>ul").css("left", 0);
  }
  pic++;
  $("#img>ul").animate({"left": -pic * imgLiWidth + "px"}, 1000);
  //设置对应的圆点显示样式
  $("#circle li").removeClass("current");
  if (pic == imgLiNum - 1) {
    //当显示最后一张图片时，第一个圆点显示类样式
    $("#circle li:first").addClass("current");
  } else {
    $("#circle li:eq(" + pic + ")").addClass("current");
  }
}
//左焦点事件处理函数
$("#arrLeft").click(function () {
  if (pic == 0) {
    pic = imgLiNum - 1;
    $("#img>ul").css("left", -pic * imgLiWidth + "px");
  }
  pic--;
  $("#img>ul").animate({"left": -pic * imgLiWidth + "px"}, 1000);
  //先去除所有的类样式
  $("#circle li").removeClass("current");
  $("#circle li:eq(" + pic + ")").addClass("current");
});

//自动轮播
var timer = setInterval(arrRight, 2000);
$("#banner").mouseenter(function () {
  clearInterval(timer);
}).mouseleave(function () {
  timer = setInterval(arrRight, 2000);
});

//滚动条事件 显示back模块
$(window).scroll(function () {
  if ($(document).scrollTop() >= $("#nav").height()) {
    $("#back").show(500);
    $("#back>a").mouseenter(function () {
      $(this).css("backgroundColor", "#0091FF");
    }).mouseleave(function () {
      $(this).css("backgroundColor", "");
    });
  } else {
    $("#back").hide(500);
  }

});

//左侧导航栏事件
$("#leftsidebar li").mouseenter(function () {
  $(this).addClass("bgc");
}).mouseleave(function () {
  $(this).removeClass("bgc");
});
//鼠标进入手机模块，显示子列表
$("#phone").mouseenter(function () {
  $(".active").show();
  $("#list").show();
  $("#detailed").hide();
}).mouseleave(function () {
  $(".active").hide();
  $("#list").hide();
});

//拖动滚动条，内容相应滚动
$("#bar")[0].onmousedown = function (e) {
  //记录鼠标按下位置与top之间的距离
  var spaceY = e.clientY - $(this)[0].offsetTop;
  document.onmousemove = function (e) {
    var y = e.clientY - spaceY;
    y = y < 0 ? 0 : y;//最小值
    y = y > $("#scroll")[0].offsetHeight - $("#bar")[0].offsetHeight ? $("#scroll")[0].offsetHeight - $("#bar")[0].offsetHeight : y;
    $("#bar").css("top", y + "px");

    //设置鼠标移动的过程中不去选中文字内容
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

    var contentMaxMoveY = $("#listTitle>ul")[0].scrollHeight - $("#listTitle").height();
    var contentMoveTop = y * contentMaxMoveY / ($("#scroll")[0].offsetHeight - $("#bar")[0].offsetHeight);
    $("#listTitle>ul").css("marginTop", -contentMoveTop + "px");

  };
  document.onmouseup = function () {
    document.onmousemove = null;
  };
};

//子列表鼠标滚动事件
$("#listTitle").scroll(function () {
  //滚动条滚动的距离
  var top = $("#listTitle").scrollTop();
  if (top == 0) {
    $("#bar").css("top", 0);
  } else if (top == $("#listTitle>ul").height()) {
    $("#bar").css("top", 400);
  } else {
    $("#bar").css("top", top / 3 + 30);
  }
});

//鼠标进入子列表，显示背景色
$("#listTitle li").mouseenter(function () {
  $(this).css("backgroundColor", "#0091FF");
}).mouseleave(function () {
  $(this).css("backgroundColor", "");
});

//创建数组存放数据
 var Apple = ["iPhone 7 Plus", "iPhone 7", "iPhone SE", "iPhone 5", "iPhone 6 Plus", "iPhone 5c", "iPhone 5s", "iPhone 6", "iPhone 6s Plus", "iPhone 6s"];
 var Samsung = ["Galaxy S8+","Galaxy S8","三星C9 Pro","Galaxy Note7","Galaxy C7","Galaxy ALPHA","Galaxy C5","Galaxy On7","Galaxy On5","Galaxy J7","Galaxy J5","Galaxy A9(2016)"];

var  ulObj = $("<ul></ul>").appendTo($("#detailed"));
for (var i = 0; i < Apple.length; i++) {
  $("<li><a href='#'>" + Apple[i] + "</a></li>").appendTo(ulObj);
}





//子列表鼠标进入事件,显示三级列表
$("#listTitle li").mouseenter(function () {
  $(this).css("backgroundColor", "#0091FF");
  //向详细机型detailed中添加数据
  $("#detailed").show();
});

//鼠标进入图片时，图片等比例增大
$("#hottype img").mouseenter(function () {
  $(this).css({"width": "102%", "height": "102%"});
});