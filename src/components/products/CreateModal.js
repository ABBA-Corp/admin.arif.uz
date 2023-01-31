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

    const { createProduct, fetchCompanies } = useActions();
    const {
        companies: { data },
    } = useSelector((state) => state.companies);

    React.useEffect(() => {
        fetchCompanies();
    }, [fetchCompanies]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        createProduct({
            image: data.get('img_src'),
            name_uz: data.get('name'),
            name_ru: data.get('name_ru'),
            name_en: data.get('name_en'),
            description_uz: data.get('description'),
            description_ru: data.get('description_ru'),
            description_en: data.get('description_en'),
            companyId: data.get('company_id'),
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
                                label="Name"
                                name="name"
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
                                label="Name RU"
                                name="name_ru"
                                required
                            />
                            <TextField
                                sx={{ width: 230 }}
                                label="Name EN"
                                name="name_en"
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
                            <select
                                placeholder="Company"
                                className="form-select"
                                required
                                name="company_id"
                                defaultValue={''}
                            >
                                <option value="" disabled>
                                    Select Company
                                </option>
                                s
                                {data?.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.title_uz}
                                    </option>
                                ))}
                            </select>
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
