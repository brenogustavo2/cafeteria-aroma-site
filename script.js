// Cafeteria Aroma - Scripts JavaScript

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Marca a página atual como ativa na navbar
    setActiveNavItem();
    
    // Inicializa validações de formulários
    initFormValidations();
    
    // Adiciona animações suaves
    initSmoothAnimations();
});

// Função para marcar o item ativo na navegação
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Inicializa validações de formulários
function initFormValidations() {
    
    // Validação do formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateContactForm();
        });
    }
    
    // Validação do formulário de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateLoginForm();
        });
    }
}

// Validação do formulário de contato
function validateContactForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Limpa mensagens anteriores
    clearMessages();
    
    // Validações
    if (!name) {
        showError('Por favor, informe seu nome.');
        return;
    }
    
    if (!email || !isValidEmail(email)) {
        showError('Por favor, informe um e-mail válido.');
        return;
    }
    
    if (!subject) {
        showError('Por favor, informe o assunto.');
        return;
    }
    
    if (!message) {
        showError('Por favor, escreva sua mensagem.');
        return;
    }
    
    // Se chegou até aqui, o formulário é válido
    showSuccess('Obrigado! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.');
    document.getElementById('contactForm').reset();
}

// Validação do formulário de login
function validateLoginForm() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    
    // Limpa mensagens anteriores
    clearMessages();
    
    // Validações
    if (!email || !isValidEmail(email)) {
        showError('Por favor, informe um e-mail válido.');
        return;
    }
    
    if (!password) {
        showError('Por favor, informe sua senha.');
        return;
    }
    
    if (password.length < 6) {
        showError('A senha deve ter pelo menos 6 caracteres.');
        return;
    }
    
    // Simulação de login (em um sistema real, isso seria enviado para o servidor)
    if (email === 'admin@cafeteriaaroma.com' && password === '123456') {
        showSuccess('Login realizado com sucesso! Bem-vindo(a) à área do cliente.');
        setTimeout(() => {
            // Aqui redirecionaria para a área restrita
            showInfo('Redirecionando para a área do cliente...');
        }, 2000);
    } else {
        showError('E-mail ou senha incorretos. Tente novamente.');
    }
}

// Função para validar e-mail
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para exibir mensagem de erro
function showError(message) {
    showMessage(message, 'danger');
}

// Função para exibir mensagem de sucesso
function showSuccess(message) {
    showMessage(message, 'success');
}

// Função para exibir mensagem informativa
function showInfo(message) {
    showMessage(message, 'info');
}

// Função genérica para exibir mensagens
function showMessage(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Encontra o container de mensagens ou cria um
    let messageContainer = document.getElementById('messageContainer');
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.id = 'messageContainer';
        const form = document.querySelector('form');
        if (form) {
            form.parentNode.insertBefore(messageContainer, form.nextSibling);
        }
    }
    
    messageContainer.appendChild(alertDiv);
    
    // Remove a mensagem automaticamente após 5 segundos
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Função para limpar mensagens
function clearMessages() {
    const messageContainer = document.getElementById('messageContainer');
    if (messageContainer) {
        messageContainer.innerHTML = '';
    }
}

// Inicializa animações suaves
function initSmoothAnimations() {
    // Animação suave para links âncora
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animação de fade-in para cards ao fazer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplica animação aos cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

