// Nuclear option - Override everything with Poppins
(function() {
    console.log('🎨 Poppins override script starting...');
    
    // Load Poppins font
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    console.log('✅ Poppins font loaded');
    
    // Function to inject super aggressive CSS
    function injectOverrideCSS() {
        // Remove any existing override
        const existing = document.getElementById('poppins-nuclear-override');
        if (existing) existing.remove();
        
        // Create style element
        const style = document.createElement('style');
        style.id = 'poppins-nuclear-override';
        style.textContent = `
            /* Override CSS variables */
            :root {
                --body: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
                --heading: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
                --mono: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
            }
            
            /* Apply to everything */
            html {
                font-family: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
            }
            
            body {
                font-family: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
            }
            
            * {
                font-family: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
            }
            
            h1, h2, h3, h4, h5, h6 {
                font-weight: 600 !important;
            }
            
            /* Custom link colors */
            a,
            a:link,
            a:visited {
                color: #de9b4c !important;
                text-decoration: none !important;
            }
            
            a:hover,
            a:focus,
            a:active {
                color: #808080 !important;
                text-decoration: underline !important;
            }
            
            /* Remove link from site title - specific selector */
            h1#title a,
            h1#title a:hover,
            h1#title a:focus,
            h1#title a:active,
            .navbar-brand,
            .navbar-brand a,
            header a.brand,
            .site-name a,
            .header-title a,
            h1.site-title a,
            .branding a {
                pointer-events: none !important;
                cursor: default !important;
                color: inherit !important;
                text-decoration: none !important;
            }
            
            /* Style the header logo - larger */
            img#avatar {
                height: 256px !important;
                width: auto !important;
                border: none !important;
                outline: none !important;
                box-shadow: none !important;
                border-radius: 0 !important;
                display: inline-block !important;
                margin-right: 0.75rem !important;
                flex-shrink: 0 !important;
            }
            
            /* Override header grid to be compact */
            #header,
            header#header {
                display: grid !important;
                grid-template-columns: auto 1fr auto !important;
                align-items: center !important;
                gap: 0.75rem !important;
            }
            
            /* Ensure title stays properly sized */
            h1#title {
                margin: 0 !important;
                justify-self: start !important;
                max-width: 100% !important;
                overflow-wrap: break-word !important;
            }
            
            /* Remove borders from all images */
            img {
                border: none !important;
                outline: none !important;
                box-shadow: none !important;
            }
            
            
            /* Make content area wider */
            .container,
            .content,
            .main-content,
            article,
            .md-content,
            #content {
                max-width: calc(100% - 200px) !important;
                width: 100% !important;
            }
            
            @media (min-width: 768px) {
                .container,
                .content,
                .main-content,
                article,
                .md-content,
                #content {
                    max-width: 900px !important;
                }
            }
            
            @media (min-width: 992px) {
                .container,
                .content,
                .main-content,
                article,
                .md-content,
                #content {
                    max-width: 950px !important;
                }
            }
            
            @media (min-width: 1200px) {
                .container,
                .content,
                .main-content,
                article,
                .md-content,
                #content {
                    max-width: 1050px !important;
                }
            }
        `;
        
        // Append to body (loads after everything)
        document.body.appendChild(style);
        console.log('✅ CSS override injected into body');
    }
    
    // Function to apply inline styles (highest priority)
    function applyInlineStyles() {
        const fontStack = 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        
        // Apply to html
        if (document.documentElement) {
            document.documentElement.style.setProperty('font-family', fontStack, 'important');
        }
        
        // Apply to body  
        if (document.body) {
            document.body.style.setProperty('font-family', fontStack, 'important');
        }
        
        console.log('✅ Inline styles applied to html and body');
    }
    
    // Function to replace the header logo
    function replaceHeaderLogo() {
        const avatarImg = document.getElementById('avatar');
        if (avatarImg) {
            avatarImg.src = 'images/Intalos Logo.png';
            avatarImg.alt = 'Intalos Logo';
            console.log('✅ Header logo replaced with Intalos logo');
        }
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('📄 DOM loaded, applying overrides...');
            injectOverrideCSS();
            applyInlineStyles();
            replaceHeaderLogo();
        });
    } else {
        console.log('📄 DOM already loaded, applying overrides...');
        injectOverrideCSS();
        applyInlineStyles();
        replaceHeaderLogo();
    }
    
    // Run when fully loaded (to override any lazy-loaded CSS)
    window.addEventListener('load', function() {
        console.log('🎯 Page fully loaded, re-applying overrides...');
        setTimeout(function() {
            injectOverrideCSS();
            applyInlineStyles();
            replaceHeaderLogo();
        }, 100);
        setTimeout(function() {
            injectOverrideCSS();
            applyInlineStyles();
            replaceHeaderLogo();
        }, 500);
        setTimeout(function() {
            injectOverrideCSS();
            applyInlineStyles();
            replaceHeaderLogo();
            console.log('✅ All Poppins overrides complete!');
        }, 1000);
    });
    
    // Keep re-applying every 3 seconds to ensure it sticks
    setInterval(function() {
        applyInlineStyles();
        replaceHeaderLogo();
    }, 3000);
})();

