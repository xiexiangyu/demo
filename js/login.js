$(function(){
    $("#btnLogin").on("tap",function(){
        // 获取用户的账号密码
        var password = $("#password").val();
        var username =  $("#username").val();

        $.ajax({
            url:"/user/login",
            type:"post",
            data:{
                password,
                username
            },
            success:function(res){
               if(res.success){
                   mui.toast("登录成功");
                   setTimeout(() => {
                       location.href="user.html"
                   }, 3000);
               }else{
                   mui.alert(res.message)
               }
                
            }
        })
    })
})