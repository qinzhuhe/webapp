window.onload = function () {
	searchEffect()
	timeBack()
	bannerEffect()
}

// 头部的js效果
function searchEffect () {
	// 头部搜索块的js效果
	/**
	 * 1. 获取当前banner的高度
	 * 2. 获取当前屏幕滚动时，banner滚动出屏幕的距离
	 * 3. 计算比例值，获取透明度，设置背景颜色的样式
	 */
	var banner = document.querySelector(".jd_banner")
	var search = document.querySelector(".jd_search")
	var bannerHeight = banner.offsetHeight
	window.onscroll = function () {
		var offsetTop = document.body.scrollTop
		var opacity = 0
		if (offsetTop < bannerHeight) {
			opacity = offsetTop/bannerHeight
			search.style.backgroundColor="rgba(233,35,34,"+opacity+")"
		}
	}
}

// 倒计时效果
function timeBack () {
	// 1 获取用域展示时间的span
	var spans = document.querySelector(".jd_sk_time").querySelectorAll("span")
	// 2. 设置初始的倒计时时间(以秒作为单位)
	var totalTime = 3700
	// 3 开启定时器
	var timerId =  setInterval(function () {
		totalTime--
		// 判断倒计时时间是否已经完成
		if (totalTime < 0) {
			clearInterval(timerId)
			return;
		}
		// 得到剩余时间中的 时 分 秒
		var hour = Math.floor(totalTime / 3600) // 得到时
		var minute = Math.floor(totalTime % 3600 / 60) // 得到分
		var second = Math.floor(totalTime % 60) // 得到秒
		// 将时间填充到 span 中
		spans[0].innerHTML = Math.floor(hour / 10)
		spans[1].innerHTML = Math.floor(hour % 10)

		spans[3].innerHTML = Math.floor(minute / 10)
		spans[4].innerHTML = Math.floor(minute % 10)

		spans[6].innerHTML = Math.floor(second / 10)
		spans[7].innerHTML = Math.floor(second % 10)
	}, 1000)
}

// 轮播图效果
function bannerEffect () {
	// 1 获取轮播图结构
	var banner = document.querySelector(".jd_banner")
	// 1.2 获取图片容器
	var imgBox = banner.querySelector("ul:first-of-type")
	// 1.3 获取原始的第一张图片
	var firstImg = imgBox.querySelector("li:first-of-type")
	// 1.4 获取原始的最后一张图片
	var lastImg = imgBox.querySelector("li:last-of-type")
	// 1.5 在首尾插入两张图片 cloneNode:复制一个 dom 元素
	imgBox.appendChild(firstImg.cloneNode(true))
	// 1.6 insertBefore(需要插入的dom元素，位置)
	imgBox.insertBefore(lastImg.cloneNode(true), imgBox.firstChild)

	// 2. 设置对应的样式
	// 2.1 获取所有的 li 元素
	var list = imgBox.querySelectorAll("li")
	// 2.2 获取 li 元素的数量
	var count = list.length;
	// 2.3 获取 banner 的宽度
	var bannerWidth = banner.offsetWidth
	// 2.4 设置图片盒子的宽度
	imgBox.style.width = count * bannerWidth + "px"
	// 2.5 设置每一个 li (图片) 元素的宽度
	for (var i = 0; i < list.length; i++) {
		list[i].style.width = bannerWidth + "px"
	}

	// 定义图片索引
	var index = 1;

	// 3. 设置默认的偏移
	imgBox.style.left = -bannerWidth + "px"

	// 4. 当屏幕变化的时候，重新计算宽度
	window.onresize = function () {
		// 4.1 获取 banner 的宽度，覆盖全局的宽度值
		bannerWidth = banner.offsetWidth
		// 4.2 设置图片盒子的宽度
		imgBox.style.width = count * bannerWidth + "px"
		// 4.3 设置每一个 li (图片) 元素的宽度
		for (var i = 0; i < list.length; i++) {
			list[i].style.width = bannerWidth + "px"
		}
		// 4.4. 设置默认的偏移
		imgBox.style.left = -index * bannerWidth + "px"
	}
	// 5. 实现自动轮播
	setInterval(function () {
		// 5.1 变更索引
		index++;
		// 5.2 添加过度效果
		imgBox.style.transition = "left 0.5s ease-in-out"
		// 5.3 设置偏移
		imgBox.style.left = (-index * bannerWidth) + "px"
		// 5.4 判断是否到达最后一张，如果到了最后一张又回到第一张
		setTimeout(function () {
			if (index === count - 1) {
				index = 1
				imgBox.style.transition = "none";
				imgBox.style.left = (-index * bannerWidth) + "px"
			}
		}, 500)
	}, 2000)
}