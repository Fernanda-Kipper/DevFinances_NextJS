import React, {useCallback, useContext} from 'react'

import ThemeContext from '../contexts/ThemeContext'

import styles from '../styles/components/Modal.module.css'


export default function Modal({ modalIsActive, ...props }){
  const { isDark } = useContext(ThemeContext)
  const modalClassname = useCallback(() =>{
    if(modalIsActive){
      return styles.active
    }
    else{
      return styles.nonactive
    }
  }, [modalIsActive])

  return(
    <div className={modalClassname()}>
      <div className={isDark? styles.modalDark : styles.modal}>
          {props.children}
      </div>
    </div>
  )
}