let touchY = null;
let difference = 0;
let maximum = 150;

export const onTouchMove = (body, updater, banisher) => e => {
    if (banisher.scrollTop === 0) {
        const newY = e.changedTouches[0].screenY;
        if (touchY === null) {
            touchY = newY;
            return;
        }
        if (touchY < newY) {
            difference = newY - touchY;
            if (difference < maximum) {
                body.style.transform = `translateY(${ difference }px)`;
                updater.style.transform = `translateY(${ difference }px)`;
            }
            return;
        }
    }
};

export const onTouchStart = (banisher, updater) => e => {
    if (banisher.scrollTop === 0) {
        difference = 0;
        touchY = null;
    }
};

export const onTouchEnd = (banisher, updater) => () => {
    const time = 500;
    touchY = null;
    if (difference >= maximum) {
        difference = 0;
        updater.dispatchEvent(new CustomEvent('refreshData'));
        return;
    }
    difference = 0;
    banisher.style.transition = `all ${ time }ms`;
    updater.style.transition = `all ${ time }ms`;
    banisher.style.transform = 'none';
    updater.style.transform = 'none';
    setTimeout(() => {
        banisher.style.transition = '';
        updater.style.transition = '';
    }, time);
};

export const dropDefault = (banisher, updater) => () => {
    const time = 500;
    banisher.style.transition = `all ${ time }ms`;
    updater.style.transition = `all ${ time }ms`;
    banisher.style.transform = 'none';
    updater.style.transform = 'none';
    setTimeout(() => {
        banisher.style.transition = '';
        updater.style.transition = '';
    }, time);
};