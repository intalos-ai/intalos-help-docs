// Add component icons to article header
document.addEventListener('DOMContentLoaded', function() {
    // Mapping of page titles to icon filenames
    const iconMap = {
        'QuestionText': 'question-text',
        'QuestionButtons': 'question-buttons',
        'QuestionList': 'question-list',
        'QuestionMedia': 'question-media',
        'Email': 'email',
        'Media': 'media',
        'Formula': 'formula',
        'CustomCode': 'custom-code',
        'LLM Conversation': 'llm-conversation',
        'APIRequest': 'api-request',
        'GoogleSheets': 'google-sheets',
        'GoogleDrive': 'google-drive'
    };
    
    // Get the title element in the article header
    const titleElement = document.querySelector('#article-header h1#title');
    
    if (titleElement) {
        // Check if icon already exists (prevent duplicates)
        if (titleElement.querySelector('img')) {
            return;
        }
        
        const titleText = titleElement.textContent.trim();
        const iconFile = iconMap[titleText];
        
        if (iconFile) {
            // Create icon element with correct path
            const icon = document.createElement('img');
            icon.src = `../images/icons/${iconFile}.svg`;
            icon.width = 32;
            icon.height = 32;
            icon.style.verticalAlign = 'middle';
            icon.style.marginLeft = '0';
            icon.style.marginRight = '8px';
            icon.style.backgroundColor = 'white';
            icon.style.padding = '8px';
            icon.style.borderRadius = '8px';
            icon.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            icon.className = 'component-icon';
            
            // Insert icon before the text
            titleElement.insertBefore(icon, titleElement.firstChild);
        }
    }
});

