$(function () {
    /* 
    修改密码
    1获取修改密码按钮的并添加点击事件
    2获取用户输入的信息
    3对用户输入的信息做效验
    4调用修改密码接口 实现修改密码的功能
    5跳转到登录页面重新登录
    */
    $("#modify-btn").on("tap", function () {
        // 分別獲取對應文本框裡面值
        var orginPass = $("[name='orginPass']").val();
        var newPass = $("[name='newPass']").val();
        var againPass = $("[name='againPass']").val();
        var vCode = $("[name='vCode']").val();9
        $.ajax({
            url:"/user/updatePassword",
            type:"post",
            data:{
                oldPassword:orginPass,
                newPassword:newPass,
                vCode
            },
            beforeSend:function(){
                if(!orginPass){
                    mui.toast("請輸入原密碼")
                    return;
                 }
                 if(newPass!=againPass){
                     mui.toast("兩次密碼不一致")
                     return;
                 }
            },
            success:function(res){
                mui.toast("修改成功")
                setTimeout(function(){
                    location.href="login.html"
                },2000)           
            }         
        }) 
    })

    // 獲取認真嗎
    $("#getCode").on("tap",function(){
        $.ajax({
            url:"/user/vCodeForUpdatePassword",
            type:"get",
            success:function(res){
                console.log(res.vCode);
                $("[name='vCode']").val(res.vCode)           
            }
        })
    })
    
})