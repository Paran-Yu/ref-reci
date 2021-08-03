import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'


export default function Index() {
    return (
      <div>
        <h1>
          인덱스화면
        </h1>
        <Fab
          color="primary"
          aria-label="recipe"
          children={
            <Fab
              color="primary"
            >
            </Fab>
          }
        >
          <AddIcon />
        </Fab>
      </div>
    );
    }