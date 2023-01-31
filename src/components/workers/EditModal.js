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
    const { updateWorkerById, fetchWorkerById, fetchCompanies } = useActions();
    const { workers, workersLoading } = useSelector((state) => state.workers);
    const {
        companies: { data },
    } = useSelector((state) => state.companies);

    React.useEffect(() => {
        fetchCompanies();
    }, [fetchCompanies]);

    const handleClickOpen = () => {
        setOpen(true);
        inputClear();
        fetchWorkerById(id);
    };

    const handleClose = () => {
        setOpen(false);
        inputClear();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = data.get('img_src')
            ? {
                  image: data.get('img_src'),
                  name: data.get('name'),
                  position_uz: data.get('position'),
                  position_ru: data.get('position_ru'),
                  position_en: data.get('position_en'),
                  description_uz: data.get('description'),
                  description_ru: data.get('description_ru'),
                  description_en: data.get('description_en'),
                  companyId: data.get('company_id'),
                  video_url: data.get('video_url'),
                  phone: data.get('phone'),
              }
            : {
                  name: data.get('name'),
                  position_uz: data.get('position'),
                  position_ru: data.get('position_ru'),
                  position_en: data.get('position_en'),
                  description_uz: data.get('description'),
                  description_ru: data.get('description_ru'),
                  description_en: data.get('description_en'),
                  companyId: data.get('company_id'),
                  video_url: data.get('video_url'),
                  phone: data.get('phone'),
              };
        updateWorkerById({
            id: workers.data.id,
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
                {workers?.data && !workersLoading && (
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
                                <input
                                    className="form-control"
                                    style={{
                                        width: '250px',
                                        marginRight: '20px',
                                        fontSize: '1rem',
                                    }}
                                    name="img_src"
                                    type={'file'}
                                />
                                <TextField
                                    sx={{ width: 230 }}
                                    label="Name"
                                    name="name"
                                    required
                                    defaultValue={workers.data.name}
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
                                    label="Position"
                                    name="position"
                                    required
                                    defaultValue={workers.data.position}
                                />
                                <TextField
                                    sx={{ width: 230 }}
                                    label="Position RU"
                                    name="position_ru"
                                    required
                                    defaultValue={workers.data.position_ru}
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
                                    label="Position EN"
                                    name="position_en"
                                    required
                                    defaultValue={workers.data.position_en}
                                />
                                <TextField
                                    sx={{ width: 230 }}
                                    label="Description"
                                    name="description"
                                    multiline
                                    maxRows={4}
                                    required
                                    defaultValue={workers.data.description}
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
                                    label="Description RU"
                                    name="description_ru"
                                    multiline
                                    maxRows={4}
                                    required
                                    defaultValue={workers.data.description_ru}
                                />
                                <TextField
                                    sx={{ width: 230 }}
                                    label="Video URL"
                                    name="video_url"
                                    required
                                    defaultValue={workers.data.video_url}
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
                                    defaultValue={workers.data.description_en}
                                />
                                <select
                                    placeholder="Company"
                                    className="form-select"
                                    required
                                    name="company_id"
                                    defaultValue={workers.data.companyId}
                                >
                                    <option value="" disabled>
                                        Select Company
                                    </option>
                                    s
                                    {data?.map((option) => (
                                        <option
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.title_uz}
                                        </option>
                                    ))}
                                </select>
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
                                    label="Phone"
                                    name="phone"
                                    required
                                    defaultValue={workers.data.phone}
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
