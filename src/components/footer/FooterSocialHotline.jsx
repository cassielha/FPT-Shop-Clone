
const FooterSocial = ({ socialLinks }) => {
    return (
        <div>
            <p className="px-4 b2-semibold pc:px-0 pc:b1-semibold FooterOne_footerTitle pb-1.5">KẾT NỐI VỚI FPT SHOP</p>
            <ul className="flex px-4 pb-2.5 pc:px-0">
                {socialLinks.map((link, idx) => (
                    <li key={idx}>
                        <a href={link.url} className="mr-3" target="_blank" rel="noreferrer" aria-label={link.name}>
                            <img
                                src={link.icon_srcset.split(' ')[0]}
                                alt={link.name}
                                className="w-8 h-8 hover:opacity-80 transition"
                            />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const FooterHotlines = ({ hotlines }) => {
    return (
        <div className="Accordion_accordion border-t border-strokeOnSpecialDefault px-4 mb:py-4 pc:border-0 pc:px-0">
            <div className="Accordion_accordionHeader hover:cursor-pointer Accordion_active pc:pointer-events-none pc:hover:cursor-auto">
                <p className="b2-semibold FooterOne_footerTitle pc:mb-1.5 pc:mt-3">
                    TỔNG ĐÀI MIỄN PHÍ
                </p>
                <span className="Accordion_accordionIcon pc:hidden"><svg width="16"
                    height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z"
                        fill="var(--neutral-white)"></path>
                </svg></span>
            </div>
            <div className="Accordion_collapse">
                <div className='rc-accordion-body'>
                    <ul className="mt-1.5 pc:mt-0">
                        {hotlines.map((line, idx) => (
                            <li key={idx}>
                                <span className="b2-medium">{line.title}</span>
                                <a href={`tel:${line.phone}`} >
                                    <b>{line.phone}</b> ({line.note})
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

const FooterSocialHotline = ({ socialLinks, hotlines }) => {
    return (
        <div className="border-b border-strokeOnSpecialDefault pc:border-0 pc:px-0 FooterOne_footerOne">
            <FooterSocial socialLinks={socialLinks} />
            <FooterHotlines hotlines={hotlines} />
        </div>
    )
}

export default FooterSocialHotline;
