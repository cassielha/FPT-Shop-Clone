import { Link } from 'react-router';
import hotKeysData from '../../data/hot_keys.json';
import navMenuData from '../../data/nav_menu.json';

const Header = () => {
    const { hot_keys } = hotKeysData;
    const { nav_items } = navMenuData;

    return (
        <header id="fptshop-header"
            className="top-0 z-[10000] bg-[linear-gradient(5deg,_#cb1c22_67.61%,_#d9503f_95.18%)] mb:sticky pc:min-w-[var(--container-content)] w-full">
            <div id="header-main" className="HeaderMain_main">
                <div className="container mx-auto mb:overflow-visible px-4">
                    <div className="grid grid-cols-[40px_1fr_40px] pc:grid-cols-[150px_1fr_245px] items-center py-2">
                        <div className="z-[2] block pc:hidden"></div>
                        <div id="logo" className="flex items-center justify-center transition-[transform]">
                            <Link className="Logo_logo flex items-center" to="/">
                                <img alt="FPTShop.com.vn" fetchPriority="high"
                                    width="150" height="40" decoding="async" data-nimg="1"
                                    className="" style={{ color: 'transparent' }}
                                    src="https://cdn2.fptshop.com.vn/unsafe/150x0/filters:format(webp):quality(75)/logo_main_ngua_8d7be920e5.png" />
                            </Link>
                        </div>
                        <div className="z-[1] flex items-center justify-end gap-x-3">
                            <div className="User_userWrap">
                                <div className="User_btnControl User_active">
                                    <div className="flex gap-2">
                                        <button
                                            className="Button_root Button_btnLarge Button_blackSecondary Button_btnIcon mb:hidden User_btnUser p-2 rounded-full hover:bg-white/10"
                                            title="Đăng ký / Đăng nhập">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M17.7545 13.9999C18.9966 13.9999 20.0034 15.0068 20.0034 16.2488V17.1673C20.0034 17.7406 19.8242 18.2997 19.4908 18.7662C17.9449 20.9294 15.4206 22.0011 12.0004 22.0011C8.5794 22.0011 6.05643 20.9289 4.51427 18.7646C4.18231 18.2987 4.00391 17.7409 4.00391 17.1688V16.2488C4.00391 15.0068 5.01076 13.9999 6.25278 13.9999H17.7545ZM12.0004 2.00464C14.7618 2.00464 17.0004 4.24321 17.0004 7.00464C17.0004 9.76606 14.7618 12.0046 12.0004 12.0046C9.23894 12.0046 7.00036 9.76606 7.00036 7.00464C7.00036 4.24321 9.23894 2.00464 12.0004 2.00464Z"
                                                    fill="inherit">
                                                </path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <Link className="Button_root Button_btnLarge Button_blackPrimary Button_btnIconLeft MiniCart_btn flex items-center gap-2 text-white"
                                aria-label="giỏ hàng" to="/cart">
                                <span className="relative MiniCart_cart-icon-badge" data-cart-count="3">
                                    <svg width="24" height="24" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg" fill="white">
                                        <path
                                            d="M2.5 4.25C2.5 3.83579 2.83579 3.5 3.25 3.5H3.80826C4.75873 3.5 5.32782 4.13899 5.65325 4.73299C5.87016 5.12894 6.02708 5.58818 6.14982 6.00395C6.18306 6.00134 6.21674 6 6.2508 6H18.7481C19.5783 6 20.1778 6.79442 19.9502 7.5928L18.1224 14.0019C17.7856 15.1832 16.7062 15.9978 15.4779 15.9978H9.52977C8.29128 15.9978 7.2056 15.1699 6.87783 13.9756L6.11734 11.2045L4.85874 6.95578L4.8567 6.94834C4.701 6.38051 4.55487 5.85005 4.33773 5.4537C4.12686 5.0688 3.95877 5 3.80826 5H3.25C2.83579 5 2.5 4.66421 2.5 4.25ZM9 21C10.1046 21 11 20.1046 11 19C11 17.8954 10.1046 17 9 17C7.89543 17 7 17.8954 7 19C7 20.1046 7.89543 21 9 21ZM16 21C17.1046 21 18 20.1046 18 19C18 17.8954 17.1046 17 16 17C14.8954 17 14 17.8954 14 19C14 20.1046 14.8954 21 16 21Z"
                                            fill="inherit"></path>
                                    </svg>
                                </span>
                                <span className="hidden pc:block font-medium">Giỏ hàng</span>
                            </Link>
                        </div>
                        <div id="search"
                            className="col-span-full mt-2 grid pc:col-start-2 pc:col-end-3 pc:row-start-1 pc:row-end-2 pc:mt-0 px-2 pc:px-4">
                            <div className="flex items-center justify-center">
                                <div
                                    className="menu-right mb:absolute mb:left-4 mb:top-[8px] mb:z-[3] mb:h-[40px] mb:w-[32px] pc:min-w-[140px]">
                                    <div className="Styles_navigation">
                                        <button
                                            className="Button_root Button_btnLarge Button_blackSecondary Button_btnIconLeft flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-lg"
                                            aria-label="Danh mục">
                                            <svg width="21" height="15" viewBox="0 0 21 15" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                    d="M0.777557 1.19531C0.777557 0.781099 1.11334 0.445312 1.52756 0.445312H19.5276C19.9418 0.445312 20.2776 0.781099 20.2776 1.19531C20.2776 1.60953 19.9418 1.94531 19.5276 1.94531H1.52756C1.11334 1.94531 0.777557 1.60953 0.777557 1.19531Z"
                                                    fill="white"></path>
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                    d="M0.777557 7.69531C0.777557 7.2811 1.11334 6.94531 1.52756 6.94531H15.5276C15.9418 6.94531 16.2776 7.2811 16.2776 7.69531C16.2776 8.10953 15.9418 8.44531 15.5276 8.44531H1.52756C1.11334 8.44531 0.777557 8.10953 0.777557 7.69531Z"
                                                    fill="white"></path>
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                    d="M0.777557 14.1953C0.777557 13.7811 1.11334 13.4453 1.52756 13.4453H19.5276C19.9418 13.4453 20.2776 13.7811 20.2776 14.1953C20.2776 14.6095 19.9418 14.9453 19.5276 14.9453H1.52756C1.11334 14.9453 0.777557 14.6095 0.777557 14.1953Z"
                                                    fill="white"></path>
                                            </svg>
                                            <span className="hidden pc:block font-medium">Danh mục</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full pc:ml-4 pc:max-w-[570px] relative">
                                    <div className="flex items-center bg-white rounded-full px-4 py-1">
                                        <input type="text"
                                            placeholder="Nhập tên điện thoại, laptop, phụ kiện... cần tìm"
                                            className="w-full outline-none text-sm py-1"
                                            autoComplete="off" name="search" />
                                        <button title="Tìm kiếm" type="submit"
                                            className="bg-red-600 p-2 rounded-full text-white hover:bg-red-700 transition">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.6682 11.6641L14.6682 14.6641" stroke="currentColor"
                                                    strokeWidth="1.5" strokeLinecap="round"
                                                    strokeLinejoin="round"></path>
                                                <path
                                                    d="M13.3362 7.33203C13.3362 4.01832 10.6499 1.33203 7.33618 1.33203C4.02247 1.33203 1.33618 4.01832 1.33618 7.33203C1.33618 10.6457 4.02247 13.332 7.33618 13.332C10.6499 13.332 13.3362 10.6457 13.3362 7.33203Z"
                                                    stroke="currentColor" strokeWidth="1.5"
                                                    strokeLinejoin="round"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="hot-key absolute left-4 top-10 hidden pc:block w-full">
                                        <ul id="hot-keys-container"
                                            className="flex items-center gap-x-3 overflow-auto scrollbar-none text-[10px] text-white/80">
                                            {hot_keys.map((key, idx) => (
                                                <li key={idx} className="text-link whitespace-nowrap text-white b2-regular">
                                                    {key.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="location-menu" className="nav-menu border-b border-gray-200 bg-white shadow-sm">
                <div className="container mx-auto flex items-center py-2 pc:justify-between pc:py-1 px-4 text-sm">
                    <div className="hidden pc:block max-w-[970px]">
                        <nav className="relative">
                            <div className="flex items-center gap-x-6 overflow-x-auto py-1 no-scrollbar">
                                {nav_items.map((item, idx) => (
                                    <Link key={idx} to={item.link || '#'} className="flex items-center gap-2 group whitespace-nowrap">
                                        <img src={item.icon_src} alt={item.name} className="w-5 h-5 flex-shrink-0" />
                                        <span className="font-medium text-gray-700 group-hover:text-red-600 transition truncate max-w-[150px]">
                                            {item.name}
                                        </span>
                                        {item.has_arrow && (
                                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-gray-400 group-hover:text-red-600">
                                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </nav>
                    </div>
                    <div className="flex items-center gap-2 font-medium text-gray-800 cursor-pointer hover:text-red-600 transition ml-auto">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                            xmlns="http://www.w3.org/2000/svg" className="">
                            <path
                                d="M14.9497 13.955C17.6834 11.2201 17.6834 6.78601 14.9497 4.05115C12.2161 1.31628 7.78392 1.31628 5.05025 4.05115C2.31658 6.78601 2.31658 11.2201 5.05025 13.955L6.57128 15.4538L8.61408 17.4389L8.74691 17.5567C9.52168 18.1847 10.6562 18.1455 11.3861 17.4391L13.8223 15.0691L14.9497 13.955ZM10 12C8.34315 12 7 10.6569 7 9C7 7.34315 8.34315 6 10 6C11.6569 6 13 7.34315 13 9C13 10.6569 11.6569 12 10 12Z"
                                fill="#DC2626"></path>
                        </svg>
                        <span className="hidden sm:inline">Chọn khu vực để xem ưu đãi</span>
                        <svg width="16" height="16" viewBox="0 0 16 16"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z"
                                fill="#090D14"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;