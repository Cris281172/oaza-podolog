const MAP_URL =
    'https://www.google.com/maps?q=Gabinet%20Podologiczna%20Oaza%2C%20Mieczys%C5%82awy%20%C4%86wikli%C5%84skiej%201E%2C%2025-437%20Kielce&z=16&output=embed';

const ExternalMap = () => (
    <iframe
        title="Lokalizacja gabinetu Podologiczna Oaza w Kielcach"
        src={MAP_URL}
        width="100%"
        height="100%"
        className="border-0 contrast-110 grayscale-[0.2]"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
    />
);

export default ExternalMap;
