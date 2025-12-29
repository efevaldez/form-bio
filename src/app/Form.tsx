'use client'
import { useState } from 'react';


const Form = () =>{
    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        message: ''
    })


const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.currentTarget;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
   }


return (
    <form onSubmit={handleSubmit} >
      <div style={{ maxWidth: '400px', margin: 'auto' }}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      {/* <div>
        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="mensaje">Mensaje:</label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <button type="submit">Enviar</button> */}
    </form>
  );
};

export default Form;