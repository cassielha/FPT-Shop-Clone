import React, { useState, useEffect } from 'react';

const FooterScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) return null;

    return (
        <span
            className="fixed bottom-6 right-6 z-[9999] cursor-pointer"
            style={{ width: '40px', height: '40px' }}
            onClick={scrollToTop}
        >
            <button
                title="Scroll to top"
                className="flex items-center justify-center rounded-full bg-white transition-all hover:scale-110"
                style={{
                    width: '100%',
                    height: '100%',
                    fontSize: '28px',
                    border: '1px solid #e5e7eb',
                    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 2px 4px 1px'
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 17" fill="#6b7280">
                    <path d="M2.86201 10.9717C3.12236 11.2321 3.54447 11.2321 3.80482 10.9717L8.00008 6.77647L12.1953 10.9717C12.4557 11.2321 12.8778 11.2321 13.1382 10.9717C13.3985 10.7114 13.3985 10.2893 13.1382 10.0289L8.47149 5.36225C8.21114 5.1019 7.78903 5.1019 7.52868 5.36225L2.86201 10.0289C2.60166 10.2893 2.60166 10.7114 2.86201 10.9717Z" fill="currentColor"></path>
                </svg>
            </button>
        </span>
    );
};

export default FooterScrollToTopButton;