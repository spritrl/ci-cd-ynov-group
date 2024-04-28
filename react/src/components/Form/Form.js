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
import { UsersContext } from "../context/UserContext";

function Form() {
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [mail, setMail] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [city, setCity] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const { addUser } = React.useContext(UsersContext) || { addUser: () => {} };

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


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validerChamps()) {
      toast.success("Formulaire sauvegardé avec succès !");
      addUser(name, surname, mail, birthDate, city, postalCode);
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
        backgroundColor: "var(--background-color)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "20%",
          minWidth: "300px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", gap: 10, flexDirection: "column" }}
        >
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
