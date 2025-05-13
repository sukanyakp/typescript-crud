let nameRegex: RegExp = /^[a-zA-Z]+$/;
let emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const addBtn = document.getElementById('add-student-btn');
if (addBtn) {
    addBtn.addEventListener('click', () => {
        const addModal = document.getElementById('add-student-modal');
        if (addModal) {
            addModal.style.display = addModal.style.display === 'none' ? 'block' : 'none';
        }
    });
};

// Add student
const addForm = document.getElementById('add-student-form') as HTMLFormElement;
if (addForm) {
    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let studentName = document.getElementById('name') as HTMLInputElement;
        let studentEmail = document.getElementById('email') as HTMLInputElement;
        let studentAge = document.getElementById('age') as HTMLInputElement;
        let errorMessage = document.getElementById('add-student-error') as HTMLParagraphElement;

        if (!nameRegex.test(studentName.value)) {
            errorMessage.innerHTML = 'Please enter a valid name';
            return;
        }
        if (!emailRegex.test(studentEmail.value)) {
            errorMessage.innerHTML = 'Please enter a valid email';
            return;
        }
        const age = Number(studentAge.value);
        if (age < 7 || age > 25) {
            errorMessage.innerHTML = 'Please enter a valid age (7 - 25)';
            return;
        }

        let response = await fetch('/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: studentName.value,
                email: studentEmail.value,
                age: studentAge.value
            })
        });

        if (response.ok) {
            snackBar('Data added successfully');
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } else {
            snackBar('Error adding data');
        }
    });
};

const editButtons = document.querySelectorAll('.edit-btn');
editButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
        const studentId = (e.target as HTMLButtonElement).getAttribute('data-student-id');

        if (studentId) {
            const response = await fetch(`/student/${studentId}`);
            if (response.ok) {
                const student = await response.json();

                const editModal = document.getElementById('edit-student-modal');
                if (editModal) {
                    const editName = document.getElementById('edit-name') as HTMLInputElement;
                    const editEmail = document.getElementById('edit-email') as HTMLInputElement;
                    const editAge = document.getElementById('edit-age') as HTMLInputElement;

                    editName.value = student.name;
                    editEmail.value = student.email;
                    editAge.value = student.age;

                    editModal.setAttribute('data-student-id', student._id);
                    editModal.style.display = 'block';
                }
            } else {
                snackBar('Failed to load student data');
            }
        }
    });
});

const editForm = document.getElementById('edit-student-form') as HTMLFormElement;
if (editForm) {
    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const studentId = document.getElementById('edit-student-modal')?.getAttribute('data-student-id');
        const editName = document.getElementById('edit-name') as HTMLInputElement;
        const editEmail = document.getElementById('edit-email') as HTMLInputElement;
        const editAge = document.getElementById('edit-age') as HTMLInputElement;
        let errorMessage = document.getElementById('edit-student-error') as HTMLParagraphElement;

        if (!nameRegex.test(editName.value)) {
            errorMessage.innerHTML = 'Please enter a valid name';
            return;
        }

        if (!emailRegex.test(editEmail.value)) {
            errorMessage.innerHTML = 'Please enter a valid email';
            return;
        }

        const age = Number(editAge.value);
        if (age < 7 || age > 25) {
            errorMessage.innerHTML = 'Please enter a valid age (7 - 25)';
            return;
        }

        if (studentId) {
            let response = await fetch('/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: studentId,
                    name: editName.value,
                    email: editEmail.value,
                    age: editAge.value
                })
            });

            if (response.ok) {
                snackBar('Data updated successfully');
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                snackBar('Error updating data');
            }
        } else {
            snackBar('Student ID is missing');
        }
    });
}

const deleteButtons = document.querySelectorAll('.delete-btn');
deleteButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
        const studentId = (e.target as HTMLButtonElement).getAttribute('data-student-id');
        if (studentId && confirm('Are you sure you want to delete this student?')) {
            let response = await fetch(`/student/${studentId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                snackBar('Deleted successfully');
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                snackBar('Error deleting data');
            }
        }
    });
});

const addClose = document.getElementById('modal-close');
if (addClose) {
    addClose.addEventListener('click', () => {
        const addModal = document.getElementById('add-student-modal');
        if (addModal) {
            addModal.style.display = 'none';
        }
    });
};

const editClose = document.getElementById('edit-modal-close');
if (editClose) {
    editClose.addEventListener('click', () => {
        const addModal = document.getElementById('edit-student-modal');
        if (addModal) {
            addModal.style.display = 'none';
        }
    });
};

function snackBar(message: string) {
    const snackDiv = document.getElementById('snack-bar');
    if (snackDiv) {
        snackDiv.innerText = message;
        snackDiv.classList.add('show');
        setTimeout(() => {
            snackDiv.classList.remove('show');
            snackDiv.style.display = 'none';
        }, 1500);
    }
};