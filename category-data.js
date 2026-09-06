// الشجرة البرمجية للأقسام والأنواع — ملف مشترك بين الموقع وصفحة الإدارة
const categoryTree = {
    "kitchen": {
        title: "أدوات المطبخ",
        icon: "fa-utensils",
        image: "",
        subcategories: {
            "cooksets": {
                title: "أطقم الحلل والأواني",
                icon: "fa-fire-burner",
                image: "",
                types: {
                    "granite": { title: "أطقم حلل جرانيت", icon: "fa-cubes", image: "" },
                    "stainless": { title: "أطقم استانلس متكاملة", icon: "fa-shield-halved", image: "" },
                    "tefal": { title: "أطقم سيراميك وتيفال", icon: "fa-layer-group", image: "" }
                }
            },
            "single-pots": {
                title: "حلل وأواني منفردة",
                icon: "fa-dumpster-fire",
                image: "",
                types: {
                    "stainless-single": { title: "حلل استانلس منفردة", icon: "fa-circle", image: "" }
                }
            },
            "milk-pots": {
                title: "اللبانات والكنك",
                icon: "fa-glass-water",
                image: "",
                types: {
                    "milk-pan": { title: "لبانات استانلس", icon: "fa-bottle-droplet", image: "" }
                }
            },
            "baking-dishes": {
                title: "صواني وطواجن الفرن",
                icon: "fa-tray",
                image: "",
                types: {
                    "oven-tray": { title: "صواني فرن استانلس", icon: "fa-square", image: "" }
                }
            },
            "pressure": {
                title: "حلل ضغط",
                icon: "fa-gauge-high",
                image: "",
                types: {
                    "standard-pressure": { title: "حلل ضغط استانلس", icon: "fa-gauge", image: "" }
                }
            },
            "frypans": {
                title: "القلايات والتاوات",
                icon: "fa-kitchen-set",
                image: "",
                types: {
                    "stainless-fry": { title: "قلايات استانلس", icon: "fa-circle-dot", image: "" },
                    "deep-fry": { title: "قلايات غميقة", icon: "fa-bowl-food", image: "" },
                    "grill": { title: "طواجن وشوايات", icon: "fa-stroopwafel", image: "" }
                }
            },
            "utensils": {
                title: "رفايع المطبخ",
                icon: "fa-spoon",
                image: "",
                types: {
                    "silicone": { title: "أدوات سيليكون", icon: "fa-box", image: "" },
                    "knives": { title: "سكاكين ومقاطع", icon: "fa-utensils", image: "" }
                }
            }
        }
    },
    "appliances": {
        title: "الأجهزة الكهربائية",
        icon: "fa-blender",
        image: "",
        subcategories: {
            "blenders": {
                title: "الخلاطات والكبات",
                icon: "fa-blender",
                image: "",
                types: {
                    "multi-blender": { title: "خلاطات متعددة الاستخدام", icon: "fa-plug", image: "" }
                }
            }
        }
    },
    "decor": {
        title: "الديكور والمنزل",
        icon: "fa-couch",
        image: "",
        subcategories: {}
    },
    "cleaners": {
        title: "منظفات ومستلزمات",
        icon: "fa-spray-can-sparkles",
        image: "",
        subcategories: {}
    }
};
