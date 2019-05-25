import * as React from 'react'
import { ToastContainer } from 'react-toastify'
//import 'react-toastify/dist/ReactToastify.css'

import styles from './mainLayout.scss'

const MainLayout: React.FC = ({ children }) => (
  <div className={styles.main}>
    { children }
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      draggable={true}
      pauseOnHover={true}
    />
  </div>
)

export default MainLayout
