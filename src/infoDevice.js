const infoDevice = {

    agent: {},

    init(){
        this.agent = window.navigator.userAgent.toLowerCase();
    },

    search(needle){
        return this.agent.indexOf(needle) !== -1;       
    },

    windows(){
        return this.search('windows');
    },

    isTouch(){
        return 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;
    },

    isTouchHybrid(){
        return this.windows() && this.isTouch();
    },

    isTouchOnly(){
        return this.isTouch() && !this.isTouchHybrid();
    }
}

export default infoDevice;