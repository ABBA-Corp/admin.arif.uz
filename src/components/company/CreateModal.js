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

    const { createCompany } = useActions();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        createCompany({
            image: data.get('img_src'),
            title_uz: data.get('title_uz'),
            title_ru: data.get('title_ru'),
            title_en: data.get('title_en'),
            description_uz: data.get('description_uz'),
            description_ru: data.get('description_ru'),
            description_en: data.get('description_en'),
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
                            }}
                        >
                            <div>
                                <label htmlFor="company-image">
                                    For company image:
                                </label>
                                <input
                                    id="company-image"
                                    style={{
                                        fontSize: '1rem',
                                        marginBottom: '20px',
                                    }}
                                    name="img_src"
                                    type={'file'}
                                    required
                                />
                                <TextField
                                    sx={{ width: 230 }}
                                    label="Title"
                                    name="title_uz"
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    sx={{ width: 230 }}
                                    style={{ marginBottom: '10px' }}
                                    label="Title RU"
                                    name="title_ru"
                                    required
                                />
                                <TextField
                                    sx={{ width: 230 }}
                                    label="Title EN"
                                    name="title_en"
                                    required
                                />
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                marginBottom: '10px',
                            }}
                        >
                            <div>
                                <TextField
                                    sx={{ width: 230, marginBottom: '10px' }}
                                    label="Description"
                                    name="description_uz"
                                    multiline
                                    maxRows={4}
                                    required
                                />
                                <TextField
                                    sx={{ width: 230 }}
                                    label="Description RU"
                                    name="description_ru"
                                    multiline
                                    maxRows={4}
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    sx={{ width: 230 }}
                                    label="Description EN"
                                    name="description_en"
                                    multiline
                                    maxRows={4}
                                    required
                                />
                            </div>
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
