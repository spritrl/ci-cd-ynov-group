import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  validateAndCheckAge,
  validateMail,
  validateName,
  validatePostalCode,
} from "./utils/validator";
import TextField from "./TextField";

function Form() {
  const [port, setPort] = React.useState("3001");
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [mail, setMail] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [city, setCity] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const validerChamps = () => {
    const newErrors = {};
    if (!validateAndCheckAge(birthDate))
      newErrors.birthDate = "Vous devez avoir au moins 18 ans.";
    if (!validatePostalCode(postalCode))
      newErrors.postalCode =
        "Le code postal doit être au format français (5 chiffres).";
    if (!validateName(name)) newErrors.name = "Le nom n'est pas valide.";
    if (!validateName(surname))
      newErrors.surname = "Le prénom n'est pas valide.";
    if (!validateMail(mail)) newErrors.mail = "L'email n'est pas valide.";
    if (!validateName(city)) newErrors.city = "La ville n'est pas valide.";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const createUser = async (
    name,
    surname,
    mail,
    birthDate,
    city,
    postalCode
  ) => {
    /**
      const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "name": "dddd",
        "surname": "dddd",
        "email": "dddd",
        "birthDate": "dddd",
        "city": "dddd",
        "postalCode": "dddd",
      }),
    };
    const response = await fetch(`http://localhost:3001/users`, options);
     */
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
        email: mail,
        birthDate,
        city,
        postalCode,
      }),
    };
    const response = await fetch(`http://localhost:${port}/users`, options);
    console.log(response);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validerChamps()) {
      //const formData = { name, surname, mail, birthDate, city, postalCode };
      // localStorage.setItem('formData', JSON.stringify(formData));
      createUser(name, surname, mail, birthDate, city, postalCode);

      toast.success("Formulaire sauvegardé avec succès !");

      setName("");
      setSurname("");
      setMail("");
      setBirthDate("");
      setCity("");
      setPostalCode("");
      setErrors({});
    } else {
      toast.error("Des erreurs sont présentes dans le formulaire.");
    }
  };

  const isFormValid =
    name && surname && mail && birthDate && city && postalCode;

  return (
    <div
      style={{
        backgroundColor: "black",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          width: "20%",
          minWidth: "300px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", gap: 10, flexDirection: "column" }}
        >
          <TextField
            error={errors.name}
            inputValue={port}
            onChange={(e) => setPort(e.target.value)}
            title={"Port"}
            name={"port"}
          />
          <TextField
            error={errors.birthDate}
            inputValue={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            title={"Date de naissance"}
            name={"birthDate"}
            type={"date"}
          />
          <TextField
            error={errors.mail}
            inputValue={mail}
            onChange={(e) => setMail(e.target.value)}
            title={"Adresse e-mail"}
            name={"email"}
          />
          <TextField
            error={errors.name}
            inputValue={name}
            onChange={(e) => setName(e.target.value)}
            title={"Nom"}
            name={"name"}
          />
          <TextField
            error={errors.surname}
            inputValue={surname}
            onChange={(e) => setSurname(e.target.value)}
            title={"Prénom"}
            name={"surname"}
          />
          <TextField
            error={errors.city}
            inputValue={city}
            onChange={(e) => setCity(e.target.value)}
            title={"Ville"}
            name={"city"}
          />
          <TextField
            error={errors.postalCode}
            inputValue={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            title={"Code postal"}
            name={"postalCode"}
          />
          <button style={{ height: 30 }} type="submit" disabled={!isFormValid}>
            Sauvegarder
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Form;
