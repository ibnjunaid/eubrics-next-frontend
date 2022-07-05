import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/navbar.component'
import styles from '../styles/Home.module.css'
import Login from './login'

const Home: NextPage = () => {
  return (
    <>
          <Navbar/>
          <Login/>
    </>
  )
}

export default Home