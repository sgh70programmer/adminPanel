import React from 'react'
import ColorsTable from './ColorsTable'

const Colors = () => {
    return (
        <div id="manage_color_section" className="add_color_section main_section">
            <h4 className="text-center my-3">Color management</h4>

            <ColorsTable />
        </div>

    )
}

export default Colors
