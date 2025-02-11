Page({
    data: {
        currentTab: 'summary',
        playerInfo: {
            id: 1,
            name: '刘鑫',
            avatar: 'https://picsum.photos/100/100',
            level: 8,
            isFollowed: false,
            followers: 2345,
            stats: {
                totalMatches: 156,
                winRate: 68
            },
            opponentStats: [
                {
                    id: 1,
                    avatar: 'https://picsum.photos/60/60',
                    winRate: 75
                },
                {
                    id: 2,
                    avatar: 'https://picsum.photos/60/60',
                    winRate: 45
                },
                {
                    id: 3,
                    avatar: 'https://picsum.photos/60/60',
                    winRate: 60
                },
                {
                    id: 4,
                    avatar: 'https://picsum.photos/60/60',
                    winRate: 30
                },
                {
                    id: 5,
                    avatar: 'https://picsum.photos/60/60',
                    winRate: 80
                }
            ],
            upcomingMatches: [
                {
                    id: 1,
                    date: '2024-03-15',
                    name: '2024全国中式台球排名赛',
                    player1: {
                        avatar: 'https://picsum.photos/60/60',
                        name: '刘鑫'
                    },
                    player2: {
                        avatar: 'https://picsum.photos/60/60',
                        name: '张三'
                    }
                },
                {
                    id: 2,
                    date: '2024-03-20',
                    name: '杭州市台球公开赛',
                    player1: {
                        avatar: 'https://picsum.photos/60/60',
                        name: '刘鑫'
                    },
                    player2: {
                        avatar: 'https://picsum.photos/60/60',
                        name: '李四'
                    }
                }
            ],
            matchHistory: [
                {
                    id: 1,
                    tournamentName: '2024全国中式台球排名赛',
                    date: '2024-02-15',
                    round: '决赛',
                    result: 'win',
                    player1: {
                        avatar: 'https://picsum.photos/60/60',
                        name: '刘鑫',
                        score: 7
                    },
                    player2: {
                        avatar: 'https://picsum.photos/60/60',
                        name: '王五',
                        score: 3
                    }
                },
                {
                    id: 2,
                    tournamentName: '2024全国中式台球排名赛',
                    date: '2024-02-14',
                    round: '半决赛',
                    result: 'win',
                    player1: {
                        avatar: 'https://picsum.photos/60/60',
                        name: '刘鑫',
                        score: 7
                    },
                    player2: {
                        avatar: 'https://picsum.photos/60/60',
                        name: '赵六',
                        score: 5
                    }
                },
                {
                    id: 3,
                    tournamentName: '2024全国中式台球排名赛',
                    date: '2024-02-13',
                    round: '8强',
                    result: 'win',
                    player1: {
                        avatar: 'https://picsum.photos/60/60',
                        name: '刘鑫',
                        score: 7
                    },
                    player2: {
                        avatar: 'https://picsum.photos/60/60',
                        name: '孙七',
                        score: 4
                    }
                },
                {
                    id: 4,
                    tournamentName: '2024全国中式台球排名赛',
                    date: '2024-02-12',
                    round: '16强',
                    result: 'win',
                    player1: {
                        avatar: 'https://picsum.photos/60/60',
                        name: '刘鑫',
                        score: 7
                    },
                    player2: {
                        avatar: 'https://picsum.photos/60/60',
                        name: '周八',
                        score: 2
                    }
                },
                {
                    id: 5,
                    tournamentName: '2024全国中式台球排名赛',
                    date: '2024-02-11',
                    round: '32强',
                    result: 'win',
                    player1: {
                        avatar: 'https://picsum.photos/60/60',
                        name: '刘鑫',
                        score: 7
                    },
                    player2: {
                        avatar: 'https://picsum.photos/60/60',
                        name: '吴九',
                        score: 1
                    }
                },
                {
                    id: 6,
                    tournamentName: '2024杭州市台球公开赛',
                    date: '2024-02-05',
                    round: '决赛',
                    result: 'lose',
                    player1: {
                        avatar: 'https://picsum.photos/60/60',
                        name: '刘鑫',
                        score: 5
                    },
                    player2: {
                        avatar: 'https://picsum.photos/60/60',
                        name: '郑十',
                        score: 7
                    }
                }
            ]
        },
        groupedHistory: []
    },

    onLoad(options) {
        const { id } = options;
        // TODO: 根据id加载选手信息
        console.log('加载选手ID:', id);
        this.groupMatchHistory();
    },

    // 按比赛分组处理历史记录
    groupMatchHistory() {
        const history = this.data.playerInfo.matchHistory;
        const grouped = {};

        // 按比赛名称分组
        history.forEach(match => {
            if (!grouped[match.tournamentName]) {
                grouped[match.tournamentName] = {
                    tournamentName: match.tournamentName,
                    matches: []
                };
            }
            grouped[match.tournamentName].matches.push(match);
        });

        // 转换为数组并排序
        const groupedArray = Object.values(grouped).map(tournament => {
            // 按日期倒序排序每个比赛内的轮次
            tournament.matches.sort((a, b) => new Date(b.date) - new Date(a.date));
            return tournament;
        });

        // 按最新比赛日期倒序排序比赛
        groupedArray.sort((a, b) => {
            const dateA = new Date(a.matches[0].date);
            const dateB = new Date(b.matches[0].date);
            return dateB - dateA;
        });

        this.setData({
            groupedHistory: groupedArray
        });
    },

    // 切换标签页
    switchTab(e) {
        const { tab } = e.currentTarget.dataset;
        this.setData({
            currentTab: tab
        });
    },

    // 关注/取消关注
    onFollowTap() {
        const { isFollowed } = this.data.playerInfo;
        // TODO: 调用关注/取消关注接口
        this.setData({
            'playerInfo.isFollowed': !isFollowed,
            'playerInfo.followers': isFollowed ?
                this.data.playerInfo.followers - 1 :
                this.data.playerInfo.followers + 1
        });
    }
});

