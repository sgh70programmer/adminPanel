import React, { useEffect, useState } from 'react'
import SpinnerLoad from '../../components/SpinnerLoad'
import { getOrdersStatisticsService } from '../../services/orders'
import Card from './Card'

const cardObjects = [
    {
        key:1,
        name: "carts",
        currentValue:"",
        title:"Today's shopping cart",
        desc:"Today's remaining shopping carts",
        icon:"fas fa-shopping-basket",
        lastWeekValue:"",
        lastMonthValue:"",
    },
    {
        key:2,
        name: "pendingOrders",
        currentValue:"",
        title:"Today's remaining orders",
        desc:"Pending and unpaid orders",
        icon:"fas fa-dolly",
        lastWeekValue:"",
        lastMonthValue:"",
    },
    {
        key:3,
        name: "successOrders",
        currentValue:"",
        title:"Today's Orders",
        desc:"Complete and paid orders",
        icon:"fas fa-luggage-cart",
        lastWeekValue:"",
        lastMonthValue:"",
    },
    {
        key:4,
        name:"successOrdersAmount",
        currentValue:"",
        title:"Today's Income",
        desc:"Total amounts paid (tomans)",
        icon:"fas fa-money-check-alt",
        lastWeekValue:"",
        lastMonthValue:"",
    },
]

const Cards = () => {
    const [cardInfos, setCardInfos] = useState(cardObjects)
    const [loading, setLoading] = useState(false)

    const handleGetCardInfos = async ()=>{
        setLoading(true)
        const res = await getOrdersStatisticsService()
        setLoading(false)
        if (res.status === 200) {
            const data = res.data.data
            let newCardObj = [...cardObjects]
            for (const key in data) {
                const index = newCardObj.findIndex(co=>co.name == key)
                newCardObj[index].currentValue = data[key].today
                newCardObj[index].lastWeekValue = data[key].thisWeek
                newCardObj[index].lastMonthValue = data[key].thisMonth
            }
            setCardInfos(newCardObj)
        }
    }

    useEffect(()=>{
        handleGetCardInfos()
    },[])

    return (
        <div className="row">
            {loading ? (<SpinnerLoad colorClass={"text-primary"}/>) 
            : cardInfos.map(cardInfo=>(
                <Card {...cardInfo}/>
            ))}
        </div>
    )
}

export default Cards