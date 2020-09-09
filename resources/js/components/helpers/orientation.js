export default () => {
    const { screen } = window;
    try {
        screen.lockOrientationUniversal('portrait');
    } catch {
        console.log('This app is running from the browser.');
    }
};