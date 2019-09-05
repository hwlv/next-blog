import Router, { withRouter } from 'next/router'

const ActiveLink = ({ children, href, router }) => {
  const style = {
    marginRight: 10,
    color: router.pathname === href ? 'rgb(0, 0, 0)' : 'rgb(136, 136, 136)'
  }

  const handleClick = e => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}

export default withRouter(ActiveLink)
