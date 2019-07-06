$(function () {

    //获取地址栏中传递的  收货地址ID
    var id = new URLSearchParams(location.search).get("id")
    console.log(id);

    $.ajax({
        url: "/address/queryAddress",
        success: function (res) {
            console.log(res);

            for (var i = 0; i < res.length; i++) {
                if (res[i].id == id) {
                    //如果id一致  说明现在的ID就是我们要查找的
                    $("#recipients").val(res[i].recipients)
                    $("#postcode").val(res[i].postCode)
                    $("#address").val(res[i].address)
                    $("#addressDetail").val(res[i].addressDetail)
                }
            }
        }
    })

    //创建选择器对象
    var picker = new mui.PopPicker({
        layer: 3
    })
    picker.setData(cityData);
    $("#address").on("click", function () {
        picker.show((selectedItem) => {
            var str = ''
            selectedItem.forEach((item) => {
                if (item.text) {
                    str += item.text
                }
            });
            $("#address").val(str);
        })
    });
    $("#btnEdit").on("click", function () {
        var recipients = $("#recipients").val();
        var postcode = $("#postcode").val();
        var address = $("#address").val();
        var addressDetail = $("#addressDetail").val();
        //发送请求 
        $.ajax({
            url: "/address/updateAddress",
            type: "post",
            data: {
                id,
                recipients,
                postcode,
                address,
                addressDetail
            },
            beforeSend: function () {
                if (recipients == "") {
                    mui.alert("请输入收件人")
                    return false;
                }
                if (postcode == "") {
                    mui.alert("请输入邮编")
                    return false;
                }
                if (address == "") {
                    mui.alert("请添加省市区")
                    return false;
                }
                if (addressDetail == "") {
                    mui.alert("请输入详细地址")
                    return false;
                }
            },
            success: function (res) {
                console.log(res);
                //如果修改成功 提示用户修改成功 并跳转到收货地址
                if (res.success) {
                    mui.toast("修改成功")
                    setTimeout(() => {
                        location.href = "address.html"
                    }, 1000)
                } else {
                    mui.toast(res.message)
                }
            }
        })
    })

})