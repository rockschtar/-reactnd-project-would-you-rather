import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

const MenuLink = (props) => {
  const { to, location, children } = props
  const className = 'item'
  const classNames = location.pathname === to ? [className, 'active'].join(' ') : className

  return (
    <Link to={to} className={classNames}>{children}</Link>
  )
}

MenuLink.propTypes = {
  to: PropTypes.string.isRequired,
}

export default withRouter(MenuLink)
