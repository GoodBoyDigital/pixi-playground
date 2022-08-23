declare interface ProcessVars {
    AMPLITUDE: string;
    AMPLITUDE_AD_SERVER: string;
    AMPLITUDE_TIME_ZONE: string;
    APP_NAME: string;
    APP_ID: string;
    APP_VERSION: string;
    CDN_DEPLOYMENT_APP: string;
    CDN_DEPLOYMENT_STAGE: string;
    FB_INSTANT_USE_MOCK_DATA: string;
    FB_INSTANT_MOCK_SIGNATURE: string;
    FB_PIXEL_ID: string;
    IS_DEVELOPMENT: string;
    NODE_ENV: 'development' | 'production';
    PLATFORM:
        | 'fb'
        | 'viber'
        | 'line'
        | 'link'
        | 'tiktok'
        | 'wc'
        | 'web'
        | 'mock'
        | 'snapchat'
        | 'zoom';
    PLATFORM_SDK: string;
    SENTRY_DSN: string;
    SENTRY_PROJECT: string;
    SENTRY_ENVIRONMENT: string;
    SHORT_NAME: string;
    STAGE: string;
    REPLICANT_ENDPOINT: string;
    REPLICANT_OFFLINE: string;
    SHORT_NAME: string;
    VERSION: string;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends ProcessVars {}
    }
    type ENVObject = Partial<Wrap<ProcessVars>> & {
        extends?: Partial<Wrap<ProcessVars>>[];
    };
}

type Wrap<T> = {
    [P in keyof T]: T[P];
};

export {};
