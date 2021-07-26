import React, { useState, useEffect, } from 'react';
import { Fade, Backdrop, CardActionArea, makeStyles, Modal, Card } from '@material-ui/core';
import { Router, Link } from 'react-router-dom';
import IngTask from '../IngTask';
const useStyles = makeStyles((theme) => (
    {
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        root: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            padding: theme.spacing(0.5),
            margin: 0,
        },
        chip: {
            margin: theme.spacing(0.5),
        },
        btn: {
            width: '100%',
            height: '100%'
        },
        card: {
            height: '100%',
            border: theme.palette.type(theme.flag) ? "1px solid black" : "2px solid red",
        }
    }))

const IngItem = (props) => {
    const { dt, idx } = props;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [flag, setFlag] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
        setFlag(!flag);
    };
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div className={classes.btn}>
            <Card onClick={handleOpen} className={classes.card}>
                <CardActionArea className={classes.card}>
                    {dt.CatName}
                </CardActionArea>
            </Card>
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2>{dt.CatName}</h2>
                        <IngTask />
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}
export default IngItem;