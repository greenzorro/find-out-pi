$(function () {
	throwCount = 0; //投掷总次数
	crossCount = 0;  //交叉次数
	nonCrossCount = 0;  //未交叉次数
    actionInitialize();  //动作初始化
})


// 动作初始化
function actionInitialize () {
	$('.throw-once').click(function () {
		throwOnce();  //投掷一次
	})
	$('.throw-more').click(function () {
		for (var i = 0; i < 100; i++) {  //循环投掷
			throwOnce();
		}
	})
	$('.reset').click(function () {
		reset();  //重置
	})
}

//  投掷一次
function throwOnce () {
	var anchorX, anchorY, rotation;  //横坐标、纵坐标、旋转角度
	throwCount++;  //总投掷次数+1
	anchorX = Math.floor(Math.random()*400);  //横坐标随机，在纸张范围内
	anchorY = Math.floor(Math.random()*400);  //纵坐标随机，在纸张范围内
	rotation = Math.floor(Math.random()*360);  //旋转角度随机
	dropNeedle (anchorX, anchorY, rotation);  //绘制针位置
	$('.calculation p b').removeClass('current');
	if (isCross(anchorX, anchorY, rotation)) {  //压线
		crossCount++;  //交叉次数+1
		$('.crossCount b').addClass('current');  //高亮显示变化数据
		$('.needle').addClass('needle-cross');  //颜色区别针的状态
	} else {  //没有压线
		nonCrossCount++;  //未交叉次数+1
		$('.nonCrossCount b').addClass('current');
		$('.needle').removeClass('needle-cross');
	}
	updateData(anchorX, anchorY, rotation);  //更新数据显示
	console.log("x:"+anchorX+" | y:"+anchorY+" | rotation:"+rotation);
	console.log("throwCount:"+throwCount+" | crossCount:"+crossCount+" | nonCrossCount:"+nonCrossCount);
}

// 绘制针位置
function dropNeedle (x, y, rotation) {
	var needle = $('.needle');
	needle.css({'left':x,'top':y-25,'transform':'rotate(' + rotation + 'deg)'});
}

// 判断是否交叉
function isCross (x, y, rotation) {
	var yDistance = Math.min(y%50,(50-y%50));  //中心点到最近横线的距离
	var radians = rotation/360*Math.PI*2;  //角度转为弧度
	var isCross = (yDistance + 25*Math.cos(radians)) * (yDistance - 25*Math.cos(radians))  //两个点y坐标是否在横线两侧
	if (isCross<0) {
		return true;
	} else {
		return false;
	}
}

// 更新数据
function updateData (x, y, rotation) {
	$('.throwCount b').html(throwCount);
	$('.crossCount b').html(crossCount);
	$('.nonCrossCount b').html(nonCrossCount);
	if (throwCount) {  //总投掷数不为0
		$('.pi b').html(2*throwCount/crossCount);
	} else {
		$('.pi b').html(0);
	}
}

// 重置
function reset () {
	throwCount = 0; //投掷总次数
	crossCount = 0;  //交叉次数
	nonCrossCount = 0;  //未交叉次数
	updateData();
	$('.calculation p b').removeClass('current');
}

