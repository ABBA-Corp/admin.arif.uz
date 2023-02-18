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
    const { updateServiceById, fetchServiceById, fetchCompanies } =
        useActions();
    const { services, servicesLoading } = useSelector(
        (state) => state.services
    );
    const {
        companies: { data },
    } = useSelector((state) => state.companies);

    React.useEffect(() => {
        fetchCompanies();
    }, [fetchCompanies]);

    const handleClickOpen = () => {
        setOpen(true);
        inputClear();
        fetchServiceById(id);
    };

    const handleClose = () => {
        setOpen(false);
        inputClear();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData =
            data.get('img_src') && data.get('logo')
                ? {
                      image: data.get('img_src'),
                      logo: data.get('logo'),
                      name: data.get('name'),
                      title_uz: data.get('title'),
                      title_ru: data.get('title_ru'),
                      title_en: data.get('title_en'),
                      description_uz: data.get('description'),
                      description_ru: data.get('description_ru'),
                      description_en: data.get('description_en'),
                      companyId: data.get('company_id'),
                  }
                : data.get('img_src')
                ? {
                      image: data.get('img_src'),
                      name: data.get('name'),
                      title_uz: data.get('title'),
                      title_ru: data.get('title_ru'),
                      title_en: data.get('title_en'),
                      description_uz: data.get('description'),
                      description_ru: data.get('description_ru'),
                      description_en: data.get('description_en'),
                      companyId: data.get('company_id'),
                  }
                : data.get('logo')
                ? {
                      image: data.get('logo'),
                      name: data.get('name'),
                      title_uz: data.get('title'),
                      title_ru: data.get('title_ru'),
                      title_en: data.get('title_en'),
                      description_uz: data.get('description'),
                      description_ru: data.get('description_ru'),
                      description_en: data.get('description_en'),
                      companyId: data.get('company_id'),
                  }
                : {
                      name: data.get('name'),
                      title_uz: data.get('title'),
                      title_ru: data.get('title_ru'),
                      title_en: data.get('title_en'),
                      description_uz: data.get('description'),
                      description_ru: data.get('description_ru'),
                      description_en: data.get('description_en'),
                      companyId: data.get('company_id'),
                  };
        updateServiceById({
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
                {services?.data && !servicesLoading && (
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
                                <div>
                                    <label htmlFor="image-input">
                                        For Image:
                                    </label>
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
                                </div>
                                <div>
                                    <label htmlFor="logo-input">
                                        For Logo:
                                    </label>
                                    <input
                                        id="logo-input"
                                        className="form-control"
                                        style={{
                                            width: '250px',
                                            marginRight: '20px',
                                            fontSize: '1rem',
                                        }}
                                        name="logo"
                                        type={'file'}
                                        required
                                    />
                                </div>
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
                                    label="Title"
                                    name="title"
                                    required
                                    defaultValue={services.data.title_uz}
                                />
                                <TextField
                                    sx={{ width: 230 }}
                                    label="Title RU"
                                    name="title_ru"
                                    required
                                    defaultValue={services.data.title_ru}
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
                                    defaultValue={services.data.title_en}
                                />
                                <TextField
                                    sx={{ width: 230 }}
                                    label="Description"
                                    name="description"
                                    multiline
                                    maxRows={4}
                                    required
                                    defaultValue={services.data.description_uz}
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
                                    defaultValue={services.data.description_ru}
                                />
                                <TextField
                                    sx={{ width: 230 }}
                                    label="Description EN"
                                    name="description_en"
                                    multiline
                                    maxRows={4}
                                    required
                                    defaultValue={services.data.description_en}
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
                                    name="company_id"
                                    defaultValue={services.data.companyId}
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
