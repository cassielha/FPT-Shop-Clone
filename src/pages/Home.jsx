import Layout from '../layout/Layout';
import BannerSlider from '../components/home/BannerSlider';
import HomeCardSlider from '../components/home/HomeCardSlider';
import CategorySlider from '../components/home/CategorySlider';
import UtilitiesServices from '../components/home/UtilitiesServices';
import ServiceCommit from '../components/home/ServiceCommit';
import LnySaleOff from '../components/home/LnySaleOff';
import SimSlider from '../components/home/SimSlider';

import Banner from '../data/banners.json';
import HomeCard from '../data/home_cards.json';
import Category from '../data/categories.json';
import UtilitiesServicesData from '../data/utilities_services.json';
import ServiceCommitData from '../data/service_commit.json';
import LnySaleOffData from '../data/lny_sale_off.json';
import SimFptData from '../data/sim_fpt.json';

const findSection = (data, id) => data.find(section => section.id === id) ?? {};
const Home = () => {
    return (
        <>
            <title>Fptshop.com.vn | Điện thoại, Laptop, Điện máy, Gia dụng, Phụ kiện chính hãng giá tốt nhất</title>
            <link rel="icon" href="https://fptshop.com.vn/favicon.ico" type="image/x-icon" sizes="48x48"></link>
            <Layout>
                <div className="h-full" style={{ backgroundColor: "rgba(239, 240, 242)" }}>
                    <BannerSlider bannerData={Banner.banners} />
                    <div className='relative z-1'>
                        <HomeCardSlider data={findSection(HomeCard.home_cards, 'cards')} slidesPerView={2} />
                        <CategorySlider data={findSection(Category.categories, 'categories')} />
                        <CategorySlider data={findSection(Category.categories, 'recommendations')} />
                        <HomeCardSlider data={findSection(HomeCard.home_cards, 'middle_cards')} slidesPerView={3} />
                        <LnySaleOff items={LnySaleOffData.lny_sale_off} />
                        <UtilitiesServices items={UtilitiesServicesData.utilities} />
                        <HomeCardSlider data={findSection(HomeCard.home_cards, 'payment_offers')} slidesPerView={3} />
                        <SimSlider categories={SimFptData.sim_fpt} />
                        <ServiceCommit items={ServiceCommitData.service_commit} />
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Home;
