import React from 'react'
import UsersTable from './UsersTable'

function Users() {
    return (
        <div id="manage_user_section" className="manage_user_section main_section">
            <h4 className="text-center my-3">User management</h4>
            <UsersTable/>
        </div>
    )
}

export default Users