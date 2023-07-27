export default function MixtapeBody(){
    return(
        <div className=" flex flex-col items-center space-y-4">
            <div className=" flex flex-row">
                <button className=" btn-filter">Top Tracks</button>
                <button className=" btn-filter">Top Artists</button>
            </div>
            <div className=" flex flex-row">
                <button className=" btn-filter">Last Month</button>
                <button className=" btn-filter">Last 6 Months</button>
                <button className=" btn-filter">Last Year</button>
                <button className=" btn-filter">All Time</button>
            </div>
            <h1>Nichify content</h1>
            <button className=" btn-secondary">Download Image</button>
            <button className=" btn-secondary">Share</button>
        </div>
    )
}