// components/login-pop/login-pop.js
Component({

    showPopup() {
        this.setData({ show: true });
      },
    
      onClose() {
        this.setData({ show: false });
      },

    /**
     * 组件的属性列表
     */
    properties: {
        
    
    },

    /**
     * 组件的初始数据
     */
    data: {
        show: true,
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
