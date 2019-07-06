var userInfo = null;
//判断有没有登录
$.ajax({
    url: "/user/queryUserMessage",
    async: false,
    success: function (res) {
        // console.log(res.error);

        if (res.error && res.error == 400) {
            location.href = 'user.html';


        } else {
            console.log(res);
        }

        userInfo = res;
    }
})

$(function () {

    // 初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    // 定于全局变量 页码和码数
    var page = 1;
    var pageSize = 1000;
    $.ajax({
        url: "/cart/queryCartPaging",
        data: {
            page,
            pageSize
        },
        success: function (res) {
            console.log(res);
            var html = template("cartTpl", res)
            $("#cartBox").html(html)
        }
    })
    // 当用户选择购物车中的订单的时候 计算总价
    $("#cartBox").on("change", "input", function () {
        // 获取所有选中的复选框
        var total = 0
        $("input:checked").each((i, v) => {
            //根据选择的复选框 得到对应尺码和数量
            var row = $(v).parents(".mui-row")
            var price = row.find(".price-1").text()
            var num = row.find(".num").text();
            //console.log(price*num);
            total += price * num
            $(".total").html("订单总额：¥" + total.toFixed(2))
        })
    })
    // 给编辑按钮添加事件
    $("#cartBox").on("click", ".editBtn", function () {
        var html = template("editConfirm", {
            size: 50,
            num: 3,
            productSize: '40-50'
        });
        html = html.replace(/>\s*</g, "><");
        mui.confirm(html, "编辑商品", ["确定", "取消"], function () {

        })
        mui(".mui-numbox").numbox();
    })

    //监听尺码 span的点击事件
    $(".mui-content").on("click", ".size span", function () {
        $(this).addClass("active").siblings().removeClass("active");
    })
})