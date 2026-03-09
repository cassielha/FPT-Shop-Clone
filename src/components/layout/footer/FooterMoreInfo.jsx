const ChevronDownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z" fill="var(--neutral-white)" />
    </svg>
);

const FooterMoreInfo = ({ title, items }) => {
    return (
        <div className='FooterMain_footerTwo border-solid border-b-strokeOnSpecialDefault mb:border-b mb:p-4'>
            <div className="Accordion_accordion">
                <div className='Accordion_accordionHeader hover:cursor-pointer Accordion_active pc:pointer-events-none pc:hover:cursor-auto'>
                    <p className="mb:b2-semibold pc:pb-1.5 pc:b1-semibold FooterMain_footerTitle">
                        {title}
                    </p>
                    <span className="Accordion_accordionIcon pc:hidden"><ChevronDownIcon /></span>
                </div>
                <div className='Accordion_collapse'>
                    <div className='rc-accordion-body'>
                        <ul className="space-y-2 mt-1.5">
                            {items.map((item, idx) => (
                                <li key={idx}>
                                    <a
                                        href={item.link}
                                        target={item.new_tab ? '_blank' : '_self'}
                                        rel="noopener noreferrer"
                                        className="text-link"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterMoreInfo;
