const studentName = document.getElementById("studentName");
const studentId = document.getElementById("studentId");

document.addEventListener("DOMContentLoaded", ( ) => {
    const addStudentForm = document.getElementById("addStudentForm");

    addStudentForm.addEventListener("submit", async ( event) => {
        event.preventDefault();

        const studentName = document.getElementById("studentName").value;
        const studentId = document.getElementById("studentId").value;

        if(!studentName || !studentId) {
            alert('Please fill in both student name and ID.');
            return;
        }

        const requestData = {
            studentId: studentId,
        };

        try {
            const response = await fetch('/teachers/add-student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

        if(response.ok){
            alert("Student added successfully");
            document.getElementById('studentName').value = '';
            document.getElementById('studentId').value = '';
        } else {
            alert("error adding student");
        }
        } catch (e) {
            console.log(e);
        }
    });
})