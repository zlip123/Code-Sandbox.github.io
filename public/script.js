document.addEventListener('DOMContentLoaded', () => {
    Prism.highlightAll();
});

document.getElementById('runButton').addEventListener('click', () => {
    const code = document.getElementById('code').value;
    const outputElement = document.getElementById('output');
    outputElement.innerHTML = '';

    const selectedLanguage = document.getElementById('languageSelect').value;

    fetch('/runcode', {
        method: 'POST',
        body: code,
        headers: {
            'Content-Type': 'text/plain',
        },
    })
    .then(response => response.text())
    .then(data => {
        // Display the output
        outputElement.innerHTML = `<p>Output:</p><pre>${data}</pre>`;
        
        // Check if the output contains "hi" for Python test
        if (selectedLanguage === 'python' && data.includes('hi')) {
            outputElement.innerHTML += '<p>Python test passed!</p>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        outputElement.innerHTML = `<p>Error:</p><pre>${error}</pre>`;
    });
});
