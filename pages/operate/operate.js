import { $wuxButton } from '../../components/wux'
var utils = require('../../utils/util.js');
var app = getApp()
// pages/home/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index: 3,
        opened: !1,

        //轮播广告
        imgUrls: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509782579&di=4a625095d6176f401b6e8bd60bd2c665&imgtype=jpg&er=1&src=http%3A%2F%2Fzynews.cc%2Fuploads%2Fattachment%2Fc4%2F41%2F15658bd01a0104e0.jpg',
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2070951029,628061004&fm=27&gp=0.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509782602&di=29de59b2e62dc0276803708e68d3ed44&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zhiribao.com%2Fupload%2Fimages%2F201505%2F1%2F1e5fa2ee8089753b2d23c95d65689b68360b4580.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509187955373&di=ab45bdbe374e3a6d13a9a77c7c4f666f&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170307%2F8d64d1fa99464ca48bb05b7a678c0f5b_th.jpeg'
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 500,
        role: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        this.initButton()
        this.initButtonBorrow();
        //加载借书申请、代收书等数量
        wx.request({
            url: ('https://' + app.globalData.apiUrl + '?m=home&c=Api&a=getOperateNum&ownerId=' + app.globalData.userId).replace(/\s+/g, ""),
            method: "GET",
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                that.setData({
                    operateNum: res.data
                })
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
        this.onLoad()
    },

    /**
     * 别人的借书申请
     */
    borrowApplication: function () {
        if (app.globalData.certificationOk != 2) {
            wx.showToast({
                title: '您还没有进行信息认证！',
                image: '../../images/warning.png',
            })
            return;
        }
        wx.navigateTo({
            url: '../borrowApplication/borrowApplication'
        })
    },

    /**
     * 借入
     */
    borrowIn: function () {
        if (app.globalData.certificationOk != 2) {
            wx.showToast({
                title: '您还没有进行信息认证！',
                image: '../../images/warning.png',
            })
            return;
        }
        wx.navigateTo({
            url: '../borrowIn/borrowIn'
        })
    },

    //待归还
    returnBack: function () {
        if (app.globalData.certificationOk != 2) {
            wx.showToast({
                title: '您还没有进行信息认证！',
                image: '../../images/warning.png',
            })
            return;
        }
        wx.navigateTo({
            url: '../returnBack/returnBack'
        })
    },

    //收书
    getBook: function () {
        if (app.globalData.certificationOk != 2) {
            wx.showToast({
                title: '您还没有进行信息认证！',
                image: '../../images/warning.png',
            })
            return;
        }
        wx.navigateTo({
            url: '../getBook/getBook'
        })
    },

    //图书管理
    bookMan: function () {
        if (app.globalData.certificationOk != 2) {
            wx.showToast({
                title: '您还没有进行信息认证！',
                image: '../../images/warning.png',
            })
            return;
        }
        wx.navigateTo({
            url: '../bookMan/bookMan'
        })
    },

    screenISBN: function () {
        if (app.globalData.certificationOk != 2) {
            wx.showToast({
                title: '您还没有进行信息认证！',
                image: '../../images/warning.png',
            })
            return;
        }
        wx.navigateTo({
            url: '../operateShare/operateShare',

        })
    },

    pilot: function () {
        if (app.globalData.certificationOk != 2) {
            wx.showToast({
                title: '您还没有进行信息认证！',
                image: '../../images/warning.png',
            })
            return;
        }
        wx.navigateTo({
            url: '../pilot/pilot'
        })
    },

    openComment: function () {
        if (app.globalData.certificationOk != 2) {
            wx.showToast({
                title: '您还没有进行信息认证！',
                image: '../../images/warning.png',
            })
            return;
        }
        wx.navigateTo({
            url: '../bookList/bookList'
        })
    },

    /***********更改后的页面方法*************/
    uploadBook: function () {
        if (app.globalData.certificationOk != 2) {
            wx.showToast({
                title: '您还没有进行信息认证！',
                image: '../../images/warning.png',
            })
            return;
        }
        wx.navigateTo({
            url: '../operateUpload/operateUpload',

        })
    },
    borrowBasket: function () {
        wx.navigateTo({
            url: '../borrowBasket/borrowBasket',

        })
    },
    initButton(position = 'bottomRight') {
        var that = this
        that.setData({
            opened: !1,
        })

        that.button = $wuxButton.init('br', {
            position: position,
            buttons: [
                {
                    label: '我的图书馆',
                    icon: "data:image/png;base64,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",
                },
                {
                    label: '操作说明',
                    icon: "data:image/png;base64,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",
                },
                {
                    label: '待收回图书',
                    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAGnklEQVR4Xu2dXU4bSRDHuy0jMX5ZeEFy+2HJCdY5QeAEmz1B4ATLniDkBnCCkBNsOEGcE4ScIPAwPRIvwAs8AKqoVu2VZTmmumfGnq6qkXiipmfqX7+u/pjutjV6iVbAivZenTcKgHAIFAAFQLgCwt3XDKAACFdAuPuaARQA4QoId18zgAIgXAHh7msGUACEKyDcfc0ACoBwBYS7rxlAARCugHD3NQMoAMIVEO6+ZgAFQLgCwt3XDKAACFdAuPuaARQA4QoId18zgAIgXAHh7msGUACEKyDcfc0ACoBwBYS7rxlAARCugHD3NQMoAMIVEO6+2AxwfX09fn5+/i3E/2o4HF5KZIE1ADc3N1v39/dver3eGAD2jDH4R7kmxpgLAJgMBoOv29vbt5SbcrRhCUBVVe8A4CAi4C/F7tJae7y5uXnODQY2AGBtf3h4eGeMOTLG7L4U0ZT/A8CttfbMWnvKpclgAQC2509PT/+2Ffh5WAIIx8650xSQunRP9gBUVfUeAI7XJOrnoigOc24WsgUgpHys9dSOXSuMYDbY2NjY39nZuWjlAS0XmiUAoXf/xVo7blkfUvE5Q5AlAN77L+uu+Yv6BTlmguwA8N6fGGP+JlXN1RtdFkXxOqc+QVYAVFW1BwBY++tcV8aYCQDg2P7CWnsLAFsAMLbW4vAR+xS/13jAqXMOh6JZXFkB4L3/UWOo9wnH8MPhEGf5ll5hWIlBxHmF6Kvf77/OpVOYDQBVVR0AwMfoaBhzZ619Swn8fNne+7fGmDNjzPSbAfXxE+fcPtV4nXbZAJBY+zH44zqzdiEbYNaIgsBa+6rOc1cFRRYAhJqIY/6Y667f7+81kYoT+x5Z9AVyAQDTcFR7DAAfRqNRYzOE3vvPxpg/Iwi8dM69irBfi2kWAJRleWOt3aIqBADfR6NRo5NEKVnIOdd5fTv/glVV7QIA9v7Jl7X2cDgcYtZo9PLeQ0yB1tr9lM5nzDPq2uYAQOzY/8o518rn4LIscd7gD6roCgBVqSV2CcO/1jpf3nscDbyhutVWJqI+n2LHLgO0Weti+yJtvgsluBSbzgOATlBTbxudv6mIYT7gG0XUqY0CEKPWC7be+yNc5/eLNvhrWMB50taHGO999FBURwENAjBbFI4M8JvAqnrYKbW/zWzUpKxZNAFNOhxbVo3FJ/845/DTdacvBWBJeLDmPz4+fkxYeXRXFMVuW81Rk0QpAL9QMwQfl52RZyCnRTU9Dd1kwOfLUgAWqIvTvvjpOSX4xpiroijGOdR+dF0BmAPAe4/LzZLb7pwWgygAc8EvyxJrPW4pS7pymPnTJmBBaGv09P8vLcfgawYwxtTo6c+i9Mk5l5w5ktJNQzeJ7gPU6enP6N/ax6eGYry0GLEANBH8XNP+LBEiAQj7CvHDTvK6AQ7BF9sHKMvyW8Ls3rTiJC8zX0VKj32GuAxQluWxtfZ9rFDBvrGVxonPb/w2UQCkrC+cmd79PhgM9nKZ4aOSIgqAlG/6QcjzoigOuAVfXB8gdklXCH62Y3xKFhCTAVLW9Rtjzp1zuD+Q7SUJgNhzBbL6qpdKqCQAYpd0d35TR2rQRU4ERe4ubm1zSRNBa7IMSRkgZlsX+7Z/CpECsKA65bSkq242UAAUgLoM5XF/zM7eHHb0NKW6ZoAFSioATeHVoXLCzl7SG/X7/aMmjpYhPWzNRmIywJp17uzjFYDOhmY1L6YArEbnzj5FAehsaFbzYgrAanTu7FMUgM6GZjUvJgqA6Q9LhZNGZs8RvMQTRnq93occjndtEg0xAETsAzji8GNQVEhEABB71i8AnI1Go0OqiDnbsQcgbPz8kbDX/y/nHJ4PzPpiD0CNlcBZHPZcl072ACSuBJ7qyj4LsAYgtu2fr00SFoYoAMtzaNZbvynNgwKwRCXNABSEOmwTJn5uUl+RyxbwZf6zzgDoeOwR77NiFUWxzXE/4KyP7AGo0RFk3/4jCOwBCFkg6qRvPOiZ41bwRU2BCABiIJAUfDEZYEp+2CGMm0QX/TbwHQCcDAaD1n5zILUz2uZ9YjLArIjh/H/8Mar/DoLu9XqTVf32QJvBTClbJAApQnG9RwHgGlmiXwoAUSiuZgoA18gS/VIAiEJxNVMAuEaW6JcCQBSKq5kCwDWyRL8UAKJQXM0UAK6RJfqlABCF4mqmAHCNLNEvBYAoFFczBYBrZIl+KQBEobiaKQBcI0v0SwEgCsXVTAHgGlmiXwoAUSiuZgoA18gS/VIAiEJxNfsJ5Np5n/cxuNIAAAAASUVORK5CYII=",
                }
            ],
            buttonClicked(index, item) {
                if (app.globalData.certificationOk = 2) {

                    index === 0 && wx.navigateTo({
                        url: '/pages/login/login'           //个人图书馆
                    })

                    index === 1 && wx.navigateTo({
                        url: '/pages/operateIntr/operateIntr'//操作说明
                    })

                    index === 2 && wx.navigateTo({
                        url: '../getBook/getBook'//待收回图书
                    })

                    return true
                } else {
                    wx.showToast({
                        title: '您还没有进行信息认证！',
                        image: '../../images/warning.png',
                    })
                    return;
                }
            },
            callback(vm, opened) {
                vm.setData({
                    opened,
                })
            },
        })
    },

    //借书人更多按钮加载
    initButtonBorrow(position = 'bottomRight') {
        var that = this
        that.setData({
            opened: !1,
        })

        that.button = $wuxButton.init('br2', {
            position: position,
            buttons: [
                {
                    label: '待支付',
                    icon: "data:image/png;base64,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",
                },
                {
                    label: '操作说明',
                    icon: "data:image/png;base64,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",
                },
                {
                    label: '已借图书',
                    icon: "data:image/png;base64,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",
                }
            ],
            buttonClicked(index, item) {
                if (app.globalData.certificationOk = 2) {

                    index === 0 && that.openWaitingPay() //打开待支付页面

                    index === 1 && wx.navigateTo({
                        url: '/pages/operateIntr/operateIntr'//操作说明
                    })
                    index === 2 && wx.navigateTo({
                        url: '../haveBorrowed/haveBorrowed'//已借图书
                    })

                    return true
                } else {
                    wx.showToast({
                        title: '您还没有进行信息认证！',
                        image: '../../images/warning.png',
                    })
                    return;
                }
            },
            callback(vm, opened) {
                vm.setData({
                    opened,
                })
            },
        })
    },

    switchChange(e) {
        e.detail.value ? this.button.open() : this.button.close()
    },
    pickerChange(e) {
        const index = e.detail.value
        const position = this.data.types[index]
        this.initButton(position)
    },

    //打开我的图书页面
    openMyBook: function () {
        if (app.globalData.certificationOk != 2) {
            wx.showToast({
                title: '您还没有进行信息认证！',
                image: '../../images/warning.png',
            })
            return;
        }
        wx.navigateTo({
            url: '../myBook/myBook',
        })
    },

    //切换角色
    changeRole: function () {
        var that = this
        that.setData({
            role: !that.data.role
        })
    },

    //切换至待归还页面
    openToReturn: function () {
        if (app.globalData.certificationOk != 2) {
            wx.showToast({
                title: '您还没有进行信息认证！',
                image: '../../images/warning.png',
            })
            return;
        }
        wx.navigateTo({
            url: '../returnBack/returnBack'
        })
    },

    openWaitingPay: function () {
        if (app.globalData.certificationOk != 2) {
            wx.showToast({
                title: '您还没有进行信息认证！',
                image: '../../images/warning.png',
            })
            return;
        }
        wx.navigateTo({
            url: '../waitingPay/waitingPay'
        })
    },

    //打开tabbar我要借书
    toBorrowed: function () {
        if (app.globalData.certificationOk != 2) {
            wx.showToast({
                title: '您还没有进行信息认证！',
                image: '../../images/warning.png',
            })
            return;
        }
        wx.switchTab({
            url: '../index/index'
        });
    },

})