import React from 'react'
import Leftcontent from "./LeftContent";
import Rightcontent from "./RightContent";

export default function Index() {
    return (
        <nav className="navbar fixed-top navbar-dark bg-secondary top_navbar py-0">
            <div className="container-fluid h-100 pe-0">

                <Rightcontent />

                <Leftcontent />


            </div>
        </nav>
    )
}
