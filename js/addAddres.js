$(function () {
    //创建泡泡选择器
    var picker = new mui.PopPicker({
        layer: 3
    });
    picker.setData(cityData)

    // 当用户点击省市区的时候显示选择器
    $("#address").on("click", function () {

        // 可以调用picker对象show方法来显示选择器
        // shouw方法里面可以传递一个函数，这个函数可以用户选择内容之后处理
        picker.show((selectedItems) => {
            var names = "";
            // 形参selectedItems是一个函数形式的数据，可以获取用户选择的省市区
            selectedItems.forEach((v) => {
                console.log(v);
                if (v.text) {
                    names += v.text;
                }
            })
            $("#address").val(names)
        })


    })

    // 点击添加地址
    $("#btnAdd").on("click", function () {
        var recipients = $("#recipients").val()
        var postcode = $("#postcode").val()
        console.log(postcode);

        var addressDetail = $("#addressDetail").val()
        var address = $("#address").val()

        $.ajax({
            url: "/address/addAddress",
            type: "post",
            data: {
                recipients,
                postcode,
                addressDetail,
                address
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
                if (res.success) {
                    mui.toast("添加成功")
                    setInterval(() => {
                        location.href = "address.html"
                    }, 1000)
                } else {
                    mui.toast("res.message")
                }

            }
        })
    })

})