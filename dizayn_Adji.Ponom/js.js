let currentRole = '';
let currentTaskId = null;

// Функции для переключения между ролями
function selectRole(role) {
    currentRole = role;
    document.getElementById('home-page').style.display = 'none';
    
    if (role === 'store-manager') {
        document.getElementById('store-manager-interface').style.display = 'block';
        showSection('store-dashboard');
    } else if (role === 'office-manager') {
        // Здесь можно добавить интерфейс для управляющего офисом
        alert('Интерфейс для управляющего офисом находится в разработке');
        showHomePage();
    } else if (role === 'hr-specialist') {
        // Здесь можно добавить интерфейс для HR-специалиста
        alert('Интерфейс для HR-специалиста находится в разработке');
        showHomePage();
    }
}

function showHomePage() {
    document.getElementById('home-page').style.display = 'block';
    document.getElementById('store-manager-interface').style.display = 'none';
    currentRole = '';
}

// Функции для переключения между разделами
function showSection(sectionId) {
    // Скрываем все разделы
    const sections = document.querySelectorAll('.content');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Показываем нужный раздел
    document.getElementById(sectionId).style.display = 'block';
    
    // Обновляем активную ссылку в меню
    const menuLinks = document.querySelectorAll('.sidebar-menu a, nav a');
    menuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') === `showSection('${sectionId}')`) {
            link.classList.add('active');
        }
    });
}

// Функции для работы с заданиями
function saveTaskDraft() {
    // В реальном приложении здесь был бы AJAX-запрос к серверу
    showModal('success-modal');
}

function saveAndSendTask() {
    // В реальном приложении здесь был бы AJAX-запрос к серверу
    alert('Задание сохранено и отправлено в работу. Статус изменен на "В работе".');
    showSection('store-dashboard');
}

function editTask(taskId) {
    alert(`Редактирование задания #${taskId}. В реальном приложении здесь открывалась бы форма редактирования.`);
}

function confirmCancel(taskId) {
    currentTaskId = taskId;
    showModal('cancel-modal');
}

function cancelTask() {
    // В реальном приложении здесь был бы AJAX-запрос к серверу для отмены задания
    alert(`Задание #${currentTaskId} отменено. Статус изменен на "Отменён".`);
    closeModal();
    showSection('store-dashboard');
}

function sendToWork(taskId) {
    // В реальном приложении здесь был бы AJAX-запрос к серверу
    alert(`Задание #${taskId} отправлено в работу. Статус изменен на "В работе".`);
    showSection('store-dashboard');
}

// Функции для работы с модальными окнами
function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Установка текущей даты в форму создания задания
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('start-date').value = today;
    
    // Установка даты окончания на 3 дня вперед
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);
    document.getElementById('end-date').value = endDate.toISOString().split('T')[0];
});