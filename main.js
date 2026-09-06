// ================= =================
// 1. تهيئة EmailJS
// ================= =================
(function () {
    emailjs.init("DR9M_nrSyJyyX5hrn");
})();

// إعدادات EmailJS: الـ Service ID وقوالب الإرسال (لصاحب المحل وللعميل)
const EMAILJS_SERVICE_ID = 'service_og0te62';
const EMAILJS_TEMPLATE_OWNER = 'template_nb5299q';   // قالب إشعار صاحب المحل بتفاصيل الطلب
const EMAILJS_TEMPLATE_CUSTOMER = 'template_m3lrgvo'; // قالب تأكيد الطلب للعميل (يُستخدم فقط لو العميل كتب إيميله)

// رقم واتساب المحل (بصيغة دولية، من غير + ومن غير صفر البداية)
// ⚠️ غيّر الرقم ده لرقم واتساب محلك الفعلي
const STORE_WHATSAPP_NUMBER = '201507290049';

// ملاحظة: الشجرة البرمجية للأقسام (categoryTree) بقت في ملف منفصل category-data.js
// وقائمة المنتجات (products) بقت بتتحمّل من قاعدة البيانات مباشرة بدل ما تكون مكتوبة هنا

// قائمة المنتجات — بتتحمّل من قاعدة بيانات Firebase
let products = [];

async function loadProductsFromFirestore(){
    try{
        const snap = await db.collection('products').get();
        products = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }catch(err){
        console.error('فشل تحميل المنتجات من قاعدة البيانات', err);
        products = [];
    }
}

// السلة المخزنة باستخدام LocalStorage
let cart = JSON.parse(localStorage.getItem('osmany_cart')) || [];

// ================= =================
// 2. التهيئة عند تحميل الصفحة
// ================= =================
document.addEventListener('DOMContentLoaded', async () => {
    updateCartCount();
    renderCartModal();

    // ربط كافة أزرار فتح السلة (نعملها فورًا، مش لازم تستنى تحميل المنتجات)
    setupCartOpenButtons();

    // تحميل المنتجات من قاعدة البيانات قبل عرضها
    await loadProductsFromFirestore();

    if (document.getElementById('categoryGrid')) {
        const urlParams = new URLSearchParams(window.location.search);
        const cat = urlParams.get('cat') || 'all';
        renderNavigation(cat);
    }

    // ملاحظة: تم حذف addEventListener الزيادة اللي كانت بتربط submit تاني
    // على #checkoutForm، لأن الفورم أصلاً معاها onsubmit="submitOrder(event)"
    // في الـ HTML، ووجود الاتنين مع بعض كان بيبعت الطلب مرتين (Double Submit).
});

function setupCartOpenButtons() {
    const cartTriggers = document.querySelectorAll('.cart-btn, .cart-icon, .cart-btn-trigger, #cart-toggle, #cartTriggerBtn');
    cartTriggers.forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            openCartModal();
        };
    });
}

function openCartModal() {
    renderCartModal();
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.style.display = 'flex';
        cartModal.classList.add('active');
    }
}

function closeCartModal() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.style.display = 'none';
        cartModal.classList.remove('active');
    }
}

// ================= =================
// 3. التنقل بين الأقسام والتصفح
// ================= =================
function renderNavigation(main = 'all', sub = null, type = null) {
    const categoryGrid = document.getElementById('categoryGrid');
    const productGrid = document.getElementById('productGrid');
    const categoryTitle = document.getElementById('categoryTitle');
    const breadcrumb = document.getElementById('breadcrumb');

    if (!categoryGrid || !productGrid) return;

    categoryGrid.innerHTML = '';
    productGrid.innerHTML = '';

    if (main === 'all') {
        if (categoryTitle) categoryTitle.textContent = "Shop All - أقسام المحل";
        if (breadcrumb) breadcrumb.innerHTML = `<span onclick="renderNavigation('all')"><i class="fa-solid fa-house"></i> Shop All</span>`;

        Object.keys(categoryTree).forEach(key => {
            const cat = categoryTree[key];
            categoryGrid.innerHTML += `
                <div class="category-card" onclick="renderNavigation('${key}')">
                    ${cat.image ? `<img src="${cat.image}" class="cat-card-img" alt="${cat.title}">` : `<i class="fa-solid ${cat.icon}"></i>`}
                    <h3>${cat.title}</h3>
                </div>
            `;
        });
    } 
    else if (main && !sub) {
        const cat = categoryTree[main];
        if (categoryTitle) categoryTitle.textContent = cat ? cat.title : "الأقسام";
        if (breadcrumb) {
            breadcrumb.innerHTML = `
                <span onclick="renderNavigation('all')"><i class="fa-solid fa-house"></i> Shop All</span>
                <i class="fa-solid fa-chevron-left"></i>
                <span>${cat ? cat.title : main}</span>
            `;
        }

        if (cat && cat.subcategories && Object.keys(cat.subcategories).length > 0) {
            const subKeys = Object.keys(cat.subcategories);
            subKeys.forEach(subKey => {
                const subCat = cat.subcategories[subKey];
                categoryGrid.innerHTML += `
                    <div class="category-card" onclick="renderNavigation('${main}', '${subKey}')">
                        ${subCat.image ? `<img src="${subCat.image}" class="cat-card-img" alt="${subCat.title}">` : `<i class="fa-solid ${subCat.icon}"></i>`}
                        <h3>${subCat.title}</h3>
                    </div>
                `;
            });
        } else {
            const filtered = products.filter(p => p.mainCategory === main);
            renderProducts(filtered);
        }
    } 
    else if (main && sub && !type) {
        const cat = categoryTree[main];
        const subCat = cat ? cat.subcategories[sub] : null;
        if (categoryTitle) categoryTitle.textContent = subCat ? subCat.title : "أنواع المنتجات";
        if (breadcrumb) {
            breadcrumb.innerHTML = `
                <span onclick="renderNavigation('all')"><i class="fa-solid fa-house"></i> Shop All</span>
                <i class="fa-solid fa-chevron-left"></i>
                <span onclick="renderNavigation('${main}')">${cat ? cat.title : ''}</span>
                <i class="fa-solid fa-chevron-left"></i>
                <span>${subCat ? subCat.title : sub}</span>
            `;
        }

        if (subCat && subCat.types && Object.keys(subCat.types).length > 0) {
            const typeKeys = Object.keys(subCat.types);
            typeKeys.forEach(tKey => {
                const typeItem = subCat.types[tKey];
                categoryGrid.innerHTML += `
                    <div class="category-card" onclick="renderNavigation('${main}', '${sub}', '${tKey}')">
                        ${typeItem.image ? `<img src="${typeItem.image}" class="cat-card-img" alt="${typeItem.title}">` : `<i class="fa-solid ${typeItem.icon}"></i>`}
                        <h3>${typeItem.title}</h3>
                    </div>
                `;
            });
        } else {
            const filtered = products.filter(p => p.mainCategory === main && p.subCategory === sub);
            renderProducts(filtered);
        }
    }
    else if (main && sub && type) {
        const cat = categoryTree[main];
        const subCat = cat ? cat.subcategories[sub] : null;
        const typeItem = subCat && subCat.types ? subCat.types[type] : null;
        if (categoryTitle) categoryTitle.textContent = typeItem ? typeItem.title : "المنتجات";
        if (breadcrumb) {
            breadcrumb.innerHTML = `
                <span onclick="renderNavigation('all')"><i class="fa-solid fa-house"></i> Shop All</span>
                <i class="fa-solid fa-chevron-left"></i>
                <span onclick="renderNavigation('${main}')">${cat ? cat.title : ''}</span>
                <i class="fa-solid fa-chevron-left"></i>
                <span onclick="renderNavigation('${main}', '${sub}')">${subCat ? subCat.title : ''}</span>
                <i class="fa-solid fa-chevron-left"></i>
                <span>${typeItem ? typeItem.title : type}</span>
            `;
        }

        const filtered = products.filter(p => p.mainCategory === main && p.subCategory === sub && p.type === type);
        renderProducts(filtered);
    }
}

// ================= =================
// 4. عرض كروت المنتجات
// ================= =================
function renderProducts(productList) {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;

    if (productList.length === 0) {
        productGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #777; padding: 2rem;">لا توجد منتجات متوفرة حالياً في هذا القسم.</p>`;
        return;
    }

    productGrid.innerHTML = productList.map(p => {
        const isSoldOut = p.stock === 0;
        const colorOptions = p.colors && p.colors.length > 0 ? p.colors.map(c => `<option value="${c}">${c}</option>`).join('') : '';
        const sizeOptions = p.sizes && p.sizes.length > 0 ? p.sizes.map(s => `<option value="${s}">${s}</option>`).join('') : '';

        const galleryHtml = p.images && p.images.length > 1 ? `
            <div class="product-gallery-thumbs" style="display:flex; gap:5px; justify-content:center; margin-top:8px;">
                ${p.images.map((imgSrc) => `
                    <img src="${imgSrc}" 
                         onclick="changeMainImage('${p.id}', '${imgSrc}'); openImageModal('${imgSrc}');" 
                         style="width:40px; height:40px; object-fit:cover; border-radius:4px; border:1px solid #ddd; cursor:pointer;">
                `).join('')}
            </div>
        ` : '';

        return `
            <div class="product-card ${isSoldOut ? 'sold-out' : ''}">
                <div class="product-img" style="cursor: pointer;" onclick="openImageModal(document.getElementById('main-img-${p.id}').src)">
                    <img id="main-img-${p.id}" src="${p.image}" alt="${p.title}">
                    ${isSoldOut 
                        ? `<span class="badge-soldout">Sold Out</span>` 
                        : `<span class="badge-stock">In Stock: ${p.stock}</span>`
                    }
                </div>
                ${galleryHtml}
                <div class="product-info">
                    <h3>${p.title}</h3>
                    
                    ${p.description ? `<p class="product-description" style="font-size:0.85rem; color:#555; margin:8px 0; line-height:1.5;">${p.description}</p>` : ''}
                    
                    <p class="price" id="price-${p.id}">${p.price > 0 ? p.price + ' جنيه' : 'تواصل لمعرفة السعر'}</p>

                    ${p.sizes && p.sizes.length > 0 ? `
                        <div class="option-selection" style="margin-bottom: 8px;">
                            <label style="font-size: 0.85rem; font-weight: bold; color: #444;">الحجم / المقاس:</label>
                            <select id="size-${p.id}" onchange="updateProductPrice('${p.id}', this.value)" ${isSoldOut ? 'disabled' : ''} style="width: 100%; padding: 6px; border-radius: 6px; border: 1px solid #ccc; margin-top: 4px;">
                                ${sizeOptions}
                            </select>
                        </div>
                    ` : ''}

                    ${p.colors && p.colors.length > 1 ? `
                        <div class="option-selection" style="margin-bottom: 8px;">
                            <label style="font-size: 0.85rem; font-weight: bold; color: #444;">اللون:</label>
                            <select id="color-${p.id}" ${isSoldOut ? 'disabled' : ''} style="width: 100%; padding: 6px; border-radius: 6px; border: 1px solid #ccc; margin-top: 4px;">
                                ${colorOptions}
                            </select>
                        </div>
                    ` : ''}

                    <button class="btn btn-add-cart" id="add-btn-${p.id}"
                        onclick="addToCart('${p.id}')" 
                        ${isSoldOut ? 'disabled' : ''}>
                        ${isSoldOut ? 'غير متوفر (Sold Out)' : '<i class="fa-solid fa-cart-plus"></i> إضافة للسلة'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function updateProductPrice(productId, selectedSize) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.variantPrices) return;

    const newPrice = product.variantPrices[selectedSize];
    if (newPrice) {
        const priceEl = document.getElementById(`price-${productId}`);
        if (priceEl) {
            priceEl.textContent = `${newPrice} جنيه`;
        }
    }
}

function changeMainImage(productId, newSrc) {
    const imgEl = document.getElementById(`main-img-${productId}`);
    if (imgEl) {
        imgEl.src = newSrc;
    }
}

function openImageModal(imgSrc) {
    let imageModal = document.getElementById('imageModal');
    if (!imageModal) {
        imageModal = document.createElement('div');
        imageModal.id = 'imageModal';
        imageModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            cursor: pointer;
        `;
        imageModal.innerHTML = `
            <span style="position: absolute; top: 20px; right: 25px; color: #fff; font-size: 35px; font-weight: bold; cursor: pointer;">&times;</span>
            <img id="modalImg" src="" style="max-width: 90%; max-height: 90%; border-radius: 8px; box-shadow: 0 5px 25px rgba(0,0,0,0.5); object-fit: contain;">
        `;
        document.body.appendChild(imageModal);

        imageModal.onclick = function () {
            imageModal.style.display = 'none';
        };
    }
    document.getElementById('modalImg').src = imgSrc;
    imageModal.style.display = 'flex';
}

// ================= =================
// 5. إدارة السلة وتحديث البيانات
// ================= =================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock <= 0) return;

    // استخراج الحجم واللون إن وجدا
    const sizeSelect = document.getElementById(`size-${productId}`);
    const colorSelect = document.getElementById(`color-${productId}`);

    const selectedSize = sizeSelect ? sizeSelect.value : (product.sizes && product.sizes[0] ? product.sizes[0] : '');
    const selectedColor = colorSelect ? colorSelect.value : (product.colors && product.colors[0] ? product.colors[0] : '');

    // تحديد السعر بناءً على الحجم المختار إن وجد
    let finalPrice = product.price;
    if (selectedSize && product.variantPrices && product.variantPrices[selectedSize]) {
        finalPrice = product.variantPrices[selectedSize];
    }

    // البحث عما إذا كان نفس المنتج مع نفس الخيارات متواجد بالفعل
    const existingIndex = cart.findIndex(item => 
        item.id === productId && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
    );

    if (existingIndex > -1) {
        if (cart[existingIndex].quantity < product.stock) {
            cart[existingIndex].quantity += 1;
        } else {
            alert(`عذراً، الكمية المتوفرة في المخزون هي ${product.stock} فقط.`);
            return;
        }
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: finalPrice,
            image: product.image,
            selectedSize: selectedSize,
            selectedColor: selectedColor,
            quantity: 1,
            maxStock: product.stock
        });
    }

    saveCart();
    updateCartCount();
    renderCartModal();

    // إشعار بسيط للمستخدم عند الإضافة
    const btn = document.getElementById(`add-btn-${productId}`);
    if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-check"></i> تمت الإضافة`;
        btn.style.backgroundColor = '#27ae60';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.backgroundColor = '';
        }, 1500);
    }
}

function updateQuantity(index, change) {
    if (index < 0 || index >= cart.length) return;

    const newQty = cart[index].quantity + change;
    if (newQty > cart[index].maxStock) {
        alert(`عذراً، الكمية المتوفرة في المخزون هي ${cart[index].maxStock} فقط.`);
        return;
    }

    if (newQty > 0) {
        cart[index].quantity = newQty;
    } else {
        cart.splice(index, 1);
    }

    saveCart();
    updateCartCount();
    renderCartModal();
}

function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        saveCart();
        updateCartCount();
        renderCartModal();
    }
}

function saveCart() {
    localStorage.setItem('osmany_cart', JSON.stringify(cart));
}

function updateCartCount() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCounters = document.querySelectorAll('.cart-count, #cartCount');
    cartCounters.forEach(counter => {
        counter.textContent = totalCount;
    });
}

// تم تصحيح هذه الدالة بالكامل: كانت بتدور على IDs غير موجودة
// (cartItems و cartTotal) فمكانتش بتحدّث أي حاجة على الشاشة.
// دلوقتي بتستخدم الـ IDs الصحيحة المتفق عليها في كل الصفحات:
// cartItemsContainer و cartTotalPrice
function renderCartModal() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalEl = document.getElementById('cartTotalPrice');

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p style="text-align: center; color: #777; padding: 2rem;">سلة التسوق فارغة حالياً.</p>`;
        if (cartTotalEl) cartTotalEl.textContent = '0 جنيه';
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const optionsText = [
            item.selectedSize ? `المقاس: ${item.selectedSize}` : '',
            item.selectedColor ? `اللون: ${item.selectedColor}` : ''
        ].filter(Boolean).join(' | ');

        return `
            <div class="cart-item" style="display:flex; align-items:center; gap:12px; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid #eee;">
                <img src="${item.image}" alt="${item.title}" style="width:60px; height:60px; object-fit:cover; border-radius:6px;">
                <div style="flex:1;">
                    <h4 style="font-size:0.95rem; margin:0 0 4px 0;">${item.title}</h4>
                    ${optionsText ? `<p style="font-size:0.8rem; color:#666; margin:0 0 4px 0;">${optionsText}</p>` : ''}
                    <span style="font-weight:bold; color:#d9534f; font-size:0.9rem;">${item.price > 0 ? item.price + ' جنيه' : 'السعر عند التواصل'}</span>
                </div>
                <div style="display:flex; align-items:center; gap:6px;">
                    <button onclick="updateQuantity(${index}, -1)" style="padding:2px 8px; border:1px solid #ccc; background:#fff; border-radius:4px; cursor:pointer;">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)" style="padding:2px 8px; border:1px solid #ccc; background:#fff; border-radius:4px; cursor:pointer;">+</button>
                </div>
                <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#e74c3c; cursor:pointer; font-size:1.1rem; margin-right:8px;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');

    if (cartTotalEl) {
        cartTotalEl.textContent = `${total} جنيه`;
    }
}

// ================= =================
// 6. إرسال الطلب عبر EmailJS
// ================= =================
// تم تصحيح هذه الدالة بالكامل: كانت بتدور على حقول فورم مش موجودة
// (custName, custPhone, custAddress, custNotes) فالطلب كان بيتبعت ببيانات فاضية.
// دلوقتي بتستخدم أسماء الحقول الفعلية الموجودة في الفورم (customerName...الخ)
function submitOrder(e) {
    e.preventDefault();

    if (cart.length === 0) {
        alert('السلة فارغة! يرجى إضافة منتجات قبل إتمام الطلب.');
        return;
    }

    const form = e.target;

    const customerName = document.getElementById('customerName')?.value || 'غير محدد';
    const customerAddress = document.getElementById('customerAddress')?.value || 'غير محدد';
    const customerEmail = document.getElementById('customerEmail')?.value?.trim() || ''; // اختياري
    const customerWhatsapp = document.getElementById('customerWhatsapp')?.value || 'غير محدد';
    const customerAltPhone = document.getElementById('customerAltPhone')?.value || 'لا يوجد';
    const paymentMethod = document.getElementById('paymentMethod')?.value || 'غير محدد';
    const orderNotes = document.getElementById('orderNotes')?.value || 'لا يوجد';

    // تجهيز ملخص المنتجات داخل السلة
    let orderDetails = cart.map(item => {
        let details = `- ${item.title}`;
        if (item.selectedSize) details += ` (مقاس: ${item.selectedSize})`;
        if (item.selectedColor) details += ` (لون: ${item.selectedColor})`;
        details += ` | العدد: ${item.quantity} | السعر: ${item.price * item.quantity} جنيه`;
        return details;
    }).join('\n');

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // ============================================================
    // 1) القناة الأساسية والمضمونة: فتح واتساب برسالة جاهزة
    // ============================================================
    const waMessage =
`🛒 طلب جديد من متجر عُثماني

👤 الاسم: ${customerName}
📍 العنوان: ${customerAddress}
📞 الهاتف: ${customerWhatsapp}${customerAltPhone !== 'لا يوجد' ? ' / ' + customerAltPhone : ''}
💳 طريقة الدفع: ${paymentMethod}

📦 تفاصيل الطلب:
${orderDetails}

💰 الإجمالي: ${totalPrice} جنيه
📝 ملاحظات: ${orderNotes}`;

    const waLink = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

    // مهم: لازم يتفتح فورًا وبشكل متزامن (مباشرة جوه دالة الحدث)
    // عشان المتصفح ميعتبروش الفتح ده Popup ويمنعه
    window.open(waLink, '_blank');

    // ============================================================
    // 2) قناة إضافية اختيارية: إرسال نسخة بالإيميل (في الخلفية)
    // ============================================================
    const templateParams = {
        to_name: "إدارة متجر عثماني",
        from_name: customerName,
        address: customerAddress,
        email: customerEmail || 'لم يُدخل العميل بريداً إلكترونياً',
        phone: customerWhatsapp,
        alt_phone: customerAltPhone,
        payment_method: paymentMethod,
        notes: orderNotes,
        order_details: orderDetails,
        total_price: `${totalPrice} جنيه`
    };

    const emailPromises = [
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_OWNER, templateParams)
    ];

    // إيميل تأكيد العميل بيتبعت بس لو هو فعلاً كتب إيميله
    if (customerEmail) {
        emailPromises.push(
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_CUSTOMER, { ...templateParams, to_email: customerEmail })
        );
    }

    Promise.all(emailPromises).catch((error) => {
        // لو الإيميل فشل، الطلب برضو وصل عن طريق واتساب، فمش هنوقف أو نزعج العميل
        console.error('EmailJS Error (لن يؤثر على استلام الطلب، لأن واتساب هو القناة الأساسية):', error);
    });

    // ============================================================
    // 3) إتمام الطلب من ناحية الواجهة فورًا (من غير استنى الإيميل)
    // ============================================================
    alert('تم تجهيز طلبك! هيتفتحلك واتساب دلوقتي، ابعت الرسالة الجاهزة عشان نستلم طلبك فورًا.');
    cart = [];
    saveCart();
    updateCartCount();
    closeCartModal();
    form.reset();
}