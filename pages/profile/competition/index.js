/* eslint-disable new-cap */
Page({
    data: {
        tournaments: [
            {
                id: 1,
                name: '菁英赛第十三站',
                organizer: '南京美式台球联盟',
                time: '2024-03-15',
                result: '8强',
                matches: [
                    {
                        round: '8强',
                        opponent: '郑宇伯',
                        score: '6:8',
                        result: '负'
                    },
                    {
                        round: '16强',
                        opponent: '王浩',
                        score: '8:4',
                        result: '胜'
                    }
                ]
            },
            {
                id: 2,
                name: '长三角美式9球公开赛',
                organizer: '南京美式台球联盟',
                time: '2024-02-20',
                result: '亚军',
                matches: [
                    {
                        round: '决赛',
                        opponent: '张堃',
                        score: '7:9',
                        result: '负'
                    },
                    {
                        round: '半决赛',
                        opponent: '李明',
                        score: '9:5',
                        result: '胜'
                    }
                ]
            },
            {
                id: 3,
                name: '尚层台球年度积分赛第二站(美式8球)',
                organizer: '南京璟点尚层台球俱乐部',
                time: '2024-02-01',
                result: '冠军',
                matches: [
                    {
                        round: '决赛',
                        opponent: '陈强',
                        score: '9:7',
                        result: '胜'
                    },
                    {
                        round: '半决赛',
                        opponent: '赵伟',
                        score: '9:4',
                        result: '胜'
                    }
                ]
            }
        ],
        currentTournament: null
    },

    // 添加点击事件处理方法
    onTournamentTap: function (e) {
        'use strict';
        var id = e.currentTarget.dataset.id;
        var tournaments = this.data.tournaments;
        var tournament = null;
        tournaments.forEach(function (t) {
            if (t.id === id) {
                tournament = t;
            }
        });

        // 如果已经展开，则收起
        if (this.data.currentTournament && this.data.currentTournament.id === id) {
            this.setData({ currentTournament: null });
        } else {
            this.setData({ currentTournament: tournament });
        }
    },

    onLoad() {
        // 页面加载时的逻辑
    }
}); 