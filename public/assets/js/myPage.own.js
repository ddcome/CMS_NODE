//分页代码开始
/*
 * 分页的代码
 * 1.分页的每一次点击事件，做的工作是，拿到该值得到两个端点值。
 * 2.当触发到当前页的中间值以及后面的值时，当前页所罗列的值发生变化，整体向左移动不同的格
 */
var total;// 分了多少页
var dataSum;// 分了多少页
var everyPageTotal = 7;// 每次显示多少个页
var currentMinNum;// 当前 页最小值
var currentMaxNum;// 当前 页最大值
var minPageNum;// 最小值
var maxPageNum;// 最大值
var currentPageNum;// 当前页

function initPage(data, num) {
	dataSum = getPageTotal(data);
	total = Math.ceil(dataSum / num);
	everyPageTotal = num;
	currentMinNum = 1;
	currentMaxNum = total > everyPageTotal ? everyPageTotal : total;
	minPageNum = 1;
	maxPageNum = total;
	currentPageNum = 1;
}

function getPageTotal(data) {
	return data.length;
}

function printPageInfo() {
	console.log("----------------------------------------");
	console.log("total:" + total);
	console.log("everyPageTotal:" + everyPageTotal);
	console.log("currentMinNum:" + currentMinNum);
	console.log("currentMaxNum:" + currentMaxNum);
	console.log("minPageNum:" + minPageNum);
	console.log("maxPageNum:" + maxPageNum);
	console.log("----------------------------------------");
}

/**
 * 当分页上的数字被点击时
 */
function changePage(currentNum) {
	currentPageNum = currentNum;
	// if(maxPageNum<=everyPageTotal || currentMaxNum==maxPageNum) {
	// //没有变化的重组的必要
	// return;
	// }
	// 1.计算当前理论中间值。这里要分情况，有奇数和偶数两种情况。
	var middle;
	// if(everyPageTotal%2==0) {//偶数
	middle = currentMinNum + parseInt(everyPageTotal / 2);
	// } else {//奇数
	// middle = minPageNum+Math.ceil(everyPageTotal/2);
	// }
	// 2.拿到理论中间值后，决定下一步想左还是向右移动多少
	if (currentNum < middle) {// 向左移动
		// 计算移动后的左边最小值
		var moveNum = middle - currentNum;
		if ((currentMinNum - moveNum) <= 0) {
			currentMinNum = 1;
			currentMaxNum = total <= everyPageTotal ? total : everyPageTotal;
		} else {
			currentMinNum = currentMinNum - moveNum;
			currentMaxNum = (currentMinNum + everyPageTotal - 1) > total ? total
					: (currentMinNum + everyPageTotal - 1);
		}
	} else {// 向右移动
		// 计算移动后的左边最小值
		var moveNum = currentNum - middle;
		if ((currentMinNum + moveNum) >= total) {
			currentMaxNum = total;
			currentMinNum = currentMaxNum - everyPageTotal + 1;
		} else {
			currentMinNum = currentMinNum + moveNum;
			currentMaxNum = (currentMinNum + everyPageTotal - 1) >= total ? total
					: (currentMinNum + everyPageTotal - 1);
		}
	}
}
// 分页代码结束
