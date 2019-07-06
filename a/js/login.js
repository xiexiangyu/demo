
$.ajax({
	url:"/employee/checkRootLogin",
	async:"fales",
	success:function(res){
		console.log(res);
		if(res.success){
			location.href="user.html"
		}
		
	}
})


$(function () {
    // 判断用户是否输入账号和密码
    $("#login-button").on("click", function () {
        var username = $.trim($("#username").val());
        var password = $.trim($("#password").val());
        if (username=="") {
            alert("请输入账号")
            return;
        }
        if (password=="") {
            alert("请输入密码")
            return;
        }

        //发送请求
        $.ajax({
            url:"/employee/employeeLogin",
            type:"post",
            data:{username,password},
            success:function(res){
               if(res.success){
                location.href="user.html";
                
               }else{
                   alert(res.message)
               }
                
            }
        })
    })
})