const ServiceCommitItem = ({ item }) => {
    return (
        <div className="mb-4 flex md:mb-0 md:flex-col md:items-center">
            <div className="h-[2.75rem] w-[2.75rem] overflow-hidden md:mb-4 md:h-[3.75rem] md:w-[3.75rem]">
                <img
                    alt={item.title}
                    loading="lazy"
                    width="60"
                    height="50"
                    decoding="async"
                    data-nimg="1"
                    style={{ color: 'transparent' }}
                    srcSet={item.srcset}
                    src={item.src}
                />
            </div>
            <div className="pl-4 md:pl-0 md:text-center">
                <p className="text-textOnWhitePrimary b2-semibold">{item.title}</p>
                <p>{item.sub_title}</p>
            </div>
        </div>
    );
};

const ServiceCommit = ({ items = [] }) => {
    if (!items.length) return null;

    return (
        <div className="mb:bg-bgWhiteDefault">
            <div className="container">
                <div
                    id="service-commit-container"
                    className="grid grid-cols-1 py-6 md:grid-cols-4 md:py-10"
                >
                    {items.map((item, index) => (
                        <ServiceCommitItem key={index} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceCommit;
