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
    const { updateProductById, fetchProductById, fetchCompanies } =
        useActions();
    const { products, productsLoading } = useSelector(
        (state) => state.products
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
        fetchProductById(id);
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
                  name_uz: data.get('name'),
                  name_ru: data.get('name_ru'),
                  name_en: data.get('name_en'),
                  description_uz: data.get('description'),
                  description_ru: data.get('description_ru'),
                  description_en: data.get('description_en'),
                  companyId: data.get('company_id'),
              }
            : {
                  name_uz: data.get('name'),
                  name_ru: data.get('name_ru'),
                  name_en: data.get('name_en'),
                  description: data.get('description'),
                  description_ru: data.get('description_ru'),
                  description_en: data.get('description_en'),
                  companyId: data.get('company_id'),
              };
        updateProductById({
            id: products.data.id,
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
                {products?.data && !productsLoading && (
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
                                    style={{
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
                                    defaultValue={products.data.name_uz}
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
                                    defaultValue={products.data.name_ru}
                                />
                                <TextField
                                    sx={{ width: 230 }}
                                    label="Name EN"
                                    name="name_en"
                                    required
                                    defaultValue={products.data.name_en}
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
                                    sx={{
                                        width: 230,
                                    }}
                                    label="Description"
                                    name="description"
                                    multiline
                                    maxRows={4}
                                    required
                                    defaultValue={products.data.description_uz}
                                />
                                <TextField
                                    sx={{ width: 230 }}
                                    label="Description RU"
                                    name="description_ru"
                                    multiline
                                    maxRows={4}
                                    required
                                    defaultValue={products.data.description_ru}
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
                                    sx={{
                                        width: 230,
                                    }}
                                    label="Description EN"
                                    name="description_en"
                                    multiline
                                    maxRows={4}
                                    required
                                    defaultValue={products.data.description_en}
                                />
                                <select
                                    className="form-select"
                                    placeholder="Company"
                                    required
                                    name="company_id"
                                    defaultValue={products.data.companyId}
                                >
                                    <option value="" disabled>
                                        Select Company
                                    </option>
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
