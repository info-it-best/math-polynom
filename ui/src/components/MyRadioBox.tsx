//"Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements; and to You under the Apache License, Version 2.0. "

type Props = {
    id: string;
    formState: any;
    register: any;
}

const MyRadioBox = ({id, formState, register
}: Props) => {
  return (
    <label className="form-check-label" htmlFor={id}>
      <input {...register
      }
        className="form-check-input" type="radio" id={id} value={id} 
        checked={formState.mathProvider == id}/>
      {id}
    </label>
  )
}

export default MyRadioBox