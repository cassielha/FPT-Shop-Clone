import React, { useContext } from 'react';
import Layout from '../layout/Layout';
import CartContext from '../context/CartContext';
import CartNoti from '../components/cart/CartNoti';
import BannerSlider from '../components/home/BannerSlider';
import HomeCardSlider from '../components/home/HomeCardSlider';
import CategorySlider from '../components/home/CategorySlider';
import UtilitiesServices from '../components/home/UtilitiesServices';
import ServiceCommit from '../components/home/ServiceCommit';
import LnySaleOff from '../components/home/LnySaleOff';
import SimSlider from '../components/home/SimSlider';
import ProductSlider from '../components/home/ProductSlider';
import SpecialOfferSlider from '../components/home/SpecialOfferSlider';
import GoldenHourSlider from '../components/home/GoldenHourSlider';


import Banner from '../data/banners.json';
import HomeCard from '../data/home_cards.json';
import Category from '../data/categories.json';
import UtilitiesServicesData from '../data/utilities_services.json';
import ServiceCommitData from '../data/service_commit.json';
import LnySaleOffData from '../data/lny_sale_off.json';
import SimFptData from '../data/sim_fpt.json';
import ProductData from '../data/products.json';
import SpecialOfferData from '../data/special_offer_images.json';
import GoldenHoursData from '../data/golden_hours.json';

const Home = () => {
    const { showNoti, setShowNoti } = useContext(CartContext);
    return (
        <>
            <title>Fptshop.com.vn | Điện thoại, Laptop, Điện máy, Gia dụng, Phụ kiện chính hãng giá tốt nhất</title>
            <link rel="icon" href="https://fptshop.com.vn/favicon.ico" type="image/x-icon" sizes="48x48"></link>
            <Layout>
                <CartNoti show={showNoti} onClose={() => setShowNoti(false)} />
                <div className="h-full" style={{ backgroundColor: "rgba(239, 240, 242)" }}>
                    <BannerSlider bannerData={Banner.banners} />
                    <div className='relative z-1'>
                        <HomeCardSlider data={HomeCard.home_cards[0]} slidesPerView={2} />
                        <CategorySlider data={Category.categories[0]} />
                        <GoldenHourSlider sessions={GoldenHoursData.golden_hours} />
                        <CategorySlider data={Category.categories[1]} />
                        <HomeCardSlider data={HomeCard.home_cards[1]} slidesPerView={3} />
                        <LnySaleOff items={LnySaleOffData.lny_sale_off} />
                        <UtilitiesServices items={UtilitiesServicesData.utilities} />
                        <ProductSlider data={ProductData.categories[0]} />
                        <ProductSlider data={ProductData.categories[1]} />
                        <SpecialOfferSlider items={SpecialOfferData.special_offers} />
                        <ProductSlider data={ProductData.categories[2]} />
                        <SimSlider categories={SimFptData.sim_fpt} />
                        <HomeCardSlider data={HomeCard.home_cards[2]} slidesPerView={3} />
                        <ServiceCommit items={ServiceCommitData.service_commit} />
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Home;
