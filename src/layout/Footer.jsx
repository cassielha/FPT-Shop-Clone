import socialLinksData from '../data/social_links.json';
import hotlinesData from '../data/hotlines.json';
import aboutUsData from '../data/about-us.json';
import partnerData from '../data/partner.json';

import FooterEcoSystem from '../components/footer/FooterEcoSystem';
import FooterCopyright from '../components/footer/FooterCopyright';
import FooterTopSection from '../components/footer/FooterTopSection';
import FooterSocialHotline from '../components/footer/FooterSocialHotline';
import FooterMoreInfo from '../components/footer/FooterMoreInfo';

const Footer = () => {
    const { social_links } = socialLinksData;
    const { hotlines } = hotlinesData;
    const { data: aboutUsGroups } = aboutUsData;

    const { partner } = partnerData;

    const paymentPartner = partner.find(p => p.id === 'payment_support');
    const certifications = partner.find(p => p.id === 'certification');

    return (
        <footer className="relative z-[1] bg-[#090d14] pc:min-w-[var(--container-content)]">

            <FooterTopSection />

            <div className="container flex flex-wrap px-0 py-4 text-textOnSpecialPrimary pc:px-5 pc:py-10">
                <div className="grid pc:grid-cols-3 pc:gap-3 FooterMain_footerMainGroup">

                    <FooterSocialHotline socialLinks={social_links} hotlines={hotlines} />

                    {aboutUsGroups.map((group, idx) => (
                        <FooterMoreInfo key={idx} title={group.name} items={group.items} />
                    ))}
                </div>

                {/* Partner Section (Payment + Certifications) */}
                <div className="w-full pc:w-[12.75rem] FooterMain_footerFour">
                    {paymentPartner && (
                        <div className="px-4 pb-4 pc:px-0 pc:pb-0">
                            <p className="mb-3 pt-4 b2-semibold pc:mb-2 pc:pt-0 pc:b1-semibold FooterMain_footerTitle">{paymentPartner.name}</p>
                            <div className="flex flex-wrap gap-1 pc:grid pc:grid-cols-4">
                                {paymentPartner.items.map((item, idx) => (
                                    <img
                                        src={item.srcset.split(' ')[0]}
                                        alt={item.name}
                                        className="h-7 w-auto object-contain"
                                    />

                                ))}
                            </div>
                        </div>
                    )}
                    {certifications && (
                        <div className='border-t border-strokeOnSpecialDefault px-4 pt-4 pc:mb-2 pc:border-0 pc:px-0 pc:pt-8'>
                            <p className="mb-3 b2-semibold pc:b1-semibold FooterMain_footerTitle">{certifications.name}</p>
                            <ul className="flex flex-wrap gap-x-1 gap-y-2.5 pc:gap-x-2">
                                {certifications.items.map((item, idx) => (
                                    <li key={idx}>
                                        {item.link ? (
                                            <a href={item.link} target="_blank" rel="noreferrer">
                                                <img src={item.srcset.split(' ')[0]} alt={item.name} className="h-8 w-auto object-contain" />
                                            </a>
                                        ) : (
                                            <img src={item.srcset.split(' ')[0]} alt={item.name} className="h-8 w-auto object-contain" />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <FooterEcoSystem />

            <FooterCopyright />

        </footer>
    );
};

export default Footer;
