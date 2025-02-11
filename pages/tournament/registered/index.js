Page({
    data: {
        tournamentInfo: {
            id: 1,
            name: '2024全国中式台球排名赛'
        },
        registeredPlayers: [
            {
                id: 1,
                name: '刘鑫',
                avatar: 'https://picsum.photos/80/80',
                level: 8,
                registerTime: '2024-02-15 10:30'
            },
            {
                id: 2,
                name: '郑宇伯',
                avatar: 'https://picsum.photos/80/80',
                level: 7,
                registerTime: '2024-02-15 11:15'
            },
            {
                id: 3,
                name: '张堃',
                avatar: 'https://picsum.photos/80/80',
                level: 9,
                registerTime: '2024-02-15 14:20'
            },
            {
                id: 4,
                name: '王浩',
                avatar: 'https://picsum.photos/80/80',
                level: 5,
                registerTime: '2024-02-16 09:30'
            },
            {
                id: 5,
                name: '李明',
                avatar: 'https://picsum.photos/80/80',
                level: 4,
                registerTime: '2024-02-16 10:45'
            },
            {
                id: 6,
                name: '陈强',
                avatar: 'https://picsum.photos/80/80',
                level: 6,
                registerTime: '2024-02-16 11:20'
            },
            {
                id: 7,
                name: '赵伟',
                avatar: 'https://picsum.photos/80/80',
                level: 3,
                registerTime: '2024-02-16 13:15'
            },
            {
                id: 8,
                name: '孙杰',
                avatar: 'https://picsum.photos/80/80',
                level: 7,
                registerTime: '2024-02-16 14:30'
            },
            {
                id: 9,
                name: '周涛',
                avatar: 'https://picsum.photos/80/80',
                level: 5,
                registerTime: '2024-02-16 15:45'
            }
        ]
    },

    onLoad(options) {
        const { id } = options;
        // TODO: 根据id加载赛事信息和报名选手列表
        console.log('加载赛事ID:', id);
    },

    // 点击选手跳转到选手详情页
    onPlayerTap(e) {
        const { id } = e.currentTarget.dataset;
        console.log('点击选手ID:', id); // 添加日志
        wx.navigateTo({
            url: `/pages/player/detail/index?id=${id}`,
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