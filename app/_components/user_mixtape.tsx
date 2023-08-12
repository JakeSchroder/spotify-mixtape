import Image from "next/image"
interface TrackProvider {
    name:string,
    artist:string,
    artist_popularity: string,
    track_popularity: string
}
interface DefaultProps {
    time_frame:string,
    category:string,
    mixtapeTopTracks: Array<any>,
    user_name: string,
}

export default function UserMixtape(props:DefaultProps){
    const date = Date().slice(4, 15);
    return (
        <div className=' relative text-center'>
            <Image
            className=' w-full'
            src="/prescription_pad.png"
            alt="Prescription Pad"
            width={600}
            height={400}
            priority/>
            <h1 className=" absolute top-[45px] left-[290px] text-text">{props.user_name}</h1>
            {props?.category =='tracks'? 
                <h1 className=" absolute text-text top-[75px] left-[290px] text-left w-1/2">Your most niche tracks within the last <i>{props.time_frame.replace('_',' ')}</i></h1> 
                : 
                <h1 className=" absolute text-text top-[75px] left-[290px] text-left w-1/2">Your most niche artists within the last <i>{props.time_frame.replace('_',' ')}</i></h1>}
            <h1 className=" absolute top-[165px] right-[145px] text-text">{date}</h1>
            <table className=' absolute top-1/4 left-[75px] w-[500px]'>
                <tbody>
                    {props.mixtapeTopTracks?.map((track:TrackProvider,index:number)=>{
                        return(
                            <tr className='flex gap-8 w-max py-1 ' key={index}>
                                <td className=" text-text text-start w-[25px]">{String(index+1).padStart(2, '0')}</td>
                                {props?.category =='tracks'? <td className=" text-text w-[300px] text-start">{track?.name} - {track?.artist}</td> : <td className=" text-text w-[300px] text-start">{track?.artist}</td>}
                                <td className=" text-text text-right">{100-Number(track.track_popularity)} - ranking</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>            
)}