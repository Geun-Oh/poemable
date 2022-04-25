import React, { useState, useEffect, useCallback, forwardRef } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getPoem } from './graphql/queries';
import PoemCard from './poemCard';
import styles from './poemIt.module.scss';

function UpdateModal ({ id }, ref) {
    const [poem, setPoem] = useState([])
    const fetchPoem = useCallback( async (id) => {
        try {
            const poemData = await API.graphql(graphqlOperation(getPoem, { id: id }))
            setPoem(poemData.data.getPoem)
        } catch (err) {
            console.log("error: ", err)
        }
    }, [])

    useEffect(() => {
        console.log(id)
        fetchPoem(id)
    }, [id])

    return(
        <div className={`${styles.updateModal}`} ref={ref}>
            <PoemCard poem={poem} />
        </div>
    )
}
const ForwardUpdateModal = forwardRef(UpdateModal);
export default ForwardUpdateModal;