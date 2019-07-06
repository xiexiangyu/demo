var userInfo = null;
//判断有没有登录
$.ajax({
    url: "/user/queryUserMessage",
    async: false,
    success: function (res) {
        // console.log(res.error);

        if (res.error && res.error == 400) {
            //             setTimeout(()=>{
            //   location.href = 'index.html';
            //             },3000)
            location.href = 'login.html';

        }else{
            console.log(res);
        }

        userInfo = res;
    }
})

$(function () {
    if(userInfo){
        $("#userInfo span").html(userInfo.mobile)
        $("#userInfo i").html(userInfo.username)
    }
    // 给退出登录添加点击事件
    $("#logout").on("tap", function () {
        $.ajax({
            url: "/user/logout",
            success: function (res) {
                if (res.success) {
                    mui.toast("退出成功");
                    setTimeout(() => {
                        location.href = "login.html"
                    }, 1000)
                } else {
                    mui.toast("res.message");
                }
            }
        })
    })
})