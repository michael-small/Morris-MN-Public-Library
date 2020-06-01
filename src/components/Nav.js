import React, { Component } from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'
import { Menu, X } from 'react-feather'
import Logo from './Logo'

import './Nav.css'

export class Navigation extends Component {
  state = {
    active: false,
    activeSubNav: false,
    currentPath: false
  }

  componentDidMount = () =>
    this.setState({ currentPath: this.props.location.pathname })

  handleMenuToggle = () => this.setState({ active: !this.state.active })

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle()

  toggleSubNav = subNav =>
    this.setState({
      activeSubNav: this.state.activeSubNav === subNav ? false : subNav
    })


  render() {
    const { active } = this.state,
      { subNav } = this.props,
      NavLink = ({ to, className, children, ...props }) => (
        <Link
          to={to}
          className={`NavLink ${
            to === this.state.currentPath ? 'active' : ''
            } ${className}`}
          onClick={this.handleLinkClick}
          {...props}
        >
          {children}
        </Link>
      )

    // This function checks to see if a slug exists in the activated route.
    // If so, then the dropdown class will be 'active'
    const checkSlugInNav = () => {
      let defaultClass = 'NavLink Nav--GroupParent'; // By default, the classname does NOT include active
      let slugArray = subNav.events.map((link) => { // Grab all the slugs, and put into an array
        return link.slug
      })

      slugArray.forEach(slug => { // Now, if the active route includes the slug, set the dropdown class to active
        if (this.props.location.pathname.includes(slug)) {
          defaultClass = 'NavLink Nav--GroupParent active' 
        }
      });
      return defaultClass // In the end, we return the classname, whether or not it is active.
    }

    return (
      <nav className={`Nav ${active ? 'Nav-active' : ''}`}>
        <div className="Nav--Container container">
          <Link to="/" onClick={this.handleLinkClick}>
            <Logo />
          </Link>
          <div className="Nav--Links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/components/">Components</NavLink>

            {/* Posts */}
            <div
              className={`Nav--Group ${
                this.state.activeSubNav === 'posts' ? 'active' : ''
                }`}
            >
              <span
                className={`NavLink Nav--GroupParent ${
                  this.props.location.pathname.includes('posts') ||
                    this.props.location.pathname.includes('blog') ||
                    this.props.location.pathname.includes('post-categories')
                    ? 'active'
                    : ''
                  }`}
                onClick={() => this.toggleSubNav('posts')}
              >

                Blog
                <div className="Nav--GroupLinks">
                  <NavLink to="/blog/" className="Nav--GroupLink">
                    All Posts
                  </NavLink>
                  {subNav.posts.map((link, index) => (
                    <NavLink
                      to={link.slug}
                      key={'posts-subnav-link-' + index}
                      className="Nav--GroupLink"
                    >
                      {link.title}
                    </NavLink>
                  ))}
                </div>
              </span>
            </div>

            {/* Events */}
            <div
              className={`Nav--Group ${
                this.state.activeSubNav === 'events' ? 'active' : ''
                }`}
            >
              <span
                className={checkSlugInNav()} 
                onClick={() => this.toggleSubNav('events')}
              >
                Events
                <div className="Nav--GroupLinks">
                  {subNav.events.map((link, index) => (
                    <NavLink
                      to={link.slug}
                      key={'posts-subnav-link-' + index}
                      className="Nav--GroupLink"
                    >
                      {link.title}
                    </NavLink>
                  ))}
                </div>
              </span>
            </div>

            <NavLink to="/default/">Online Resources</NavLink>
            <NavLink to="/contact/">Contact</NavLink>
          </div>
          <button
            className="Button-blank Nav--MenuButton"
            onClick={this.handleMenuToggle}
          >
            {active ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    )
  }
}

export default ({ subNav }) => (
  <Location>{route => <Navigation subNav={subNav} {...route} />}</Location>
)
