Page({
    data: {
        currentTab: 'detail',
        guessChoice: '',
        showScoreEditor: false,
        tempScores: {
            player1: 0,
            player2: 0
        },
        matchInfo: {
            id: 1,
            time: '2024-03-16 09:00',
            tournamentName: '菁英赛第十三站',
            round: '16强',
            status: 'ongoing',
            player1: {
                avatar: 'https://picsum.photos/120/120',
                name: '刘鑫',
                score: 4,
                votePercent: 90
            },
            player2: {
                avatar: 'https://picsum.photos/120/120',
                name: '李四',
                score: 3,
                votePercent: 10
            },
            totalVotes: 151
        },
        comments: [
            {
                id: 1,
                avatar: 'https://picsum.photos/80/80',
                name: '球迷A',
                time: '3分钟前',
                content: '精彩的比赛！'
            },
            {
                id: 2,
                avatar: 'https://picsum.photos/80/80',
                name: '球迷B',
                time: '5分钟前',
                content: '支持刘鑫！'
            }
        ],
        historyMatches: [
            {
                id: 1,
                tournamentName: '菁英赛第十二站',
                time: '2024-02-15',
                round: '8强',
                score1: 7,
                score2: 3,
                winner: '刘鑫'
            },
            {
                id: 2,
                tournamentName: '尚层台球年度积分赛',
                time: '2024-01-20',
                round: '16强',
                score1: 5,
                score2: 7,
                winner: '李四'
            }
        ]
    },

    onLoad: function (options) {
        const { id } = options;
        // TODO: 根据id加载对阵信息
        console.log('加载对阵ID:', id);

        // 设置页面标题
        this.updatePageTitle();
    },

    // 更新页面标题
    updatePageTitle() {
        const { tournamentName, round } = this.data.matchInfo;
        wx.setNavigationBarTitle({
            title: `${tournamentName} ${round}`
        });
    },

    // 显示比分编辑器
    showScoreEditor() {
        this.setData({
            showScoreEditor: true,
            tempScores: {
                player1: this.data.matchInfo.player1.score || 0,
                player2: this.data.matchInfo.player2.score || 0
            }
        });
    },

    // 隐藏比分编辑器
    hideScoreEditor() {
        this.setData({
            showScoreEditor: false
        });
    },

    // 调整比分
    adjustScore(e) {
        const { player, action } = e.currentTarget.dataset;
        const tempScores = { ...this.data.tempScores };

        if (action === 'plus') {
            tempScores[player]++;
        } else if (action === 'minus' && tempScores[player] > 0) {
            tempScores[player]--;
        }

        this.setData({ tempScores });
    },

    // 确认比分
    confirmScore() {
        const { tempScores } = this.data;
        const matchInfo = { ...this.data.matchInfo };

        matchInfo.player1.score = tempScores.player1;
        matchInfo.player2.score = tempScores.player2;

        // TODO: 提交比分到服务器
        this.setData({
            matchInfo,
            showScoreEditor: false
        });

        wx.showToast({
            title: '比分已更新',
            icon: 'success'
        });
    },

    // 防止穿透
    preventTouchMove() {
        return false;
    },

    // 切换标签页
    switchTab(e) {
        const { tab } = e.currentTarget.dataset;
        this.setData({
            currentTab: tab
        });
    },

    // 竞猜选择
    onGuess(e) {
        const { player } = e.currentTarget.dataset;
        if (this.data.matchInfo.status !== 'ongoing') {
            wx.showToast({
                title: '比赛已结束',
                icon: 'none'
            });
            return;
        }
        this.setData({
            guessChoice: player
        });
        // TODO: 提交竞猜选择到服务器
    },

    // 显示评论输入框
    showCommentModal() {
        wx.showModal({
            title: '写评论',
            editable: true,
            placeholderText: '说点什么...',
            success: (res) => {
                if (res.confirm && res.content) {
                    // TODO: 提交评论到服务器
                    console.log('评论内容:', res.content);
                    wx.showToast({
                        title: '评论成功',
                        icon: 'success'
                    });
                }
            }
        });
    }
}); 