import { makeStyles, Card, CardActions, CardMedia, CardContent, Typography, Grid } from '@material-ui/core';
import React, { useState, useEffect, } from 'react';
const useStyles = makeStyles((theme) => ({
    paper: {
        height: 150,
        width: 200,
        marginTop: 10
    },
}));
const FavItem = props => {
    const classes = useStyles();
    const { dt, idx } = props;
    return (
        <Card elevation={3} item className={classes.paper} >
            <CardActions>
                <CardMedia>

                </CardMedia>
                <CardContent>
                    <Typography>
                        {dt.name}<br>
                        </br>
                        {dt.time}
                    </Typography>
                </CardContent>
            </CardActions>
        </Card>
    )
}
export default FavItem;