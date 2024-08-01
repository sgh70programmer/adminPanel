import { FastField } from 'formik'
import React from 'react'

const Switch = ({ name, label }) => {
  return (
    <div className='d-flex gap-2'>
      <label className="form-check-label">{label}</label>
      <div className="form-check form-switch">

        <FastField
          className="form-check-input"
          type="checkbox"
          name={name}
        />


      </div>

    </div>






  )
}

export default Switch