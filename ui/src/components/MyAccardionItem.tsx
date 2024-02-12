//"Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements; and to You under the Apache License, Version 2.0. "

import { ReactNode, useState } from 'react'

type Props = {
    id: string
    title: string
    isCollapsed: boolean
    children: ReactNode
}

const MyAccardionItem = ({id, title, isCollapsed, children}: Props) => {
  const [collapsed, setCollapsed] = useState(isCollapsed)
  return (
    <div className="accordion-item">
    <h2 className="accordion-header">
      <button 
        className={`accordion-button ${collapsed && "collapsed"}`} 
        type="button" aria-expanded="true" aria-controls={id} 
        onClick={() => setCollapsed(!collapsed)}>
        {title}
      </button>
    </h2>
    <div id={id} className={`accordion-collapse ${collapsed && "collapse"}`} data-bs-parent="#accordionExample">
      <div className="accordion-body">
        {children}  
      </div>
    </div>
  </div>
  )
}

export default MyAccardionItem