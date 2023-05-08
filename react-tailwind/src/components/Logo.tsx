import PropTypes from 'prop-types'

interface LogoProps {
  source: string
  anim?: boolean
  size?: string
}

function Logo({ source, anim, size }: LogoProps) {
  return (
    <div className={`flex  ${anim ? 'animate-bounce' : ''}`}>
      <img
        className={`${size ? size : 'w-16'} h-auto object-contain`}
        src={source}
        alt=""
      />
    </div>
  )
}

Logo.propTypes = {
  source: PropTypes.string.isRequired,
  anim: PropTypes.bool,
  size: PropTypes.string,
}

export default Logo
