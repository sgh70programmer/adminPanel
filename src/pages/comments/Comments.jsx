import React from 'react'
import CommentsTable from './CommentsTable'


const Comments = () => {
    return (
        <div id="manage_comments_section" className="manage_comments_section main_section">
            <h4 className="text-center my-3">Manage comments</h4>
           <CommentsTable/>
        </div>
    )
}

export default Comments
