//"Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements; and to You under the Apache License, Version 2.0. "

import { ReactNode } from 'react'

type Props = {
    id: string
    children: ReactNode
}

const MyAccardion = ({id, children}: Props) => {
  return (
    <div className="accordion open" id={id}>{children}</div>
  )
}

export default MyAccardion