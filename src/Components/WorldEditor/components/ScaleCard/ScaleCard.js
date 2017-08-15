import React from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const styleSheet = createStyleSheet('Card', theme => ({
    cardContainer:{
        minWidth: 400,
        paddingRight: 5
    },
    card:{
        maxWidth: 400
    },
    title:{
        fontSize: 16
    }
}))

function ScaleCard(props){
    const classes = props.classes;
    return(
        <div className={classes.cardContainer}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title}>
                        Scale
                    </Typography>
                    <TextField
                        value={props.valueX}
                        onChange={props.onXChange}
                        type="text"
                        InputProps={{ placeholder: 'Scale the X axis' }}
                        helperText="x"
                        defaultValue={props.defaultValue}
                     />
                    <TextField
                        value={props.valueY}
                        onChange={props.onYChange}
                        type="text"
                        InputProps={{ placeholder: 'Scale the Y axis' }}
                        helperText="y"
                        defaultValue={props.defaultValue}
                    />
                    <TextField
                        value={props.valueZ}
                        onChange={props.onZChange}
                        type="text"
                        InputProps={{ placeholder: 'Scale the Z axis' }}
                        helperText="z"
                        defaultValue={props.defaultValue}
                    />
                    <CardActions>
                        <Button
                            dense
                            onClick={props.onClick}
                            color="accent">
                            Set
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        </div>
    )
}
export default withStyles(styleSheet)(ScaleCard);