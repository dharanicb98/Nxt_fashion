import React from 'react'
import Header from './header'

const Layout = ({ children }) => {
  return (
    <div>
        <Header />
        <div className="w-full overflow-y-auto h-screen ">
          <div className="">{children}</div>
          {/* <div className="items-end"><Footer /></div> */}
        </div>
    </div>
  )
}

export default Layout
