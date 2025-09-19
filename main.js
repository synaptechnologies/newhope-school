// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
        });
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    }
});

// Gallery Filter
if (document.querySelector('.filter-btn')) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Lightbox
if (document.querySelector('.gallery-view')) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const galleryViews = document.querySelectorAll('.gallery-view');
    
    galleryViews.forEach(view => {
        view.addEventListener('click', function(e) {
            e.preventDefault();
            const imgSrc = this.getAttribute('href');
            const imgTitle = this.getAttribute('data-title');
            
            lightboxImg.setAttribute('src', imgSrc);
            lightboxCaption.textContent = imgTitle;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeLightbox.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// FAQ Accordion
if (document.querySelector('.faq-question')) {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// News Pagination
if (document.querySelector('.pagination')) {
    const pageLinks = document.querySelectorAll('.page-link:not(.next)');
    const nextLink = document.querySelector('.page-link.next');
    const newsItems = document.querySelectorAll('.news-item');
    const itemsPerPage = 6; // Number of news items to show per page
    let currentPage = 1;
    let totalPages = Math.ceil(newsItems.length / itemsPerPage);

    // Function to show items for the current page
    function showPage(page) {
        // Hide all news items
        newsItems.forEach(item => {
            item.style.display = 'none';
        });

        // Calculate start and end indices
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Show items for the current page
        for (let i = startIndex; i < endIndex && i < newsItems.length; i++) {
            newsItems[i].style.display = 'block';
        }

        // Update active page link
        pageLinks.forEach(link => {
            link.classList.remove('active');
            if (parseInt(link.textContent) === page) {
                link.classList.add('active');
            }
        });

        // Update next button visibility
        if (page >= totalPages) {
            nextLink.style.display = 'none';
        } else {
            nextLink.style.display = 'flex';
        }
    }

    // Initialize pagination
    showPage(currentPage);

    // Add click event to page links
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            currentPage = parseInt(this.textContent);
            showPage(currentPage);
            
            // Scroll to top of news grid
            document.querySelector('.news-grid').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Add click event to next button
    if (nextLink) {
        nextLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
                
                // Scroll to top of news grid
                document.querySelector('.news-grid').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // If there are more than 3 page links, update them dynamically
    if (totalPages > 3) {
        function updatePageLinks() {
            // Hide all page links except the first one and the next button
            pageLinks.forEach(link => {
                if (parseInt(link.textContent) !== 1) {
                    link.style.display = 'none';
                }
            });

            // Show current page and adjacent pages
            for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
                pageLinks.forEach(link => {
                    if (parseInt(link.textContent) === i) {
                        link.style.display = 'flex';
                    }
                });
            }

            // Always show first page
            pageLinks[0].style.display = 'flex';
            
            // Always show last page if not already shown
            if (currentPage < totalPages - 1) {
                pageLinks.forEach(link => {
                    if (parseInt(link.textContent) === totalPages) {
                        link.style.display = 'flex';
                    }
                });
            }
        }

        // Initial update of page links
        updatePageLinks();

        // Update page links when page changes
        pageLinks.forEach(link => {
            link.addEventListener('click', updatePageLinks);
        });

        if (nextLink) {
            nextLink.addEventListener('click', updatePageLinks);
        }
    }
}

// News Category Filter (updated to work with pagination)
if (document.querySelector('.category-btn')) {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const newsItems = document.querySelectorAll('.news-item');
    const pagination = document.querySelector('.pagination');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            let visibleItems = 0;
            
            newsItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    visibleItems++;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show or hide pagination based on visible items
            if (visibleItems <= 6) { // 6 is the items per page
                pagination.style.display = 'none';
            } else {
                pagination.style.display = 'flex';
            }
        });
    });
}


// Tab Functionality
if (document.querySelector('.tab-btn')) {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Contact Form
if (document.getElementById('contactForm')) {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('contact-form-message');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Create email body
        const emailBody = `Name: ${name}%0D%0A` +
                         `Email: ${email}%0D%0A` +
                         `Phone: ${phone}%0D%0A%0D%0A` +
                         `Message:%0D%0A${message}`;
        
        // Create mailto link
        const mailtoLink = `mailto:info@newhopeschool?subject=${encodeURIComponent(subject)}&body=${emailBody}`;
        
        // Open mailto link
        window.location.href = mailtoLink;
        
        // Show success message
        showFormMessage('Opening your email client. Please send the email to complete your submission.', 'success');
    });
    
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Admission Form
if (document.getElementById('admissionForm')) {
    const admissionForm = document.getElementById('admissionForm');
    const formMessage = document.getElementById('form-message');
    
    admissionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const dateOfBirth = document.getElementById('dateOfBirth').value;
        const gender = document.getElementById('gender').value;
        const gradeApplying = document.getElementById('gradeApplying').value;
        const academicYear = document.getElementById('academicYear').value;
        const previousSchool = document.getElementById('previousSchool').value;
        const parentName = document.getElementById('parentName').value;
        const relationship = document.getElementById('relationship').value;
        const parentPhone = document.getElementById('parentPhone').value;
        const parentEmail = document.getElementById('parentEmail').value;
        const parentAddress = document.getElementById('parentAddress').value;
        const hearAbout = document.getElementById('hearAbout').value;
        const specialNeeds = document.getElementById('specialNeeds').value;
        const additionalInfo = document.getElementById('additionalInfo').value;
        const declaration = document.getElementById('declaration').checked;
        
        // Simple validation
        if (!firstName || !lastName || !dateOfBirth || !gender || !gradeApplying || !academicYear || 
            !parentName || !relationship || !parentPhone || !parentEmail || !parentAddress || !declaration) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(parentEmail)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Create email subject
        const emailSubject = `Admission Application for ${firstName} ${lastName} - ${gradeApplying}`;
        
        // Create email body
        const emailBody = `STUDENT INFORMATION:%0D%0A` +
                         `First Name: ${firstName}%0D%0A` +
                         `Last Name: ${lastName}%0D%0A` +
                         `Date of Birth: ${dateOfBirth}%0D%0A` +
                         `Gender: ${gender}%0D%0A` +
                         `Grade Applying For: ${gradeApplying}%0D%0A` +
                         `Academic Year: ${academicYear}%0D%0A` +
                         `Previous School: ${previousSchool}%0D%0A%0D%0A` +
                         `PARENT/GUARDIAN INFORMATION:%0D%0A` +
                         `Name: ${parentName}%0D%0A` +
                         `Relationship: ${relationship}%0D%0A` +
                         `Phone: ${parentPhone}%0D%0A` +
                         `Email: ${parentEmail}%0D%0A` +
                         `Address: ${parentAddress}%0D%0A%0D%0A` +
                         `ADDITIONAL INFORMATION:%0D%0A` +
                         `How did you hear about us: ${hearAbout}%0D%0A` +
                         `Special Needs: ${specialNeeds}%0D%0A` +
                         `Additional Info: ${additionalInfo}%0D%0A%0D%0A` +
                         `Declaration: ${declaration ? 'Confirmed' : 'Not confirmed'}`;
        
        // Create mailto link
        const mailtoLink = `mailto:admissions@newhopeschool?subject=${encodeURIComponent(emailSubject)}&body=${emailBody}`;
        
        // Open mailto link
        window.location.href = mailtoLink;
        
        // Show success message
        showFormMessage('Opening your email client. Please send the email to complete your application.', 'success');
    });
    
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}