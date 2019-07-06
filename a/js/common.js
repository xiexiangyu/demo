

$.ajax({
	url:"/employee/checkRootLogin",
	async:"fales",
	success:function(res){
		console.log(res);
		if(res.reeor&&res.error==400){
			location.href="login.html"
		}
		
	}
})


$(function(){
	// 登录拦截
	// 用户点击退出 进行退出账号
	$(".fa-sign-out").on("click",function(){
		if(confirm("你确定要退出吗？")){
			$.ajax({
				url:"/employee/employeeLogout",
				success:function(res){
					console.log(res);
					if(res.success){
						location.href="login.html"
					}else{
						alert(res.message)
					}					
				}
			})
		}
	})




























	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

});