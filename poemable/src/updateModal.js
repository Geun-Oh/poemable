import React, { useState, useEffect, useCallback, forwardRef } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getPoem } from "./graphql/queries";
import { updatePoem } from "./graphql/mutations";
import styles from "./poemIt.module.scss";
import Button from "./button";

function UpdateModal({ id }, ref) {
  const [poem, setPoem] = useState({
    "id": "",
    "name": "",
    "detail": "",
    "author": ""
  });
  const fetchPoem = useCallback(async (id) => {
    try {
      const poemData = await API.graphql(graphqlOperation(getPoem, { id: id }));
      setPoem(poemData.data.getPoem);
    } catch (err) {
      console.log("error: ", err);
    }
  }, []);

  const onUpdate = useCallback(async (id, poem) => {
    try {
      await API.graphql(graphqlOperation(updatePoem, {
        input: { id: id, name: poem.name, detail: poem.detail },
      }));
      ref.current.style = "z-index: -999; opacity: 0;"
    } catch (err) {
      console.log("error: ", err);
    }
  }, []);

  useEffect(() => {
    console.log(id);
    fetchPoem(id);
  }, [id]);

  return (
    <div className={`${styles.updateModal}`} ref={ref}>
      <div className={`${styles.writingPage}`}>
        <wrapper>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={poem.name}
            onChange={(event) =>
              setPoem({ ...poem, name: event.target.value})
            }
          />
          <div>
            <textarea
              type="text"
              name="detail"
              placeholder="detail"
              value={poem.detail}
              onChange={(event) =>
                setPoem({ ...poem, detail: event.target.value})
              }
            />
          </div>
        </wrapper>
          <Button onClick={() => onUpdate(id, poem)} style={{ marginTop: "30px" }}>
            DONE!
          </Button>
      </div>
    </div>
  );
}
const ForwardUpdateModal = forwardRef(UpdateModal);
export default ForwardUpdateModal;
