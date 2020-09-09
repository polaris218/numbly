const iOSClassList = () => {
    const body = document.body;
    if (isIOS()) {
        body.classList.add('body-ios');
    }
};

export const isIOS = () => {
    return (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform))
        || (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
};

const checkStandalone = () => {
    const body = document.body;
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
        body.classList.add('body-standalone');
    }
};

export default () => {
    iOSClassList();
    checkStandalone();
};