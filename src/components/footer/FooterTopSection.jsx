const FooterTopSection = () => {
    return (
        <div className="border-b border-strokeOnSpecialDefault pc:border-0">
            <div className="container mx-auto px-4">
                <div className="items-center border-0 border-white/10 py-4 pc:flex pc:border-b pc:py-10">
                    <div className="flex-1 text-center pc:text-left">
                        <p className="pb-2 text-textOnSpecialPrimary h5-16-semibold">Hệ thống FPT Shop trên toàn quốc</p>
                        <p className="mb-4 text-textOnSpecialSecondary f1-medium pc:mb-0 pc:b2-regular">
                            Bao gồm Cửa hàng FPT Shop, Trung tâm Điện máy, Trung tâm Laptop, F.Studio, S.Studio, Garmin Brand Store
                        </p>
                    </div>
                    <div className="text-center">
                        <a
                            className="Button_root Button_btnLarge Button_redPrimary FooterTop_btnStoreSystem"
                            href="https://fptshop.com.vn/cua-hang"
                            target="_blank" rel="noreferrer"
                        >
                            Xem danh sách cửa hàng
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterTopSection