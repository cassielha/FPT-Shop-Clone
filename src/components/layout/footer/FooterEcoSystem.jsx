import ecoSystemData from '../../../data/eco_system.json';

const FooterEcoSystem = () => {
    const { eco_system } = ecoSystemData;
    return (
        <div className="container border-t border-strokeOnSpecialDefault px-0 pc:border-0 pc:px-5">
            <div className="border-0 border-strokeOnSpecialDefault py-4 text-textOnSpecialPrimary pc:flex pc:items-center pc:justify-center pc:border-t pc:py-6 FooterBottom_footerButtomMain">
                <p className="">WEBSITE CÙNG FPT RETAIL</p>
                <ul className="grid grid-cols-1 pc:grid-cols-[251px_251px_251px]">
                    {eco_system.map((item, idx) => (
                        <li className='mb-4 border-b border-strokeOnSpecialDefault pb-4 pc:mb-0 pc:border-0 pc:border-r pc:pb-0 px-4 pc:mr-4 pc:px-0 pc:pr-4 pc:text-center' key={idx}>
                            <p className="mb-2.5 b2-semibold mb:uppercase pc:mb-1 pc:f1-regular">{item.title}</p>
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noreferrer"
                                className="pc:flex pc:justify-center"
                            >
                                <img src={item.image} alt={item.title} style={{ color: 'transparent', width: 'auto', height: '31px' }} sizes="(min-width: 150px)" />

                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    )
}