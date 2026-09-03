import BenefitItem from "./BenefitItem.jsx";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShipping';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';

const benefits = [
    {
        title: "Fast Delivery",
        icon: <LocalShippingOutlinedIcon/>,
        description:
            "Get your favorite books delivered quickly and safely right to your doorstep.",
    },
    {
        title: "Secure Payment",
        icon: <CreditCardOutlinedIcon/>,
        description:
            "Shop with confidence using our safe and trusted payment options.",
    },
    {
        title: "Carefully Selected",
        icon: <AutoAwesomeOutlinedIcon/>,
        description:
            "Discover books thoughtfully selected for every reader and every interest.",
    },
    {
        title: "Easy Returns",
        icon: <ReplayOutlinedIcon/>,
        description:
            "Changed your mind? Return your order easily within our return period.",
    },
];

export default function StoreBenefits() {
    return (
        <section className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
                <BenefitItem
                    key={benefit.title}
                    title={benefit.title}
                    description={benefit.description}
                    icon={benefit.icon}
                />
            ))}
        </section>
    )
}