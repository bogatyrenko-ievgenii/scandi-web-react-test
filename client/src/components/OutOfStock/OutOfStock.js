import './OutOfStock.scss'

export default function OutOfStock({ percent }) {
    return <div className="OutOfStock" style={{ paddingTop: percent + '%' }}>out of stock</div>
}