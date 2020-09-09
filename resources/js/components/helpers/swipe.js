import Hammer from 'hammerjs';

class Swiper {
    constructor(element, onRightSwiped, onLeftSwiped) {
        this.element = element;
        this.onRightSwiped = onRightSwiped;
        this.onLeftSwiped = onLeftSwiped;
        this.mc = new Hammer(element);
        this.isActive = false;
    }

    init = () => {
        this.trigger(true);
        this.mc.get('swipe').set({ 
            direction: Hammer.DIRECTION_HORIZONTAL,
            threshold: 0
        });
        this.mc.on('swiperight', e => {
            e.preventDefault();
            this.onRightSwiped(e);
        });
        this.mc.on('swipeleft', e => {
            e.preventDefault();
            this.onLeftSwiped(e);
        });
    }

    trigger = isEnabled => {
        this.mc.set({
            enable: isEnabled
        });
        this.isActive = isEnabled;
    }

    destroy = () => {
        this.trigger(false);
    }
}

export default Swiper;