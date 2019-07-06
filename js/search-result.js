$(function(){
    // 根据用户输入的关键字获取搜索结果
    // 获取地址栏中的用户输入的搜索的关键字
    // 用关键字调用搜索接口
    // 将搜索结果显示到页面中
    var x= new URLSearchParams(location.search)
    var paoName =x.get("keyWord")
    var brandId=null;
    var price=2;
    var num=2;
    var page=1;
    var pageSize=2;
    
    $.ajax({
        url:"/product/queryProduct",
        data:{
            paoName,
            brandId,
            price,
            page,
            pageSize
        },
        success:function(res){
            console.log(res);
            var html = template("serachId",res);
            $(".list").html(html)
        }
    })

    mui.init({
        pullRefresh : {
          container:'.xxx',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
          up : {
            // height:50,//可选.默认50.触发上拉加载拖动距离
            // auto:true,//可选,默认false.自动上拉加载一次
            // contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            // contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            // callback :pullfresh-function//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            callback:function() {
                page++;

                $.ajax({
                    url:"/product/queryProduct",
                    data:{
                        paoName,
                        brandId,
                        price,
                        page,
                        pageSize
                    },
                    success:(res)=>{
                        console.log(res);
                       if(res.data.length>0){
                        var html = template("serachId",res);
                        $(".list").append(html);
                        this.endPullupToRefresh(false)
                       }else{
                        this.endPullupToRefresh(true)
                    
                    }}
                })
            }
          }
        }
      });
    //   点击价格按钮 让它改变排列方式
    $("#priceSort").on("tap",function(){
        // alert(123)
        $(this).find("span").toggleClass("mui-icon-arrowdown mui-icon-arrowup");
        // 更改全局变量price中的排序值
        price = $(this).find("span").hasClass("mui-icon-arrowdown") ? 2 :1 ;
        console.log(price);
        // 将页码重置为1
        page=1;
        // 将上拉加载组件重置为可以拉动
        mui(".xxx").pullRefresh().refresh(true);

        // 发送请求
        $.ajax({
            url:"/product/queryProduct",
            data:{
                paoName,
                brandId,
                price,
                page,
                pageSize
            },
            success:function(res){
                console.log(res);
                var html = template("serachId",res);
                $(".list").html(html)
            }
        })

    })
})
