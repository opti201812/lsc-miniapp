Page({
    data: {
        followedPlayers: [
            {
                id: 1,
                name: '刘鑫',
                avatar: 'https://picsum.photos/100/100',
                level: 8,
                winRate: 68
            },
            {
                id: 2,
                name: '郑宇伯',
                avatar: 'https://picsum.photos/100/100',
                level: 7,
                winRate: 72
            },
            {
                id: 3,
                name: '张堃',
                avatar: 'https://picsum.photos/100/100',
                level: 9,
                winRate: 75
            },
            {
                id: 4,
                name: '王浩',
                avatar: 'https://picsum.photos/100/100',
                level: 6,
                winRate: 65
            }
        ]
    },

    onLoad() {
        // TODO: 从服务器加载关注的选手列表
    },

    // 点击选手跳转到选手详情页
    onPlayerTap(e) {
        const { id } = e.currentTarget.dataset;
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