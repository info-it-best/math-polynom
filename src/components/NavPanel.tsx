//"Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements; and to You under the Apache License, Version 2.0. "

import MyNavLink from "./MyNavLink";

const NavPanel = () => {
  return (
      <nav>
          <ul className="list-group list-group-horizontal">
            <MyNavLink type="home" to="/">Home</MyNavLink>
            <MyNavLink type="help" to="/help">Help</MyNavLink>
            <MyNavLink type="author" to="/author">Author</MyNavLink>
          </ul>
      </nav>
  )
}

export default NavPanel