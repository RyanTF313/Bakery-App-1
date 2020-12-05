import React from 'react'
import { 
    Button,
    Card 
} from 'react-bootstrap'

const getStatus = (order)=>{
    switch (true) {
        case order.confirmed === true && order.fullfilled === false:
            return 'success'
            break;
        case order.confirmed === true && order.fullfilled === true:
            return 'dark'
            break;
        default:
            return 'light'
            break;
    }
}

export default function OrderCard({ order, openModal, setTarget }) {
    let status = getStatus(order)
    
    return (
        <div>
            <Card bg={status} text={status === 'light' ? 'dark' : 'light'} style={{ width: '16rem' }} key={order._id}>
                <Card.Body>
                    <Card.Title>{order.name}</Card.Title>
                    <Card.Text as={'div'}>
                        <p>{order.phone}</p>
                        <p>{order.email}</p>
                    </Card.Text>
                    <Button variant={status === 'light' ? 'dark' : 'light'} onClick={()=>{
                        setTarget()
                        openModal()                                                
                    }} >View This Order</Button>
                </Card.Body>
            </Card>
        </div>
    )
}
