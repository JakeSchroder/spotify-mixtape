export default function Mixtape(){
    return(
        <>
            <div class='grid grid-cols-2 gap-2'>
                <button class='w-24 rounded-full border-white bg-white text-black font-semibold' id='artists' name='artists'>Artists</button>
                <button class='w-24 rounded-full border-white bg-white text-black font-semibold' id='songs' name='songs'>Songs</button>
            </div>
            <div class='grid grid-cols-1 gap-2'>
                <button class='w-40 rounded-full border-white bg-white text-black font-semibold' id='last-month' name='last-month'>Last Month</button>
                <button class='w-40 rounded-full border-white bg-white text-black font-semibold' id='6-months' name='6-months'>6 Months</button>
                <button class='w-40 rounded-full border-white bg-white text-black font-semibold' id='all-time' name='all-time'>All Time</button>
            </div>
            <img src="https://unblast.com/wp-content/uploads/2021/02/Vintage-Cassette-Tape-Mockup-1536x1143.jpg"></img>
            
            <div class='flex flex-col gap-2 justify-center'>
                <div class='flex justify-center'>
                    <button class='w-24 rounded-full border-white bg-white text-black font-semibold' id="share" name='share'>Share</button>
                </div>
                <button class='w-40 rounded-full border-white bg-white text-black font-semibold' id="create-playlist" name='create-playlist'>Create Playlist</button>
            </div>
        </>
    )
}