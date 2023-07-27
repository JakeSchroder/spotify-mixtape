export default function NavBar(){
    return(
        <div className=" flex flex-row items-center justify-end space-x-8 w-full pr-8 pt-4">
            <a className=" btn-nav">Home</a>
            <a className=" btn-nav">About</a>
            <a className=" btn-nav">Privacy Policy</a>
            <a className=" btn-nav">Contact</a>
        </div>
    )
}