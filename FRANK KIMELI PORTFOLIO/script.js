// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const uploadBox = document.getElementById('uploadBox');
const browseBtn = document.getElementById('browseBtn');
const fileInput = document.getElementById('fileInput');
const uploadedFiles = document.getElementById('uploadedFiles');
const filesList = uploadedFiles.querySelector('.files-list');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const backToTopBtn = document.getElementById('backToTop');
const header = document.querySelector('.header');
const contactForm = document.getElementById('contactForm');
const educationItems = document.querySelectorAll('.education-item');
const skills = document.querySelectorAll('.skill');
const skillTags = document.querySelectorAll('.skill-tag');

// Initialize loading screen
window.addEventListener('load', function() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loading);
    
    setTimeout(() => {
        loading.classList.add('hidden');
        setTimeout(() => {
            document.body.removeChild(loading);
            // Trigger animations for elements
            animateOnScroll();
        }, 500);
    }, 1000);
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
        
        // Update active link
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

// Portfolio Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(item => item.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.add('visible');
                }, 10);
            } else {
                item.classList.remove('visible');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// File Upload Functionality
browseBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', handleFileUpload);

uploadBox.addEventListener('click', () => {
    fileInput.click();
});

// Drag and Drop functionality
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadBox.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    uploadBox.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    uploadBox.addEventListener(eventName, unhighlight, false);
});

function highlight() {
    uploadBox.classList.add('dragover');
}

function unhighlight() {
    uploadBox.classList.remove('dragover');
}

uploadBox.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
}

function handleFileUpload() {
    const files = fileInput.files;
    handleFiles(files);
}

function handleFiles(files) {
    if (files.length > 0) {
        // Clear the "no files" message
        if (filesList.querySelector('p')) {
            filesList.innerHTML = '';
        }
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            // Check file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
                continue;
            }
            
            // Check file type
            const validTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/zip'];
            if (!validTypes.includes(file.type)) {
                alert(`File "${file.name}" is not a supported format.`);
                continue;
            }
            
            addFileToList(file);
        }
        
        // Reset file input
        fileInput.value = '';
    }
}

function addFileToList(file) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    
    const fileSize = formatFileSize(file.size);
    const fileIcon = getFileIcon(file.type);
    
    fileItem.innerHTML = `
        <div class="file-info">
            <i class="fas ${fileIcon} file-icon"></i>
            <div>
                <div class="file-name">${file.name}</div>
                <div class="file-size">${fileSize}</div>
            </div>
        </div>
        <button class="file-remove" title="Remove file">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    filesList.appendChild(fileItem);
    
    // Add remove functionality
    const removeBtn = fileItem.querySelector('.file-remove');
    removeBtn.addEventListener('click', () => {
        fileItem.style.opacity = '0';
        fileItem.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            filesList.removeChild(fileItem);
            
            // Show "no files" message if list is empty
            if (filesList.children.length === 0) {
                filesList.innerHTML = '<p>No files uploaded yet. Upload your work to showcase it here.</p>';
            }
        }, 300);
    });
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getFileIcon(fileType) {
    if (fileType.startsWith('image/')) return 'fa-file-image';
    if (fileType === 'application/pdf') return 'fa-file-pdf';
    if (fileType === 'application/zip') return 'fa-file-archive';
    return 'fa-file';
}

// Animate skill progress bars on scroll
function animateSkillBars() {
    skillProgressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
}

// Scroll animations
function animateOnScroll() {
    // Animate education items
    educationItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 200);
    });
    
    // Animate skills
    skills.forEach((skill, index) => {
        setTimeout(() => {
            skill.classList.add('visible');
        }, index * 100);
    });
    
    // Animate skill tags
    skillTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.classList.add('visible');
        }, index * 100);
    });
    
    // Animate portfolio items
    portfolioItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 150);
    });
    
    // Animate skill bars after a delay
    setTimeout(animateSkillBars, 500);
}

// Header scroll effect
window.addEventListener('scroll', () => {
    // Header background on scroll
    if (window.scrollY > 50) {
        header.classList.add