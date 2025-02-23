document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
    const registerForm = document.getElementById('registerForm');
    let isRegistered = false;

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            if (!isRegistered) {
                registerModal.show();
            } else {
                addMessage(message, 'user-message');
                userInput.value = '';
                setTimeout(() => {
                    addMessage('הפרטים שלך יועברו לבעלי עסקים שיחזרו אליך עם הצעות. לאשר?', 'system-message');
                    addConfirmButtons();
                }, 1000);
            }
        }
    }

    function addMessage(text, className) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', className);
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addConfirmButtons() {
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('d-flex', 'justify-content-end', 'mt-2');
        
        const confirmBtn = document.createElement('button');
        confirmBtn.classList.add('btn', 'btn-success', 'me-2');
        confirmBtn.textContent = 'אישור';
        confirmBtn.addEventListener('click', () => {
            buttonsContainer.remove();
            addMessage('הפנייה נשלחה בהצלחה! בעלי עסקים יחזרו אליך בקרוב.', 'system-message');
        });

        const cancelBtn = document.createElement('button');
        cancelBtn.classList.add('btn', 'btn-secondary');
        cancelBtn.textContent = 'ביטול';
        cancelBtn.addEventListener('click', () => buttonsContainer.remove());

        buttonsContainer.appendChild(confirmBtn);
        buttonsContainer.appendChild(cancelBtn);
        chatMessages.appendChild(buttonsContainer);
    }

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        isRegistered = true;
        registerModal.hide();
        addMessage('תודה על ההרשמה! אנא המשך עם בקשתך.', 'system-message');
    });
});
