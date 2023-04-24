import { numberWithCommas } from '../../../utils/formatMoney'
import './bottomOrder.scss'

export default function BottomOrder({sumTotal}) {
    //console.log("total:",sumTotal);
    return (
        <div className="orderpage-bottom">
            <div className="title-bottom">Tổng số : </div>
            <div className="value-title">{numberWithCommas(sumTotal)}</div>
        </div>
    )
}
