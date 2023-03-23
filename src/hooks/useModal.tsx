import React, {useState} from 'react'

export const useModal = () => {
    const [openModal, setOpenModal] = useState(false);

    function toggleEditNameModal(value: boolean) {
        setOpenModal(value)
    }

    return {
        openModal,
        toggleEditNameModal,
    }
}
