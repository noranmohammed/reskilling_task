import { useState } from 'react'
import SignupForm from './components/SignupForm'
import PostCard from './components/PostCard'
import SignInForm from './components/signinForm'
import Login from './pages/login'


function App() {
  

  return (
    <>
      {/* <div className="text-3xl font-bold underline">hello world</div> */}
      {/* <SignupForm/> */}
      {/* <PostCard title="hello" body={"noran"} userId={1}/>
      <PostCard title="hi" body={"noranee"} userId={2}/>
      <PostCard title="helo" body={"noranww"} userId={3}/> */}
       {/* <SignInForm/> */}
       <Login/>
    </>
  )
}

export default App
