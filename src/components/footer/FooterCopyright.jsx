const FooterCopyright = () => {
    const spanStyle = {
        backgroundColor: "rgba(0,0,0,0)",
        color: "rgba(203,209,214,1)",
    };

    return (
        <div className="py-4 pc:py-6 FooterBottom_copyright">
            <div className="container pc:text-center">
                <p style={{ textAlign: "center" }}>
                    <span style={{ backgroundColor: "rgba(0,0,0,0)" }}>©
                        2007 -
                        2024 Công Ty Cổ Phần Bán Lẻ Kỹ Thuật Số FPT • Địa chỉ: 261 - 263 Khánh Hội, P. Vĩnh Hội, TP. Hồ
                        Chí Minh •
                        GPĐKKD số 0311609355 do Sở KHĐT TP.HCM cấp ngày 08/03/2012.
                    </span>
                </p>
                <ul>
                    <li>
                        <span style={spanStyle}>GP số 47/GP-TTĐT do sở TTTT TP HCM cấp ngày 02/07/2018</span>
                    </li>
                    <li>
                        <span style={spanStyle}>Điện thoại: </span>
                        <a rel="nofollow" href="tel:02873023456">
                            <span style={spanStyle}><strong>(028) 7302 3456</strong>&nbsp;</span>
                        </a>
                    </li>
                    <li>
                        <span style={spanStyle}>Email: </span>
                        <a rel="nofollow" href="mailto:fptshop@fpt.com">
                            <span style={spanStyle}><strong>fptshop@fpt.com</strong></span>
                        </a>
                        <span style={spanStyle}>&nbsp;</span>
                    </li>
                    <li>
                        <span style={spanStyle}>Chịu trách nhiệm nội dung: Nguyễn Trịnh Nhật Linh.</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default FooterCopyright;