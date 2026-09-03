import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import { useNavigate } from 'react-router-dom'

import StoreBenefits from '../components/Home/StoreBenefits.jsx'
import Container from '../components/Container.jsx'

export default function Home() {
    const navigate = useNavigate()

    return (
        <>
            <section className="relative h-screen w-full overflow-hidden">
                <img
                    className="absolute inset-0 size-full object-cover"
                    src="/main/hero4.webp"
                    alt="Book"
                />

                <div className="absolute inset-0 bg-black/40">
                    <Container className="flex h-full items-center">
                        <div className="flex max-w-xl flex-col gap-y-6 text-left">
                            <h3 className="self-start rounded-xl bg-dark-600 px-4 py-2 uppercase text-textc-onDark">
                                Special offer
                            </h3>

                            <h1 className="text-4xl font-bold text-white md:text-5xl">
                                There is nothing better than to read a book.
                            </h1>

                            <p className="text-xl text-white md:text-2xl">
                                Find the best books for you.
                            </p>

                            <button
                                onClick={() => navigate('/shop')}
                                className="mt-4 flex items-center gap-2 self-start rounded-2xl bg-primary-dark px-6 py-2 text-white transition duration-300 hover:bg-primary-light"
                            >
                                Shop now
                                <AutoStoriesIcon />
                            </button>
                        </div>
                    </Container>
                </div>
            </section>

            <section className="py-10 md:py-12 bg-secondary-light">
                <Container>
                    <StoreBenefits />
                </Container>
            </section>
        </>
    )
}