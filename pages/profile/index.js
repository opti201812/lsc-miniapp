Page({
    data: {
        userInfo: {
            avatar: 'https://picsum.photos/120/120', // 用户头像
            nickname: '激情燃烧的岁月' // 用户昵称
        },
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

    onLoad() {
        // 加载用户信息
        this.loadUserInfo();
    },

    // 加载用户信息
    loadUserInfo() {
        // TODO: 从服务器获取用户信息
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
                wx.navigateTo({ url: '/pages/profile/collection/index' });
                break;
            case 'competition':
                wx.navigateTo({ url: '/pages/profile/competition/index' });
                break;
            case 'awards':
                wx.navigateTo({ url: '/pages/profile/awards/index' });
                break;
            case 'referee':
                wx.navigateTo({ url: '/pages/profile/referee/index' });
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