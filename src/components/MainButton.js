import React, { useState } from 'react'

import styles from '../styles/components/Button.module.css'
import trashImg from '../../assets/trash.svg'
import tagImg from '../../assets/tag.svg'

export default function MainButton({ handleOpenModalForm, handleOpenModalDelete, handleOpenModalTags }){
    const [buttonsIsActive, setButtonsActive] = useState(false)

    function handleOpenButtons(){
        if(buttonsIsActive){
          setButtonsActive(false)
        }
        else{
          setButtonsActive(true)
        }
    }

    return (
        <nav
            onClick={handleOpenButtons}
            className={styles.mainButton}>
            ...
            <a href="#" 
            onClick={handleOpenModalForm} 
            className={buttonsIsActive ? styles.buttonsActive1 : styles.buttonsNonactive}>
                +
            </a>
            
            <a href="#" 
            onClick={handleOpenModalDelete}
            className={buttonsIsActive ? styles.buttonsActive2 : styles.buttonsNonactive}>
                <img src={trashImg} className={styles.buttonImg} alt="Imagem para Deletar"/>
            </a>

            <a href="#" 
            onClick={handleOpenModalTags}
            className={buttonsIsActive ? styles.buttonsActive3 : styles.buttonsNonactive}>
                <img src={tagImg} className={styles.buttonImg} alt="Imagem adicionar Tag"/>
            </a>
        </nav>
    )
}