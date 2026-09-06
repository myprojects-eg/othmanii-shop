let products = [];
let editingId = null;
let currentImages = []; // URLs of images for the product currently being added/edited

/* ===== helpers ===== */
function showToast(msg){
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=> t.classList.remove('show'), 2000);
}
function escapeHtml(s){
  return String(s||'').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

/* ===== auth guard ===== */
auth.onAuthStateChanged((user)=>{
  if(!user){
    window.location.href = 'login.html';
    return;
  }
  init();
});

document.getElementById('btn-logout').addEventListener('click', ()=>{
  auth.signOut().then(()=> window.location.href = 'login.html');
});

/* ===== category dropdowns ===== */
function populateMainCategorySelect(){
  const sel = document.getElementById('f-main');
  sel.innerHTML = Object.keys(categoryTree).map(key =>
    `<option value="${key}">${categoryTree[key].title}</option>`
  ).join('');
  onMainCategoryChange();
}

function onMainCategoryChange(){
  const main = document.getElementById('f-main').value;
  const subSel = document.getElementById('f-sub');
  const cat = categoryTree[main];
  const subs = cat && cat.subcategories ? cat.subcategories : {};
  const subKeys = Object.keys(subs);
  subSel.innerHTML = subKeys.length
    ? subKeys.map(k => `<option value="${k}">${subs[k].title}</option>`).join('')
    : `<option value="">—</option>`;
  onSubCategoryChange();
}

function onSubCategoryChange(){
  const main = document.getElementById('f-main').value;
  const sub = document.getElementById('f-sub').value;
  const typeSel = document.getElementById('f-type');
  const cat = categoryTree[main];
  const subCat = cat && cat.subcategories ? cat.subcategories[sub] : null;
  const types = subCat && subCat.types ? subCat.types : {};
  const typeKeys = Object.keys(types);
  typeSel.innerHTML = typeKeys.length
    ? typeKeys.map(k => `<option value="${k}">${types[k].title}</option>`).join('')
    : `<option value="">—</option>`;
}

/* ===== image upload ===== */
function renderImagePreview(){
  const row = document.getElementById('image-preview-row');
  row.innerHTML = currentImages.map((url, i) => `
    <div class="image-preview-item">
      <img src="${url}" alt="صورة ${i+1}">
      ${i === 0 ? '<span class="main-badge">رئيسية</span>' : ''}
      <button type="button" onclick="removeImage(${i})">✕</button>
    </div>
  `).join('');
}

window.removeImage = function(index){
  currentImages.splice(index, 1);
  renderImagePreview();
};

document.getElementById('f-images-input').addEventListener('change', async (e)=>{
  const files = Array.from(e.target.files || []);
  if(files.length === 0) return;

  const statusEl = document.getElementById('upload-status');
  statusEl.textContent = `جاري رفع ${files.length} صورة...`;

  for(const file of files){
    try{
      const url = await uploadImageToImgbb(file);
      currentImages.push(url);
      renderImagePreview();
    }catch(err){
      showToast('فشل رفع إحدى الصور، حاولي تاني');
    }
  }
  statusEl.textContent = '';
  e.target.value = '';
});

/* ===== form reset / fill for edit ===== */
function resetForm(){
  editingId = null;
  currentImages = [];
  document.getElementById('form-title').textContent = 'إضافة منتج جديد';
  document.getElementById('btn-save-product').textContent = 'إضافة المنتج';
  document.getElementById('btn-cancel-edit').style.display = 'none';
  document.getElementById('f-title').value = '';
  document.getElementById('f-price').value = '';
  document.getElementById('f-stock').value = '';
  document.getElementById('f-sizes').value = '';
  document.getElementById('f-colors').value = '';
  document.getElementById('f-description').value = '';
  populateMainCategorySelect();
  renderImagePreview();
}

window.editProduct = function(id){
  const p = products.find(x => x.id === id);
  if(!p) return;
  editingId = id;
  currentImages = p.images && p.images.length ? [...p.images] : (p.image ? [p.image] : []);

  document.getElementById('form-title').textContent = 'تعديل المنتج';
  document.getElementById('btn-save-product').textContent = 'حفظ التعديلات';
  document.getElementById('btn-cancel-edit').style.display = 'inline-block';

  document.getElementById('f-title').value = p.title || '';
  document.getElementById('f-price').value = p.price || 0;
  document.getElementById('f-stock').value = p.stock || 0;
  document.getElementById('f-sizes').value = (p.sizes || []).join('، ');
  document.getElementById('f-colors').value = (p.colors || []).join('، ');
  document.getElementById('f-description').value = p.description || '';

  populateMainCategorySelect();
  document.getElementById('f-main').value = p.mainCategory || '';
  onMainCategoryChange();
  document.getElementById('f-sub').value = p.subCategory || '';
  onSubCategoryChange();
  document.getElementById('f-type').value = p.type || '';

  renderImagePreview();
  window.scrollTo({top:0, behavior:'smooth'});
};

document.getElementById('btn-cancel-edit').addEventListener('click', resetForm);
document.getElementById('f-main').addEventListener('change', onMainCategoryChange);
document.getElementById('f-sub').addEventListener('change', onSubCategoryChange);

/* ===== save / delete product ===== */
document.getElementById('btn-save-product').addEventListener('click', async ()=>{
  const title = document.getElementById('f-title').value.trim();
  const price = Number(document.getElementById('f-price').value || 0);
  const stock = Number(document.getElementById('f-stock').value || 0);
  const mainCategory = document.getElementById('f-main').value;
  const subCategory = document.getElementById('f-sub').value;
  const type = document.getElementById('f-type').value;
  const sizes = document.getElementById('f-sizes').value.split(/[,،]/).map(s=>s.trim()).filter(Boolean);
  const colors = document.getElementById('f-colors').value.split(/[,،]/).map(s=>s.trim()).filter(Boolean);
  const description = document.getElementById('f-description').value.trim();

  if(!title){ showToast('اكتبي اسم المنتج'); return; }
  if(currentImages.length === 0){ showToast('ارفعي صورة واحدة على الأقل'); return; }

  const productData = {
    title, price, stock,
    image: currentImages[0],
    images: currentImages,
    sizes, colors,
    description,
    mainCategory, subCategory, type
  };

  try{
    if(editingId){
      await db.collection('products').doc(editingId).update(productData);
      showToast('تم حفظ التعديلات');
    }else{
      await db.collection('products').add(productData);
      showToast('تم إضافة المنتج');
    }
    resetForm();
    await loadProducts();
  }catch(err){
    showToast('حصل خطأ أثناء الحفظ، حاولي تاني');
  }
});

window.deleteProductConfirm = async function(id){
  const p = products.find(x => x.id === id);
  if(!p) return;
  if(!confirm(`متأكدة إنك عايزة تمسحي "${p.title}"؟`)) return;
  try{
    await db.collection('products').doc(id).delete();
    showToast('تم حذف المنتج');
    await loadProducts();
  }catch(err){
    showToast('حصل خطأ أثناء الحذف');
  }
};

/* ===== load & render product list ===== */
async function loadProducts(){
  try{
    const snap = await db.collection('products').get();
    products = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }catch(err){
    products = [];
    showToast('حصل خطأ أثناء تحميل المنتجات');
  }
  renderProductList();
}

function renderProductList(){
  const list = document.getElementById('admin-product-list');
  document.getElementById('admin-product-count').textContent = `عدد المنتجات: ${products.length}`;

  if(products.length === 0){
    list.innerHTML = `<p style="color:#777;">لا توجد منتجات مضافة بعد.</p>`;
    return;
  }

  list.innerHTML = products.map(p => {
    const catPath = [
      categoryTree[p.mainCategory]?.title,
      categoryTree[p.mainCategory]?.subcategories?.[p.subCategory]?.title,
      categoryTree[p.mainCategory]?.subcategories?.[p.subCategory]?.types?.[p.type]?.title
    ].filter(Boolean).join(' ← ');

    return `
      <div class="admin-product-row">
        <img src="${p.image}" alt="${escapeHtml(p.title)}">
        <div class="admin-product-info">
          <div class="admin-product-title">${escapeHtml(p.title)}</div>
          <div class="admin-product-meta">
            ${p.price > 0 ? p.price + ' جنيه' : 'بدون سعر ثابت'} · مخزون: ${p.stock ?? 0}
            ${catPath ? '<br>' + escapeHtml(catPath) : ''}
          </div>
        </div>
        <div class="admin-product-actions">
          <button class="btn" onclick="editProduct('${p.id}')" style="background:var(--light-bg); color:var(--dark-color);">تعديل</button>
          <button class="btn" onclick="deleteProductConfirm('${p.id}')" style="background:#fdecea; color:#c0392b;">حذف</button>
        </div>
      </div>
    `;
  }).join('');
}

/* ===== boot ===== */
function init(){
  resetForm();
  loadProducts();
}