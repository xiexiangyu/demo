$(function(){
    //如果想保持搜索关键字 就要知道localstorage中是否已经有关建字数据
    //先获取到localStorage中保存的keyWord的数据
    var arr= localStorage.getItem("keyword")
    if(!arr){
        //如果arr为null说明localStorage中没有对应的数据  我们就创建一个数组数据保持关键字
        arr=[];
    }else{
        //读取出的arr如果不是null 那么arr就是一个json格式 字符串 需要将json格式的字符串转换为对象或数组
        arr=JSON.parse(arr)
    }
    //  根据arr数组生成搜索历史列表
    var html =template("list",{list:arr});
    $("#historySearch").html(html)
    //给搜索按钮添加点击事件
    $("#btnSearch").on("click",function(){

        // 判断用户有没有在文本框输入了内容
        let value =$("#keyWord").val();
        // 如果内容为空提示用户
        if(value.trim()===""){
            mui.alert("请输入内容");
            return
        }else{
            if(arr.indexOf(value)>=0){
                arr.splice(arr.indexOf(value),1)
            }
            // 将用户输入的关键字添加到arr数组中
            arr.push(value);
            // 将新增元素的arr数组重新写入到localStorage中
            localStorage.setItem("keyword",JSON.stringify(arr));
            // 跳转之前清空文本框的内容
            $("#keyWord").val("")
            // 如果输入了内容 则将用户输入的内容作为关键字参数传递到search-result.html
            location.href="search-result.html?keyWord="+value;

        }
    })

    // 给清空历史按钮添加点击事件
    $(".mui-icon-trach").on("click",function(){
        //弹出mui选择提示信息框咨询是否要删除
        mui.confirm("请问是否要清空","是否删除",["是","否"],(e)=>{
            // 通过回调函数的参数e的inde属性可以获取点击用户点击第几个按钮 0表示是
            if(e.index==0){
                // 删除localStorage的内容
                localStorage.removeItem("keyword")
                // 删除页面列表中的关键字列表数据
                $("#historySearch").html("");
                // 删除内存中的arr数组中保持的数据
                arr=[];
            }
        })
    })
})