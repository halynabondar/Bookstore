import HeaderShop from '../components/HeaderShop.jsx'
import BooksList from '../components/Shop/BooksList.jsx'
import Filter from '../components/Shop/Filter.jsx'
import Container from "../components/Container.jsx";

export default function Shop() {
    return (
        <>
            <HeaderShop/>
            <main className="py-6 lg:py-10">
                <Container>
                    <div className="grid grid-cols-4 gap-16">
                        <div className="col-span-1">
                            <Filter/>
                        </div>

                        <div className="col-span-3">
                            <BooksList/>
                        </div>
                    </div>
                </Container>
            </main>
        </>
    )
}
