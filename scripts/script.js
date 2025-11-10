// scripts/script.js

// ===== ОБЩИЕ ФУНКЦИИ ДЛЯ ВСЕХ СТРАНИЦ =====

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
    initProgressBars();
    initModalHandlers();
    adaptLayoutForMobile();
});

// ===== LAZY LOADING =====
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback для старых браузеров
        lazyImages.forEach(img => img.classList.add('loaded'));
    }
}

// ===== ПРОГРЕСС-БАРЫ =====
function initProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    
    progressFills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0';
        
        setTimeout(() => {
            fill.style.width = width;
        }, 300);
    });
}

// ===== МОДАЛЬНЫЕ ОКНА =====
function initModalHandlers() {
    // Глобальные обработчики для закрытия
    window.addEventListener('click', handleModalClick);
    document.addEventListener('keydown', handleModalKeydown);
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.scrollTop = 0;
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function handleModalClick(event) {
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals) {
        if (event.target === modal) {
            closeModal(modal.id);
        }
    }
    
    const imageModal = document.getElementById('imageModal');
    if (event.target === imageModal) {
        closeImageModal();
    }
}

function handleModalKeydown(event) {
    if (event.key === 'Escape') {
        const modals = document.getElementsByClassName('modal');
        for (let modal of modals) {
            if (modal.style.display === 'block') {
                closeModal(modal.id);
            }
        }
        
        const imageModal = document.getElementById('imageModal');
        if (imageModal && imageModal.style.display === 'block') {
            closeImageModal();
        }
    }
}

// ===== МОДАЛЬНЫЕ ОКНА ДЛЯ ИЗОБРАЖЕНИЙ =====
function openImageModal(imageType) {
    const imageModal = document.getElementById('imageModal');
    const fullImage = document.getElementById('fullSizeImage');
    const caption = document.getElementById('imageCaption');
    
    const images = {
        // Портфолио
        'portfolio1': {
            src: '../images/icons/sitepict1.png',
            text: 'Главная страница портфолио'
        },
        'portfolio2': {
            src: '../images/icons/sitepict2.png', 
            text: 'Раздел ознакомления'
        },
        'portfolio3': {
            src: '../images/icons/sitepict3.png',
            text: 'Раздел проектов'
        },
        
        // Шахматы
        'chess1': {
            src: '../images/icons/chesspict1.png',
            text: 'Игровое поле шахмат'
        },
        'chess2': {
            src: '../images/icons/chesspict2.png',
            text: 'Система ходов и правил'
        },
        'chess3': {
            src: '../images/icons/chesspict3.png',
            text: 'Вариации ходов'
        },
        
        // Генератор паролей
        'password1': {
            src: '../images/icons/passpic1.png',
            text: 'Главный интерфейс генератора паролей'
        },
        'password2': {
            src: '../images/icons/passpic2.png',
            text: 'Настройки генерации пароля'
        },
        'password3': {
            src: '../images/icons/passpic3.png',
            text: 'Генератор случайного числа'
        }
    };
    
    if (images[imageType] && fullImage && caption) {
        fullImage.src = images[imageType].src;
        caption.textContent = images[imageType].text;
        imageModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeImageModal() {
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ===== АДАПТИВНОСТЬ =====
function adaptLayoutForMobile() {
    adaptModalsForMobile();
    adaptNavigationForMobile();
}

function adaptModalsForMobile() {
    const modals = document.querySelectorAll('.modal-content');
    const isMobile = window.innerWidth <= 768;
    
    modals.forEach(modal => {
        if (isMobile) {
            modal.style.margin = '2% auto';
            modal.style.maxHeight = '96vh';
            modal.style.borderRadius = '10px';
        } else {
            modal.style.margin = '2% auto';
            modal.style.maxHeight = '90vh';
            modal.style.borderRadius = '20px';
        }
    });
}

function adaptNavigationForMobile() {
    const navMenu = document.querySelector('.nav-menu');
    const isMobile = window.innerWidth <= 768;
    
    if (navMenu && isMobile) {
        // Можно добавить адаптацию навигации для мобильных
    }
}

// ===== ФОРМЫ =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Сообщение отправлено! Спасибо за ваше обращение.');
            this.reset();
        });
    }
}

// ===== СЛУЖЕБНЫЕ ФУНКЦИИ =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Реэкспорт для использования в HTML
window.openModal = openModal;
window.closeModal = closeModal;
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;

// Адаптация при изменении размера окна
window.addEventListener('resize', debounce(adaptLayoutForMobile, 250));