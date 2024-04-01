import Swal from 'sweetalert2';

const showSuccessAlert = (message) => {
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
    });
};

const showErrorAlert = (message) => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
    });
};

export { showSuccessAlert, showErrorAlert};