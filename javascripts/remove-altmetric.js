// Remove Altmetric script to prevent mixed content issues
(function() {
    console.log('🔧 Removing Altmetric script to prevent mixed content issues...');
    
    function removeAltmetricScript() {
        // Remove Altmetric script
        const altmetricScript = document.getElementById('altmetric-embed-js');
        if (altmetricScript) {
            altmetricScript.remove();
            console.log('✅ Altmetric script removed');
        }
        
        // Remove Altmetric CSS
        const altmetricCSS = document.getElementById('altmetric-embed-css');
        if (altmetricCSS) {
            altmetricCSS.remove();
            console.log('✅ Altmetric CSS removed');
        }
        
        // Remove any Altmetric elements
        const altmetricElements = document.querySelectorAll('.altmetric-citation, .altmetric-embed');
        altmetricElements.forEach(element => {
            element.remove();
        });
        
        if (altmetricElements.length > 0) {
            console.log(`✅ Removed ${altmetricElements.length} Altmetric elements`);
        }
    }
    
    // Run immediately
    removeAltmetricScript();
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', removeAltmetricScript);
    }
    
    // Run when page is fully loaded
    window.addEventListener('load', removeAltmetricScript);
    
    // Run periodically to catch any dynamically added Altmetric scripts
    setInterval(removeAltmetricScript, 1000);
    
    console.log('✅ Altmetric removal script loaded');
})();
