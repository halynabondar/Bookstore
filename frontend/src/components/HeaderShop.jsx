import Container from "./Container"

export default function HeaderShop() {
  return (
      <section className="bg-secondary-light/60">
        <Container>
          <div className="flex h-auto flex-col items-start justify-center gap-4 py-8 md:h-56 md:flex-row md:items-center md:gap-16">
            <h1 className="w-full text-nowrap text-4xl md:w-1/2 md:text-5xl">
              Our Book Collection
            </h1>

            <p className="w-full text-left text-lg md:w-1/2 md:text-right">
              Explore different collections and discover new perspectives,
              knowledge, and inspiration.
            </p>
          </div>
        </Container>
      </section>
  )
}