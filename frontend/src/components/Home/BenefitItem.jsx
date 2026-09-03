export default function BenefitItem({icon, title, description}) {
    return (
        <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-secondary-dark text-secondary-light [&>svg]:text-3xl">
                {icon}
            </div>
            <h3 className="text-lg pt-4 font-semibold">{title}</h3>
            <p className="text-gray-500">{description}</p>
        </div>
    )
}