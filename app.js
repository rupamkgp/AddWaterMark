/**
 * Main Application Logic for AddWatermark
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const uploadOverlay = document.getElementById('upload-overlay');
    const workspaceContainer = document.getElementById('workspace-container');
    const canvasEl = document.getElementById('preview-canvas');

    // Sidebar Elements
    const deviceListContainer = document.getElementById('device-list-container');
    const deviceSearch = document.getElementById('device-search');
    const mobileDeviceSelect = document.getElementById('mobile-device-select');

    // Controls Elements
    const ownerNameInput = document.getElementById('owner-name');
    const posButtons = document.querySelectorAll('[data-pos]');
    const paramSize = document.getElementById('param-size');
    const paramMargin = document.getElementById('param-margin');
    const paramOpacity = document.getElementById('param-opacity');

    const valSize = document.getElementById('size-val');
    const valMargin = document.getElementById('margin-val');
    const valOpacity = document.getElementById('opacity-val');

    const btnExport = document.getElementById('btn-export');
    const selectFormat = document.getElementById('export-format');

    // --- State ---
    const engine = new WatermarkEngine(canvasEl);
    let activeDeviceId = DEVICELIST[0].id;
    let activePos = 'bottom-left';

    // --- Page Context Auto-Selection ---
    const pageContextEl = document.getElementById('page-context');
    if (pageContextEl && pageContextEl.textContent.trim() !== '{{PAGE_CONTEXT}}' && pageContextEl.textContent.trim() !== '') {
        const contextStr = pageContextEl.textContent.trim().toLowerCase();
        // Look for exact device match first, then brand match
        const exactMatch = DEVICELIST.find(d => d.name.toLowerCase() === contextStr);
        const brandMatch = DEVICELIST.find(d => d.brand.toLowerCase() === contextStr);

        if (exactMatch) {
            activeDeviceId = exactMatch.id;
        } else if (brandMatch) {
            activeDeviceId = brandMatch.id;
        }
    }

    // --- Theme Management ---
    themeToggle.addEventListener('click', () => {
        htmlEl.classList.toggle('dark');
        // Save preference could be added here
    });

    // --- Initialization ---
    initDeviceList();

    // --- Device Selection Logic ---
    function initDeviceList() {
        renderDeviceList(DEVICELIST);

        // Populate Mobile Dropdown
        const grouped = getDevicesByBrand();
        Object.keys(grouped).forEach(brand => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = brand;
            grouped[brand].forEach(device => {
                const opt = document.createElement('option');
                opt.value = device.id;
                opt.textContent = device.name;
                if (device.id === activeDeviceId) opt.selected = true;
                optgroup.appendChild(opt);
            });
            mobileDeviceSelect.appendChild(optgroup);
        });

        mobileDeviceSelect.addEventListener('change', (e) => {
            const selectedId = e.target.value;
            const device = DEVICELIST.find(d => d.id === selectedId);
            if (device) {
                activeDeviceId = device.id;
                engine.updateSetting('device', device);
                renderDeviceList(DEVICELIST); // Sync desktop visual state
            }
        });

        // Search functionality
        deviceSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = DEVICELIST.filter(d =>
                d.name.toLowerCase().includes(query) ||
                d.brand.toLowerCase().includes(query)
            );
            renderDeviceList(filtered);
        });
    }

    function renderDeviceList(list) {
        deviceListContainer.innerHTML = '';

        if (list.length === 0) {
            deviceListContainer.innerHTML = '<p class="text-gray-500 text-sm italic text-center py-4">No devices found</p>';
            return;
        }

        const grouped = getDevicesByBrand(); // Defined in devices.js

        // Only render categories that have matching items when searching
        Object.keys(grouped).forEach(brand => {
            const matchingItems = grouped[brand].filter(d => list.some(l => l.id === d.id));
            if (matchingItems.length === 0) return;

            // Brand Header
            const brandHeader = document.createElement('h3');
            brandHeader.className = 'text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-4';
            brandHeader.innerText = brand;
            deviceListContainer.appendChild(brandHeader);

            // Item Buttons
            matchingItems.forEach(device => {
                const btn = document.createElement('button');
                const isActive = device.id === activeDeviceId;

                // Dynamic styling based on active state
                let baseClasses = 'device-item w-full text-left p-3 rounded-xl mb-2 flex items-center justify-between group ';
                let stateClasses = isActive
                    ? 'bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800 ring-1 ring-blue-500'
                    : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600';

                btn.className = baseClasses + stateClasses;
                btn.dataset.deviceId = device.id;

                btn.innerHTML = `
                    <div class="flex flex-col">
                        <span class="font-medium text-sm ${isActive ? 'text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-gray-100'}">${device.name}</span>
                        <span class="text-[10px] text-gray-500 mt-1">${device.specs}</span>
                    </div>
                    ${isActive ? '<i data-lucide="check-circle-2" class="w-4 h-4 text-blue-500"></i>' : ''}
                `;

                btn.addEventListener('click', () => {
                    activeDeviceId = device.id;
                    engine.updateSetting('device', device);
                    if (mobileDeviceSelect) mobileDeviceSelect.value = device.id; // Sync mobile select
                    renderDeviceList(DEVICELIST); // Re-render list to update active UI state
                    lucide.createIcons(); // Re-init icons for the new active tick
                });

                deviceListContainer.appendChild(btn);
            });
        });

        lucide.createIcons();
    }

    // --- Upload Handlers ---
    function handleFile(file) {
        if (!file) return;

        // Basic validation
        if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
            alert("Only JPG and PNG images are supported.");
            return;
        }
        if (file.size > 35 * 1024 * 1024) {
            alert("Image size exceeds 35MB limit.");
            return;
        }

        // Show loading state (could be improved visually)
        dropZone.querySelector('h3').innerText = "Processing...";

        engine.loadImage(file).then(() => {
            // Hide overlay, show workspace and enable buttons
            uploadOverlay.classList.add('hidden');
            workspaceContainer.classList.remove('hidden');
            workspaceContainer.classList.add('flex');
            btnExport.disabled = false;
        }).catch(err => {
            alert("Error loading image.");
            console.error(err);
            dropZone.querySelector('h3').innerText = "Upload your photo";
        });
    }

    // Drag & Drop events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.add('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900/20');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900/20');
        }, false);
    });

    dropZone.addEventListener('drop', (e) => {
        const file = e.dataTransfer.files[0];
        handleFile(file);
    });

    // Click to upload
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        handleFile(file);
    });

    // --- Control Handlers ---

    // Custom Text
    ownerNameInput.addEventListener('input', (e) => {
        engine.updateSetting('ownerName', e.target.value.trim());
    });

    // Position Buttons
    posButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active classes
            posButtons.forEach(b => {
                b.classList.remove('border-blue-500', 'bg-blue-50', 'text-blue-600', 'dark:bg-blue-900/20', 'dark:text-blue-400');
                b.classList.add('border-gray-200', 'text-gray-900', 'dark:border-gray-700', 'dark:text-white', 'hover:bg-gray-50', 'dark:hover:bg-gray-800');
            });

            // Add active classes to clicked
            const target = e.currentTarget;
            target.classList.remove('border-gray-200', 'text-gray-900', 'dark:border-gray-700', 'dark:text-white', 'hover:bg-gray-50', 'dark:hover:bg-gray-800');
            target.classList.add('border-blue-500', 'bg-blue-50', 'text-blue-600', 'dark:bg-blue-900/20', 'dark:text-blue-400');

            const pos = target.dataset.pos;
            activePos = pos;
            engine.updateSetting('position', pos);
        });
    });

    // Sliders
    paramSize.addEventListener('input', (e) => {
        const val = e.target.value;
        valSize.innerText = val + '%';
        engine.updateSetting('size', parseInt(val));
    });

    paramMargin.addEventListener('input', (e) => {
        const val = e.target.value;
        valMargin.innerText = val + 'px';
        engine.updateSetting('margin', parseInt(val));
    });

    paramOpacity.addEventListener('input', (e) => {
        const val = e.target.value;
        valOpacity.innerText = val + '%';
        engine.updateSetting('opacity', parseInt(val));
    });

    // --- Export Logic ---
    btnExport.addEventListener('click', async () => {
        btnExport.disabled = true;
        const originalText = btnExport.innerHTML;
        btnExport.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Processing...';
        lucide.createIcons();

        // Adding a slight timeout to allow UI update before heavy encode
        await new Promise(r => setTimeout(r, 100));

        try {
            const formatStr = selectFormat.value === 'jpeg' ? 'image/jpeg' : 'image/png';
            const blob = await engine.getExportBlob(formatStr);

            // Create temporary download link
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `addwatermark_${engine.settings.device.id}_${Date.now()}.${selectFormat.value}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            setTimeout(() => URL.revokeObjectURL(url), 1000);

            // Simulate export usage (mock monetisation logic)
            const usageEl = document.querySelector('.text-green-600');
            if (usageEl) {
                const currentParts = usageEl.innerText.split('/');
                let current = parseInt(currentParts[0]);
                if (current > 0) {
                    current--;
                    usageEl.innerText = `${current}/5`;
                    if (current === 0) {
                        usageEl.classList.remove('text-green-600', 'dark:text-green-400');
                        usageEl.classList.add('text-red-500');
                    }
                } else {
                    alert("You've reached your daily limit! Upgrade to Pro for unlimited exports.");
                }
            }
        } catch (err) {
            console.error(err);
            alert("Failed to export image. Try a smaller file or different browser.");
        } finally {
            btnExport.innerHTML = originalText;
            btnExport.disabled = false;
            lucide.createIcons();
        }
    });

});
