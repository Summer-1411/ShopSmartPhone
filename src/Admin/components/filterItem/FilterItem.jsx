import './filterItem.scss'

export default function FilterItem({filter}) {
    return (
        <div className='filterItem-wrapper'>
            <div className="item-filter">
                {filter.color}
            </div>
            <div className="item-filter">
                {filter.size}
            </div>
            <div className="item-filter">
                {filter.quantity}
            </div>
            <div className="item-filter">
                {filter.price}
            </div>
            <div className="item-filter-img">
                <img src={filter.file && URL.createObjectURL(filter.file)} alt="" className="img-filter" />
            </div>
            <div className="item-filter">
                <button className="btn btn-delete-filter">Xoa</button>
            </div>
        </div>
    )
}
