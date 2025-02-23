document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const registrationPopup = document.getElementById('registrationPopup');
    const registerButton = document.getElementById('registerButton');

    let isRegistered = false;

    function addMessage(message, isUser = true) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user-message' : 'system-message');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showRegistrationPopup() {
        registrationPopup.style.display = 'flex';
    }

    function hideRegistrationPopup() {
        registrationPopup.style.display = 'none';
    }

    userInput.addEventListener('input', function() {
        if (!isRegistered && this.value.length === 1) {
            showRegistrationPopup();
        }
    });

    sendButton.addEventListener('click', function() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message);
            userInput.value = '';

            if (isRegistered) {
                setTimeout(() => {
                    addMessage('הפרטים שלך יועברו לבעלי עסקים שיחזרו אליך עם הצעות. לאשר?', false);
                    // כאן יש להוסיף כפתורי אישור וביטול
                }, 1000);
            }
        }
    });

    registerButton.addEventListener('click', function() {
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const vehicleType = document.getElementById('vehicleType').value;

        if (fullName && email && phone && vehicleType) {
            isRegistered = true;
            hideRegistrationPopup();
            addMessage('תודה על ההרשמה! אנא המשך את בקשתך.', false);
        } else {
            alert('נא למלא את כל השדות');
        }
    });
});
