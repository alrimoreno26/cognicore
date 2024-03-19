export const buildURL = (serviceUrl: string): string => {
    if (serviceUrl.startsWith('http://')) {
        return serviceUrl;
    } else {
        return 'http://' + serviceUrl;
    }
};



