export default function NavBar(){
    return(
        <div className=" flex flex-row items-center justify-end space-x-8 w-full pr-8 pt-4">
            <a className=" btn-nav" href="/">Home</a>
            <a className=" btn-nav" href="/about">About</a>
            <a className=" btn-nav" href="/privacy_policy">Privacy Policy</a>
        </div>
    )
}