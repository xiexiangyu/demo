$(function(){

    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    $.ajax({
        url:"/category/queryTopCategory",
        type:"get",
        success:function(res){
            console.log(res);  
           var html= template("category-first",{result:res.rows})
           $(".lins").html(html);

           if("lins a".length > 0){
            $(".lins a").eq(0).click()
           }
        }
    })
    
         //    点击一级分类 获取二级分类的数据
        //    1给一级非类 添加点击事件
        //    2在事件处理函数中获取一级分类的ID
        //    3调用二级分类的接口获取数据
        //    4将数据显示到对应的位置
        //    5如果接口没有数据 显示暂无数据
        $(".lins").on("click","a",function(){
            var id = $(this).attr('data-id');
            // 给点击的a 添加样式
            $(this).addClass("active").siblings().removeClass("active");
            // console.log(id); 
            mui(".right").scroll().scrollTo(0,0,100);
            $.ajax({
                url:"/category/querySecondCategory",
                type:"get",
                data:{id},
                success:function(res){
                    console.log(res);
                 var html=   template("category-second",res);
                 $("#right").html(html)
                }
            })
         })
         
})