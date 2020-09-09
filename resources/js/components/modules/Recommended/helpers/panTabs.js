class TabPanner {
    constructor(element, wrap) {
        this.element = element;
        this.isScrolling = false;
        this.scrollLeft = 0;
        this.clientX = 0;
        element.addEventListener('touchstart', this.onTouchStart);
        element.addEventListener('touchmove', this.onTouchMove);
        element.addEventListener('touchend', this.onTouchEnd);
    }

    onTouchStart = e => {
        const { scrollLeft } = this.element;
        this.isScrolling = true;
        this.scrollLeft = scrollLeft;
        this.clientX = e.changedTouches[0].clientX;
    }

    onTouchMove = e => {
        const { clientX, scrollLeft } = this;
        this.element.scrollLeft = scrollLeft + clientX - e.changedTouches[0].clientX;
    }

    onTouchEnd = e => {
        this.isScrolling = false;
        this.scrollLeft = 0;
        this.clientX = 0;
    }
}

export default TabPanner;