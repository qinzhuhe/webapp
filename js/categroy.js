window.onload = function () {
    // 获取左侧栏
    var ct_cLeft = document.querySelector(".ct_cLeft")
    // 获取左侧栏高度
    var leftHeight = ct_cLeft.offsetHeight
    // 获取用来滑动的列表
    var ulBox = ct_cLeft.querySelector("ul:first-of-type")
    var ulBoxHeight = ulBox.offsetHeight
    
    // 获取所有的 li 元素
    var lis = ulBox.querySelectorAll("li")
    
    // 设置静止状态下最大的top值
    var maxTop = 0
    // 设置静止状态下最小的top值
    var minTop = leftHeight - ulBoxHeight
    // 设置滑动状态的最大的top值
    var maxBounceTop = maxTop + 100
    // 设置滑动状态下的最小的top值
    var minBounceTop = minTop - 100
    
    // 实现滑动
    var startY = 0
    var moveY = 0
    var distanceY = 0
    // 记录当前元素滑动到的距离
    var currentY = 0
    // 添加滑动事件
    ulBox.addEventListener("touchstart", function (e) {
        // 获取手指的起始位置
        startY = e.targetTouches[0].clientY
    })
    ulBox.addEventListener("touchmove", function (e) {
        moveY = e.targetTouches[0].clientY
        // 计算距离的差异
        distanceY = moveY - startY
        // 判断滑动时是否超出当前指定的滑动区间
        if (currentY + distanceY > maxBounceTop || currentY + distanceY < minBounceTop) {
            console.log("超出范围无法进行")
            return
        }
        // 先将之前可能添加的过渡效果清除
        ulBox.style.transition = "none"
        // 实现偏移操作，这里也要加上上一次移动的距离
        ulBox.style.top = (distanceY + currentY) + "px"
    })
    ulBox.addEventListener("touchend", function (e) {
        // 判断当前滑动的距离是否在静止状态和滑动状态下的最小top值
        if (currentY + distanceY < minTop) {
            // 回到 minTop 的位置
            currentY = minTop
            ulBox.style.transition = "top 0.3s ease-in-out"
            ulBox.style.top = minTop + "px"    
        } else if (currentY + distanceY > maxTop) {
            // 回到 maxTop 位置
            currentY = maxTop;
            ulBox.style.transition = "top 0.3s ease-in-out"
            ulBox.style.top = maxTop + "px" 
        } else {
            // 记录当前滑动的距离
            currentY += distanceY
        }
    })
    
    // 为每一个 li 元素设置添加一个索引值
    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i
    }
    
    // 绑定 fastclick 事件
    if ('addEventListener in document') {
        document.addEventListener('DOMContentLoaded', function () {
            // 参数可以是任意的 dom 元素，如果写 document.body，说明 document.body 下面的所有元素都会绑定 fastclick
            FastClick.attach(document.body)
        }, false)
    }
    
    // 绑定移动端的 tap 事件
    // itcast.tap(ulBox, function (e) {
        // // 1. 修改 li 元素的样式：将所有 li 元素的 active 样式清除，再为当前被点击的 li 元素添加 active 样式
        // for (var i = 0; i < lis.length; i++) {
        //     lis[i].classList.remove("active")
        // }
        // // 为当前被单击的 li 元素添加样式
        // var li = e.target.parentNode
        // var liHeight = li.offsetHeight
        // li.classList.add("active")
        
        // // 2. 移动当前的 li 元素到父容器的最顶部，但是不能超出之前设定了静止状态下的最小 top 值
        // // 获取当前 li 元素的索引值
        // var index = li.index
        // // 开启过渡
        // ulBox.style.transition = "top 0.5s ease-in-out"
        // // 设置偏移
        // if (-index * liHeight < minTop) {
        //     currentY = minTop
        //     ulBox.style.top = minTop + "px"
        // } else {
        //     currentY = -index * liHeight
        //     ulBox.style.top = -index * liHeight + "px"
        // }
    // })
    
    // zepto Tap 封装
    // $(ulBox).on("tap", function (e) {
    //     // 1. 修改 li 元素的样式：将所有 li 元素的 active 样式清除，再为当前被点击的 li 元素添加 active 样式
    //     for (var i = 0; i < lis.length; i++) {
    //         lis[i].classList.remove("active")
    //     }
    //     // 为当前被单击的 li 元素添加样式
    //     var li = e.target.parentNode
    //     var liHeight = li.offsetHeight
    //     li.classList.add("active")
        
    //     // 2. 移动当前的 li 元素到父容器的最顶部，但是不能超出之前设定了静止状态下的最小 top 值
    //     // 获取当前 li 元素的索引值
    //     var index = li.index
    //     // 开启过渡
    //     ulBox.style.transition = "top 0.5s ease-in-out"
    //     // 设置偏移
    //     if (-index * liHeight < minTop) {
    //         currentY = minTop
    //         ulBox.style.top = minTop + "px"
    //     } else {
    //         currentY = -index * liHeight
    //         ulBox.style.top = -index * liHeight + "px"
    //     }
    // })
    
    // fastclick 使用的时候就是来绑定 click 事件的
    ulBox.addEventListener("click", function (e) {
        // 1. 修改 li 元素的样式：将所有 li 元素的 active 样式清除，再为当前被点击的 li 元素添加 active 样式
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove("active")
        }
        // 为当前被单击的 li 元素添加样式
        var li = e.target.parentNode
        var liHeight = li.offsetHeight
        li.classList.add("active")
        
        // 2. 移动当前的 li 元素到父容器的最顶部，但是不能超出之前设定了静止状态下的最小 top 值
        // 获取当前 li 元素的索引值
        var index = li.index
        // 开启过渡
        ulBox.style.transition = "top 0.5s ease-in-out"
        // 设置偏移
        if (-index * liHeight < minTop) {
            currentY = minTop
            ulBox.style.top = minTop + "px"
        } else {
            currentY = -index * liHeight
            ulBox.style.top = -index * liHeight + "px"
        }
    })
    
}