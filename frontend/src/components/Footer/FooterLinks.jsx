import { Link } from 'react-router-dom'

export default function FooterLinks({ title, links }) {
  return (
    <div className="w-full space-y-8 md:w-1/2">
      <h3 className="whitespace-nowrap font-mono text-lg font-bold leading-none text-primary-dark">
        {title}
      </h3>

      <ul className="space-y-2">
        {links.map(link => (
          <li key={link.name}>
            <Link
              to={link.path}
              className="text-primary-dark transition-colors duration-300 hover:text-secondary-dark"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
