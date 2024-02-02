//"Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements; and to You under the Apache License, Version 2.0. "

type Props = {
    id: string;
    title: string;
    formState: any;
    register: any;
    options: any;
}

const MySelect = ({id, title,formState, register, options}: Props) => {
  return (
    <div className="my-select">
      <div><label htmlFor={id}>{title}</label></div>
      <select {...register} 
        id={id}
        className="form-select" 
        aria-label={title}
        value={formState[id]}>
            {Object.keys(options).map(k => <option value={k} key={k}>{options[k]}</option>)}
      </select>
    </div>
  )
}

export default MySelect