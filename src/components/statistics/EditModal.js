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
import { Box } from '@mui/system';
import { inputClear } from '../../utils';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditModal({ id }) {
    const [open, setOpen] = React.useState(false);
    const { updateStatisticsById, fetchStatisticsById } = useActions();
    const { statistics, statisticsLoading } = useSelector(
        (state) => state.statistics
    );

    const handleClickOpen = () => {
        setOpen(true);
        inputClear();
        fetchStatisticsById(id);
    };

    const handleClose = () => {
        setOpen(false);
        inputClear();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = {
            title_uz: data.get('title'),
            title_ru: data.get('title_ru'),
            title_en: data.get('title_en'),
            count: Number(data.get('count')),
        };
        updateStatisticsById({
            id,
            formData,
        });
        handleClose();
    };

    return (
        <div>
            <Button variant={'text'} color="primary" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{'Edit company'}</DialogTitle>
                {statistics?.data && !statisticsLoading && (
                    <Box component={'form'} onSubmit={handleSubmit} noValidate>
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
                                    defaultValue={statistics.data.title_uz}
                                />
                                <TextField
                                    sx={{ width: 230 }}
                                    label="Title RU"
                                    name="title_ru"
                                    required
                                    defaultValue={statistics.data.title_ru}
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
                                    defaultValue={statistics.data.title_en}
                                />
                                <TextField
                                    sx={{ width: 230 }}
                                    label="Count"
                                    name="count"
                                    type={'number'}
                                    required
                                    defaultValue={statistics.data.count}
                                />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Edit</Button>
                        </DialogActions>
                    </Box>
                )}
            </Dialog>
        </div>
    );
}
