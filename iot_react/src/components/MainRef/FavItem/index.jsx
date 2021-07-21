import { makeStyles, Card, CardActions, CardMedia, CardContent, Typography } from '@material-ui/core';
import React, { useState, useEffect, } from 'react';
const useStyles = makeStyles((theme) => ({
    paper: {
        height: 100,
        width: 150,
        margin: 10,
    },
}));
const FavItem = props => {
    const classes = useStyles();
    const { dt, idx } = props;
    return (
        <div>
            <span>
                <Card className={classes.paper} elevation={3}>
                    <CardActions>
                        <CardMedia>

                        </CardMedia>
                        <CardContent>
                            <Typography>
                                {dt.name}
                            </Typography>
                        </CardContent>
                    </CardActions>
                </Card>
            </span>
        </div>
    )
}
export default FavItem;