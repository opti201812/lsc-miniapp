Page({
    data: {
        // 轮播图数据
        banners: [
            {
                id: 1,
                imageUrl: 'https://picsum.photos/750/320'  // 随机图片,尺寸750x320
            },
            {
                id: 2,
                imageUrl: 'https://picsum.photos/750/320'  // 随机图片,尺寸750x320
            }
        ],
        quickMenus: [
            {
                icon: 'medal',
                text: '赛事报名'
            },
            {
                icon: 'group',
                text: '我的战队'
            },
            {
                icon: 'time',
                text: '赛程安排'
            },
            {
                icon: 'rank',
                text: '排行榜'
            }
        ],
        focusEvents: [
            {
                id: 1,
                name: '菁英赛第十三站',
                organizer: '南京美式台球联盟',
                time: '2024-03-15',
                status: 'upcoming', // 即将开始
                icon: 'https://picsum.photos/120/120'
            },
            {
                id: 2,
                name: '长三角美式9球公开赛',
                organizer: '南京美式台球联盟',
                time: '2024-02-20',
                status: 'registering', // 报名中
                icon: 'https://picsum.photos/120/120'
            },
            {
                id: 3,
                name: '尚层台球年度积分赛第二站(美式8球)',
                organizer: '南京璟点尚层台球俱乐部',
                time: '2024-02-01',
                status: 'ongoing', // 比赛中
                icon: 'https://picsum.photos/120/120'
            },
            {
                id: 4,
                name: '尚层蛇年贺岁杯美式8球比赛',
                organizer: '南京璟点尚层台球俱乐部',
                time: '2023-12-15',
                status: 'finished', // 已结束
                icon: 'https://picsum.photos/120/120'
            }
        ],
        seriesEvents: [
            {
                id: 1,
                name: '菁英赛',
                logo: 'https://picsum.photos/120/120',
                currentStation: 13,
                totalStation: 16
            },
            {
                id: 2,
                name: '尚层台球年度积分赛',
                logo: 'https://picsum.photos/120/120',
                currentStation: 2,
                totalStation: 12
            }
        ],
        notices: [
            {
                id: 1,
                text: '恭喜刘鑫在菁英赛第十三站获得冠军！',
                type: 'match',
                url: '/pages/match/detail/index?id=1'
            },
            {
                id: 2,
                text: '2024全国中式台球排名赛报名开始，点击查看详情',
                type: 'tournament',
                url: '/pages/tournament/detail/index?id=2'
            },
            {
                id: 3,
                text: '张堃成功卫冕尚层台球年度积分赛冠军',
                type: 'news',
                url: '/pages/news/detail/index?id=3'
            }
        ]
    },

    onLoad: function () {
        // 页面加载时的逻辑
    },

    onShow: function () {
        // 页面显示时的逻辑
    },

    // 搜索输入处理
    onSearch: function (e) {
        const { value } = e.detail;
        // 处理搜索逻辑
        console.log('搜索关键词：', value);
    },

    // 点击赛事项处理
    onTournamentTap: function (e) {
        const { id, status } = e.currentTarget.dataset;
        console.log("跳转参数：", id, status); // 添加日志便于调试
        wx.navigateTo({
            url: `/pages/tournament/detail/index?id=${id}&status=${status}`
        });
    },

    onSeriesTap: function (e) {
        const { id } = e.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/series/detail/index?id=${id}`
        });
    },

    // 处理公告点击
    onNoticeTap(e) {
        const { id, type, url } = e.currentTarget.dataset;
        console.log('点击公告:', id, type);

        if (url) {
            wx.navigateTo({
                url: url,
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
    }
}); 