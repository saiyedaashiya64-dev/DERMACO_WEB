<?php
session_start();
if (!isset($_SESSION['admin'])) {
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Products – DermaCo Admin</title>
    <link rel="stylesheet" href="../ASSETS/plugins/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="../ASSETS/css/admin.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <style>
        .toolbar { display:flex; justify-content:space-between; align-items:center; padding:0 28px 18px; flex-wrap:wrap; gap:10px; }
        .toolbar-left { display:flex; align-items:center; gap:10px; }
        .toolbar-left strong { font-size:1rem; color:#1a1a1a; }
        .count-badge { background:#f4b400; color:#000; font-size:0.72rem; font-weight:700; padding:2px 9px; border-radius:20px; }

        .filter-tabs { display:flex; gap:6px; margin-left:8px; }
        .ftab { background:#f0f0f0; color:#555; border:none; border-radius:6px; padding:6px 14px; font-size:0.8rem; font-weight:600; cursor:pointer; }
        .ftab:hover { background:#e0e0e0; }
        .ftab.active { background:#1a1a1a; color:#f4b400; }

        .tbl-search { border:1px solid #ddd; border-radius:6px; padding:8px 14px; font-size:0.85rem; outline:none; width:220px; }
        .tbl-search:focus { border-color:#f4b400; }

        .table-card { margin:0 28px; background:#fff; border-radius:10px; border:1px solid #efefef; overflow:hidden; }

        .products-table { width:100%; border-collapse:collapse; }
        .products-table th { background:#1a1a1a; color:#f4b400; padding:11px 16px; text-align:left; font-size:0.72rem; text-transform:uppercase; letter-spacing:0.6px; }
        .products-table td { padding:12px 16px; border-bottom:1px solid #f3f3f3; vertical-align:middle; font-size:0.88rem; color:#333; }
        .products-table tr:last-child td { border-bottom:none; }
        .products-table tr:hover td { background:#fafafa; }
        .products-table tr.inactive-row td { opacity:0.5; }

        .product-thumb { width:46px; height:46px; object-fit:cover; border-radius:8px; border:1px solid #eee; background:#f9f9f9; }
        .slug-pill { font-size:0.78rem; background:#f5f5f5; padding:2px 8px; border-radius:4px; color:#c8960c; font-family:monospace; }

        .badge-active   { background:#eafaf1; color:#1a7a40; padding:4px 11px; border-radius:20px; font-size:0.75rem; font-weight:600; }
        .badge-inactive { background:#fdf0f0; color:#c0392b; padding:4px 11px; border-radius:20px; font-size:0.75rem; font-weight:600; }

        .btn-tbl-edit   { background:#f4b400; color:#000; border:none; border-radius:5px; padding:5px 12px; font-size:0.8rem; font-weight:700; cursor:pointer; }
        .btn-tbl-edit:hover { background:#e0a800; }

        /* Toggle switch */
        .toggle-wrap { display:flex; align-items:center; gap:8px; margin-left:8px; }
        .toggle { position:relative; width:42px; height:22px; }
        .toggle input { opacity:0; width:0; height:0; }
        .toggle-slider { position:absolute; inset:0; background:#ddd; border-radius:22px; cursor:pointer; transition:0.2s; }
        .toggle-slider:before { content:''; position:absolute; width:16px; height:16px; left:3px; top:3px; background:#fff; border-radius:50%; transition:0.2s; }
        .toggle input:checked + .toggle-slider { background:#28a745; }
        .toggle input:checked + .toggle-slider:before { transform:translateX(20px); }
        .toggle-label { font-size:0.8rem; color:#888; min-width:48px; }

        /* Modal */
        .modal-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:1000; align-items:center; justify-content:center; }
        .modal-overlay.open { display:flex; }
        .modal-box { background:#fff; border-radius:12px; width:100%; max-width:700px; max-height:90vh; overflow-y:auto; box-shadow:0 10px 40px rgba(0,0,0,0.15); }
        .modal-head { background:#1a1a1a; color:#f4b400; padding:15px 22px; border-radius:12px 12px 0 0; display:flex; justify-content:space-between; align-items:center; }
        .modal-head h5 { margin:0; font-size:1rem; font-weight:700; }
        .modal-close { background:none; border:none; color:#fff; font-size:1.5rem; cursor:pointer; line-height:1; }
        .modal-body { padding:24px; }
        .modal-foot { padding:14px 22px; border-top:1px solid #eee; display:flex; justify-content:flex-end; gap:10px; }

        .form-row { display:flex; gap:14px; margin-bottom:14px; }
        .form-row .fg { flex:1; margin-bottom:0; }
        .fg { margin-bottom:14px; }
        .fg label { display:block; font-size:0.8rem; font-weight:700; color:#555; margin-bottom:5px; }
        .fg input, .fg select, .fg textarea { width:100%; padding:8px 11px; border:1px solid #ddd; border-radius:6px; font-size:0.88rem; outline:none; box-sizing:border-box; }
        .fg input:focus, .fg select:focus, .fg textarea:focus { border-color:#f4b400; }
        .fg textarea { resize:vertical; }

        .tag-wrap { display:flex; flex-wrap:wrap; gap:5px; border:1px solid #ddd; border-radius:6px; padding:6px 8px; min-height:40px; cursor:text; background:#fff; box-sizing:border-box; }
        .tag-wrap:focus-within { border-color:#f4b400; }
        .tag-pill { display:inline-flex; align-items:center; gap:4px; background:#1a1a1a; color:#f4b400; font-size:0.75rem; padding:2px 8px; border-radius:20px; }
        .tag-pill .rx { cursor:pointer; opacity:.7; }
        .tag-pill .rx:hover { opacity:1; }
        .tag-bare { border:none; outline:none; font-size:0.85rem; flex:1; min-width:90px; padding:1px 0; }

        .img-preview { width:100%; height:140px; object-fit:contain; border:2px dashed #ddd; border-radius:8px; background:#fafafa; padding:6px; display:block; }
        .img-preview.loaded { border-color:#f4b400; border-style:solid; }
        .upload-lbl { display:block; margin-top:8px; text-align:center; border:1px dashed #ccc; border-radius:6px; padding:8px; cursor:pointer; font-size:0.82rem; color:#888; }
        .upload-lbl:hover { border-color:#f4b400; color:#f4b400; }
        .btn-cancel { background:#888; color:#fff; border:none; padding:9px 20px; border-radius:6px; font-weight:600; cursor:pointer; }
        .btn-cancel:hover { background:#555; }
    </style>
</head>
<body>

<div class="admin-sidebar">
    <h3>DermaCo</h3>
    <a href="dashboard.php">Dashboard</a>
    <a href="appointments.php">Appointments</a>
    <a href="products.php" style="background:#242424;color:#f4b400;border-left:3px solid #f4b400;font-weight:600;">Products</a>
    <a href="logout.php">Logout</a>
</div>

<div class="admin-main">
    <div class="admin-topbar">
        <h2>Products</h2>
        <a href="logout.php" class="btn-admin">Logout</a>
    </div>

    <div class="toolbar">
        <div class="toolbar-left">
            <strong>All Products</strong>
            <span class="count-badge" id="productCount">0</span>
            <div class="filter-tabs">
                <button class="ftab active" onclick="filterProducts('all',this)">All</button>
                <button class="ftab" onclick="filterProducts('active',this)">Active</button>
                <button class="ftab" onclick="filterProducts('inactive',this)">Inactive</button>
            </div>
        </div>
        <div style="display:flex;gap:10px;align-items:center">
            <input type="text" id="searchInput" class="tbl-search" placeholder="Search products...">
            <button class="btn-admin" onclick="openAddModal()">+ Add Product</button>
        </div>
    </div>

    <div class="table-card">
        <div style="overflow-x:auto">
            <table class="products-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Slug</th>
                        <th>Price</th>
                        <th>Size</th>
                        <th>Visible on Store</th>
                        <th>Treatments</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="productsBody">
                    <tr><td colspan="8" style="text-align:center;padding:30px;color:#aaa">Loading...</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal-overlay" id="productModal">
    <div class="modal-box">
        <div class="modal-head">
            <h5 id="modalTitle">Add New Product</h5>
            <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body">
            <input type="hidden" id="productId">
            <div class="form-row">
                <div class="fg" style="flex:2">
                    <label>Product Title *</label>
                    <input type="text" id="fTitle" placeholder="e.g. Hydrating Serum">
                </div>
                <div class="fg" style="flex:1">
                    <label>Status</label>
                    <select id="fStatus">
                        <option value="active">Active (visible)</option>
                        <option value="inactive">Inactive (hidden)</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="fg" style="flex:2">
                    <label>Slug *</label>
                    <input type="text" id="fSlug" placeholder="e.g. hydrating-serum">
                </div>
                <div class="fg" style="flex:1">
                    <label>Price (₹) *</label>
                    <input type="number" id="fPrice" placeholder="0.00" min="0" step="0.01">
                </div>
                <div class="fg" style="flex:1">
                    <label>Size</label>
                    <input type="text" id="fSize" placeholder="e.g. 30ml">
                </div>
            </div>
            <div class="form-row" style="align-items:flex-start">
                <div class="fg" style="flex:2">
                    <label>Description</label>
                    <textarea id="fDescription" rows="4" placeholder="Product description..."></textarea>
                </div>
                <div class="fg" style="flex:1">
                    <label>Image</label>
                    <img id="imagePreview" class="img-preview" src="" alt="">
                    <label class="upload-lbl" for="fImageFile">📁 Click to upload</label>
                    <input type="file" id="fImageFile" accept="image/*" style="display:none" onchange="previewImage(this)">
                    <input type="hidden" id="fImagePath">
                    <small id="currentImageNote" style="color:#aaa;font-size:0.78rem;display:block;margin-top:4px"></small>
                </div>
            </div>
            <div class="form-row">
                <div class="fg">
                    <label>Best For (skin types)</label>
                    <div class="tag-wrap" id="bestforContainer" onclick="document.getElementById('bestforInput').focus()">
                        <input type="text" id="bestforInput" class="tag-bare" placeholder="Type & press Enter">
                    </div>
                </div>
                <div class="fg">
                    <label>Concerns</label>
                    <div class="tag-wrap" id="concernsContainer" onclick="document.getElementById('concernsInput').focus()">
                        <input type="text" id="concernsInput" class="tag-bare" placeholder="Type & press Enter">
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="fg">
                    <label>Key Ingredients</label>
                    <div class="tag-wrap" id="ingredientsContainer" onclick="document.getElementById('ingredientsInput').focus()">
                        <input type="text" id="ingredientsInput" class="tag-bare" placeholder="Type & press Enter">
                    </div>
                </div>
                <div class="fg">
                    <label>Treatments</label>
                    <div class="tag-wrap" id="treatmentsContainer" onclick="document.getElementById('treatmentsInput').focus()">
                        <input type="text" id="treatmentsInput" class="tag-bare" placeholder="Type & press Enter">
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-foot">
            <button class="btn-cancel" onclick="closeModal()">Cancel</button>
            <button class="btn-admin" id="saveBtn" onclick="saveProduct()">Save Product</button>
        </div>
    </div>
</div>

<script>
const BASE = '/dermaco_web';
let allProducts = [];
let currentFilter = 'all';
const tagData = { bestfor:[], concerns:[], ingredients:[], treatments:[] };

async function loadProducts() {
    try {
        const res  = await fetch(`${BASE}/api/admin-get-products.php`);
        const data = await res.json();
        if (!data.success) { alert(data.message); return; }
        allProducts = data.products || [];
        document.getElementById('productCount').textContent = allProducts.length;
        applyFilter();
    } catch(e) {
        document.getElementById('productsBody').innerHTML =
            `<tr><td colspan="8" style="text-align:center;padding:30px;color:red">Failed to load.</td></tr>`;
    }
}

function filterProducts(filter, btn) {
    currentFilter = filter;
    document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter();
}

function applyFilter() {
    const q = document.getElementById('searchInput').value.toLowerCase();
    let list = allProducts;
    if (currentFilter === 'active')   list = list.filter(p => p.status !== 'inactive');
    if (currentFilter === 'inactive') list = list.filter(p => p.status === 'inactive');
    if (q) list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.slug||'').toLowerCase().includes(q) ||
        (p.treatments||[]).join(' ').toLowerCase().includes(q)
    );
    renderTable(list);
}

document.getElementById('searchInput').addEventListener('input', applyFilter);

function renderTable(products) {
    const tbody = document.getElementById('productsBody');
    if (!products.length) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:30px;color:#aaa">No products found</td></tr>`;
        return;
    }
    tbody.innerHTML = products.map(p => {
        const isActive = p.status !== 'inactive';
        const id = esc(p.id || p.slug);
        return `
        <tr class="${!isActive ? 'inactive-row' : ''}">
            <td><img src="/${p.image||''}" class="product-thumb"
                onerror="this.src='https://via.placeholder.com/46x46?text=?'" alt=""></td>
            <td><strong>${esc(p.title)}</strong></td>
            <td><span class="slug-pill">${esc(p.slug||p.id)}</span></td>
            <td>&#8377;${parseFloat(p.price).toFixed(2)}</td>
            <td style="white-space:nowrap">${esc(p.size||'—')}</td>
            <td>
                <div class="toggle-wrap">
                    <label class="toggle">
                        <input type="checkbox" ${isActive ? 'checked' : ''}
                            onchange="toggleProduct('${id}', this.checked)">
                        <span class="toggle-slider"></span>
                    </label>
                    <span class="toggle-label">${isActive ? 'Visible' : 'Hidden'}</span>
                </div>
            </td>
            <td style="font-size:0.8rem;color:#999">${(p.treatments||[]).join(', ')||'—'}</td>
            <td>
                <button class="btn-tbl-edit" onclick="openEditModal('${id}')">Edit</button>
            </td>
        </tr>`;
    }).join('');
}

async function toggleProduct(id, makeActive) {
    const status = makeActive ? 'active' : 'inactive';
    const res  = await fetch(`${BASE}/api/admin-toggle-product.php`, {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ id, status })
    });
    const data = await res.json();
    if (data.success) {
        // Update local data without full reload for instant feel
        const p = allProducts.find(x => (x.id||x.slug) == id);
        if (p) p.status = status;
        applyFilter();
    } else {
        Swal.fire('Error', data.message, 'error');
        await loadProducts(); // revert on failure
    }
}

function openAddModal() {
    resetForm();
    document.getElementById('modalTitle').textContent = 'Add New Product';
    document.getElementById('productModal').classList.add('open');
}
function closeModal() { document.getElementById('productModal').classList.remove('open'); }
document.getElementById('productModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

function openEditModal(id) {
    const p = allProducts.find(x => (x.id||x.slug) == id);
    if (!p) return;
    resetForm();
    document.getElementById('modalTitle').textContent = 'Edit Product';
    document.getElementById('productId').value    = p.id || p.slug;
    document.getElementById('fTitle').value       = p.title       || '';
    document.getElementById('fSlug').value        = p.slug        || p.id || '';
    document.getElementById('fPrice').value       = p.price       || '';
    document.getElementById('fSize').value        = p.size        || '';
    document.getElementById('fDescription').value = p.description || '';
    document.getElementById('fStatus').value      = p.status      || 'active';
    document.getElementById('fImagePath').value   = p.image       || '';
    if (p.image) {
        const img = document.getElementById('imagePreview');
        img.src = '/' + p.image; img.classList.add('loaded');
        document.getElementById('currentImageNote').textContent = p.image.split('/').pop();
    }
    (p.bestfor||p.bestFor||[]).forEach(t => addTag('bestfor', t));
    (p.concerns||[]).forEach(t => addTag('concerns', t));
    (p.ingredients||[]).forEach(t => addTag('ingredients', typeof t==='string'&&t.includes('–') ? t.split('–')[0].trim() : t));
    (p.treatments||[]).forEach(t => addTag('treatments', t));
    document.getElementById('productModal').classList.add('open');
}

async function saveProduct() {
    const title = document.getElementById('fTitle').value.trim();
    const slug  = document.getElementById('fSlug').value.trim();
    const price = parseFloat(document.getElementById('fPrice').value);
    if (!title || !slug || !price) { Swal.fire('Required','Title, slug and price are required.','warning'); return; }

    const btn = document.getElementById('saveBtn');
    btn.textContent = 'Saving...'; btn.disabled = true;

    let imagePath = document.getElementById('fImagePath').value;
    const fi = document.getElementById('fImageFile');
    if (fi.files.length > 0) {
        const up = await uploadImage(fi.files[0]);
        if (!up) { btn.textContent='Save Product'; btn.disabled=false; return; }
        imagePath = up;
    }

    const payload = {
        id: document.getElementById('productId').value || null,
        title, slug, price,
        size:        document.getElementById('fSize').value.trim(),
        description: document.getElementById('fDescription').value.trim(),
        status:      document.getElementById('fStatus').value,
        image:       imagePath,
        bestfor:     tagData.bestfor,
        concerns:    tagData.concerns,
        ingredients: tagData.ingredients,
        treatments:  tagData.treatments,
    };

    const res  = await fetch(`${BASE}/api/admin-save-product.php`, {
        method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)
    });
    const data = await res.json();
    btn.textContent = 'Save Product'; btn.disabled = false;
    if (data.success) {
        closeModal(); await loadProducts();
        Swal.fire({ icon:'success', title:'Saved!', text:data.message, timer:1600, showConfirmButton:false });
    } else { Swal.fire('Error', data.message, 'error'); }
}

async function uploadImage(file) {
    const fd = new FormData(); fd.append('image', file);
    try {
        const res  = await fetch(`${BASE}/api/admin-upload-image.php`, { method:'POST', body:fd });
        const data = await res.json();
        if (!data.success) { Swal.fire('Upload Error', data.message, 'error'); return null; }
        return data.path;
    } catch(e) { Swal.fire('Upload Error','Could not upload image.','error'); return null; }
}

function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
            const img = document.getElementById('imagePreview');
            img.src = e.target.result; img.classList.add('loaded');
            document.getElementById('currentImageNote').textContent = input.files[0].name;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function addTag(field, value) {
    value = String(value).trim();
    if (!value || tagData[field].includes(value)) return;
    tagData[field].push(value); renderTags(field);
}
function removeTag(field, value) {
    tagData[field] = tagData[field].filter(t => t !== value); renderTags(field);
}
function renderTags(field) {
    const container = document.getElementById(field+'Container');
    const input     = document.getElementById(field+'Input');
    container.querySelectorAll('.tag-pill').forEach(t => t.remove());
    tagData[field].forEach(val => {
        const pill = document.createElement('span');
        pill.className = 'tag-pill';
        pill.innerHTML = `${esc(val)} <span class="rx" onclick="removeTag('${field}','${val.replace(/'/g,"\\'")}')">×</span>`;
        container.insertBefore(pill, input);
    });
}
['bestfor','concerns','ingredients','treatments'].forEach(field => {
    document.getElementById(field+'Input').addEventListener('keydown', function(e) {
        if (e.key==='Enter'||e.key===',') { e.preventDefault(); addTag(field,this.value); this.value=''; }
        else if (e.key==='Backspace'&&this.value===''&&tagData[field].length) {
            removeTag(field, tagData[field][tagData[field].length-1]);
        }
    });
});

document.getElementById('fTitle').addEventListener('input', function() {
    if (!document.getElementById('productId').value) {
        document.getElementById('fSlug').value = this.value.toLowerCase()
            .replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').trim();
    }
});

function resetForm() {
    ['productId','fTitle','fSlug','fPrice','fSize','fImagePath'].forEach(id => document.getElementById(id).value='');
    document.getElementById('fDescription').value='';
    document.getElementById('fStatus').value='active';
    document.getElementById('fImageFile').value='';
    document.getElementById('currentImageNote').textContent='';
    const img = document.getElementById('imagePreview');
    img.src=''; img.classList.remove('loaded');
    Object.keys(tagData).forEach(f => { tagData[f]=[]; renderTags(f); });
}

function esc(str) {
    return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

loadProducts();
</script>
</body>
</html>
