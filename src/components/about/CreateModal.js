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

    const { createAbout } = useActions();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newData = new FormData();
        data.getAll('images').forEach((image) => {
            newData.append('images', image);
        });
        newData.append('image', data.get('img_src'));
        newData.append('title_uz', data.get('title'));
        newData.append('title_ru', data.get('title_ru'));
        newData.append('title_en', data.get('title_en'));
        newData.append('video_url', data.get('video_url'));
        newData.append('description_uz', data.get('description'));
        newData.append('description_ru', data.get('description_ru'));
        newData.append('description_en', data.get('description_en'));
        createAbout(newData);
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
                            <input
                                className="form-control"
                                style={{
                                    width: '250px',
                                    marginRight: '20px',
                                    fontSize: '1rem',
                                }}
                                name="img_src"
                                type={'file'}
                                required
                            />
                            <TextField
                                sx={{ width: 230 }}
                                label="Title"
                                name="title"
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
                                label="Title RU"
                                name="title_ru"
                                required
                            />
                            <TextField
                                sx={{ width: 230 }}
                                label="Title En"
                                name="title_en"
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
                                label="Description"
                                name="description"
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
                                label="Description EN"
                                name="description_en"
                                multiline
                                maxRows={4}
                                required
                            />
                            <TextField
                                sx={{ width: 230 }}
                                label="Video URL"
                                name="video_url"
                                required
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                marginBottom: '10px',
                                flexDirection: 'column',
                            }}
                        >
                            <label style={{ marginBottom: '5px' }}>
                                Images for slider :
                            </label>
                            <input
                                style={{
                                    width: '250px',
                                    marginRight: '20px',
                                    fontSize: '1rem',
                                    display: 'inline-block',
                                }}
                                name="images"
                                type={'file'}
                                required
                                multiple
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
