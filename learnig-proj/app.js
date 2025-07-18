document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('textForm');
    const textInput = document.getElementById('textInput');
    const message = document.getElementById('message');
    const textsList = document.getElementById('textsList');

    loadStoredTexts();

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const text = textInput.value.trim();
        if (!text) return;

        try {
            const response = await fetch('/api/store-text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text })
            });

            const data = await response.json();

            if (response.ok) {
                showMessage('Text stored successfully!', 'success');
                textInput.value = '';
                loadStoredTexts();
            } else {
                showMessage(data.error || 'Failed to store text', 'error');
            }
        } catch (error) {
            showMessage('Error connecting to server', 'error');
            console.error('Error:', error);
        }
    });

    async function loadStoredTexts() {
        try {
            const response = await fetch('/api/texts');
            const data = await response.json();
            
            displayTexts(data.texts);
        } catch (error) {
            console.error('Error loading texts:', error);
        }
    }

    function displayTexts(texts) {
        if (texts.length === 0) {
            textsList.innerHTML = '<p class="no-texts">No texts stored yet</p>';
            return;
        }

        textsList.innerHTML = texts.map(entry => `
            <div class="text-entry">
                <p class="text-content">${escapeHtml(entry.text)}</p>
                <small class="text-date">${new Date(entry.timestamp).toLocaleString()}</small>
            </div>
        `).join('');
    }

    function showMessage(text, type) {
        message.textContent = text;
        message.className = `message ${type}`;
        setTimeout(() => {
            message.textContent = '';
            message.className = '';
        }, 3000);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});