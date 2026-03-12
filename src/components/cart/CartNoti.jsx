import React, { useEffect } from 'react';
import { Link } from 'react-router';

const CartNoti = ({ show, onClose, autoHide = 3000 }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, autoHide);
            return () => clearTimeout(timer);
        }
    }, [show, onClose, autoHide]);

    if (!show) return null;

    return (
        <div
            className="fixed inset-0 z-[100001] flex h-full w-full animate-[fade-in_0.2s_ease] cursor-pointer justify-center mb:items-end mb:px-3.5 mb:pb-[110px] pc:items-center"
            onClick={onClose}
        >
            <div
                className="flex w-full cursor-default items-center bg-black/80 text-center mb:max-w-full mb:flex-row mb:rounded-2 mb:p-3 pc:max-w-[400px] pc:flex-col pc:rounded-xl pc:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="mb:h-6 mb:w-6">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8308 9.05282H4.11132C3.22069 9.05282 2.5 8.33202 2.5 7.4414C2.5 6.55077 3.22069 5.83008 4.11132 5.83008H12.0456C12.7647 5.83008 13.3972 6.30692 13.5955 6.99925L15.103 12.2755H55.8884C56.3935 12.2755 56.8703 12.5131 57.1755 12.9159C57.4792 13.3202 57.5768 13.8427 57.4383 14.3289L50.993 36.8874C50.7947 37.5798 50.1621 38.0565 49.443 38.0565H21.328L20.8827 38.9472C20.3454 40.0192 21.1275 41.2792 22.324 41.2792H49.443C50.3337 41.2792 51.0544 41.9999 51.0544 42.8905C51.0544 43.7811 50.3337 44.5018 49.443 44.5018H22.324C18.7255 44.5018 16.3933 40.7155 17.9999 37.5058L18.6101 36.2855L10.8308 9.05282ZM26.7773 54.1699C29.4471 54.1699 31.6113 52.0057 31.6113 49.3359C31.6113 46.6662 29.4471 44.5019 26.7773 44.5019C24.1076 44.5019 21.9434 46.6662 21.9434 49.3359C21.9434 52.0057 24.1076 54.1699 26.7773 54.1699ZM42.998 54.1699C45.6678 54.1699 47.832 52.0057 47.832 49.3359C47.832 46.6662 45.6678 44.5019 42.998 44.5019C40.3283 44.5019 38.1641 46.6662 38.1641 49.3359C38.1641 52.0057 40.3283 54.1699 42.998 54.1699Z" fill="url(#paint0_linear_1902_451006)"></path>
                    <path d="M44.4124 18.0119C45.1653 18.7229 45.1992 19.9096 44.4881 20.6624L33.8631 31.9124C33.5153 32.2807 33.0333 32.4926 32.5268 32.4998C32.0203 32.507 31.5324 32.309 31.1742 31.9508L25.5492 26.3258C24.8169 25.5936 24.8169 24.4064 25.5492 23.6742C26.2814 22.9419 27.4686 22.9419 28.2008 23.6742L32.4616 27.9349L41.7619 18.0876C42.4729 17.3347 43.6596 17.3008 44.4124 18.0119Z" fill="white"></path>
                    <defs>
                        <linearGradient id="paint0_linear_1902_451006" x1="14" y1="4.5" x2="46.5" y2="54" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#00BE85"></stop>
                            <stop offset="1" stop-color="#04B761"></stop>
                        </linearGradient>
                    </defs>
                </svg>
                <p className="text-white l7-14-medium mb:ml-2 pc:mb-6 pc:mt-2">
                    <span className="mb:hidden">Sản phẩm đã được thêm vào giỏ hàng</span>
                    <span className="pc:hidden">Đã thêm vào giỏ hàng</span>
                </p>
                <Link
                    className="cursor-pointer rounded-[40px] bg-white text-black mb:ml-auto mb:px-2 mb:py-1.5 mb:b2-medium pc:px-3 pc:py-2 pc:b1-medium"
                    to="/cart"
                    onClick={onClose}
                >
                    Xem giỏ<span className="mb:hidden">&nbsp;hàng</span>
                </Link>
            </div>
        </div>
    );
};

export default CartNoti;