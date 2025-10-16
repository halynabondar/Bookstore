export default function Subscribe() {
    return (
        <section className="bg-primary-light h-60 flex">
            <div className='mx-auto flex lg:justify-between justify-evenly gap-4 items-center lg:flex-row flex-col max-w-7xl px-4 py-6 sm:px-6 lg:p-10'>
                <h2 className='text-dark-100 text-3xl md:text-4xl w-full lg:w-1/2'>Subscribe our newsletter for newest books updates</h2>
                <div className='flex gap-4 w-full lg:w-1/2 lg:justify-end'>
                    <input placeholder='Tape your e-mail here...' className='border-0 rounded-md w-60 sm:w-72'></input>
                    <button type='submit'
                            className='bg-primary-dark px-4 py-2 rounded-md text-dark-100 hover:bg-dark-100 font-semibold hover:text-primary-light transition duration-300'>Submit
                    </button>
                </div>
            </div>
        </section>
    )
}