import Layout from '../layout/Layout';
import BannerSlider from '../components/home/BannerSlider';
import HomeCardSlider from '../components/home/HomeCardSlider';
import CategorySlider from '../components/home/CategorySlider';

import Banner from '../data/banners.json';
import HomeCard from '../data/home_cards.json';
import Category from '../data/categories.json';

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
                        <CategorySlider categorySection={findSection(Category.categories, 'categories')} />
                        <CategorySlider categorySection={findSection(Category.categories, 'recommendations')} />
                        <HomeCardSlider data={findSection(HomeCard.home_cards, 'middle_cards')} slidesPerView={3} />
                        <HomeCardSlider data={findSection(HomeCard.home_cards, 'payment_offers')} slidesPerView={3} />
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Home;
