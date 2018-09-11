var DDPage = new Object();
DDPage.prototype.total = 0;// 分了多少页
DDPage.prototype.dataSum = 0;// 分了多少页
DDPage.prototype.everyPageTotal = 7;// 每次显示多少个页
DDPage.prototype.currentMinNum = 0;// 当前 页最小值
DDPage.prototype.currentMaxNum = 0;// 当前 页最大值
DDPage.prototype.minPageNum = 0;// 最小值
DDPage.prototype.maxPageNum = 0;// 最大值
DDPage.prototype.currentPageNum = 0;// 当前页

DDPage.prototype.initPage = function (data, num) {
    this.dataSum = this.getPageTotal(data);
    this.total = Math.ceil(this.dataSum / num);
    this.everyPageTotal = num;
    this.currentMinNum = 1;
    this.currentMaxNum = this.total > this.everyPageTotal ? this.everyPageTotal : this.total;
    this.minPageNum = 1;
    this.maxPageNum = this.total;
    this.currentPageNum = 1;
};

DDPage.prototype.getPageTotal = function (data) {
    return data.length;
};

DDPage.prototype.printPageInfo = function () {
    console.log("----------------------------------------");
    console.log("total:" + this.total);
    console.log("everyPageTotal:" + this.everyPageTotal);
    console.log("currentMinNum:" + this.currentMinNum);
    console.log("currentMaxNum:" + this.currentMaxNum);
    console.log("minPageNum:" + this.minPageNum);
    console.log("maxPageNum:" + this.maxPageNum);
    console.log("----------------------------------------");
};

/**
 * 当分页上的数字被点击时
 */
DDPage.prototype.changePage = function (currentNum) {
    this.currentPageNum = currentNum;
    // if(maxPageNum<=everyPageTotal || currentMaxNum==maxPageNum) {
    // //没有变化的重组的必要
    // return;
    // }
    // 1.计算当前理论中间值。这里要分情况，有奇数和偶数两种情况。
    var middle;
    // if(everyPageTotal%2==0) {//偶数
    middle = this.currentMinNum + parseInt(this.everyPageTotal / 2);
    // } else {//奇数
    // middle = minPageNum+Math.ceil(everyPageTotal/2);
    // }
    // 2.拿到理论中间值后，决定下一步想左还是向右移动多少
    if (currentNum < middle) {// 向左移动
        // 计算移动后的左边最小值
        var moveNum = middle - currentNum;
        if ((this.currentMinNum - moveNum) <= 0) {
            this.currentMinNum = 1;
            this.currentMaxNum = this.total <= this.everyPageTotal ? this.total : this.everyPageTotal;
        } else {
            this.currentMinNum = this.currentMinNum - moveNum;
            this.currentMaxNum = (this.currentMinNum + this.everyPageTotal - 1) > this.total ? this.total
                : (this.currentMinNum + this.everyPageTotal - 1);
        }
    } else {// 向右移动
        // 计算移动后的左边最小值
        var moveNum = currentNum - middle;
        if ((this.currentMinNum + moveNum) >= this.total) {
            this.currentMaxNum = this.total;
            this.currentMinNum = this.currentMaxNum - this.everyPageTotal + 1;
        } else {
            this.currentMinNum = this.currentMinNum + moveNum;
            this.currentMaxNum = (this.currentMinNum + this.everyPageTotal - 1) >= this.total ? this.total
                : (this.currentMinNum + this.everyPageTotal - 1);
        }
    }
};