//"Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements; and to You under the Apache License, Version 2.0. "

import { ReactNode } from 'react'

type Props = {
    isShown: boolean;
    type: 'primary' | 'secondary' | 'success' | 'danger'
    children: ReactNode;
}

const MyAlert = ({isShown, type, children}: Props) => {
  return (
    <>{isShown && <div className={`alert alert-${type}`} role="alert">{children}</div>}</>
  )
}

export default MyAlert