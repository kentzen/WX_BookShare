import { $wuxNotification } from '../../components/wux'
import { $wuxPrompt } from '../../components/wux'
var utils = require('../../utils/util.js');
//index.js
//获取应用实例
var screenNum = 3;
var app = getApp()
Page({
    data: {
        cateisShow: false,
        activeNum: 1,
        loading: true,
        bookObj: null,
        ageIndex: 0,
        age: ["请选择",'无限制', '3-6岁', '6-9岁', '9-12岁'],
        ageValue:[null,1,2,3,4],
        sortIndex:0,
        sort_url: app.globalData.sort_url,
        //当前设备信息
        phoneInfo: app.globalData.phoneInfo,

        //页面引导
        locks: 0, 

        searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
        searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏  

        damageArray: ['不区分破损','全新', '八成新以上', '六成新以上'],
        damageIndex: 0,//默认为八成新
    },

    
    onPullDownRefresh: function () {
        //监听页面刷新
        this.onLoad()
        wx.stopPullDownRefresh()
    },

    onLoad: function () {
        wx.showLoading({
            title: '加载中',
        })
        var that = this;
        utils.getUserData(that);
        that.getBookList();
        that.getSorts();
        wx.hideLoading()        
    },

    //获取分类
    getSorts:function(){
        var that = this
        var url = ('https://' + app.globalData.apiUrl + '?m=home&c=Api&a=getSorts').replace(/\s+/g, "")
        wx.request({
            url: url,
            method: "GET",
            dataType: "json",
            success: function (res) {
                if (res.data == "none") {
                    wx.showToast({
                        title: '暂无分类',
                        image: '../../images/warning.png',
                        duration: 2000
                    })
                } else {
                    that.setData({
                        sortsArray: res.data["fullData"]
                    })
                }
            }
        })
    },

    //选中分类
    selectSort:function(e){
        var that = this;
        that.setData({
            sortIndex: e.currentTarget.dataset.id
        })
        that.getBookList()
        that.togglePtype();
    },

    //设置搜索内容
    setSearchValue: function (e) {
        var that = this;
        that.setData({
            searchValue: e.detail.value
        })
    },

    //选择器
    bindPickerChange: function(e) {
        var that = this
        that.setData({
            ageIndex: e.detail.value,
            activeNum: that.data.activeNum,
            damageIndex: that.data.damageIndex
        })
        that.getBookList()
    },

    //破损程度选择器
    bindDamagePickerChange: function (e) {
        var that = this
        that.setData({
            ageIndex: that.data.ageIndex,
            activeNum: that.data.activeNum,
            damageIndex: e.detail.value
        })
        that.getBookList()
    },

    //清空输入内容
    clearSearchValue:function(){
        var that = this
        that.setData({
            searchValue:''
        })
        that.getBookList();
    },

    //信息展示
    showNotification:function(image,title,text) {
        this.closeNotification = $wuxNotification.show({
            image: image ? image:'http://light7.org/assets/img/i-wechat.png',
            title: title ? title:'通知',
            text: text ? text:'通知消息',
            data: {
                message: '逗你玩的!!!'
            },
            time: 3000,
            onClick(data) {
                wx.navigateTo({
                    url: '../toAuth/toAuth',
                })
            },
            onClose(data) {
                
            },
        })
    },

    //获取图书列表
    getBookList:function(){
        var that = this 
        var url = ('https://' + app.globalData.apiUrl + '?m=home&c=Api&a=bookList&screen=' + that.data.activeNum).replace(/\s+/g, "");
        if (that.data.searchValue){
            url += "&value=";
            url += that.data.searchValue;
        }

        //年龄
        if (that.data.ageIndex != 0) {
            var ageArray = that.data.ageValue
            var ageIndex = that.data.ageIndex
            url += "&age=";
            url += ageArray[ageIndex];

        }

        //分类
        if (that.data.sortIndex != 1) {
            url += "&sort=";
            url += that.data.sortIndex;

        }

        //破损程度
        if (that.data.damageIndex != 0) {
            url += "&damage=";
            url += that.data.damageIndex;
        }
        //图书列表数据获取
        wx.request({
            url: url,
            method: "GET",
            success: function (res) {
                that.setData({
                    bookObj: res.data,
                    loading: false,
                    haveBook:false
                })
                if(res.data.length==0){
                  that.setData({
                    haveBook: true
                  })
                  $wuxPrompt.init('msg2', {
                    title: '当前分类下还没有图书哦',
                    text: '可以去看看其他分类',
                    buttons: [
                      {
                        text: '切换'
                      }
                    ],
                    buttonClicked(index, item) {
                      that.togglePtype()
                    },
                  }).show()
                }
            },
            fail: function () {
                wx.showToast({
                    title: '获取数据失败，请稍后重试！',
                    image: '../../images/fail.png',
                    duration: 2000
                })
            }
        })
    },

    onShow: function (){
        this.onLoad();
        
    },

    changeTab: function (event) {
        //切换筛选tab
        var num = event.target.dataset.id;
        this.setData({
            activeNum: num
        })
        this.getBookList()
    },

    screenISBN: function () {
        if (app.globalData.certificationOk != 2){
            wx.showToast({
                title: '您还没有进行信息认证！',
            })
            return ;
        }
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    //已授权 扫描ISBN
                    wx.scanCode({
                        success: (res) => {
                            if (res.errMsg == "scanCode:ok") {
                                //扫描成功
                                if (res.scanType == "EAN_13") {
                                    //条形码
                                    var isbnCode = res.result;
                                    wx.navigateTo({
                                        url: '../share/share?isbn=' + isbnCode,
                                    })
                                } else {
                                    wx.showToast({
                                        title: '条形码有误！',
                                        image: '../../images/fail.png',
                                    })
                                }
                            } else {
                                wx.showToast({
                                    title: '获取数据失败，请稍后重试！',
                                    image: '../../images/fail.png',
                                })
                            }
                        }
                    })
                } else {
                    utils.checkSettingStatu();
                }
            }
        })

    },

    detail: function (event) {
        var bookId = event.currentTarget.dataset.bookid;
        var canShareId = event.currentTarget.dataset.canshareid;
        var book_type = event.currentTarget.dataset.type;//type 为1时自营点 为0时C2C
        //打开详情页
        //旧页面
        // wx.navigateTo({
        //     url: '../detail/detail?bookId=' + bookId + "&canShareId=" + canShareId + "&book_type=" + book_type,
        // })
        
        //新页面
        // wx.navigateTo({
        //     url: '../detail1/detail1?bookId=' + bookId + "&canShareId=" + canShareId + "&book_type=" + book_type,
        // })

        //支付新页面
        wx.navigateTo({
            url: '../detailPay/detailPay?bookId=' + bookId + "&canShareId=" + canShareId + "&book_type=" + book_type,
        })
    },

    togglePtype: function () {
        //显示分类
        this.setData({
            cateisShow: !this.data.cateisShow
        })
    },
    resetting:function(){
        var that = this
        that.setData({
            ageIndex: 0,
            damageIndex: 0,
            sortIndex: 0,
        })
        that.getBookList()
    },

    checkDetail:function(){
        
    },
    nextStep: function () {
        var that = this;
        that.setData({
            step: that.data.step + 1
        })
    },
    
    affirmScreen:function(){
        var that = this;
        that.getBookList()
        that.togglePtype();
    }
})
