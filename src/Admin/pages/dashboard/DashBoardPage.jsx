import './dashboardPage.scss'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import WidgetSm from '../../components/widgetSm/WidgetSm'
import WidgetLg from '../../components/widgetLg/WidgetLg'

export default function DashBoardPage() {
    return (
        <div className='dashboardPage-wrapper'>
            <div className="dashboardPage-container">
                <FeaturedInfo />
                <div className="homeWidgets">
                    <WidgetSm />
                    <WidgetLg />
                </div>
            </div>
        </div>
    )
}
