import React, { useState } from "react";

const HospitalForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        city: "",
        image: "",
        specialities: [],
        rating: "",
        description: "",
        images: [],
        numberOfDoctors: "",
        numberOfDepartments: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSpecialitiesChange = (e) => {
        setFormData({
            ...formData,
            specialities: Array.from(e.target.selectedOptions, (option) => option.value),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token"); 
            if (!token) {
                alert("Unauthorized! Please log in.");
                return;
            }

            const response = await fetch(
                "https://hospitalmanagementsystem-ela3.onrender.com/api/v1/hospitals/create",
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`, 
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const result = await response.json();
            if (result.success) {
                alert("Hospital Added!");
                setFormData({
                    name: "",
                    city: "",
                    image: "",
                    specialities: [],
                    rating: "",
                    description: "",
                    images: [],
                    numberOfDoctors: "",
                    numberOfDepartments: "",
                });
            } else {
                alert("Error: " + result.message);
            }
        } catch (error) {
            alert("Request failed: " + error.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Add Hospital</h2>
            <form onSubmit={handleSubmit} className="hospital-form">
                <input type="text" name="name" placeholder="Hospital Name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />

                <select multiple name="specialities" value={formData.specialities} onChange={handleSpecialitiesChange}>
                    <option value="Heart">Heart</option>
                    <option value="Ear">Ear</option>
                    <option value="Orthopedic">Orthopedic</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Pediatrics">Pediatrics</option>
                </select>

                <input type="number" name="rating" placeholder="Rating" value={formData.rating} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
                <input type="number" name="numberOfDoctors" placeholder="Number of Doctors" value={formData.numberOfDoctors} onChange={handleChange} />
                <input type="number" name="numberOfDepartments" placeholder="Number of Departments" value={formData.numberOfDepartments} onChange={handleChange} />

                <button type="submit" className="submit-btn">Add Hospital</button>
            </form>
        </div>
    );
};

export default HospitalForm;
