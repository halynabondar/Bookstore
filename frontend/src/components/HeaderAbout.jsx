export default function HeaderAbout() {
    return (
        <div className='w-full bg-secondary-light/60'>
            <div className='flex flex-col md:flex-row max-w-7xl mx-auto h-auto md:h-56 px-4 py-8 sm:px-6 lg:px-10 gap-4 md:gap-16 items-start md:items-center justify-center'>
                <h1 className="w-full md:w-1/2 text-4xl md:text-5xl text-nowrap">About us</h1>
                <p className='w-full md:w-1/2 flex text-lg text-left md:text-right'>At BookStore, we believe in the power of literature to transport us to new worlds, ignite our imagination, and inspire personal growth.</p>
            </div>
        </div>
    )
}
