import React from "react";

const PasswordResetForm = ({ onClose }) => {
	return (
		<div className="container">
			<div className="mb-3">
				<label className="form-label">E-Posta</label>
				<input
					type="email"
					className="form-control"
					placeholder="E-posta adresini gir"
				/>
			</div>
			<div className="d-grid gap-2">
				<button className="btn btn-primary">Şifremi Yenile</button>
			</div>
		</div>
	);
};

export default PasswordResetForm;
