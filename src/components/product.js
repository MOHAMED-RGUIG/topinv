import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { toast } from 'react-toastify';
import { FaEdit ,FaFilePdf} from 'react-icons/fa';
export default function Product({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  const [imageSrc, setImageSrc] = useState("./greenheart.png");
  const [btnStyle, setBtnStyle] = useState("btn btn-sm btn-outline-success");
  const [btnText, setBtnText] = useState("Exporter");

  const handleClick = () => {
    setImageSrc((prev) => (prev === "./greenheart.png" ? "./heart1.png" : "./greenheart.png"));
    setBtnStyle((prev) =>
      prev === "btn btn-sm btn-outline-success" ? "btn btn-sm btn-outline-secondary" : "btn btn-sm btn-outline-secondary"
    );
    setBtnText((prev) => (prev === "Ajouter" ? "Ajoutée" : "Ajoutée"));

    const selectedQuantity = parseInt(quantity, 10) || 1;
    dispatch(addToCart(product, selectedQuantity, isChecked));

    toast.success("Le produit est ajouté à la carte!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
    });
  };

  return (
    <div className="container mt-3 col-12">
      <div className="row">
        <div className="col-12 col-md-12 mx-auto">
          <div className="card shadow-sm border-0 rounded-3 col-12 col-md-12 mx-auto" >
            <div className="card-body p-3 col-12 mx-auto" style={{borderLeft:'4px solid #183F7F'}}>
              {/* Ligne principale */}
              <div className="d-flex col-12">
                {/* Section Gauche : Détails */}
                <div className="d-flex flex-column col-2">
           
                <p className="mb-0 small" style={{ fontSize: "10px" }}>
  {new Date(product.DATEINV_0).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}
</p>
                </div>

                <div className="d-flex flex-column text-center col-4">
            
                  <p className="mb-0 small" style={{fontSize:'10px'}}>{product.DESINV_0}</p>
                </div>

                <div className="d-flex flex-column text-center col-2">
          
                  <span
                    className={`badge ${
                      product.Status === "Réalisé" ? "bg-success" : "bg-warning text-dark"
                    }`}
                    style={{fontSize:'10px'}}
                  >
                    {product.ETATINV}
                  </span>
                </div>

                {/* Section Droite : Boutons */}
                <div className="d-flex gap-2 col-2">
                  <button className="btn7 btn-sm btn-outline-primary d-flex align-items-center" onClick={handleClick}>
                    <FaEdit size={12} className="me-1" />
                  </button>
                  <button className="btn7 btn-sm btn-outline-danger d-flex align-items-center" onClick={handleClick}>
                    <FaFilePdf size={12} className="me-1" />
                  </button>
                </div>
              </div>

              {/* Section Checkbox */}
          
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
