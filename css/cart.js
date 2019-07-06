//声明userInfo全局变量保存用户信息
userInfo = null;
//检测用户是否登录
$.ajax({
    url:"/user/queryUserMessage",
    async:false,
    success:function(res){
        console.log(res);
        if(res.error && res.error === 400){
            //用户未登录的情况，强制跳转到登录页面要求用户登陆
            alert("您还未登录，请登录");
            location.href = "login.html";
        }else{
            //用户已经登录的情况，res数据返回的就是登录的那个用户的信息
            //将用户信息保存到全局变量中，在页面加载完成之后，将用户信息展示在页面中
            userInfo = res;
        }
    }
})

$(function(){
    //初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    //定义全局变量保存页码，页号
    var page = 1;
    var pageSize = 1000;
    //存放总金额
    var total = 0;

    //发送请求获取所有的购物车数据
    $.ajax({
        url:"/cart/queryCartPaging",
        data:{ page , pageSize },
        success:function(res){
            console.log(res);
             var html = template("cartList",res);

             $("#cartBox").html(html);
        }
    })

    //当用户选择购物车中的订单时，计算总价
    $("#cartBox").on("change","input",function(){
        // alert($(this).prop("checked"));
        //拿到所有被选中的复选框
        //每次计算的时候，total都要重置
        total = 0;
        $("input:checked").each((i,v)=>{
            //根据选中的这个复选框找到对应的这个订单中的尺码和数量
            //找到mui-row
            var row = $(v).parents(".mui-row");
            // var size = row.find(".size").text();
            var price = row.find(".price-1").text();
            var num = row.find(".num").text();

            // console.log();
            total+=price*num
        })

        $(".total").html("订单总额：¥"+total);
    })

    //给编辑按钮添加点击事件
    $("#cartBox").on("click",".editBtn",function(){
        // alert(123);
        //mui.confirm的第一个参数也可以接收html代码作为参数
        //就使用模板引擎生成一段html来展示编辑参数窗口
        var html = template("editConfirm",{size:50,num:3,productSize:'40-50'});
        html = html.replace(/>\s*</g,"><");
        mui.confirm(html,"编辑商品",["确定","取消"],function(){

        })

        mui(".mui-numbox").numbox();
    })
})