import { userService } from '../../functions/services/user'

Page({
    data: {
        userInfo: null,
        isLoggedIn: false,
        loading: true,
        stats: {
            registered: 9,  // 已报名数量
            inGame: 2,      // 比赛中数量
            awarded: 1,     // 已获奖数量
            totalPrize: 120 // 获得奖品金额
        },
        tournaments: [
            {
                id: 1,
                name: '2024全国中式台球排名赛',
                time: '2024-01-15',
                location: '杭州',
                result: '8强',  // 比赛结果
                matches: [
                    {
                        round: '1/8决赛',
                        opponent: '张三',
                        score: '3:4',
                        result: '负'
                    },
                    {
                        round: '1/16决赛',
                        opponent: '李四',
                        score: '4:2',
                        result: '胜'
                    }
                ]
            }
            // ... 其他赛事
        ],
        currentTournament: null,  // 当前展开的赛事
        seriesEvents: [
            {
                id: 1,
                name: '菁英赛',
                logo: 'https://picsum.photos/120/120'
            },
            {
                id: 2,
                name: '尚层台球年度积分赛',
                logo: 'https://picsum.photos/120/120'
            }
        ]
    },

    async onLoad() {
        this.checkLoginStatus()
    },

    async onShow() {
        // 每次显示页面时检查登录状态
        this.checkLoginStatus()
    },

    async checkLoginStatus() {
        try {
            this.setData({ loading: true })
            const isLoggedIn = userService.isLoggedIn()
            this.setData({ isLoggedIn })

            if (isLoggedIn) {
                const userInfo = await userService.getUserInfo()
                this.setData({ userInfo })
            }
        } catch (error) {
            console.error('Get user info failed:', error)
            wx.showToast({
                title: '获取用户信息失败',
                icon: 'none'
            })
        } finally {
            this.setData({ loading: false })
        }
    },

    async handleLogin() {
        try {
            this.setData({ loading: true })
            await userService.doLogin()
            await this.checkLoginStatus()
            wx.showToast({
                title: '登录成功',
                icon: 'success'
            })
        } catch (error) {
            console.error('Login failed:', error)
            wx.showToast({
                title: error.message || '登录失败',
                icon: 'none'
            })
        } finally {
            this.setData({ loading: false })
        }
    },

    handleLogout() {
        userService.logout()
        this.setData({
            isLoggedIn: false,
            userInfo: null
        })
        wx.showToast({
            title: '已退出登录',
            icon: 'success'
        })
    },

    // 跳转到比赛记录
    navigateToCompetition() {
        if (!this.data.isLoggedIn) {
            wx.showToast({
                title: '请先登录',
                icon: 'none'
            })
            return
        }
        wx.navigateTo({ url: '/pages/profile/competition/index' })
    },

    // 跳转到裁判记录
    navigateToReferee() {
        if (!this.data.isLoggedIn) {
            wx.showToast({
                title: '请先登录',
                icon: 'none'
            })
            return
        }
        wx.navigateTo({ url: '/pages/profile/referee/index' })
    },

    // 跳转到收藏
    navigateToCollection() {
        if (!this.data.isLoggedIn) {
            wx.showToast({
                title: '请先登录',
                icon: 'none'
            })
            return
        }
        wx.navigateTo({ url: '/pages/profile/collection/index' })
    },

    // 跳转到编辑资料页面
    goToEditProfile() {
        wx.navigateTo({
            url: '/pages/profile/edit/index'
        });
    },

    // 点击功能列表项
    onFunctionTap(e) {
        const { type } = e.currentTarget.dataset;
        switch (type) {
            case 'collection':
                this.navigateToCollection();
                break;
            case 'competition':
                this.navigateToCompetition();
                break;
            case 'awards':
                wx.navigateTo({ url: '/pages/profile/awards/index' });
                break;
            case 'referee':
                this.navigateToReferee();
                break;
        }
    },

    onMatchRecordTap() {
        wx.navigateTo({
            url: '/pages/match/record/index'
        });
    },

    onRefereeRecordTap() {
        wx.navigateTo({
            url: '/pages/referee/record/index'
        });
    },

    onTournamentTap(e) {
        const { id } = e.currentTarget.dataset;
        const tournament = this.data.tournaments.find(t => t.id === id);

        // 如果已经展开，则收起
        if (this.data.currentTournament && this.data.currentTournament.id === id) {
            this.setData({ currentTournament: null });
        } else {
            this.setData({ currentTournament: tournament });
        }
    },

    onSeriesTap: function (e) {
        const { id } = e.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/series/detail/index?id=${id}`
        });
    }
}) 