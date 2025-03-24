document.addEventListener('DOMContentLoaded', function() {
    //////////////////////////////
    // Login functionality
    const loginForm = document.getElementById('login-form');
    const loginContainer = document.getElementById('login-container');
    const adminPanel = document.getElementById('admin-panel');
    
    // Admin credentials
    const adminEmail = 'admin@gmail.com';
    const adminPassword = '1234';
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email === adminEmail && password === adminPassword) {
                loginContainer.style.display = 'none';
                adminPanel.style.display = 'flex';
                // Store login state in session storage
                sessionStorage.setItem('isLoggedIn', 'true');
            } else {
                alert('Invalid email or password. Please try again.');
            }
        });
    }
    
    // Check if user is already logged in
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        if (loginContainer) loginContainer.style.display = 'none';
        if (adminPanel) adminPanel.style.display = 'flex';
    }
    ////////////////////////////////
    /////////////////////////////
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Remove active class from all nav items
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Add active class to clicked nav item
            this.classList.add('active');
            
            // Hide all content sections
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target content section
            if (target) {
                document.getElementById(target).classList.add('active');
            }
            
            // On mobile, close the sidebar after navigation
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('expanded');
            }
        });
    });
    /////////////////////////////////
    /////////////////////////////////
    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('isLoggedIn');
            if (adminPanel) adminPanel.style.display = 'none';
            if (loginContainer) loginContainer.style.display = 'flex';
        });
    }
    ////////////////////////////////////////
    ///////////////////////////////////////
    // Modal functionality
    const addMenuItemBtn = document.getElementById('add-menu-item-btn');
    const menuItemModal = document.getElementById('menu-item-modal');
    const addBookingBtn = document.getElementById('add-booking-btn');
    const bookingModal = document.getElementById('booking-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    // Open menu item modal
    if (addMenuItemBtn && menuItemModal) {
        addMenuItemBtn.addEventListener('click', function() {
            menuItemModal.classList.add('active');
        });
    }
    
    // Open booking modal
    if (addBookingBtn && bookingModal) {
        addBookingBtn.addEventListener('click', function() {
            bookingModal.classList.add('active');
        });
    }
    
    // Close modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
    
    // Form submissions
    const menuItemForm = document.getElementById('menu-item-form');
    const bookingForm = document.getElementById('booking-form');
    const profileForm = document.getElementById('profile-form');
    const passwordForm = document.getElementById('password-form');
    
    // Menu item form submission
    if (menuItemForm) {
        menuItemForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Menu item saved successfully!');
            menuItemModal.classList.remove('active');
            this.reset();
        });
    }
    
    // Booking form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Booking saved successfully!');
            bookingModal.classList.remove('active');
            this.reset();
        });
    }
    //////////////////////////////////////////
    // Profile form submission
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Profile updated successfully!');
        });
    }
    
    // Password form submission
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (currentPassword !== adminPassword) {
                alert('Current password is incorrect.');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                alert('New passwords do not match.');
                return;
            }
            
            alert('Password changed successfully!');
            this.reset();
        });
    }
    
    // Table actions (Edit and Delete buttons)
    const editButtons = document.querySelectorAll('.btn-edit');
    const deleteButtons = document.querySelectorAll('.btn-delete');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const id = row.cells[0].textContent;
            alert(`Editing item with ID: ${id}`);
        });
    });
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const id = row.cells[0].textContent;
            if (confirm(`Are you sure you want to delete item with ID: ${id}?`)) {
                alert(`Item with ID: ${id} deleted successfully!`);
                row.remove();
            }
        });
    });
   //////////////////////////////////// 
    // Feedback actions
    const feedbackActions = document.querySelectorAll('.feedback-actions button');
    
    feedbackActions.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            const feedbackItem = this.closest('.feedback-item');
            
            if (action === 'Mark as Read') {
                feedbackItem.classList.remove('unread');
                this.textContent = 'Mark as Unread';
            } else if (action === 'Mark as Unread') {
                feedbackItem.classList.add('unread');
                this.textContent = 'Mark as Read';
            } else if (action === 'Reply') {
                const customerName = feedbackItem.querySelector('h4').textContent;
                alert(`Replying to ${customerName}`);
            }
        });
    });
    
    // Feedback filter
    const feedbackFilter = document.getElementById('feedback-filter');
    const feedbackItems = document.querySelectorAll('.feedback-item');
    
    if (feedbackFilter) {
        feedbackFilter.addEventListener('change', function() {
            const filterValue = this.value;
            
            feedbackItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else if (filterValue === 'new' && item.classList.contains('unread')) {
                    item.style.display = 'block';
                } else if (filterValue === 'read' && !item.classList.contains('unread')) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    //////////////////////////////
    // Set current date for booking form
    const bookingDateInput = document.getElementById('booking-date');
    if (bookingDateInput) {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        
        bookingDateInput.value = `${year}-${month}-${day}`;
        bookingDateInput.min = `${year}-${month}-${day}`;
    }
});
//////////////////////////////////
/////////////////////////////////
document.getElementById("hamburger").addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("collapsed");
});
/////////////////////////////////////