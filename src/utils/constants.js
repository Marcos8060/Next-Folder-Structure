export const appName = 'NHIF';
export const menuItems = [
    {
        name: "products",
        icon: "",
        collapse: [
            {
                name: "educare plus",
                href: "/products/educare-plus",
            },
            {
                name: "sanlam educare",
                href: "/products/sanlam-educare",
            },
            {
                name: "super endowment",
                href: "/products/super-endowment",
            },
        ],
    },
    {
        name: "about us",
        icon: "",
        href: '/',
    },
    {
        name: "help",
        icon: "",
        href: '#help',
    },
];
export const AUTH_TOKEN_KEY = 'accessToken';
export const USER_DETAILS = 'accessToken';
export const AUTH_REFRESH_TOKEN_KEY = 'refreshToken';

export const ALLOWED_PAGE_SIZES = [ 10, 25,];

export const USER_ROLES = {
    PRINCIPAL: 'principal',
    ADMIN: 'admin',
    BASIC: 'basic',
}

export const COLORS = ['#22bb33', '#e7bd17', '#e78617', '#c40f0f', '#5AB9FE'];
export const GRADIENT_COLORS = [
    ['#22bb33', '#018c11'],
    ['#e78617', '#d97604'],
    ['#c40f0f', '#B72D23'],
    ['#5AB9FE', '#1372B7'],
    ['#e7bd17', '#e78617'],
];

export const riskTreeDataSections = [
    { id: 1, name: 'Section One', slug: 'S1', risks: 20 },
    { id: 2, name: 'Section Two', slug: 'S2', risks: 15 },
    { id: 3, name: 'Section Three', slug: 'S3', risks: 10 },
    { id: 4, name: 'Section Four', slug: 'S4', risks: 5 },
];
export const assessedTreeDataDepartments = [

    {
        id: 1,
        name: 'NAIROBI',
        //color: '#663366',
        color: '#663366',
        children: [
            { id: 1, name: 'UPPER HILL BRANCH', slug: 'UHB', risks: 25000 },
            { id: 2, name: 'EASTLEIGH BRANCH', slug: 'ESL', risks: 10000 },
            { id: 3, name: 'BURUBURU BRANCH', slug: 'BR', risks: 56000 },
            { id: 4, name: 'K N H BRANCH', slug: 'KNH', risks: 20000 },
            { id: 5, name: 'KANGEMI BRANCH', slug: 'PM', risks: 40000 },
            { id: 5, name: 'GIKOMBA BRANCH', slug: 'GKM', risks: 30000 },
        ],
    },
    {
        id: 2,
        name: 'MOMBASA',
        color: '#33CC99',
        children: [
            { id: 1, name: 'MOMBASA BRANCH', slug: 'MBS', risks: 34000 },

        ],
    },
    {
        id: 3,
        name: 'HOMA BAY',
        color: '#CC6633',
        children: [
            { id: 1, name: 'HOMA BAY BRANCH', slug: 'HB', risks: 20000 },
            { id: 2, name: 'OYUGIS SATELLITE', slug: 'OYG', risks: 30000 },
            { id: 3, name: 'MBITA SATELLITE', slug: 'MB', risks: 10000 },
        ],
    },
    {
        id: 4,
        name: 'HOMA BAY',
        color: '#CC6633',
        children: [
            { id: 1, name: 'HOMA BAY BRANCH', slug: 'HB', risks: 20000 },
            { id: 2, name: 'OYUGIS SATELLITE', slug: 'OYG', risks: 30000 },
            { id: 3, name: 'MBITA SATELLITE', slug: 'MB', risks: 10000 },
        ],
    },
    {
        id: 5,
        name: 'KIAMBU',
        color: '#e7bd17',
        children: [
            { id: 1, name: 'LIMURU BRANCH', slug: 'LM', risks: 15000 },
            { id: 2, name: 'RUIRU SATELLITE', slug: 'RUR', risks: 30000 },
            { id: 3, name: 'KIAMBU BRANCH', slug: 'KMB', risks: 100000 },
        ],
    }
];
export const assessedTreeDataCat = [
    {
        id: 1,
        name: 'Low',
        color: COLORS[0],
        children: [
            { name: 'Compliance Risk', slug: 'CPR', risks: 20 },
            { name: 'Market Risk', slug: 'MTR', risks: 10 },
            { name: 'Legal Risk', slug: 'LGR', risks: 30 },
            { name: 'Liquidity Risk', slug: 'LDR', risks: 50 },
            { name: 'Strategic Risk', slug: 'SGR', risks: 15 },
            { name: 'Credit Risk', slug: 'CDR', risks: 55 },
            { name: 'Operational Risk', slug: 'OTR', risks: 25 },
        ],
    },
    {
        id: 2,
        name: 'Medium',
        color: COLORS[1],
        children: [
            { name: 'Compliance Risk', slug: 'CPR', risks: 20 },
            { name: 'Market Risk', slug: 'MTR', risks: 30 },
            { name: 'Legal Risk', slug: 'LGR', risks: 50 },
            { name: 'Liquidity Risk', slug: 'LDR', risks: 20 },
            { name: 'Strategic Risk', slug: 'SGR', risks: 15 },
            { name: 'Credit Risk', slug: 'CDR', risks: 25 },
            { name: 'Operational Risk', slug: 'OTR', risks: 34 },
        ],
    },
    {
        id: 3,
        name: 'High',
        color: COLORS[2],
        children: [
            { name: 'Compliance Risk', slug: 'CPR', risks: 25 },
            { name: 'Market Risk', slug: 'MTR', risks: 45 },
            { name: 'Legal Risk', slug: 'LGR', risks: 30 },
            { name: 'Liquidity Risk', slug: 'LDR', risks: 60 },
            { name: 'Strategic Risk', slug: 'SGR', risks: 55 },
            { name: 'Credit Risk', slug: 'CDR', risks: 35 },
            { name: 'Operational Risk', slug: 'OTR', risks: 15 },
        ],
    },
    {
        id: 4,
        name: 'Very High',
        color: COLORS[3],
        children: [
            { name: 'Compliance Risk', slug: 'CPR', risks: 26 },
            { name: 'Market Risk', slug: 'MTR', risks: 43 },
            { name: 'Legal Risk', slug: 'LGR', risks: 68 },
            { name: 'Liquidity Risk', slug: 'LDR', risks: 32 },
            { name: 'Strategic Risk', slug: 'SGR', risks: 17 },
            { name: 'Credit Risk', slug: 'CDR', risks: 25 },
            { name: 'Operational Risk', slug: 'OTR', risks: 50 },
        ],
    },
];
export const riskTreeDataControlCat = [
    { name: 'Compliance Risk', slug: 'CPR', risks: 30 },
    { name: 'Market Risk', slug: 'MTR', risks: 40 },
    { name: 'Legal Risk', slug: 'LGR', risks: 20 },
    { name: 'Liquidity Risk', slug: 'LDR', risks: 10 },
    { name: 'Strategic Risk', slug: 'SGR', risks: 55 },
    { name: 'Credit Risk', slug: 'CDR', risks: 34 },
    { name: 'Operational Risk', slug: 'OTR', risks: 45 },
];

export const complianceMonthlyData = [
    {
        name: 'Completed Applications',
        overallScore: '40%',
        badgeColor: COLORS[0],
        chartGradientColor: '#fef5f6',
        data: [
            { month: 'Jan', score: 10 },
            { month: 'Feb', score: 60 },
            { month: 'Mar', score: 50 },
            { month: 'Apr', score: 70 },
            { month: 'May', score: 50 },
            { month: 'Jun', score: 20 },
            { month: 'Jul', score: 45 },
            { month: 'Aug', score: 56 },
            { month: 'Sep', score: 74 },
            { month: 'Oct', score: 67 },
            { month: 'Nov', score: 89 },
            { month: 'Dec', score: 90 },
        ],
    },
    {
        name: 'Pending Applications',
        overallScore: '40%',
        badgeColor: COLORS[4],
        chartGradientColor: '#fef5f6',
        data: [
            { month: 'Jan', score: 20 },
            { month: 'Feb', score: 10 },
            { month: 'Mar', score: 40 },
            { month: 'Apr', score: 60 },
            { month: 'May', score: 50 },
            { month: 'Jun', score: 80 },
            { month: 'Jul', score: 65 },
            { month: 'Aug', score: 58 },
            { month: 'Sep', score: 70 },
            { month: 'Oct', score: 48 },
            { month: 'Nov', score: 78 },
            { month: 'Dec', score: 40 },
        ],
    },
    {
        name: 'Rejected Applications',
        overallScore: '20%',
        badgeColor: COLORS[3],
        chartGradientColor: '#fef5f6',
        data: [
            { month: 'Jan', score: 70 },
            { month: 'Feb', score: 100 },
            { month: 'Mar', score: 80 },
            { month: 'Apr', score: 70 },
            { month: 'May', score: 55 },
            { month: 'Jun', score: 60 },
            { month: 'Jul', score: 78 },
            { month: 'Aug', score: 48 },
            { month: 'Sep', score: 75 },
            { month: 'Oct', score: 36 },
            { month: 'Nov', score: 79 },
            { month: 'Dec', score: 30 },
        ],
    },
];