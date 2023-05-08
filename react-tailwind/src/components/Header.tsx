import Logo from './Logo'
import viteLogo from '../assets/vite.svg'
import reactLogo from '../assets/react.svg'

function Header() {
  return (
    <div className="flex my-14 mx-auto w-fit gap-8">
      <Logo
        source={reactLogo}
        anim={true}
        size="w-24"
      />
      <Logo
        source={viteLogo}
        size="w-20"
      />
    </div>
  )
}

export default Header
