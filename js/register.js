$(function(){
    $(".getCode").on("tap",function(){
        $.ajax({
            url:"/user/vCode",
            success:function(res){
                console.log(res);
                $("#vCode").val(res.vCode)
            }
        })
    })

    // 给注册按钮添加点击事件
    $("#btnReg").on("click",function(){
        var username =$("#username").val();
        var password =$("#password").val();
        var againpass =$("#againpass").val();
        var mobile =$("#mobile").val();
        var vCode =$("#vCode").val();

        // 发送ajax完成注册
        $.ajax({
            url:"/user/register",
            type:"post",
            data:{username,password,againpass,mobile,vCode},
            beforeSend:function(){
                if(username.trim()===''){
                    mui.toast("请输入用户名")
                    return false;
                }
                if(/^1\d{10}$/.test(mobile)==false){
                    mui.toast("请输入正确手机号")
                    return false;
                }
                if(password!==againpass){
                    mui.toast("两次密码不一致")
                    return false;
                }
                if(vCode==''){
                    mui.toast("请输入验证码")
                    return false;
                }
            },
            success:function(res){
                // console.log(res);
                if(res.success){
                    mui.toast("注册成功");
                    setTimeout(()=>{
                        location.href="login.html"
                    },3000)
                }else{
                    mui.alert(res.message)
                }
            }
        })
    })
})