import { useEffect, useState } from 'react'
// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, MenuItem, SubMenu } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='bx-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }: Props) => {

  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()

  // Vars
  const { transitionDuration, isBreakpointReached } = verticalNavOptions

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  const [currentRole, setCurrentRole] = useState('')

  useEffect(() => {
    const role = localStorage.getItem('testing-role')
    setCurrentRole(role || "");

  }, [])
  // const menuItems = [
  //   { label: 'Dashboard', path: '/dashboard', roles: ['admin'] },
  //   { label: '', path: '/admin', roles: ['admin'] },
  //   { label: 'Editor Tools', path: '/editor', roles: ['admin', 'editor'] },
  // ];

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
          className: 'bs-full overflow-y-auto overflow-x-hidden',
          onScroll: container => scrollMenu(container, false)
        }
        : {
          options: { wheelPropagation: false, suppressScrollX: true },
          onScrollY: container => scrollMenu(container, true)
        })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 27 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='bx-bxs-circle' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuItem href='/dashboard' icon={<i className='bx-home-smile' />}>
          Dashboard
        </MenuItem>
        {
          currentRole == "admin" && <MenuItem href='/coursemanagement' icon={<i className='bx-food-menu' />}>
            Course Management
          </MenuItem>
        }
        {
          currentRole == "admin" && <MenuItem href='/users' icon={<i className='bx-user' />}>
            Users
          </MenuItem>}
        <MenuItem href='/my-courses' icon={<i className='bx-book-open' />}>
          My Courses
        </MenuItem>
        {
          currentRole == "admin" && <SubMenu label="Roles & Permission" icon={<i className='bx-check-shield' />}>
            <MenuItem href='/roles'>Roles</MenuItem>
            <MenuItem href='/permissions'>permissions</MenuItem>
          </SubMenu>}
      </Menu>
      {/* <Menu
        popoutMenuOffset={{ mainAxis: 27 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='bx-bxs-circle' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <GenerateVerticalMenu menuData={menuData(dictionary)} />
      </Menu> */}
    </ScrollWrapper>
  )
}

export default VerticalMenu
