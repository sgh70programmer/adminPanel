import React from 'react'
import RolesTable from './RolesTable'

const Roles = () => {
    return (
        <div id="manage_role_section" className="manage_role_section main_section">
            <h4 className="text-center my-3">Manage roles</h4>
            <RolesTable/>
        </div>

    )
}

export default Roles