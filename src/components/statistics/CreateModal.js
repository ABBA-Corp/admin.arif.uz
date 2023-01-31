import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import useActions from '../../hooks/useActions';
import { TextField } from '@mui/material';
import { inputClear } from '../../utils';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateModal() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        inputClear();
    };

    const handleClose = () => {
        setOpen(false);
        inputClear();
    };

    const { createStatistics } = useActions();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        createStatistics({
            title_uz: data.get('title'),
            title_ru: data.get('title_ru'),
            title_en: data.get('title_en'),
            count: Number(data.get('count')),
        });
        handleClose();
    };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
            >
                Add
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{'Add company'}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '10px',
                                justifyContent: 'space-between',
                            }}
                        >
                            <TextField
                                sx={{ width: 230, marginRight: '30px' }}
                                label="Title"
                                name="title"
                                required
                            />
                            <TextField
                                sx={{ width: 230 }}
                                label="Title RU"
                                name="title_ru"
                                required
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '10px',
                                justifyContent: 'space-between',
                            }}
                        >
                            <TextField
                                sx={{ width: 230 }}
                                label="Title EN"
                                name="title_en"
                                required
                            />
                            <TextField
                                sx={{ width: 230 }}
                                label="Count"
                                name="count"
                                type={'number'}
                                required
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
