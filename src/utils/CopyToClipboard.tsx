export const copyToClipboard = async (text: string, buttonElement?: HTMLButtonElement) => {
  try {
    await navigator.clipboard.writeText(text);
    const button = buttonElement || document.activeElement as HTMLButtonElement;
    if (button && button.tagName === 'BUTTON') {
      const copyIcon = button.querySelector('svg')?.parentElement;
      const textSpan = button.querySelector('span') || document.createElement('span');
      
      // Store the original content if not already stored
      if (!button.getAttribute('data-original')) {
        button.setAttribute('data-original', 'Copy code');
      }
      
      // Update text content
      textSpan.textContent = 'Copied!';
      
      // Clear existing timeout
      const existingTimeout = button.getAttribute('data-timeout');
      if (existingTimeout) {
        clearTimeout(parseInt(existingTimeout));
      }
      
      const timeoutId = setTimeout(() => {
        if (button) {
          textSpan.textContent = button.getAttribute('data-original') || 'Copy code';
        }
      }, 2000);
      
      button.setAttribute('data-timeout', timeoutId.toString());
      
      // Ensure proper order of elements
      button.innerHTML = '';
      if (copyIcon) button.appendChild(copyIcon);
      button.appendChild(textSpan);
    }
  } catch (err) {
    console.error('Failed to copy text:', err);
  }
};
