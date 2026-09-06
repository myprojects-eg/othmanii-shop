// ملف مؤقت لنقل المنتجات القديمة (اللي كانت مكتوبة جوه main.js) إلى قاعدة البيانات
// يُستخدم مرة واحدة بس من صفحة admin.html بزرار "استيراد المنتجات القديمة"
// بعد ما تستوردي المنتجات، ممكن تمسحي الملف ده والسطر اللي بيستدعيه في admin.html

const OLD_PRODUCTS = [
    {
        title: "قلاية ستانلس ستيل زينوكس - فضي",
        price: 0,
        image: "A1.jpeg",
        images: ["A1.jpeg"],
        stock: 10,
        sizes: ["20 سم", "22 سم", "24 سم"],
        colors: ["فضي"],
        description: "✨ <b>العلامة التجارية:</b> زينوكس<br>🍳 <b>نوع المنتج:</b> قلاية ستانلس ستيل<br>💎 <b>الخامة:</b> ستانلس ستيل عالي الجودة<br>🎨 <b>اللون:</b> فضي<br>📏 <b>المقاسات المتوفرة:</b> 20، 22، 24 سم<br>🛡️ تصميم متين بمقبض يد قوي وتوزيع مثالي للحرارة للقلي والطهي المباشر.",
        mainCategory: "kitchen",
        subCategory: "frypans",
        type: "stainless-fry"
    },
    {
        title: "مقلاية استانلس ستيل كلاسيك زينوكس - فضي",
        price: 889,
        image: "A3 (1).jpeg",
        images: ["A3 (1).jpeg", "A3 (2).jpeg"],
        stock: 10,
        sizes: ["مقاس 20", "مقاس 22", "مقاس 24"],
        variantPrices: { "مقاس 20": 889, "مقاس 22": 979, "مقاس 24": 1119 },
        colors: ["فضي"],
        description: "✨ <b>العلامة التجارية:</b> زينوكس (كلاسيك)<br>🍳 <b>نوع المنتج:</b> مقلاية استانلس ستيل<br>💎 <b>الخامة:</b> استانلس ستيل 18/10 عالي الجودة<br>🎨 <b>اللون:</b> فضي<br>📏 <b>المقاسات المتوفرة:</b> 20، 22، 24 سم<br>🛡️ تصميم كلاسيكي متين بمقبض يد طويل وقاعدة كبسولة ثلاثية لتوزيع حراري متساوي.",
        mainCategory: "kitchen",
        subCategory: "frypans",
        type: "stainless-fry"
    },
    {
        title: "مقلاية غويطة كلاد استانلس ستيل بالغطاء زينوكس",
        price: 2249,
        image: "A4 (1).jpeg",
        images: ["A4 (1).jpeg", "A4 (2).jpeg"],
        stock: 10,
        sizes: ["مقاس 28", "مقاس 32"],
        variantPrices: { "مقاس 28": 2249, "مقاس 32": 2449 },
        colors: ["فضي"],
        description: "✨ <b>العلامة التجارية:</b> زينوكس (كلاد)<br>🍳 <b>نوع المنتج:</b> مقلاية غويطة بغطاء زجاجي ومقابض دائرية<br>💎 <b>الخامة:</b> استانلس ستيل بتقنية الكلاد ومتانة عالية<br>🎨 <b>اللون:</b> فضي<br>📏 <b>المقاسات المتوفرة:</b> 28، 32 سم<br>🛡️ تصميم عميق متعدد الاستخدامات مزود بغطاء زجاجي لمتابعة الطهي ومقابض مريحة.",
        mainCategory: "kitchen",
        subCategory: "frypans",
        type: "deep-fry"
    },
    {
        title: "مقلاية كلاد استانلس ستيل زينوكس - فضي",
        price: 1349,
        image: "A5 (1).jpeg",
        images: ["A5 (1).jpeg", "A5 (2).jpeg"],
        stock: 10,
        sizes: ["مقاس 20", "مقاس 24", "مقاس 28"],
        variantPrices: { "مقاس 20": 1349, "مقاس 24": 1499, "مقاس 28": 1649 },
        colors: ["فضي"],
        description: "✨ <b>العلامة التجارية:</b> زينوكس (كلاد)<br>🍳 <b>نوع المنتج:</b> مقلاية استانلس ستيل تقنية الكلاد<br>💎 <b>الخامة:</b> طبقات كلاد متطورة مانعة للالتصاق ومقاومة للخدش<br>🎨 <b>اللون:</b> فضي<br>📏 <b>المقاسات المتوفرة:</b> 20، 24، 28 سم<br>🛡️ أداء طهي احترافي وتوزيع حراري استثنائي لجميع أرجاء المقلاة.",
        mainCategory: "kitchen",
        subCategory: "frypans",
        type: "stainless-fry"
    },
    {
        title: "قلاية ثوم ستانلس ستيل زينوكس - 12 سم",
        price: 0,
        image: "A2.jpeg",
        images: ["A2.jpeg"],
        stock: 10,
        sizes: ["12 سم"],
        colors: ["فضي"],
        description: "✨ <b>العلامة التجارية:</b> زينوكس<br>🧄 <b>نوع المنتج:</b> قلاية ثوم صغيرة<br>💎 <b>الخامة:</b> ستانلس ستيل عالي الجودة<br>🎨 <b>اللون:</b> فضي<br>📏 <b>المقاس:</b> 12 سم<br>🛡️ مثالية للتقلية، التحمير السريع، وتجهيز الصوصات بكميات صغيرة.",
        mainCategory: "kitchen",
        subCategory: "frypans",
        type: "stainless-fry"
    },
    {
        title: "صينية فرن مستديرة ستانلس ستيل زينوكس - فضي",
        price: 0,
        image: "ppp.jpeg",
        images: ["ppp.jpeg"],
        stock: 10,
        sizes: ["22 سم", "24 سم", "26 سم", "30 سم"],
        colors: ["فضي"],
        description: "✨ <b>العلامة التجارية:</b> زينوكس<br>🍲 <b>نوع المنتج:</b> صواني فرن مستديرة<br>💎 <b>الخامة:</b> ستانلس ستيل عالي الجودة<br>🎨 <b>اللون:</b> فضي<br>📏 <b>المقاسات المتوفرة:</b> 22، 24، 26، 30 سم<br>🛡️ صينية متينة ومقاومة للحرارة والتآكل لتسوية وتوزيع متساوي للحرارة داخل الفرن.",
        mainCategory: "kitchen",
        subCategory: "baking-dishes",
        type: "oven-tray"
    },
    {
        title: "حلة ضغط ستانلس ستيل زينوكس - 8 لتر (أحمر فضي)",
        price: 0,
        image: "p2 (1).jpeg",
        images: ["p2 (1).jpeg", "p2 (2).jpeg", "p2 (3).jpeg", "p2 (4).jpeg"],
        stock: 5,
        sizes: ["8 لتر"],
        colors: ["أحمر فضي"],
        description: "✨ <b>العلامة التجارية:</b> زينوكس<br>🍲 <b>نوع المنتج:</b> حلة ضغط<br>💎 <b>الخامة:</b> ستانلس ستيل 18/10 عالي الجودة<br>🎨 <b>اللون:</b> أحمر / فضي<br>📏 <b>السعة:</b> 8 لتر<br>🛡️ مزودة بمقابض حرارية مريحة ونظام أمان ثنائي لصمام الضغط لطهي سريع وأمن تماماً.",
        mainCategory: "kitchen",
        subCategory: "pressure",
        type: "standard-pressure"
    },
    {
        title: "حلة ضغط ستانلس ستيل زينوكس - 12 لتر (فضى اسود)",
        price: 0,
        image: "p1 (1).jpeg",
        images: ["p1 (1).jpeg", "p1 (2).jpeg", "p1 (3).jpeg", "p1 (4).jpeg"],
        stock: 5,
        sizes: ["12 لتر"],
        colors: ["فضى اسود"],
        description: "✨ <b>العلامة التجارية:</b> زينوكس<br>🍲 <b>نوع المنتج:</b> حلة ضغط<br>💎 <b>الخامة:</b> ستانلس ستيل عالي الجودة<br>🎨 <b>اللون:</b> فضي / أسود<br>📏 <b>السعة:</b> 12 لتر<br>🛡️ نظام أمان متكامل وصمام لإخراج البخار بفاعلية لطهي سريع وآمن.",
        mainCategory: "kitchen",
        subCategory: "pressure",
        type: "standard-pressure"
    },
    {
        title: "حلة استانلس ستيل كلاسيك زينوكس - فضي",
        price: 999,
        image: "pp.jpeg",
        images: ["pp.jpeg"],
        stock: 10,
        sizes: ["مقاس 16", "مقاس 18", "مقاس 20", "مقاس 22", "مقاس 24", "مقاس 26", "مقاس 28", "مقاس 30", "مقاس 32", "مقاس 34", "مقاس 36", "مقاس 40"],
        variantPrices: {
            "مقاس 16": 999, "مقاس 18": 1109, "مقاس 20": 1259, "مقاس 22": 1429,
            "مقاس 24": 1649, "مقاس 26": 1929, "مقاس 28": 2199, "مقاس 30": 2519,
            "مقاس 32": 2719, "مقاس 34": 3039, "مقاس 36": 3179, "مقاس 40": 3579
        },
        colors: ["فضي"],
        description: "✨ <b>العلامة التجارية:</b> زينوكس<br>🍲 <b>نوع المنتج:</b> أواني طهي منفردة<br>💎 <b>الخامة:</b> ستانلس ستيل 18/10 عالي الجودة<br>🎨 <b>اللون:</b> فضي<br>🛡️ مصنوعة من أجود أنواع الفولاذ المقاوم للصدأ بقاعدة ثلاثية لترشيد وتوزيع الحرارة بشكل مثالي.",
        mainCategory: "kitchen",
        subCategory: "single-pots",
        type: "stainless-single"
    },
    {
        title: "حلة استانلس ستيل برايم زينوكس - فضي",
        price: 989,
        image: "photo7 (1).jpeg",
        images: ["photo7 (1).jpeg", "photo7 (2).jpeg", "photo7 (3).jpeg"],
        stock: 10,
        sizes: ["مقاس 16", "مقاس 18", "مقاس 20", "مقاس 22", "مقاس 24", "مقاس 26", "مقاس 28", "مقاس 30", "مقاس 32", "مقاس 34"],
        variantPrices: {
            "مقاس 16": 989, "مقاس 18": 1099, "مقاس 20": 1219, "مقاس 22": 1359,
            "مقاس 24": 1539, "مقاس 26": 1799, "مقاس 28": 2029, "مقاس 30": 2269,
            "مقاس 32": 2579, "مقاس 34": 2759
        },
        colors: ["فضي"],
        description: "✨ <b>العلامة التجارية:</b> زينوكس (برايم)<br>🍲 <b>نوع المنتج:</b> أواني طهي منفردة<br>💎 <b>الخامة:</b> ستانلس ستيل 18/10 عالي الجودة<br>🎨 <b>اللون:</b> فضي<br>🛡️ تصميم متين بمقابض مريحة وقاعدة ثلاثية لترشيد وتوزيع الحرارة بشكل مثالي.",
        mainCategory: "kitchen",
        subCategory: "single-pots",
        type: "stainless-single"
    },
    {
        title: "حلة استانلس ستيل كيرفي زينوكس - فضي",
        price: 1099,
        image: "photo8 (1).jpeg",
        images: ["photo8 (1).jpeg", "photo8 (2).jpeg"],
        stock: 10,
        sizes: ["مقاس 16", "مقاس 18", "مقاس 20", "مقاس 22", "مقاس 24", "مقاس 26", "مقاس 28", "مقاس 30", "مقاس 32"],
        variantPrices: {
            "مقاس 16": 1099, "مقاس 18": 1209, "مقاس 20": 1379, "مقاس 22": 1529,
            "مقاس 24": 1739, "مقاس 26": 1999, "مقاس 28": 2259, "مقاس 30": 2509,
            "مقاس 32": 2769
        },
        colors: ["فضي"],
        description: "✨ <b>العلامة التجارية:</b> زينوكس (كيرفي)<br>🍲 <b>نوع المنتج:</b> أواني طهي منفردة<br>💎 <b>الخامة:</b> ستانلس ستيل 18/10 عالي الجودة<br>🎨 <b>اللون:</b> فضي<br>🛡️ تصميم كيرفي انسيابي وأنيق بقاعدة ثلاثية تضمن توزيعاً متساوياً للحرارة وأعلى درجات الأمان.",
        mainCategory: "kitchen",
        subCategory: "single-pots",
        type: "stainless-single"
    },
    {
        title: "حلة استانلس ستيل كلاد زينوكس بغطاء زجاجي - فضي",
        price: 1849,
        image: "photo9 (1).jpeg",
        images: ["photo9 (1).jpeg", "photo9 (2).jpeg"],
        stock: 10,
        sizes: ["مقاس 16", "مقاس 18", "مقاس 20", "مقاس 24", "مقاس 28"],
        variantPrices: { "مقاس 16": 1849, "مقاس 18": 1999, "مقاس 20": 2099, "مقاس 24": 2549, "مقاس 28": 3049 },
        colors: ["فضي"],
        description: "✨ <b>العلامة التجارية:</b> زينوكس (كلاد)<br>🍲 <b>نوع المنتج:</b> أواني طهي منفردة<br>💎 <b>الخامة:</b> ستانلس ستيل عالي الجودة مع غطاء زجاجي مقاوم للحرارة<br>🎨 <b>اللون:</b> فضي<br>🛡️ تقنية الكلاد المتطورة لتوزيع الحرارة بشكل كامل ومتساوي مع تصميم عصري وأذرع ستانلس متينة.",
        mainCategory: "kitchen",
        subCategory: "single-pots",
        type: "stainless-single"
    },
    {
        title: "لبانة استانلس ستيل برايم زينوكس - فضي",
        price: 709,
        image: "photo10 (1).jpeg",
        images: ["photo10 (1).jpeg", "photo10 (2).jpeg"],
        stock: 10,
        sizes: ["مقاس 14", "مقاس 16"],
        variantPrices: { "مقاس 14": 709, "مقاس 16": 839 },
        colors: ["فضي"],
        description: "✨ <b>العلامة التجارية:</b> زينوكس (برايم)<br>🥛 <b>نوع المنتج:</b> لبانة استانلس ستيل بغطاء<br>💎 <b>الخامة:</b> ستانلس ستيل 18/10 عالي الجودة<br>🎨 <b>اللون:</b> فضي<br>🛡️ تصميم متين بمقبض مريح للتحكم الأسهل أثناء التسخين والصب، مع غطاء محكم وقاعدة لتوزيع الحرارة.",
        mainCategory: "kitchen",
        subCategory: "milk-pots",
        type: "milk-pan"
    },
    {
        title: "لبانة استانلس ستيل كلاسيك زينوكس - فضي",
        price: 729,
        image: "photo11.jpeg",
        images: ["photo11.jpeg"],
        stock: 10,
        sizes: ["مقاس 14", "مقاس 16"],
        variantPrices: { "مقاس 14": 729, "مقاس 16": 889 },
        colors: ["فضي"],
        description: "✨ <b>العلامة التجارية:</b> زينوكس (كلاسيك)<br>🥛 <b>نوع المنتج:</b> لبانة استانلس ستيل بغطاء<br>💎 <b>الخامة:</b> ستانلس ستيل 18/10 عالي الجودة<br>🎨 <b>اللون:</b> فضي<br>🛡️ تصميم كلاسيكي متين بقاعدة ثلاثية لتوزيع حراري متساوي ومقبض مريح للتحكم الأسهل.",
        mainCategory: "kitchen",
        subCategory: "milk-pots",
        type: "milk-pan"
    },
    {
        title: "لبانة استانلس ستيل كيرفي زينوكس - فضي",
        price: 919,
        image: "photo12.jpeg",
        images: ["photo12.jpeg"],
        stock: 10,
        sizes: ["مقاس 16"],
        variantPrices: { "مقاس 16": 919 },
        colors: ["فضي"],
        description: "✨ <b>العلامة التجارية:</b> زينوكس (كيرفي)<br>🥛 <b>نوع المنتج:</b> لبانة استانلس ستيل بغطاء<br>💎 <b>الخامة:</b> ستانلس ستيل 18/10 عالي الجودة<br>🎨 <b>اللون:</b> فضي<br>🛡️ تصميم كيرفي انسيابي وأنيق بغطاء محكم ومقبض متين للتحكم المثالي أثناء التسخين والصب.",
        mainCategory: "kitchen",
        subCategory: "milk-pots",
        type: "milk-pan"
    },
    {
        title: "طقم حلل فاخر متكامل",
        price: 7000,
        image: "cookware-set.jpeg",
        stock: 3,
        colors: ["أسود", "أحمر", "كافيه"],
        sizes: [],
        description: "طقم حلل فاخر متكامل عالي الجودة متناسب مع جميع الأغراض.",
        mainCategory: "kitchen",
        subCategory: "cooksets",
        type: "granite"
    },
    {
        title: "طقم أواني طهي غير لاصق",
        price: 450,
        image: "nonstick.jpg",
        stock: 0,
        colors: ["أحمر", "رمادي"],
        sizes: [],
        description: "أواني طهي عصرية بتغليف متميز لمنع الالتصاق أثناء الطهي.",
        mainCategory: "kitchen",
        subCategory: "cooksets",
        type: "tefal"
    },
    {
        title: "مجموعة إكسبرس 6 قطع",
        price: 1559,
        image: "photo1.jpeg",
        stock: 10,
        colors: [],
        sizes: [],
        description: "🏆 فولاذ مقاوم للصدأ 18/10 عالي الجودة للحصول على جودة فائقة.<br>✨ لمسة نهائية أنيقة ومتينة وسهلة التنظيف.<br>🛡️ مدعوم بضمان لمدة 25 عامًا لموثوقية طويلة الأمد.",
        mainCategory: "kitchen",
        subCategory: "cooksets",
        type: "stainless"
    },
    {
        title: "طقم استانلس زينوكس الشامل بالبراد والكنك",
        price: 10920,
        image: "photo2.jpeg",
        stock: 5,
        colors: [],
        sizes: [],
        description: "🥘 حلة (16 - 20 - 24 - 30 سم)<br>🥛 لبانة 14 سم<br>🍳 مقلاية مقاس 24 سم + مقلاية 12 سم + صينية 24 سم<br>☕ طقم كنك 4 قطع + براد 1 لتر + شبكة تحمير<br>✨ مصنوع من أجود أنواع الفولاذ 18/10 بقاعدة ثلاثية ثقيلة لترشيد وتوزيع الحرارة.<br>🛡️ ضمان 25 عاماً على الفولاذ المقاوم للصدأ.",
        mainCategory: "kitchen",
        subCategory: "cooksets",
        type: "stainless"
    },
    {
        title: "طقم حلل استانلس زينوكس 5 حلل",
        price: 5965,
        image: "photo6.jpeg",
        stock: 5,
        colors: [],
        sizes: [],
        description: "🍲 5 حلل بأغطية بمقاسات: (16 - 18 - 20 - 24 - 28 سم)<br>💎 مصنوع من أجود أنواع الفولاذ المقاوم للصدأ 18/10.<br>📏 مقياس مدرج للقياس في الداخل.<br>🔥 كبسولة ذات قاعدة ثلاثية ثقيلة تحفظ الحرارة وتوزعها بشكل ممتاز.<br>🛡️ ضمان 25 عاماً على الفولاذ.",
        mainCategory: "kitchen",
        subCategory: "cooksets",
        type: "stainless"
    },
    {
        title: "طقم استانلس زينوكس مع اللبانة والكنك",
        price: 10173,
        image: "photo4.jpeg",
        stock: 5,
        colors: [],
        sizes: [],
        description: "🍲 حلة (18 - 22 - 26 - 30 سم)<br>🥛 لبانة 16 سم<br>🍳 مقلاية بدون غطاء مقاس 24 سم<br>🍟 شبكة تحمير<br>☕ طقم كنك 4 قطع مع الستاند<br>✨ فولاذ مقاوم للصدأ 18/10 مع حافة صب وغطاء محكم الإغلاق.<br>🛡️ ضمان 25 عاماً.",
        mainCategory: "kitchen",
        subCategory: "cooksets",
        type: "stainless"
    },
    {
        title: "طقم حلل زينوكس برايم 17 قطعة",
        price: 9922,
        image: "photo5.jpeg",
        stock: 5,
        colors: [],
        sizes: [],
        description: "🌟 العلامة التجارية: زينوكس (برايم 17 قطعة)<br>🍲 حلل بالغطاء مقاسات: (16 - 20 - 24 - 34 سم)<br>🥛 لبانة بالغطاء مقاس: 14 سم<br>🍳 قلاية مقاس: 22 سم + قلاية مقاس: 12 سم<br>☕ طقم كنك بالستاند + شبكة تحمير<br>💎 خامة ستانلس ستيل عالي الجودة متين وسهل التنظيف.",
        mainCategory: "kitchen",
        subCategory: "cooksets",
        type: "stainless"
    },
    {
        title: "طقم حلل استانلس ستيل خطوط (5 حلل)",
        price: 7535,
        image: "photo3 (1).jpeg",
        images: ["photo3 (1).jpeg", "photo3 (2).jpeg"],
        stock: 5,
        colors: [],
        sizes: [],
        description: "🍲 5 حلل بأغطية بمقاسات: (16 - 18 - 20 - 24 - 30 سم)<br>🔥 مناسب للاستخدام مع جميع أنواع المواقد (غاز، سيراميك، كهرباء، هالوجين).<br>🌱 صحي وصديق للبيئة ومصنوع من الاستانلس ستيل عالي الجودة.<br>🛡️ ضمان 25 سنة.",
        mainCategory: "kitchen",
        subCategory: "cooksets",
        type: "stainless"
    },
    {
        title: "خلاط كهربائي متعدد الاستخدامات",
        price: 320,
        image: "blender.jpg",
        stock: 5,
        colors: ["أبيض", "فضي"],
        sizes: [],
        description: "خلاط قوي ومتعدد السرعات مناسب لعصر الفواكه وخلط الطعام.",
        mainCategory: "appliances",
        subCategory: "blenders",
        type: "multi-blender"
    }
];

async function migrateOldProducts(){
    if(!confirm(`هيتم استيراد ${OLD_PRODUCTS.length} منتج لقاعدة البيانات. متأكدة إنك عايزة تكمّلي؟`)) return;
    let successCount = 0;
    for(const product of OLD_PRODUCTS){
        try{
            await db.collection('products').add(product);
            successCount++;
        }catch(err){
            console.error('فشل استيراد منتج:', product.title, err);
        }
    }
    alert(`تم استيراد ${successCount} من ${OLD_PRODUCTS.length} منتج بنجاح.`);
    if(typeof loadProducts === 'function') loadProducts();
}