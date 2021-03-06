//index.js
//获取应用实例
var app = getApp()
import { $wuxPrompt } from '../../components/wux'
const sliderWidth = 96

Page({
    data: {
        //页面分栏框架
        tabs: ['借书申请', '申请记录'],
        activeIndex: '0',
        sliderOffset: 0,
        sliderLeft: 60,

        //页面数据
        application: null,
        record:null
    },

    //切换tab
    tabClick(e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id,
        })
    },

    onLoad: function () {
        wx.setNavigationBarTitle({ title: "借出" })
        var that = this;
        wx.request({
            url: ('https://' + app.globalData.apiUrl + '?m=home&c=Api&a=getApplication&ownerId=' + app.globalData.userId).replace(/\s+/g, ""),
            method: "GET",
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                if (res.data == "noApplication") {
                    $wuxPrompt.init('msg1', {
                        title: '怎么这么空',
                        text: '还没有人借你的书呢？会不会是书评写的不好',
                        buttons: [
                            {
                                text: '管理图书'
                            }
                        ],
                        buttonClicked(index, item) {
                            wx.navigateTo({
                                url: '../myBook/myBook',
                            })
                        },
                    }).show()
                    $wuxPrompt.init('msg2', {
                        title: '怎么这么空',
                        text: '还没有人借过您的书！',
                    }).show()
                } else {
                    if (res.data[0] == '') {
                        $wuxPrompt.init('msg1', {
                            title: '怎么这么空',
                            text: '还没有人借你的书呢？会不会是书评写的不好',
                            buttons: [
                                {
                                    text: '管理图书'
                                }
                            ],
                            buttonClicked(index, item) {
                                wx.navigateTo({
                                    url: '../myBook/myBook',
                                })
                            },
                        }).show()
                    }
                    if (res.data[1] == '') {
                        $wuxPrompt.init('msg2', {
                            title: '怎么这么空',
                            text: '还没有人借你的书呢？会不会是书评写的不好',
                            buttons: [
                                {
                                    text: '管理图书'
                                }
                            ],
                            buttonClicked(index, item) {
                                wx.navigateTo({
                                    url: '../myBook/myBook',
                                })
                            },
                        }).show()
                    }
                    that.setData({
                        application: res.data[0] ? res.data[0]:'',
                        record: res.data[1]
                    })
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

    onShow: function () {
        this.onLoad();
    },

    //同意
    agreeApply: function (e) {
        var formId = e.detail.formId;
        var sharingId = e.currentTarget.dataset.sharingid;
        var openId = e.currentTarget.dataset.openid;
        var that = this
        wx.request({
            url: ('https://' + app.globalData.apiUrl + '?m=home&c=Api&a=agreeApplication&sharingId=' + sharingId).replace(/\s+/g, ""),
            method: "GET",
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                if (res.data == "agreed") {
                    wx.showToast({
                        title: '已同意借出，无需重复！',
                        image: '../../images/warning.png',
                        duration: 2000
                    })
                } else if (res.data == "refused") {
                    wx.showToast({
                        title: '已拒绝借出，无需重复操作！',
                        image: '../../images/warning.png',
                        duration: 2000
                    })
                } else if (res.data == "success") {
                    wx.showToast({
                        title: '借出成功',
                        icon: 'success',
                        duration: 2000
                    })
                    that.onLoad()
                } else if (res.data == "fail") {
                    wx.showToast({
                        title: '同意失败，请稍后重试',
                        image: '../../images/fail.png',
                        duration: 2000
                    })
                }
            },
            fail: function () {
                wx.showToast({
                    title: '同意失败，请稍后重试',
                    image: '../../images/fail.png',
                    duration: 2000
                })
            }
        })

    },

    //拒绝
    // refuseApply: function (e) {
    //     var formId = e.detail.formId;
    //     var sharingId = e.currentTarget.dataset.sharingid;
    //     var openId = e.currentTarget.dataset.openid;
    //     var canShareId = e.currentTarget.dataset.canshareid;
    //     var that = this
    //     wx.request({
    //         url: 'https://' + app.globalData.apiUrl + '?m=home&c=Api&a=refuseApplication&sharingId=' + sharingId + "&canShareId=" + canShareId,
    //         method: "GET",
    //         header: {
    //             'content-type': 'application/json'
    //         },
    //         success: function (res) {
    //             if (res.data == "refused") {
    //                 wx.showToast({
    //                     title: '已拒绝借出，无需重复操作！',
    //                     icon: 'true',
    //                     duration: 2000
    //                 })
    //                 return ;
    //             } else if (res.data == "success") {
    //                 wx.showToast({
    //                     title: '拒绝成功',
    //                     icon: 'true',
    //                     duration: 2000
    //                 })
    //                 that.onLoad();
    //                 return;
    //             } else if (res.data == "fail") {
    //                 wx.showToast({
    //                     title: '拒绝失败，请稍后重试',
    //                     icon: 'true',
    //                     duration: 2000
    //                 })
    //                 return;
    //             }
    //         },
    //         fail: function () {
    //             wx.showToast({
    //                 title: '拒绝失败，请稍后重试',
    //                 icon: 'false',
    //                 duration: 2000
    //             })
    //             return;
    //         }
    //     })

    // },

    refuseApply:function(e){
        var sharingId = e.currentTarget.dataset.sharingid;
        var canShareId = e.currentTarget.dataset.canshareid;
        wx.navigateTo({
            url: '../cancelReason/cancelReason?sharingId=' + sharingId + "&canShareId=" + canShareId+"&type=1",//type = 1 为拒绝
        })
    },

    //扫码确认借出
    screenQRcode:function(e){
        var price = e.currentTarget.dataset.price;
        var that = this
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    //已授权 扫描ISBN
                    wx.scanCode({
                        success: (res) => {
                            if (res.errMsg == "scanCode:ok") {
                                if(res.result){
                                    var array = res.result.split("@");
                                    var sharingId = array[0];
                                    //根据sharingId获取书主信息 对书主信息进行验证
                                    wx.request({
                                        url: ('https://' + app.globalData.apiUrl + '?m=home&c=Api&a=checkOwner&sharingId=' + sharingId).replace(/\s+/g, ""),
                                        method: "GET",
                                        header: {
                                            'content-type': 'application/json'
                                        },
                                        success: function (res) {
                                            
                                            if (app.globalData.userId == res.data["owner_id"]){
                                                if (res.data["user_id"] == array[1]){
                                                    wx.request({
                                                        url: ('https://' + app.globalData.apiUrl + '?m=home&c=Api&a=screenBorrow&sharingId=' + sharingId + "&price=" + price + "&userId=" + app.globalData.userId).replace(/\s+/g, ""),
                                                        method: "GET",
                                                        header: {
                                                            'content-type': 'application/json'
                                                        },
                                                        success: function (res) {
                                                            if (res.data == "finished") {
                                                                wx.showToast({
                                                                    title: '已确认借出，无需重复！',
                                                                    image: '../../images/warning.png',
                                                                    duration: 2000
                                                                })
                                                            } else if (res.data == "success") {
                                                                wx.showToast({
                                                                    title: '借出成功',
                                                                    icon: 'success',
                                                                    duration: 2000
                                                                })
                                                                that.onLoad()
                                                            } else if (res.data == "fail") {
                                                                wx.showToast({
                                                                    title: '借出失败，请稍后重试',
                                                                    image: '../../images/fail.png',
                                                                    duration: 2000
                                                                })
                                                            }
                                                        },
                                                        fail: function () {
                                                            wx.showToast({
                                                                title: '借出失败，请稍后重试',
                                                                image: '../../images/fail.png',
                                                                duration: 2000
                                                            })
                                                        }
                                                    })
                                                }else{
                                                    wx.showModal({
                                                        title: '通知',
                                                        content: '借书码错误，扫描失败！',
                                                        showCancel: false,
                                                    })
                                                }
                                                
                                            }else{
                                                wx.showModal({
                                                    title: '通知',
                                                    content: '您不是该书书主，扫描无效！',
                                                    showCancel: false,
                                                })
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

    //确认借出 不扫描二维码
    affirmLoan:function(e){
        var sharingId = e.currentTarget.dataset.sharingid;
        var that = this
        wx.request({
            url: ('https://' + app.globalData.apiUrl + '?m=home&c=Api&a=affirmLoan&sharingId=' + sharingId).replace(/\s+/g, ""),
            method: "GET",
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                if (res.data == "loaned") {
                    wx.showToast({
                        title: '已确认借出，无需重复！',
                        image: '../../images/warning.png',
                        duration: 2000
                    })
                }else if (res.data == "success") {
                    wx.showToast({
                        title: '借出成功',
                        icon: 'success',
                        duration: 2000
                    })
                    that.onLoad()
                } else if (res.data == "fail") {
                    wx.showToast({
                        title: '借出失败，请稍后重试',
                        image: '../../images/fail.png',
                        duration: 2000
                    })
                }
            },
            fail: function () {
                wx.showToast({
                    title: '借出失败，请稍后重试',
                    image: '../../images/fail.png',
                    duration: 2000
                })
            }
        })


    }

})
