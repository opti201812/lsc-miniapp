Page({
    data: {
        tournament: null,
        userInfo: null,
        showPayment: false,
        qrCode: '',
        outTradeNo: '',
        pollingTimer: null
    },

    onLoad: function (options) {
        const { id } = options;
        this.loadTournamentInfo(id);
        this.loadUserInfo();
    },

    onUnload: function () {
        // 清除定时器
        if (this.data.pollingTimer) {
            clearInterval(this.data.pollingTimer);
        }
    },

    // 加载赛事信息
    loadTournamentInfo: function (id) {
        // TODO: 从服务器获取赛事信息
        const mockData = {
            id: id,
            name: '2024全国中式台球排名赛',
            startTime: '2024-03-15',
            endTime: '2024-03-20',
            location: '杭州',
            registrationFee: 100
        };
        this.setData({ tournament: mockData });
    },

    // 加载用户信息
    loadUserInfo: function () {
        // TODO: 从服务器获取用户信息
        const mockData = {
            name: '刘鑫',
            level: 8
        };
        this.setData({ userInfo: mockData });
    },

    // 处理提交
    handleSubmit: function () {
        // 模拟调用成功
        this.mockCreateRegistration();
    },

    // 模拟创建报名记录
    mockCreateRegistration: function () {
        // 模拟创建报名记录成功
        const mockRegistrationId = 'mock_reg_' + Date.now();

        // 直接调用模拟创建支付
        this.mockCreatePayment(mockRegistrationId);
    },

    // 模拟创建支付订单
    mockCreatePayment: function (registrationId) {
        // 模拟支付订单数据
        const mockPaymentData = {
            outTradeNo: 'mock_pay_' + Date.now(),
            qrCode: 'https://example.com/mock-qr-code'
        };

        // 显示支付弹窗
        this.setData({
            showPayment: true,
            qrCode: mockPaymentData.qrCode,
            outTradeNo: mockPaymentData.outTradeNo
        });

        // 开始模拟轮询支付状态
        this.startPolling(mockPaymentData.outTradeNo);
    },

    // 开始轮询支付状态
    startPolling: function (outTradeNo) {
        // 清除可能存在的旧定时器
        if (this.data.pollingTimer) {
            clearInterval(this.data.pollingTimer);
        }

        // 创建新的定时器
        const timer = setInterval(() => {
            // 模拟70%的概率支付成功
            if (Math.random() > 0.3) {
                clearInterval(timer);
                this.handlePaymentSuccess();
            }
        }, 3000);

        this.setData({ pollingTimer: timer });
    },

    // 处理支付成功
    handlePaymentSuccess: function () {
        this.setData({ showPayment: false });
        wx.showToast({
            title: '支付成功',
            icon: 'success'
        });

        // 延迟跳转，让用户看到成功提示
        setTimeout(() => {
            wx.redirectTo({
                url: `/pages/tournament/registered/index?id=${this.data.tournament.id}`
            });
        }, 1500);
    },

    // 关闭支付弹窗
    closePayment: function () {
        if (this.data.pollingTimer) {
            clearInterval(this.data.pollingTimer);
        }
        this.setData({
            showPayment: false,
            pollingTimer: null
        });
    }
}); 