/**
 * List of available devices and their specific watermark configurations
 */

const DEVICE_BRANDS = {
    APPLE: 'Apple',
    SAMSUNG: 'Samsung',
    GOOGLE: 'Google',
    XIAOMI: 'Xiaomi',
    ONEPLUS: 'OnePlus',
    VIVO: 'Vivo',
    OPPO: 'Oppo',
    REALME: 'Realme'
};

// Common camera specs to be used
const SPECS = {
    PRO_APPLE: '48MP Main Camera',
    STD_APPLE: '12MP Dual Camera',
    ULTRA_SAMSUNG: '200MP ISOCELL System',
    PRO_SAMSUNG: '50MP Triple Camera',
    STD_SAMSUNG: '50MP System',
    PRO_PIXEL: '50MP Advanced AI Camera',
    PRO_LEICA: 'LEICA VARIO-SUMMICRON 1:1.9-4.1/14-120 ASPH.',
    HASSELBLAD: 'Hasselblad Camera for Mobile',
    ZEISS: 'ZEISS Vario-Tessar',
    MARISILICON: 'Powered by MariSilicon'
};

// This SVG structure is used for the icon on the canvas
// We will return data URIs of SVG paths
const ICONS = {
    APPLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="white"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM207.2 103.8c18.8-23.9 31.3-56.1 27.8-88.3-25.9 1-59.5 17.2-79.1 41.2-17.4 21.2-31.9 54.5-27.8 85.8 28.5 2.2 60.3-14.8 79.1-38.7z"/></svg>`,
    SAMSUNG: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white"><path d="M480 348.6c0 51.5-122.3 93.4-224 93.4S32 400.1 32 348.6 154.3 255.2 256 255.2s224 41.9 224 93.4zM256 64C154.3 64 32 105.9 32 157.4S154.3 250.8 256 250.8s224-41.9 224-93.4S357.7 64 256 64z"/></svg>`,
    GOOGLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" fill="white"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>`,
    CAMERA: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>`,
    VIVO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><path fill="white" d="M165.7 301.8L93.5 106.5h35.9l46.1 140.5 54.4-140.5h33.8L183.3 301.8h-17.6z"/><path fill="white" d="M266.9 133.5c-4.9-5-10.9-7.5-18.1-7.5-6.9 0-12.7 2.4-17.5 7.1-4.8 4.7-7.2 11.2-7.2 19.3 0 16.4 8.2 24.6 24.6 24.6s24.6-8.2 24.6-24.6c.1-8-2.1-14.3-6.4-18.9z"/></svg>`,
    ZEISS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="#003366" rx="40"/><path fill="white" d="M140 240h210v40L200 400h150v45H140v-40l150-120H140v-45zm250 0h60v205h-60V240zm100 0h170v45H510v35h130v40H510v40h150v45H490V240z"/></svg>`
};

const DEVICELIST = [
    // APPLE IPHONES
    { id: 'iphone-17-pro-max', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 17 Pro Max', specs: SPECS.PRO_APPLE, icon: ICONS.APPLE, layout: 'default' },
    { id: 'iphone-17-pro', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 17 Pro', specs: SPECS.PRO_APPLE, icon: ICONS.APPLE, layout: 'default' },
    { id: 'iphone-17', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 17', specs: SPECS.STD_APPLE, icon: ICONS.APPLE, layout: 'default' },

    { id: 'iphone-16-pro-max', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 16 Pro Max', specs: SPECS.PRO_APPLE, icon: ICONS.APPLE, layout: 'default' },
    { id: 'iphone-16-pro', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 16 Pro', specs: SPECS.PRO_APPLE, icon: ICONS.APPLE, layout: 'default' },
    { id: 'iphone-16-plus', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 16 Plus', specs: SPECS.STD_APPLE, icon: ICONS.APPLE, layout: 'default' },
    { id: 'iphone-16', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 16', specs: SPECS.STD_APPLE, icon: ICONS.APPLE, layout: 'default' },

    { id: 'iphone-15-pro-max', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 15 Pro Max', specs: SPECS.PRO_APPLE, icon: ICONS.APPLE, layout: 'default' },
    { id: 'iphone-15-pro', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 15 Pro', specs: SPECS.PRO_APPLE, icon: ICONS.APPLE, layout: 'default' },
    { id: 'iphone-15-plus', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 15 Plus', specs: SPECS.STD_APPLE, icon: ICONS.APPLE, layout: 'default' },
    { id: 'iphone-15', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 15', specs: SPECS.STD_APPLE, icon: ICONS.APPLE, layout: 'default' },

    { id: 'iphone-14-pro-max', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 14 Pro Max', specs: '48MP Main Camera', icon: ICONS.APPLE, layout: 'default' },
    { id: 'iphone-14-pro', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 14 Pro', specs: '48MP Main Camera', icon: ICONS.APPLE, layout: 'default' },
    { id: 'iphone-14-plus', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 14 Plus', specs: '12MP Dual Camera', icon: ICONS.APPLE, layout: 'default' },
    { id: 'iphone-14', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 14', specs: '12MP Dual Camera', icon: ICONS.APPLE, layout: 'default' },

    { id: 'iphone-13-pro-max', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 13 Pro Max', specs: '12MP Pro Camera System', icon: ICONS.APPLE, layout: 'default' },
    { id: 'iphone-13-pro', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 13 Pro', specs: '12MP Pro Camera System', icon: ICONS.APPLE, layout: 'default' },
    { id: 'iphone-13', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 13', specs: '12MP Dual Camera', icon: ICONS.APPLE, layout: 'default' },
    { id: 'iphone-13-mini', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 13 Mini', specs: '12MP Dual Camera', icon: ICONS.APPLE, layout: 'default' },

    { id: 'iphone-12-pro-max', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 12 Pro Max', specs: '12MP Pro Camera System', icon: ICONS.APPLE, layout: 'default' },
    { id: 'iphone-12-pro', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 12 Pro', specs: '12MP Pro Camera System', icon: ICONS.APPLE, layout: 'default' },
    { id: 'iphone-12', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 12', specs: '12MP Dual Camera', icon: ICONS.APPLE, layout: 'default' },
    { id: 'iphone-12-mini', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 12 Mini', specs: '12MP Dual Camera', icon: ICONS.APPLE, layout: 'default' },
    { id: 'iphone-11-pro-max', brand: DEVICE_BRANDS.APPLE, name: 'iPhone 11 Pro Max', specs: '12MP Pro Camera System', icon: ICONS.APPLE, layout: 'default' },

    // SAMSUNG GALAXY S SERIES
    { id: 'samsung-s26-ultra', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy S26 Ultra', specs: SPECS.ULTRA_SAMSUNG, icon: ICONS.SAMSUNG, layout: 'default' },
    { id: 'samsung-s26-plus', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy S26+', specs: SPECS.PRO_SAMSUNG, icon: ICONS.SAMSUNG, layout: 'default' },
    { id: 'samsung-s26', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy S26', specs: SPECS.STD_SAMSUNG, icon: ICONS.SAMSUNG, layout: 'default' },

    { id: 'samsung-s25-ultra', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy S25 Ultra', specs: SPECS.ULTRA_SAMSUNG, icon: ICONS.SAMSUNG, layout: 'default' },
    { id: 'samsung-s25-plus', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy S25+', specs: SPECS.PRO_SAMSUNG, icon: ICONS.SAMSUNG, layout: 'default' },
    { id: 'samsung-s25', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy S25', specs: SPECS.STD_SAMSUNG, icon: ICONS.SAMSUNG, layout: 'default' },
    { id: 'samsung-s25-edge', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy S25 Edge', specs: SPECS.STD_SAMSUNG, icon: ICONS.SAMSUNG, layout: 'default' },
    { id: 'samsung-s25-fe', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy S25 FE', specs: SPECS.STD_SAMSUNG, icon: ICONS.SAMSUNG, layout: 'default' },

    { id: 'samsung-s24-ultra', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy S24 Ultra', specs: SPECS.ULTRA_SAMSUNG, icon: ICONS.SAMSUNG, layout: 'default' },
    { id: 'samsung-s24-plus', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy S24+', specs: SPECS.PRO_SAMSUNG, icon: ICONS.SAMSUNG, layout: 'default' },
    { id: 'samsung-s24', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy S24', specs: SPECS.STD_SAMSUNG, icon: ICONS.SAMSUNG, layout: 'default' },
    { id: 'samsung-s24-fe', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy S24 FE', specs: SPECS.STD_SAMSUNG, icon: ICONS.SAMSUNG, layout: 'default' },

    { id: 'samsung-s23-ultra', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy S23 Ultra', specs: SPECS.ULTRA_SAMSUNG, icon: ICONS.SAMSUNG, layout: 'default' },
    { id: 'samsung-s23-plus', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy S23+', specs: SPECS.PRO_SAMSUNG, icon: ICONS.SAMSUNG, layout: 'default' },
    { id: 'samsung-s23', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy S23', specs: SPECS.STD_SAMSUNG, icon: ICONS.SAMSUNG, layout: 'default' },
    { id: 'samsung-s23-fe', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy S23 FE', specs: SPECS.STD_SAMSUNG, icon: ICONS.SAMSUNG, layout: 'default' },

    { id: 'samsung-s22-ultra', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy S22 Ultra', specs: '108MP ISOCELL System', icon: ICONS.SAMSUNG, layout: 'default' },
    { id: 'samsung-s22-plus', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy S22+', specs: SPECS.PRO_SAMSUNG, icon: ICONS.SAMSUNG, layout: 'default' },
    { id: 'samsung-s22', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy S22', specs: SPECS.STD_SAMSUNG, icon: ICONS.SAMSUNG, layout: 'default' },

    { id: 'samsung-s21-ultra', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy S21 Ultra', specs: '108MP ISOCELL System', icon: ICONS.SAMSUNG, layout: 'default' },
    { id: 'samsung-s20-ultra', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy S20 Ultra', specs: '108MP ISOCELL System', icon: ICONS.SAMSUNG, layout: 'default' },

    // SAMSUNG GALAXY A SERIES
    { id: 'samsung-a56-5g', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy A56 5G', specs: '50MP System', icon: ICONS.SAMSUNG, layout: 'default' },
    { id: 'samsung-a35-5g', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy A35 5G', specs: '50MP System', icon: ICONS.SAMSUNG, layout: 'default' },

    // SAMSUNG Z FOLD / FLIP
    { id: 'samsung-fold-7', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy Z Fold7', specs: '200MP Foldable Camera System', icon: ICONS.SAMSUNG, layout: 'default' },
    { id: 'samsung-flip-7', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy Z Flip7', specs: '50MP FlexCam', icon: ICONS.SAMSUNG, layout: 'default' },
    { id: 'samsung-fold-6', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy Z Fold6', specs: '50MP Foldable Camera System', icon: ICONS.SAMSUNG, layout: 'default' },
    { id: 'samsung-flip-6', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy Z Flip6', specs: '50MP FlexCam', icon: ICONS.SAMSUNG, layout: 'default' },
    { id: 'samsung-fold-5', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy Z Fold5', specs: '50MP Foldable Camera System', icon: ICONS.SAMSUNG, layout: 'default' },
    { id: 'samsung-flip-5', brand: DEVICE_BRANDS.SAMSUNG, name: 'Galaxy Z Flip5', specs: '12MP FlexCam', icon: ICONS.SAMSUNG, layout: 'default' },

    // GOOGLE PIXEL
    { id: 'pixel-9-pro', brand: DEVICE_BRANDS.GOOGLE, name: 'Pixel 9 Pro', specs: SPECS.PRO_PIXEL, icon: ICONS.GOOGLE, layout: 'default' },
    { id: 'pixel-8-pro', brand: DEVICE_BRANDS.GOOGLE, name: 'Pixel 8 Pro', specs: SPECS.PRO_PIXEL, icon: ICONS.GOOGLE, layout: 'default' },
    { id: 'pixel-8', brand: DEVICE_BRANDS.GOOGLE, name: 'Pixel 8', specs: '50MP AI Camera', icon: ICONS.GOOGLE, layout: 'default' },
    { id: 'pixel-8a', brand: DEVICE_BRANDS.GOOGLE, name: 'Pixel 8a', specs: '64MP AI Camera', icon: ICONS.GOOGLE, layout: 'default' },
    { id: 'pixel-7-pro', brand: DEVICE_BRANDS.GOOGLE, name: 'Pixel 7 Pro', specs: SPECS.PRO_PIXEL, icon: ICONS.GOOGLE, layout: 'default' },
    { id: 'pixel-6-pro', brand: DEVICE_BRANDS.GOOGLE, name: 'Pixel 6 Pro', specs: SPECS.PRO_PIXEL, icon: ICONS.GOOGLE, layout: 'default' },

    // XIAOMI
    { id: 'xiaomi-15-ultra', brand: DEVICE_BRANDS.XIAOMI, name: 'Xiaomi 15 Ultra', specs: SPECS.PRO_LEICA, icon: ICONS.CAMERA, layout: 'leica' },
    { id: 'xiaomi-15-pro', brand: DEVICE_BRANDS.XIAOMI, name: 'Xiaomi 15 Pro', specs: SPECS.PRO_LEICA, icon: ICONS.CAMERA, layout: 'leica' },
    { id: 'xiaomi-15', brand: DEVICE_BRANDS.XIAOMI, name: 'Xiaomi 15', specs: SPECS.PRO_LEICA, icon: ICONS.CAMERA, layout: 'leica' },
    { id: 'xiaomi-14-ultra', brand: DEVICE_BRANDS.XIAOMI, name: 'Xiaomi 14 Ultra', specs: SPECS.PRO_LEICA, icon: ICONS.CAMERA, layout: 'leica' },
    { id: 'xiaomi-13-ultra', brand: DEVICE_BRANDS.XIAOMI, name: 'Xiaomi 13 Ultra', specs: SPECS.PRO_LEICA, icon: ICONS.CAMERA, layout: 'leica' },
    { id: 'xiaomi-12s-ultra', brand: DEVICE_BRANDS.XIAOMI, name: 'Xiaomi 12S Ultra', specs: SPECS.PRO_LEICA, icon: ICONS.CAMERA, layout: 'leica' },
    { id: 'xiaomi-mix-fold-3', brand: DEVICE_BRANDS.XIAOMI, name: 'Xiaomi Mix Fold 3', specs: SPECS.PRO_LEICA, icon: ICONS.CAMERA, layout: 'leica' },

    // ONEPLUS
    { id: 'oneplus-15r', brand: DEVICE_BRANDS.ONEPLUS, name: 'OnePlus 15R', specs: 'By Owner', icon: null, layout: 'oneplus' },
    { id: 'oneplus-15', brand: DEVICE_BRANDS.ONEPLUS, name: 'OnePlus 15', specs: 'By Owner', icon: null, layout: 'oneplus' },
    { id: 'oneplus-13s', brand: DEVICE_BRANDS.ONEPLUS, name: 'OnePlus 13s', specs: 'By Owner', icon: null, layout: 'oneplus' },
    { id: 'oneplus-13r', brand: DEVICE_BRANDS.ONEPLUS, name: 'OnePlus 13R', specs: 'By Owner', icon: null, layout: 'oneplus' },
    { id: 'oneplus-13', brand: DEVICE_BRANDS.ONEPLUS, name: 'OnePlus 13', specs: 'By Owner', icon: null, layout: 'oneplus' },
    { id: 'oneplus-12', brand: DEVICE_BRANDS.ONEPLUS, name: 'OnePlus 12', specs: 'By Owner', icon: null, layout: 'oneplus' },
    { id: 'oneplus-open', brand: DEVICE_BRANDS.ONEPLUS, name: 'OnePlus Open', specs: 'By Owner', icon: null, layout: 'oneplus' },
    { id: 'oneplus-11', brand: DEVICE_BRANDS.ONEPLUS, name: 'OnePlus 11', specs: 'By Owner', icon: null, layout: 'oneplus' },
    { id: 'oneplus-nord-ce5', brand: DEVICE_BRANDS.ONEPLUS, name: 'OnePlus Nord CE5', specs: 'By Owner', icon: null, layout: 'oneplus' },
    { id: 'oneplus-nord-5', brand: DEVICE_BRANDS.ONEPLUS, name: 'OnePlus Nord 5', specs: 'By Owner', icon: null, layout: 'oneplus' },
    { id: 'oneplus-nord-ce4-lite', brand: DEVICE_BRANDS.ONEPLUS, name: 'OnePlus Nord CE4 Lite 5G', specs: 'By Owner', icon: null, layout: 'oneplus' },
    { id: 'oneplus-nord-ce4', brand: DEVICE_BRANDS.ONEPLUS, name: 'OnePlus Nord CE4', specs: 'By Owner', icon: null, layout: 'oneplus' },
    { id: 'oneplus-nord-4', brand: DEVICE_BRANDS.ONEPLUS, name: 'OnePlus Nord 4', specs: 'By Owner', icon: null, layout: 'oneplus' },
    { id: 'oneplus-10-pro', brand: DEVICE_BRANDS.ONEPLUS, name: 'OnePlus 10 Pro', specs: 'By Owner', icon: null, layout: 'oneplus' },
    { id: 'oneplus-9-pro', brand: DEVICE_BRANDS.ONEPLUS, name: 'OnePlus 9 Pro', specs: 'By Owner', icon: null, layout: 'oneplus' },

    // VIVO
    { id: 'vivo-x300-ultra', brand: DEVICE_BRANDS.VIVO, name: 'Vivo X300 Ultra', specs: SPECS.ZEISS, icon: ICONS.ZEISS, layout: 'zeiss' },
    { id: 'vivo-x300-pro', brand: DEVICE_BRANDS.VIVO, name: 'Vivo X300 Pro', specs: SPECS.ZEISS, icon: ICONS.ZEISS, layout: 'zeiss' },
    { id: 'vivo-x200-pro', brand: DEVICE_BRANDS.VIVO, name: 'Vivo X200 Pro', specs: SPECS.ZEISS, icon: ICONS.ZEISS, layout: 'zeiss' },
    { id: 'vivo-x200', brand: DEVICE_BRANDS.VIVO, name: 'Vivo X200', specs: SPECS.ZEISS, icon: ICONS.ZEISS, layout: 'zeiss' },
    { id: 'vivo-x-fold-5', brand: DEVICE_BRANDS.VIVO, name: 'Vivo X Fold 5', specs: SPECS.ZEISS, icon: ICONS.ZEISS, layout: 'zeiss' },
    { id: 'vivo-x-fold-3', brand: DEVICE_BRANDS.VIVO, name: 'Vivo X Fold 3', specs: SPECS.ZEISS, icon: ICONS.ZEISS, layout: 'zeiss' },
    { id: 'vivo-v70-elite', brand: DEVICE_BRANDS.VIVO, name: 'Vivo V70 Elite 5G', specs: '50MP OIS Portrait', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'vivo-v70', brand: DEVICE_BRANDS.VIVO, name: 'Vivo V70', specs: '50MP OIS Portrait', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'vivo-v60-pro', brand: DEVICE_BRANDS.VIVO, name: 'Vivo V60 Pro', specs: '50MP Zeiss Portrait', icon: ICONS.ZEISS, layout: 'zeiss' },
    { id: 'vivo-v60', brand: DEVICE_BRANDS.VIVO, name: 'Vivo V60', specs: '50MP OIS Portrait', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'vivo-v50-pro', brand: DEVICE_BRANDS.VIVO, name: 'Vivo V50 Pro', specs: '50MP Zeiss Portrait', icon: ICONS.ZEISS, layout: 'zeiss' },
    { id: 'vivo-v50', brand: DEVICE_BRANDS.VIVO, name: 'Vivo V50', specs: '50MP OIS Portrait', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'vivo-v30-pro', brand: DEVICE_BRANDS.VIVO, name: 'Vivo V30 Pro', specs: '50MP Zeiss Portrait', icon: ICONS.ZEISS, layout: 'zeiss' },
    { id: 'vivo-v27-pro', brand: DEVICE_BRANDS.VIVO, name: 'Vivo V27 Pro', specs: '50MP OIS Portrait', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'vivo-t4x-5g', brand: DEVICE_BRANDS.VIVO, name: 'Vivo T4x 5G', specs: '50MP System', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'vivo-t4-pro', brand: DEVICE_BRANDS.VIVO, name: 'Vivo T4 Pro', specs: '50MP System', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'vivo-t3-ultra', brand: DEVICE_BRANDS.VIVO, name: 'Vivo T3 Ultra', specs: '50MP System', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'vivo-y55s-5g', brand: DEVICE_BRANDS.VIVO, name: 'Vivo Y55s 5G', specs: '50MP System', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'vivo-x100-ultra', brand: DEVICE_BRANDS.VIVO, name: 'Vivo X100 Ultra', specs: SPECS.ZEISS, icon: ICONS.ZEISS, layout: 'zeiss' },
    { id: 'vivo-x100-pro', brand: DEVICE_BRANDS.VIVO, name: 'Vivo X100 Pro', specs: SPECS.ZEISS, icon: ICONS.ZEISS, layout: 'zeiss' },
    { id: 'vivo-x90-pro-plus', brand: DEVICE_BRANDS.VIVO, name: 'Vivo X90 Pro+', specs: SPECS.ZEISS, icon: ICONS.ZEISS, layout: 'zeiss' },
    { id: 'vivo-x90-pro', brand: DEVICE_BRANDS.VIVO, name: 'Vivo X90 Pro', specs: SPECS.ZEISS, icon: ICONS.ZEISS, layout: 'zeiss' },
    { id: 'vivo-x80-pro', brand: DEVICE_BRANDS.VIVO, name: 'Vivo X80 Pro', specs: SPECS.ZEISS, icon: ICONS.ZEISS, layout: 'zeiss' },

    // OPPO
    { id: 'oppo-find-x9-pro', brand: DEVICE_BRANDS.OPPO, name: 'Oppo Find X9 Pro', specs: SPECS.HASSELBLAD, icon: ICONS.CAMERA, layout: 'hasselblad' },
    { id: 'oppo-reno-15-pro-mini', brand: DEVICE_BRANDS.OPPO, name: 'Oppo Reno15 Pro Mini', specs: '50MP AI Camera', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'oppo-reno-15', brand: DEVICE_BRANDS.OPPO, name: 'Oppo Reno15', specs: '50MP AI Camera', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'oppo-find-n6', brand: DEVICE_BRANDS.OPPO, name: 'Oppo Find N6', specs: SPECS.HASSELBLAD, icon: ICONS.CAMERA, layout: 'hasselblad' },
    { id: 'oppo-k14x-5g', brand: DEVICE_BRANDS.OPPO, name: 'Oppo K14x 5G', specs: '50MP Matrix Camera', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'oppo-reno-14-pro', brand: DEVICE_BRANDS.OPPO, name: 'Oppo Reno 14 Pro', specs: '50MP OIS Portrait', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'oppo-reno-14', brand: DEVICE_BRANDS.OPPO, name: 'Oppo Reno 14', specs: '50MP OIS Portrait', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'oppo-find-x8-pro', brand: DEVICE_BRANDS.OPPO, name: 'Oppo Find X8 Pro', specs: SPECS.HASSELBLAD, icon: ICONS.CAMERA, layout: 'hasselblad' },
    { id: 'oppo-find-x8', brand: DEVICE_BRANDS.OPPO, name: 'Oppo Find X8', specs: SPECS.HASSELBLAD, icon: ICONS.CAMERA, layout: 'hasselblad' },
    { id: 'oppo-find-x7-ultra', brand: DEVICE_BRANDS.OPPO, name: 'Oppo Find X7 Ultra', specs: SPECS.HASSELBLAD, icon: ICONS.CAMERA, layout: 'hasselblad' },
    { id: 'oppo-find-x6-pro', brand: DEVICE_BRANDS.OPPO, name: 'Oppo Find X6 Pro', specs: SPECS.HASSELBLAD, icon: ICONS.CAMERA, layout: 'hasselblad' },
    { id: 'oppo-find-n3', brand: DEVICE_BRANDS.OPPO, name: 'Oppo Find N3', specs: SPECS.HASSELBLAD, icon: ICONS.CAMERA, layout: 'hasselblad' },
    { id: 'oppo-f27-pro-plus', brand: DEVICE_BRANDS.OPPO, name: 'Oppo F27 Pro+', specs: '64MP Dual Camera', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'oppo-f25-pro', brand: DEVICE_BRANDS.OPPO, name: 'Oppo F25 Pro', specs: '64MP Dual Camera', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'oppo-a60-4g', brand: DEVICE_BRANDS.OPPO, name: 'Oppo A60 4G', specs: '50MP AI Camera', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'oppo-a6-pro-5g', brand: DEVICE_BRANDS.OPPO, name: 'Oppo A6 Pro 5G', specs: '50MP AI Camera', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'oppo-k13-5g', brand: DEVICE_BRANDS.OPPO, name: 'Oppo K13 5G', specs: '50MP Matrix Camera', icon: ICONS.CAMERA, layout: 'default' },

    // REALME
    { id: 'realme-gt8-pro', brand: DEVICE_BRANDS.REALME, name: 'Realme GT 8 Pro', specs: '200MP AI Camera', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'realme-16-pro-plus', brand: DEVICE_BRANDS.REALME, name: 'Realme 16 Pro+', specs: '200MP OIS Camera', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'realme-16-pro', brand: DEVICE_BRANDS.REALME, name: 'Realme 16 Pro', specs: '200MP OIS Camera', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'realme-p4-pro', brand: DEVICE_BRANDS.REALME, name: 'Realme P4 Pro', specs: '50MP Sony IMX890', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'realme-p4-power', brand: DEVICE_BRANDS.REALME, name: 'Realme P4 Power', specs: '50MP AI Camera', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'realme-15-pro', brand: DEVICE_BRANDS.REALME, name: 'Realme 15 Pro', specs: '50MP OIS Camera', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'realme-p3-ultra', brand: DEVICE_BRANDS.REALME, name: 'Realme P3 Ultra', specs: '50MP AI Camera', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'realme-gt6', brand: DEVICE_BRANDS.REALME, name: 'Realme GT 6', specs: '50MP Sony LYT-808 OIS', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'realme-gt6t', brand: DEVICE_BRANDS.REALME, name: 'Realme GT 6T', specs: '50MP Sony LYT-600 OIS', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'realme-12-pro-plus', brand: DEVICE_BRANDS.REALME, name: 'Realme 12 Pro+', specs: '64MP Periscope Portrait', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'realme-12-pro', brand: DEVICE_BRANDS.REALME, name: 'Realme 12 Pro', specs: '32MP Telephoto Portrait', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'realme-11-pro-plus', brand: DEVICE_BRANDS.REALME, name: 'Realme 11 Pro+', specs: '200MP SuperZoom Camera', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'realme-11-pro', brand: DEVICE_BRANDS.REALME, name: 'Realme 11 Pro', specs: '100MP OIS ProLight Camera', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'realme-gt5-pro', brand: DEVICE_BRANDS.REALME, name: 'Realme GT5 Pro', specs: '50MP Sony IMX890 OIS', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'realme-gt3', brand: DEVICE_BRANDS.REALME, name: 'Realme GT3', specs: '50MP Matrix AI Camera', icon: ICONS.CAMERA, layout: 'default' },
    { id: 'realme-gt2-pro', brand: DEVICE_BRANDS.REALME, name: 'Realme GT2 Pro', specs: '50MP Dual Primary Camera', icon: ICONS.CAMERA, layout: 'default' }
];

// Group devices by brand for the UI
const getDevicesByBrand = () => {
    const grouped = {};
    DEVICELIST.forEach(device => {
        if (!grouped[device.brand]) {
            grouped[device.brand] = [];
        }
        grouped[device.brand].push(device);
    });
    return grouped;
};
