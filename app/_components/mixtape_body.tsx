export default function MixtapeBody(){
    return(
        <div className=" flex flex-col items-center space-y-4 p-6 min-h-screen">
            <h1 className=" text-4xl ">Your Most Niche</h1>
            <div className=" flex flex-row">
                <button className=" btn-filter">Tracks</button>
                <button className=" btn-filter">Artists</button>
            </div>
            <h1 className=" text-4xl ">Within the Last</h1>

            <div className=" flex flex-row">
                <button className=" btn-filter">Month</button>
                <button className=" btn-filter">6 Months</button>
                <button className=" btn-filter">Year</button>
                <button className=" btn-filter">All Time</button>
            </div>
            <h1>Nichify content</h1>
            <button className=" btn-spotify">Download Image</button>
            <button className=" btn-spotify">Share</button>
        </div>
    )
}