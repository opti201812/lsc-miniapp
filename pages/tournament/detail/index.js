Page({
    data: {
        currentTab: 'info',
        status: '',
        tournamentInfo: {
            banner: 'https://picsum.photos/750/400',
            registeredCount: 32,
            project: '中式台球',
            matchTime: '2024-03-15 至 2024-03-20',
            registerTime: '2024-02-15 至 2024-03-10',
            prizeInfo: '冠军：10000元\n亚军：5000元\n季军：3000元',
            description: '这里是赛事说明内容...',
            rules: '这里是比赛规则内容...'
        },
        scheduleInfo: [
            {
                round: '32强',
                time: '2024-03-15',
                matches: [
                    {
                        id: 1,
                        time: '09:00',
                        tableNumber: 1,
                        status: 'completed',
                        player1: {
                            avatar: 'https://picsum.photos/60/60',
                            name: '刘鑫',
                            level: 8,
                            score: 7,
                            isWinner: true
                        },
                        player2: {
                            avatar: 'https://picsum.photos/60/60',
                            name: '张三',
                            level: 5,
                            score: 3,
                            isWinner: false
                        }
                    },
                    {
                        id: 2,
                        time: '10:30',
                        tableNumber: 2,
                        status: 'completed',
                        player1: {
                            avatar: 'https://picsum.photos/60/60',
                            name: '李四',
                            level: 7,
                            score: 7,
                            isWinner: true
                        },
                        player2: {
                            avatar: 'https://picsum.photos/60/60',
                            name: '王五',
                            level: 6,
                            score: 5,
                            isWinner: false
                        }
                    }
                ]
            },
            {
                round: '16强',
                time: '2024-03-16',
                matches: [
                    {
                        id: 3,
                        time: '09:00',
                        tableNumber: 1,
                        status: 'ongoing',
                        player1: {
                            avatar: 'https://picsum.photos/60/60',
                            name: '刘鑫',
                            level: 8,
                            score: 4
                        },
                        player2: {
                            avatar: 'https://picsum.photos/60/60',
                            name: '李四',
                            level: 7,
                            score: 3
                        }
                    },
                    {
                        id: 4,
                        time: '10:30',
                        tableNumber: 2,
                        status: 'pending',
                        player1: {
                            avatar: 'https://picsum.photos/60/60',
                            name: '赵六',
                            level: 6
                        },
                        player2: {
                            avatar: 'https://picsum.photos/60/60',
                            name: '孙七',
                            level: 4
                        }
                    }
                ]
            },
            {
                round: '8强',
                time: '2024-03-17',
                matches: [
                    {
                        id: 5,
                        time: '14:00',
                        tableNumber: 1,
                        status: 'pending',
                        player1: {
                            avatar: 'https://picsum.photos/60/60',
                            name: '待定',
                            level: 0
                        },
                        player2: {
                            avatar: 'https://picsum.photos/60/60',
                            name: '待定',
                            level: 0
                        }
                    }
                ]
            }
        ]
    },

    onLoad: function (options) {
        const { id, status } = options;
        // 设置状态
        this.setData({ status });
        // 加载赛事信息
        this.loadTournamentInfo(id);
    },

    loadTournamentInfo(id) {
        // TODO: 从服务器加载赛事信息
        console.log('加载赛事ID:', id);
    },

    // 切换标签页
    switchTab(e) {
        const { tab } = e.currentTarget.dataset;
        this.setData({
            currentTab: tab
        });
    },

    // 跳转到已报名列表
    onRegisteredListTap() {
        wx.navigateTo({
            url: '/pages/tournament/registered/index?id=' + this.data.tournamentInfo.id
        });
    },

    // 报名
    onRegister() {
        wx.navigateTo({
            url: '/pages/tournament/register/confirm/index'
        });
    },

    // 进入赛场
    onEnterMatch() {
        // TODO: 处理进入赛场逻辑
    },

    // 点击进行中的比赛
    onMatchTap(e) {
        const { id } = e.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/match/detail/index?id=${id}`,
            success: (res) => {
                console.log('跳转成功:', res);
            },
            fail: (err) => {
                console.error('跳转失败:', err);
                wx.showToast({
                    title: '跳转失败',
                    icon: 'none'
                });
            }
        });
    }
}); 