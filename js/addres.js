$(function () {
    // 给删除和编辑按钮添加点击事件
    $("#address-box").on("click","#dele", function () {
        mui.confirm("确定要删除这条地址吗？","删除地址",["是","否"],(e)=>{
            var id =$(this).attr("result-id")
            console.log(id);
            if(e.index===0){             
                $.ajax({
                    url: "/address/deleteAddress",
                    type: "post",
                    data:{id},
                    success: function (res) {
                       if(res.success){
                        location.reload();
                       }else{
                           mui.alert(res.error)
                       }
        
                    }
                })
            }
        })
    })
// 获取所有收货地址
    $.ajax({
        url: "/address/queryAddress",
        success: function (res) {
            console.log(res);
            var html = template("addressTpl", {
                result: res
            })
           $("#address-box").html(html)
        }
    })
})