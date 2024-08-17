import React from 'react';

const LoginModal = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Connexion</h2>
        {/* Ajoutez ici les champs de connexion (nom d'utilisateur, mot de passe, etc.) */}
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default LoginModal;
