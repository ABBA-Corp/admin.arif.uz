import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import useActions from '../../hooks/useActions';
import { useSelector } from 'react-redux';
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

    const { createNews, fetchWorkers } = useActions();
    const {
        workers: { data },
    } = useSelector((state) => state.workers);

    React.useEffect(() => {
        fetchWorkers();
    }, [fetchWorkers]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        createNews({
            image: data.get('img_src'),
            title_uz: data.get('title'),
            title_ru: data.get('title_ru'),
            title_en: data.get('title_en'),
            text_uz: data.get('text'),
            text_ru: data.get('text_ru'),
            text_en: data.get('text_en'),
            workerId: data.get('worker_id'),
            news_type_uz: data.get('type'),
            news_type_ru: data.get('type_ru'),
            news_type_en: data.get('type_en'),
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
                            <input
                                id="image-input"
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
                                label="Title EN"
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
                                fullWidth
                                label="Text"
                                name="text"
                                multiline
                                maxRows={4}
                                required
                            />
                        </div>
                        <div
                            style={{
                                marginBottom: '10px',
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Text RU"
                                name="text_ru"
                                multiline
                                maxRows={4}
                                required
                            />
                        </div>
                        <div
                            style={{
                                marginBottom: '10px',
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Text EN"
                                name="text_en"
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
                            <select
                                placeholder="Company"
                                className="form-select"
                                required
                                name="worker_id"
                                defaultValue={''}
                            >
                                <option value="" disabled>
                                    Select Creator
                                </option>
                                s
                                {data?.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                            <TextField
                                sx={{ width: 230 }}
                                label="Type"
                                name="type"
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
                                label="Type RU"
                                name="type_ru"
                                required
                            />
                            <TextField
                                sx={{ width: 230 }}
                                label="Type EN"
                                name="type_en"
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
