const infoDevice = {

    ua() {
        return window.navigator.userAgent.toLowerCase();
    },

    search(needle) {
        return this.ua().indexOf(needle) !== -1;
    },

    windows() {
        return this.search('windows');
    },

    isTouch() {
        return 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;
    },

    isTouchHybrid() {
        return this.windows() && this.isTouch();
    },

    isTouchOnly() {
        return this.isTouch() && !this.isTouchHybrid();
    },

    halfScreen() {
        const halfScreenX = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 2;
        const halfScreenY = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) / 2;
        return {
            halfScreenX,
            halfScreenY
        }
    }
}

export default infoDevice;
