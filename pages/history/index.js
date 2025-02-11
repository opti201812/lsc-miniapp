Page({
    data: {
        tournaments: [
            {
                id: 1,
                name: '菁英赛第十三站',
                organizer: '南京美式台球联盟',
                date: '2024-03-15',
                icon: 'https://picsum.photos/120/120'
            },
            {
                id: 2,
                name: '长三角美式9球公开赛',
                organizer: '南京美式台球联盟',
                date: '2024-02-20',
                icon: 'https://picsum.photos/120/120'
            },
            {
                id: 3,
                name: '尚层台球年度积分赛第二站(美式8球)',
                organizer: '南京璟点尚层台球俱乐部',
                date: '2024-02-01',
                icon: 'https://picsum.photos/120/120'
            }
        ]
    },

    onLoad: function () {
        // 页面加载时的逻辑
    },

    onTournamentTap(e) {
        const { id } = e.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/tournament/detail/index?id=${id}&status=finished`,
            success: function (res) {
                console.log('跳转成功', res);
            },
            fail: function (err) {
                console.log('跳转失败', err);
                wx.showToast({
                    title: '跳转失败',
                    icon: 'none'
                });
            }
        });
    }
}) 