import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'

const storeStats = [
  {
    value: '10k+',
    label: 'Books to Discover',
    icon: AutoStoriesOutlinedIcon,
  },
  {
    value: '5k+',
    label: 'Happy Customers',
    icon: PeopleAltOutlinedIcon,
  },
  {
    value: '50+',
    label: 'Trusted Publishers',
    icon: VerifiedOutlinedIcon,
  },
]

export default function StoreStats() {
  return (
    <section className="grid w-full grid-cols-1 gap-10 bg-secondary-light px-6 py-12 sm:grid-cols-3 sm:gap-32 sm:px-10 lg:px-20">
      {storeStats.map(stat => {
        const Icon = stat.icon

        return (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-2 text-center lg:gap-3"
          >
            <div className="flex size-14 items-center justify-center rounded-full bg-secondary-dark/10">
              <Icon className="text-secondary-dark" sx={{ fontSize: 30 }} />
            </div>

            <p className="text-4xl font-bold text-secondary-dark sm:text-5xl lg:text-6xl">
              {stat.value}
            </p>

            <p className="text-sm text-dark-500 sm:text-base">{stat.label}</p>
          </div>
        )
      })}
    </section>
  )
}
