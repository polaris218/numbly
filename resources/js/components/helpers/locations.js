export const isLoginScreen = pathname => {
    const regex = /\/(auth|login)(.)*/gi;
    return regex.test(pathname);
};

export const isRecommendedScreen = pathname => {
    const regex = /\/$/gm;
    return regex.test(pathname);
};