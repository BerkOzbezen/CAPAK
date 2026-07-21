document.addEventListener('DOMContentLoaded', () => {
    
    // Page Elements
    const navHome = document.getElementById('nav-home');
    const navDashboard = document.getElementById('nav-dashboard');
    const navList = document.getElementById('nav-list');
    
    const viewHome = document.getElementById('view-home');
    const viewDashboard = document.getElementById('view-dashboard');
    const viewList = document.getElementById('view-list');
    const pageTitle = document.getElementById('page-title-text');
    
    // Home View Elements
    const analyzeBtn = document.getElementById('analyze-btn');
    const scanOverlay = document.getElementById('scan-overlay');
    const predictionPanel = document.getElementById('prediction-panel');
    const predictionRows = document.querySelectorAll('.prediction-row');
    const boundingBox = document.getElementById('bounding-box');
    
    // Modal Elements (Save)
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const cancelModalBtn = document.getElementById('cancel-modal-btn');
    const saveDatasetBtn = document.getElementById('save-dataset-btn');
    const operatorNameInput = document.getElementById('operator-name');
    
    const manualClassSelect = document.getElementById('manual-class-select');
    const modalSelectedClass = document.getElementById('modal-selected-class');
    const modalTimestamp = document.getElementById('modal-timestamp');
    const modalDate = document.getElementById('modal-date');
    const currentTimeDisplay = document.getElementById('current-time-display');

    // Detail Modal Elements
    const detailModalOverlay = document.getElementById('detail-modal-overlay');
    const detailModalContent = document.getElementById('detail-modal-content');
    const closeDetailModalBtn = document.getElementById('close-detail-modal-btn');
    const closeDetailModalFooterBtn = document.getElementById('close-detail-modal-footer-btn');
    const deleteDetailImgBtn = document.getElementById('delete-detail-img-btn');

    const detailModalClass = document.getElementById('detail-modal-class');
    const detailModalId = document.getElementById('detail-modal-id');
    const detailModalImg = document.getElementById('detail-modal-img');
    const detailModalOperator = document.getElementById('detail-modal-operator');
    const detailModalTime = document.getElementById('detail-modal-time');
    const detailModalFocus = document.getElementById('detail-modal-focus');
    const detailModalRes = document.getElementById('detail-modal-res');
    const detailModalPath = document.getElementById('detail-modal-path');
    const detailModalStatusBadge = document.getElementById('detail-modal-status-badge');

    let currentDetailItem = null;

    // Data State for Dashboard & Dataset Explorer
    let currentSelectedSource = 'AI Confirmed';
    const burrCounts = {
        T11: 120,
        T12: 95,
        T13: 40,
        BOS: 30
    };

    let recentImages = [
        { image: 'assets/inspection.png', class: 'T11', operator: 'Berk', timestamp: '2026-07-21 14:30', status: 'AI Confirmed' },
        { image: 'assets/inspection.png', class: 'T12', operator: 'Arda', timestamp: '2026-07-21 14:15', status: 'AI Confirmed' },
        { image: 'assets/inspection.png', class: 'T13', operator: 'Caner', timestamp: '2026-07-21 13:45', status: 'Manual Override' },
        { image: 'assets/inspection.png', class: 'BOS', operator: 'Deniz', timestamp: '2026-07-21 12:20', status: 'AI Confirmed' },
        { image: 'assets/inspection.png', class: 'T11', operator: 'Berk', timestamp: '2026-07-21 11:05', status: 'AI Confirmed' }
    ];

    // Dataset Gallery Items (Initial 15 entries)
    let datasetItems = [
        { id: 'IMG_0052', image: 'assets/inspection.png', class: 'T11', operator: 'Berk', timestamp: '2026-07-21 14:30', status: 'AI Confirmed', path: '~/dataset/images/train/T11_0052.jpg', focus: '94.8 / 100', res: '1920x1080 PNG' },
        { id: 'IMG_0051', image: 'assets/inspection.png', class: 'T12', operator: 'Arda', timestamp: '2026-07-21 14:15', status: 'AI Confirmed', path: '~/dataset/images/train/T12_0051.jpg', focus: '91.2 / 100', res: '1920x1080 PNG' },
        { id: 'IMG_0050', image: 'assets/inspection.png', class: 'T13', operator: 'Caner', timestamp: '2026-07-21 13:45', status: 'Manual Override', path: '~/dataset/images/train/T13_0050.jpg', focus: '88.5 / 100', res: '1920x1080 PNG' },
        { id: 'IMG_0049', image: 'assets/inspection.png', class: 'BOS', operator: 'Deniz', timestamp: '2026-07-21 12:20', status: 'AI Confirmed', path: '~/dataset/images/train/BOS_0049.jpg', focus: '96.0 / 100', res: '1920x1080 PNG' },
        { id: 'IMG_0048', image: 'assets/inspection.png', class: 'T11', operator: 'Berk', timestamp: '2026-07-21 11:05', status: 'AI Confirmed', path: '~/dataset/images/train/T11_0048.jpg', focus: '93.4 / 100', res: '1920x1080 PNG' },
        { id: 'IMG_0047', image: 'assets/inspection.png', class: 'T11', operator: 'Ege', timestamp: '2026-07-21 10:40', status: 'AI Confirmed', path: '~/dataset/images/train/T11_0047.jpg', focus: '92.1 / 100', res: '1920x1080 PNG' },
        { id: 'IMG_0046', image: 'assets/inspection.png', class: 'T12', operator: 'Berk', timestamp: '2026-07-21 09:55', status: 'Manual Override', path: '~/dataset/images/train/T12_0046.jpg', focus: '89.7 / 100', res: '1920x1080 PNG' },
        { id: 'IMG_0045', image: 'assets/inspection.png', class: 'T11', operator: 'Arda', timestamp: '2026-07-21 09:15', status: 'AI Confirmed', path: '~/dataset/images/train/T11_0045.jpg', focus: '95.3 / 100', res: '1920x1080 PNG' },
        { id: 'IMG_0044', image: 'assets/inspection.png', class: 'T13', operator: 'Deniz', timestamp: '2026-07-20 17:30', status: 'AI Confirmed', path: '~/dataset/images/train/T13_0044.jpg', focus: '90.6 / 100', res: '1920x1080 PNG' },
        { id: 'IMG_0043', image: 'assets/inspection.png', class: 'BOS', operator: 'Caner', timestamp: '2026-07-20 16:45', status: 'AI Confirmed', path: '~/dataset/images/train/BOS_0043.jpg', focus: '97.1 / 100', res: '1920x1080 PNG' },
        { id: 'IMG_0042', image: 'assets/inspection.png', class: 'T11', operator: 'Berk', timestamp: '2026-07-20 15:10', status: 'AI Confirmed', path: '~/dataset/images/train/T11_0042.jpg', focus: '94.2 / 100', res: '1920x1080 PNG' },
        { id: 'IMG_0041', image: 'assets/inspection.png', class: 'T12', operator: 'Ege', timestamp: '2026-07-20 14:25', status: 'AI Confirmed', path: '~/dataset/images/train/T12_0041.jpg', focus: '91.8 / 100', res: '1920x1080 PNG' },
        { id: 'IMG_0040', image: 'assets/inspection.png', class: 'T11', operator: 'Arda', timestamp: '2026-07-20 13:00', status: 'Manual Override', path: '~/dataset/images/train/T11_0040.jpg', focus: '87.9 / 100', res: '1920x1080 PNG' },
        { id: 'IMG_0039', image: 'assets/inspection.png', class: 'T13', operator: 'Berk', timestamp: '2026-07-20 11:40', status: 'AI Confirmed', path: '~/dataset/images/train/T13_0039.jpg', focus: '93.0 / 100', res: '1920x1080 PNG' },
        { id: 'IMG_0038', image: 'assets/inspection.png', class: 'BOS', operator: 'Deniz', timestamp: '2026-07-20 10:15', status: 'AI Confirmed', path: '~/dataset/images/train/BOS_0038.jpg', focus: '98.4 / 100', res: '1920x1080 PNG' }
    ];

    // Gallery Filter & Pagination State
    let galleryClassFilter = 'ALL';
    let galleryStatusFilter = 'ALL';
    let gallerySearchQuery = '';
    let currentPage = 1;
    const itemsPerPage = 10;

    // --- LIVE CLOCK ---
    setInterval(() => {
        const now = new Date();
        currentTimeDisplay.textContent = now.toLocaleTimeString('tr-TR', { hour12: false });
    }, 1000);

    // --- NAVIGATION LOGIC ---
    function switchTab(target) {
        // Reset all views
        viewHome.classList.add('hidden');
        viewDashboard.classList.add('hidden');
        if (viewList) viewList.classList.add('hidden');

        // Reset sidebar button styles
        const inactiveBtnStyle = 'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-all border border-transparent text-left cursor-pointer';
        const activeBtnStyle = 'w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-zinc-800/50 text-emerald-400 font-medium transition-all border border-zinc-700/50 shadow-inner text-left cursor-pointer';

        navHome.className = inactiveBtnStyle;
        navDashboard.className = inactiveBtnStyle;
        if (navList) navList.className = inactiveBtnStyle;

        if (target === 'home') {
            viewHome.classList.remove('hidden');
            navHome.className = activeBtnStyle;
            if (pageTitle) pageTitle.textContent = 'Burr Detection & Dataset Labeling';
        } else if (target === 'dashboard') {
            viewDashboard.classList.remove('hidden');
            navDashboard.className = activeBtnStyle;
            if (pageTitle) pageTitle.textContent = 'Dashboard & Statistics';
        } else if (target === 'list') {
            if (viewList) viewList.classList.remove('hidden');
            if (navList) navList.className = activeBtnStyle;
            if (pageTitle) pageTitle.textContent = 'Dataset Gallery & Training Explorer';
            renderGallery();
        }
    }

    navHome.addEventListener('click', () => switchTab('home'));
    navDashboard.addEventListener('click', () => switchTab('dashboard'));
    if (navList) navList.addEventListener('click', () => switchTab('list'));

    // --- RECENT IMAGES TABLE RENDER ---
    function renderRecentImagesTable() {
        const tbody = document.getElementById('recent-images-tbody');
        if (!tbody) return;

        tbody.innerHTML = '';

        recentImages.slice(0, 5).forEach(item => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-zinc-900/50 transition-colors border-b border-zinc-800/40 last:border-0';

            // Class Badge Logic
            let classBadgeHtml = '';
            if (item.class === 'T11') {
                classBadgeHtml = `<span class="px-3 py-1 rounded-md text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">T11</span>`;
            } else if (item.class === 'T12') {
                classBadgeHtml = `<span class="px-3 py-1 rounded-md text-xs font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">T12</span>`;
            } else if (item.class === 'T13') {
                classBadgeHtml = `<span class="px-3 py-1 rounded-md text-xs font-mono font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">T13</span>`;
            } else {
                classBadgeHtml = `<span class="px-3 py-1 rounded-md text-xs font-mono font-bold bg-slate-500/15 text-slate-300 border border-slate-500/30">${item.class}</span>`;
            }

            // Status Badge Logic
            let statusBadgeHtml = '';
            if (item.status === 'AI Confirmed') {
                statusBadgeHtml = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><i class="ph ph-check-circle text-sm"></i> AI Confirmed</span>`;
            } else {
                statusBadgeHtml = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20"><i class="ph ph-user-gear text-sm"></i> Manual Override</span>`;
            }

            const initial = item.operator ? item.operator.charAt(0).toUpperCase() : 'O';

            tr.innerHTML = `
                <td class="py-3.5 px-5">
                    <div class="w-14 h-10 rounded-lg overflow-hidden border border-zinc-700/80 bg-zinc-900 group shrink-0 relative shadow-inner">
                        <img src="${item.image}" alt="Captured Burr" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
                    </div>
                </td>
                <td class="py-3.5 px-5 font-medium">
                    ${classBadgeHtml}
                </td>
                <td class="py-3.5 px-5">
                    <div class="flex items-center gap-2 font-medium text-zinc-200">
                        <div class="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs text-zinc-400 font-mono">${initial}</div>
                        <span>${item.operator}</span>
                    </div>
                </td>
                <td class="py-3.5 px-5 font-mono text-xs text-zinc-400">
                    ${item.timestamp}
                </td>
                <td class="py-3.5 px-5">
                    ${statusBadgeHtml}
                </td>
            `;

            tbody.appendChild(tr);
        });
    }

    // --- DATASET GALLERY LOGIC ---
    const galleryClassFilterElem = document.getElementById('gallery-class-filter');
    const galleryStatusFilterElem = document.getElementById('gallery-status-filter');
    const gallerySearchInputElem = document.getElementById('gallery-search-input');
    const galleryTotalCountElem = document.getElementById('gallery-total-count');
    const galleryGridElem = document.getElementById('gallery-grid');
    const paginationInfoElem = document.getElementById('pagination-info');
    const currentPageNumElem = document.getElementById('current-page-num');
    const totalPageNumElem = document.getElementById('total-page-num');
    const pagePrevBtn = document.getElementById('page-prev-btn');
    const pageNextBtn = document.getElementById('page-next-btn');

    if (galleryClassFilterElem) {
        galleryClassFilterElem.addEventListener('change', (e) => {
            galleryClassFilter = e.target.value;
            currentPage = 1;
            renderGallery();
        });
    }

    if (galleryStatusFilterElem) {
        galleryStatusFilterElem.addEventListener('change', (e) => {
            galleryStatusFilter = e.target.value;
            currentPage = 1;
            renderGallery();
        });
    }

    if (gallerySearchInputElem) {
        gallerySearchInputElem.addEventListener('input', (e) => {
            gallerySearchQuery = e.target.value.trim().toLowerCase();
            currentPage = 1;
            renderGallery();
        });
    }

    if (pagePrevBtn) {
        pagePrevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderGallery();
            }
        });
    }

    if (pageNextBtn) {
        pageNextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(getFilteredDataset().length / itemsPerPage) || 1;
            if (currentPage < totalPages) {
                currentPage++;
                renderGallery();
            }
        });
    }

    function getFilteredDataset() {
        return datasetItems.filter(item => {
            // Class Filter
            if (galleryClassFilter !== 'ALL' && item.class !== galleryClassFilter) return false;
            // Status Filter
            if (galleryStatusFilter !== 'ALL') {
                if (galleryStatusFilter === 'AI Confirmed' && item.status !== 'AI Confirmed') return false;
                if (galleryStatusFilter === 'Manual Override' && item.status !== 'Manual Override') return false;
            }
            // Search Query
            if (gallerySearchQuery) {
                const matchId = item.id.toLowerCase().includes(gallerySearchQuery);
                const matchOp = item.operator.toLowerCase().includes(gallerySearchQuery);
                const matchClass = item.class.toLowerCase().includes(gallerySearchQuery);
                if (!matchId && !matchOp && !matchClass) return false;
            }
            return true;
        });
    }

    function renderGallery() {
        if (!galleryGridElem) return;

        const filtered = getFilteredDataset();
        const totalItems = filtered.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

        if (currentPage > totalPages) currentPage = totalPages;

        // Counter Badges
        if (galleryTotalCountElem) galleryTotalCountElem.textContent = `${totalItems} Görsel`;
        if (paginationInfoElem) paginationInfoElem.textContent = `Toplam ${totalItems} görsel içerisinden ${(currentPage-1)*itemsPerPage + 1}-${Math.min(currentPage*itemsPerPage, totalItems)} arası gösteriliyor`;
        if (currentPageNumElem) currentPageNumElem.textContent = currentPage;
        if (totalPageNumElem) totalPageNumElem.textContent = totalPages;

        if (pagePrevBtn) pagePrevBtn.disabled = (currentPage <= 1);
        if (pageNextBtn) pageNextBtn.disabled = (currentPage >= totalPages);

        galleryGridElem.innerHTML = '';

        if (totalItems === 0) {
            galleryGridElem.innerHTML = `
                <div class="col-span-full py-16 text-center text-zinc-500 bg-zinc-900/40 border border-dashed border-zinc-800 rounded-2xl">
                    <i class="ph ph-folder-open text-4xl mb-2 block"></i>
                    <p class="text-sm font-medium">Arama kriterlerine uygun görsel bulunamadı.</p>
                </div>
            `;
            return;
        }

        const startIndex = (currentPage - 1) * itemsPerPage;
        const pageItems = filtered.slice(startIndex, startIndex + itemsPerPage);

        pageItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'bg-zinc-900 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-lg hover:border-emerald-500/40 transition-all duration-300 group flex flex-col relative';

            let classBadgeClass = '';
            if (item.class === 'T11') classBadgeClass = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
            else if (item.class === 'T12') classBadgeClass = 'bg-amber-500/20 text-amber-400 border-amber-500/40';
            else if (item.class === 'T13') classBadgeClass = 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40';
            else classBadgeClass = 'bg-slate-500/20 text-slate-300 border-slate-500/40';

            const statusDot = (item.status === 'AI Confirmed') 
                ? `<span class="w-2 h-2 rounded-full bg-emerald-400" title="AI Confirmed"></span>` 
                : `<span class="w-2 h-2 rounded-full bg-amber-400" title="Manual Override"></span>`;

            card.innerHTML = `
                <!-- Image Header Area -->
                <div class="w-full h-40 bg-zinc-950 relative overflow-hidden cursor-pointer img-card-click">
                    <img src="${item.image}" alt="${item.id}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    
                    <!-- Top Badges -->
                    <div class="absolute top-2.5 left-2.5 flex items-center gap-2">
                        <span class="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold border backdrop-blur-md ${classBadgeClass}">${item.class}</span>
                    </div>

                    <div class="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-zinc-800 text-[10px] font-mono text-zinc-300">
                        ${statusDot}
                        <span>${item.id}</span>
                    </div>

                    <!-- Overlay Icon on hover -->
                    <div class="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div class="w-10 h-10 rounded-full bg-zinc-900/90 text-emerald-400 flex items-center justify-center shadow-lg border border-emerald-500/30 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            <i class="ph ph-magnifying-glass-plus text-xl"></i>
                        </div>
                    </div>
                </div>

                <!-- Content Body -->
                <div class="p-3.5 flex flex-col gap-2.5 flex-1 bg-zinc-900">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2 text-xs text-zinc-300 font-medium">
                            <div class="w-5 h-5 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] text-zinc-400 font-mono">
                                ${item.operator ? item.operator.charAt(0).toUpperCase() : 'O'}
                            </div>
                            <span>${item.operator}</span>
                        </div>
                        <span class="text-[11px] font-mono text-zinc-500">${item.timestamp.split(' ')[1]}</span>
                    </div>

                    <div class="flex items-center justify-between border-t border-zinc-800/60 pt-2.5 mt-auto">
                        <span class="text-[11px] font-mono text-zinc-500 truncate max-w-[110px]" title="${item.path}">${item.path.split('/').pop()}</span>
                        
                        <!-- Quick Actions -->
                        <div class="flex items-center gap-1">
                            <button class="w-7 h-7 rounded-lg bg-zinc-800/80 hover:bg-emerald-500/20 text-zinc-400 hover:text-emerald-400 transition-colors flex items-center justify-center btn-view-detail cursor-pointer" title="Detay / Düzenle">
                                <i class="ph ph-note-pencil text-sm"></i>
                            </button>
                            <button class="w-7 h-7 rounded-lg bg-zinc-800/80 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors flex items-center justify-center btn-delete-card cursor-pointer" title="Sil">
                                <i class="ph ph-trash text-sm"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;

            // Card Click Events
            card.querySelector('.img-card-click').addEventListener('click', () => openDetailModal(item));
            card.querySelector('.btn-view-detail').addEventListener('click', (e) => {
                e.stopPropagation();
                openDetailModal(item);
            });

            card.querySelector('.btn-delete-card').addEventListener('click', (e) => {
                e.stopPropagation();
                deleteDatasetItem(item.id);
            });

            galleryGridElem.appendChild(card);
        });
    }

    // --- DETAIL MODAL LOGIC ---
    function openDetailModal(item) {
        currentDetailItem = item;

        detailModalId.textContent = item.id;
        detailModalClass.textContent = item.class;
        detailModalImg.src = item.image;
        detailModalOperator.innerHTML = `<i class="ph ph-user text-emerald-400"></i> ${item.operator}`;
        detailModalTime.innerHTML = `<i class="ph ph-calendar-blank text-emerald-400"></i> ${item.timestamp}`;
        detailModalFocus.innerHTML = `<i class="ph ph-sparkle"></i> ${item.focus}`;
        detailModalRes.innerHTML = `<i class="ph ph-frame-corners"></i> ${item.res}`;
        detailModalPath.textContent = item.path;
        detailModalStatusBadge.textContent = item.status;

        // Class badge styling
        detailModalClass.className = 'px-3 py-1 rounded-md text-xs font-mono font-bold border';
        if (item.class === 'T11') detailModalClass.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/30');
        else if (item.class === 'T12') detailModalClass.classList.add('bg-amber-500/20', 'text-amber-400', 'border-amber-500/30');
        else if (item.class === 'T13') detailModalClass.classList.add('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/30');
        else detailModalClass.classList.add('bg-slate-500/20', 'text-slate-300', 'border-slate-500/30');

        detailModalOverlay.classList.remove('opacity-0', 'pointer-events-none');
        setTimeout(() => {
            detailModalContent.classList.remove('scale-95');
            detailModalContent.classList.add('scale-100');
        }, 10);
    }

    function closeDetailModal() {
        detailModalContent.classList.remove('scale-100');
        detailModalContent.classList.add('scale-95');
        setTimeout(() => {
            detailModalOverlay.classList.add('opacity-0', 'pointer-events-none');
            currentDetailItem = null;
        }, 200);
    }

    if (closeDetailModalBtn) closeDetailModalBtn.addEventListener('click', closeDetailModal);
    if (closeDetailModalFooterBtn) closeDetailModalFooterBtn.addEventListener('click', closeDetailModal);
    if (detailModalOverlay) {
        detailModalOverlay.addEventListener('click', (e) => {
            if (e.target === detailModalOverlay) closeDetailModal();
        });
    }

    if (deleteDetailImgBtn) {
        deleteDetailImgBtn.addEventListener('click', () => {
            if (currentDetailItem) {
                deleteDatasetItem(currentDetailItem.id);
                closeDetailModal();
            }
        });
    }

    function deleteDatasetItem(id) {
        const itemToDelete = datasetItems.find(i => i.id === id);
        if (!itemToDelete) return;

        // Decrement class count
        if (burrCounts[itemToDelete.class] && burrCounts[itemToDelete.class] > 0) {
            burrCounts[itemToDelete.class] -= 1;
        }

        // Remove from datasetItems & recentImages
        datasetItems = datasetItems.filter(i => i.id !== id);
        recentImages = recentImages.filter(i => i.id !== id);

        renderGallery();
        renderRecentImagesTable();
    }

    // --- ANALYZE ACTION ---
    analyzeBtn.addEventListener('click', () => {
        analyzeBtn.disabled = true;
        analyzeBtn.innerHTML = '<i class="ph ph-spinner-gap animate-spin text-2xl"></i> Analiz Ediliyor...';
        
        scanOverlay.style.transition = 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        scanOverlay.style.transform = 'translateY(-100%)';
        
        setTimeout(() => {
            scanOverlay.style.transform = 'translateY(100%)';
            scanOverlay.style.transition = 'none';
        }, 1500);

        setTimeout(() => {
            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = '<i class="ph ph-scan text-2xl"></i> Çapağı Analiz Et';
            
            predictionPanel.classList.remove('opacity-50', 'translate-x-4', 'pointer-events-none');
            predictionPanel.classList.add('opacity-100', 'translate-x-0');
            
            boundingBox.classList.remove('hidden');

            predictionRows.forEach((row, index) => {
                setTimeout(() => {
                    row.classList.remove('hidden');
                    row.style.animation = 'slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                }, index * 100);
            });
            
        }, 1500);
    });

    // --- ROW & MANUAL SELECTION ---
    document.querySelectorAll('.prediction-row[data-class]').forEach(row => {
        row.addEventListener('click', () => {
            const selectedClass = row.getAttribute('data-class');
            currentSelectedSource = 'AI Confirmed';
            openModal(selectedClass);
        });
    });

    manualClassSelect.addEventListener('change', (e) => {
        if(e.target.value) {
            currentSelectedSource = 'Manual Override';
            openModal(e.target.value);
            setTimeout(() => e.target.selectedIndex = 0, 500); 
        }
    });

    // --- SAVE MODAL LOGIC ---
    function openModal(className) {
        const now = new Date();
        modalSelectedClass.textContent = className;
        modalTimestamp.textContent = now.toLocaleTimeString('tr-TR', { hour12: false });
        modalDate.textContent = now.toLocaleDateString('tr-TR');
        
        modalSelectedClass.className = 'px-3 py-1 border rounded-md font-mono font-bold text-lg';
        if(className === 'T11') {
            modalSelectedClass.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/30');
        } else if(className === 'T12') {
            modalSelectedClass.classList.add('bg-amber-500/20', 'text-amber-400', 'border-amber-500/30');
        } else if(className === 'T13') {
            modalSelectedClass.classList.add('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/30');
        } else {
            modalSelectedClass.classList.add('bg-zinc-500/20', 'text-zinc-300', 'border-zinc-500/30');
        }

        modalOverlay.classList.remove('opacity-0', 'pointer-events-none');
        setTimeout(() => {
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }, 10);
    }

    function closeModal() {
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
        setTimeout(() => {
            modalOverlay.classList.add('opacity-0', 'pointer-events-none');
        }, 200);
    }

    closeModalBtn.addEventListener('click', closeModal);
    cancelModalBtn.addEventListener('click', closeModal);
    
    modalOverlay.addEventListener('click', (e) => {
        if(e.target === modalOverlay) closeModal();
    });

    // --- SAVE TO DATASET LOGIC ---
    saveDatasetBtn.addEventListener('click', () => {
        const originalText = saveDatasetBtn.innerHTML;
        saveDatasetBtn.disabled = true;
        saveDatasetBtn.innerHTML = '<i class="ph ph-spinner-gap animate-spin"></i> Kaydediliyor...';
        
        const selectedClass = modalSelectedClass.textContent || 'T11';
        let opName = operatorNameInput.value.trim();
        if (!opName) opName = 'Berk';

        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const newId = `IMG_00${datasetItems.length + 50}`;

        setTimeout(() => {
            saveDatasetBtn.innerHTML = '<i class="ph ph-check"></i> Başarılı!';
            saveDatasetBtn.classList.replace('bg-emerald-600', 'bg-emerald-500');
            
            const newRecord = {
                id: newId,
                image: 'assets/inspection.png',
                class: selectedClass,
                operator: opName,
                timestamp: formattedDate,
                status: currentSelectedSource,
                path: `~/dataset/images/train/${selectedClass}_${newId}.jpg`,
                focus: '95.1 / 100',
                res: '1920x1080 PNG'
            };

            // Add entry to Recent Images & Dataset Items list
            recentImages.unshift(newRecord);
            datasetItems.unshift(newRecord);

            // Increment Count
            if (burrCounts[selectedClass] !== undefined) {
                burrCounts[selectedClass] += 1;
            } else {
                burrCounts[selectedClass] = 1;
            }

            // Update UI
            renderRecentImagesTable();
            renderGallery();

            setTimeout(() => {
                closeModal();
                
                setTimeout(() => {
                    saveDatasetBtn.disabled = false;
                    saveDatasetBtn.innerHTML = originalText;
                }, 300);

                predictionPanel.classList.add('opacity-50', 'translate-x-4', 'pointer-events-none');
                predictionPanel.classList.remove('opacity-100', 'translate-x-0');
                boundingBox.classList.add('hidden');
                
                predictionRows.forEach(row => {
                    row.classList.add('hidden');
                    row.style.animation = 'none';
                });
                
            }, 1000);
        }, 800);
    });

    // Initial table render
    renderRecentImagesTable();
});
