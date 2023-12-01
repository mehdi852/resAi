var config = {
    adminEmail: 'peaux1@gmail.com', // The website will consider this email  as an admin
    brand: {
        useImg: true, // 320X70 Preferable Size , replace with true if you want to use image logo. and keep false if you want to keep the logo as text
        name: 'Resumen', // This will be shown in the absence of the logo
    },
    paypalClienID: 'pk_test_51IZbSFKcjeLOayGZuxoP6jTHn0jjjjlXX1m58w4ER2MxMKIjOgIaKsFINTt9Vi8OnfvcV2WaCjhB24mxNpMY1dMEciebpgW00hegvTU6L',
    stripe_publishable_key: 'pk_test_51IZbSFKcjLOayGZkkuxoP6THn0XX1m58w4ER2MxMKddIjOgIaKs22FINTt9Vi8OnfvcV2WaCjhB24mxNpMY1dMEciebpgW00hegvTU6L', // Make sure its th publishable key
    backendUrl: 'cv-job.com', // our domain in this format :  domain.com . if you use subdomain for the app then it should be like : subdomain.domain.com,
    provider: 'https',
};
export default config;
