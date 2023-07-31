export default function Footer(){
    return(
        <div className=" flex flex-col items-center space-y-2 pb-5" >
            <hr className=" w-2/3 "/>
            <h3 className=" text-center">Made By Jake Schroder</h3>
            <div className=" flex flex-row items-center space-x-3">
                <a className=" btn-nav brightness-50" href="/">Home</a>
                <a className=" btn-nav brightness-50" href="/about">About</a>
                <a className=" btn-nav brightness-50" href="/privacy_policy">Privacy Policy</a>
            </div>
        </div>
    )
}