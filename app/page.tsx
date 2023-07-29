'use client'
import NavBar from "./_components/navbar";
import Footer from "./_components/footer";
import LoginBody from "./_components/login_body";

export default function Home() {
  //console.log(localStorage.getItem('access_token'))
  // check if access token is valid/available by making request
  // if it is then load mixtape body(200 res)
  // else load login body(400 res)
  return (
    <>
      <NavBar/>
      <LoginBody/>
      <Footer/>
    </>
  )
}
