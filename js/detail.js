$(function () {
    //获取地址栏中传递的商品
    var id = new URLSearchParams(location.search).get("id")
    console.log(id);
    // 判断用户访问detail.html时 有没有传递id参数
    if (!id) {
        mui.alert("请输入正确的商品链接")
        return false;
    }
    // 根据id查询id对应的商品信息
    $.ajax({
        url: "/product/queryProductDetail",
        data: {
            id
        },
        success: function (res) {
            console.log(res);           
            var html = template("product", res);
            $(".mui-content").html(html);
             mui('.mui-slider').slider();
            mui(".mui-numbox").numbox();
            
        }
    })
    //监听尺码 span的点击事件
    $(".mui-content").on("click",".size span",function(){
        $(this).addClass("active").siblings().removeClass("active");
    })
//   使用事件委托给加入购物车按钮添加点击事件
  $(".mui-content").on("click","#addCart",function(){
      //需要商品的id 数量 尺码
      var num = $("#test").val()
      var size =$(".mui-content .size span[class='active']").text();
    //   发送请求添加到购物车

    $.ajax({
        url:"/cart/addCart",
        type:"post",
        data:{productId:id,num,size},
        success:function(res){ 
            console.log(res);                    
            if(res.success){
                mui.confirm("添加成功，去购物车看看吗？","温馨提示",["确定","取消"],(e)=>{
                    if(e.index===0){
                    location.href="cart.html"
                    }
                })
            }else{
                mui.alert(res.message);
            }
        }
    })
  })
})