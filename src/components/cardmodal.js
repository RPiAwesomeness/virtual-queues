import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

function CardModal(props) {
    const name = props.name;
    const description = props.description;
    const active = props.isActive;
    const available = props.available;
    const maxAvailable = props.maxAvailable;
    const img = props.image;
    const [open, setOpen] = React.useState(false)       //Gets in the way of the open prop being sent.
                                                        //Probably needs to be redefined in some way.
    //const setOpen = React.useState(false)
    //const open = props.open;

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            //trigger={<Button>Show Modal</Button>}   //Needs to somehow be triggered by the Card.
        >
            <Modal.Header>Attraction Details</Modal.Header>
            <Modal.Content image>
                <Image size='medium' src={img} wrapped />
                <Modal.Description>
                    <Header>{name}</Header>
                    <p>{description}</p>
                    <p>There are {available} tickets available.</p>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
            <Button color='black' onClick={() => setOpen(false)}>
                    Exit
            </Button>
                <Button
                    content="Reserve a ticket"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => setOpen(false)}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default CardModal
