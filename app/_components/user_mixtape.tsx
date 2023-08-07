interface TrackProvider {
    name:string,
    artist:string,
    artist_popularity: string
}
interface DefaultProps {
    time_frame:string,
    category:string,
    mixtapeTopTracks: Array<any>
}

export default function UserMixtape(props:DefaultProps){

    return props.mixtapeTopTracks?.map((track:TrackProvider,index:number)=>{
                    return(
                        <div className='flex gap-2' key={index}>
                            {props?.category =='tracks'? <h1>{track?.name} - {track?.artist}</h1>:<h1>{track?.artist}</h1>}
                            <h1>| {track?.artist_popularity} followers</h1>
                        </div>
                    )
            })
            
    
}