import React, {useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, deleteFromCart } from '../actions/cartActions';
import CheckoutValidinv from '../components/CheckoutValidinv';
import { debounce } from 'lodash';
import { getFilteredValidInv,getFilteredValidInvByCode,getInv}  from '../actions/validInvAction';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import   QrReader  from "react-qr-barcode-scanner";
import { Html5Qrcode } from "html5-qrcode";
//import { Html5QrcodeScanner } from "html5-qrcode";
function Validinv() {
    const dispatch = useDispatch();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const validInvstate = useSelector(state => state.getAllvalidInvReducer);
    const validInvCodestate = useSelector(state => state.getAllvalidInvByCodeReducer);
    const getInvState = useSelector((state) => state.getInvReducer);
    const [localData, setLocalData] = useState([]);
    const { getinv } = getInvState;
    const { validinv, error, loading } = validInvstate; 
    const {validinvcode} = validInvCodestate;

    const [isScannerActive, setIsScannerActive] = useState(false);
 const [scanResult, setScanResult] = useState('');
  const [isScanning, setIsScanning] = useState(false);
const [scanner, setScanner] = useState(null);
 /* const handleScan = (data) => {
    if (data) {
      setScanResult(data); // Met à jour le résultat du scan
      setIsScanning(false); // Désactive le scanner après un scan réussi
      setIsScannerActive(false); // Ferme la caméra
    }
  };

  const handleError = (err) => {
    console.error("Erreur de scan : ", err);
    setIsScanning(false); // Désactive le scanner en cas d'erreur
  };*/
//
 /* useEffect(() => {
    let scanner;
    if (isScannerActive) {
        scanner = new Html5QrcodeScanner(
            "qr-reader",
            {
                fps: 10,
                qrbox: 250,
            },
            false
        );

        scanner.render(
            (result) => {
                setScanResult(result); // Met à jour le résultat du scan
                setIsScannerActive(false); // Arrête le scanner après un scan réussi
            },
            (error) => {
                console.error("Erreur de scan : ", error);
            }
        );
    }*/
useEffect(() => {
        let html5QrCode;

        if (isScannerActive) {
            html5QrCode = new Html5Qrcode("qr-reader");
            const config = {
                fps: 10,
                qrbox: 250,
                experimentalFeatures: {
                    useBarCodeDetectorIfSupported: true,
                },
            };

            const cameraConfig = { facingMode: "environment" }; // Active la caméra arrière

            html5QrCode.start(
                cameraConfig,
                config,
                (decodedText) => {
                    setScanResult(decodedText);
                    setIsScannerActive(false); // Arrête le scanner après un scan réussi
                },
                (error) => {
                    console.warn("Erreur de scan : ", error);
                }
            ).then(() => setScanner(html5QrCode))
              .catch((err) => console.error("Erreur lors du démarrage du scanner", err));
        }

        return () => {
            if (html5QrCode) {
                html5QrCode.stop().then(() => html5QrCode.clear());
            }
        };
    }, [isScannerActive]);
/*const handleInputCodeChange = (value) => {
    setEANCOD_0(value);

    const matchedItem = localData.find((item) =>
        item.EANCOD_0.trim().toLowerCase() === value.trim().toLowerCase()
    );

    if (matchedItem) {
        setITMREF_0(matchedItem.ITMREF_0);
    } else {
        setITMREF_0("");
    }
};
*/

    // Initialise et démarre le scanner
/*    useEffect(() => {
        let html5QrCode;

        if (isScannerActive) {
            html5QrCode = new Html5Qrcode("qr-reader");
            const config = { fps: 10, qrbox: 250 };

            const cameraConfig = { facingMode: "environment" };

            html5QrCode
                .start(
                    cameraConfig,
                    config,
                    (decodedText) => {
                        handleInputCodeChange(decodedText); // Met à jour l'input avec le résultat
                        setIsScannerActive(false); // Arrête le scanner
                    },
                    (error) => console.warn("Erreur de scan :", error)
                )
                .then(() => setScanner(html5QrCode))
                .catch((err) => console.error("Erreur démarrage scanner :", err));
        }

        // Nettoyage
        return () => {
            if (html5QrCode) {
                html5QrCode.stop().then(() => html5QrCode.clear());
            }
        };
    }, [isScannerActive]);
*/
    const debouncedDispatch = debounce((value) => {
      if (value.trim().length >= 3) {
          dispatch(getFilteredValidInv(value));}
  }, 500);
  const handleInputChange = (e) => {
      const value = e.target.value;
      setITMREF_0(value);
      debouncedDispatch(value);
  };
  const debouncedCodeDispatch = debounce((value) => {
    if (value.trim().length >= 3) {
        dispatch(getFilteredValidInvByCode(value));}
}, 500);
/*const handleInputCodeChange = (e) => {
    const value = e.target.value;
    setEANCOD_0(value);
    
    debouncedCodeDispatch(value);
};*/
const handlechangeresult = (e) => {
        const value = e.target.value;
        setScanResult(value);
        setEANCOD_0(value);
    };
 //la derniere   
const handleInputCodeChange = (e) => {
    const value = e.target.value;
    setEANCOD_0(value);

    // Recherche l'article correspondant dans localData
    const matchedItem = localData.find(item => item.EANCOD_0 === value);

    // Si un article est trouvé, met à jour ITMREF_0
    if (matchedItem) {
        setITMREF_0(matchedItem.ITMREF_0);
    } else {
        setITMREF_0(''); // Réinitialise si aucun article ne correspond
    }

    debouncedCodeDispatch(value);
};
/*const handleInputCodeChange = (e) => {
    const value = e.target.value.trim(); // Nettoie les espaces
    console.log("Valeur saisie dans Code-barre :", value);
    setEANCOD_0(value);

    if (value) {
        // Recherche de l'élément correspondant dans localData
        const matchedItem = localData.find((item) => item.EANCOD_0 === value);
        console.log("Élément correspondant :", matchedItem);

        if (matchedItem) {
            setITMREF_0(matchedItem.ITMREF_0); // Remplit le champ Code article
            console.log("Code article trouvé :", matchedItem.ITMREF_0);
        } else {
            setITMREF_0(''); // Réinitialise si aucun article ne correspond
            console.log("Aucune correspondance trouvée.");
        }
    } else {
        setITMREF_0(''); // Réinitialise si le champ Code-barre est vide
        console.log("Champ Code-barre vide.");
    }

    debouncedCodeDispatch(value);
};*/

 /*const handleInputCodeChange = (value) => {
        setEANCOD_0(value);

        // Recherche l'article correspondant dans localData
        const matchedItem = localData.find((item) => item.EANCOD_0 === value);

        // Mise à jour ITMREF_0
        if (matchedItem) {
            setITMREF_0(matchedItem.ITMREF_0);
        } else {
            setITMREF_0(""); // Réinitialise si aucun article ne correspond
        }

        debouncedCodeDispatch(value);
    };

    // Simulation du scanner pour stocker directement dans EANCOD_0
    const handleScanResult = (result) => {
        if (result) {
            handleInputCodeChange(result); // Met à jour l'input et appelle handleInputCodeChange
        }
    };*/
  const addNewRow = (e) => {
    e.preventDefault();
    const newRow = {
      STOCOU_0: `new-${Date.now()}`, // ID unique pour la nouvelle ligne
      LOT_0: '', // Valeur initiale pour LOT
      STOFCY_0: '', // Valeur initiale pour Emplacement
      Qt: '' // Valeur initiale pour Quantité
    };
    // Ajouter la nouvelle ligne en haut
    setLocalData([newRow, ...localData]);
  };
   const deleteRow = (id) => {
    const updatedData = localData.filter(row => row.STOCOU_0 !== id);
    setLocalData(updatedData);
  };
    useEffect(() => {
      if (validinv) {
        // Copier les données pour un état local modifiable
        setLocalData(validinv.map((item) => ({ ...item, Qt: item.Qt || '' })));
      };     
    }, [validinv]);
    useEffect(() => {
      if (validinvcode) {
        // Copier les données pour un état local modifiable
        setLocalData(validinvcode.map((item) => ({ ...item, Qt: item.Qt || '' })));
      };     
    }, [validinvcode]);
    useEffect(() => {
      dispatch(getInv());
  }, [dispatch]);
    const handleQtChange = (id, value) => {
      if (!isNaN(value) && value >= 0) {
        const updatedData = localData.map((item) =>
          item.STOCOU_0 === id ? { ...item, Qt: Number(value) } : item
        );
        setLocalData(updatedData);
      } else {
        console.log("Valeur invalide pour Qt.");}};
    // Gestion du popup
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [additionalQt, setAdditionalQt] = useState(""); 
    const openPopup = (id) => {
      setSelectedItemId(id);
      setIsPopupOpen(true);};  

    const closePopup = () => {
      setIsPopupOpen(false);
      setAdditionalQt("");};  

    const handleAddQt = () => {
      const updatedData = localData.map((item) =>
        item.STOCOU_0 === selectedItemId
          ? { ...item, Qt: item.Qt + Number(additionalQt) }
          : item
      );
      setLocalData(updatedData);
      closePopup();
    };
    useEffect(() => {
    if (scanResult) {
        handleInputCodeChange({ target: { value: scanResult } });
    }
}, [scanResult]);
    
    const [REFINV_0, setREFINV_0] = useState('');
    
  
    const [DESINV_0, setDESINV_0] = useState('');
    const [ITMREF_0, setITMREF_0] = useState('');
    const [EANCOD_0, setEANCOD_0] = useState('');
    const [DESINV, setDESINV] = useState('');
  
 
     useEffect(() => {
    if (EANCOD_0.trim() !== "") {
      const matchedItem = localData.find((item) => item.EANCOD_0 === EANCOD_0);
      if (matchedItem) {
        setITMREF_0(matchedItem.ITMREF_0); // Remplit avec itmref trouvé
      } else {
        setITMREF_0(""); // Réinitialise si aucune correspondance
      }
    } else {
      setITMREF_0(""); // Réinitialise si Code-barre est vide
    }
  }, [EANCOD_0, localData]);
    
    return (
        <div className='container col-xl-12 col-md-12 col-12 mx-auto cart-details'>
            <div className='justify-content-center mt-5 col-12 col-md-12'>
                <div className='col-md-12 col-12'>
   
                </div>
            </div>
            <div className='col-md-12 col-xl-12 text-center col-10 col-xs-10 mx-auto bg-white cart-client-infos'>
     <h3 className='pt-2 login-title mt-4'  >Validation inventaire</h3>
                <form>
                  
                <div className="text-start w-100 col-xl-10 col-8 col-md-8 pb-2">
 
                     
                    
                     {/*LIBELE INVENTAIRE */}
    {/*     <select
                
                className="form-control col-xl-10 col-8 col-md-8 mx-auto mt-2"
                value={REFINV_0}
                onChange={(e) => setREFINV_0(e.target.value)}
                style={{ width: '90%', fontSize: '13px' }}
            >
                <option value="" disabled>
                    Sélectionnez un inventaire
                </option>
                {getinv && getinv.length > 0 ? (
                    getinv.map((inv, index) => (
                        <option key={index} value={inv.REFINV_0}>
                            {inv.DESINV_0}
                        </option>
                    ))
                ) : (
                    <option disabled>Aucun inventaire disponible</option>
                )}
            </select>
             <button
                onClick={() => setIsScannerActive(!isScannerActive)}
                className="btn5 btn-primary mt-3"
            >
                {isScannerActive ? "Fermer Scanner" : "Scanner un Code"}
            </button>
            {isScannerActive && <div id="qr-reader" style={{ width: "100%" }} />} */}
<div className="d-flex align-items-center mt-2">
    {/* Select Inventaire */}
    
<input
        
        type="text"
        placeholder="Code-barre"
        className="form-control col-xl-10 col-8 col-md-8 mx-auto"
        value={EANCOD_0}
        onChange={handleInputCodeChange}  // Met à jour le résultat du scan dans l'input
        style={{ width: '90%', fontSize: '13px' }}
      />

    {/* Bouton Scanner */}
    <button
        type="button" // Empêche le comportement par défaut
        onClick={(e) => {
            e.preventDefault(); // Empêche toute action par défaut
            setIsScannerActive(!isScannerActive);
        }}
         className="btn5 btn-primary ml-2 p-1 m-0"
        style={{ fontSize: '13px', height: '30px', width: '38px' }}
    >
        <i className="fas fa-qrcode"></i> {/* Icône de scan */}
    </button>
</div>

{/* Scanner QR si actif */}
{isScannerActive && <div id="qr-reader" style={{ width: "100%" }} />}

            
    {/* Select Inventaire */}
    <select
        className="form-control mt-2 col-xl-10 col-10 col-md-10"
        value={REFINV_0}
        onChange={(e) => setREFINV_0(e.target.value)}
        style={{ width: '90%', fontSize: '13px' }}
    >
        <option value="" disabled>
            Sélectionnez un inventaire
        </option>
        {getinv && getinv.length > 0 ? (
            getinv.map((inv, index) => (
                <option key={index} value={inv.REFINV_0}>
                    {inv.DESINV_0}
                </option>
            ))
        ) : (
            <option disabled>Aucun inventaire disponible</option>
        )}
    </select>

                {/** <input
                    required
                    type='text'
                    placeholder='Code barre'
                    className='form-control col-xl-10 col-8 col-md-8 mx-auto'
                    value={DESINV}
                    onChange={(e) => { setDESINV(e.target.value) }}
                    style={{ width: '90%', fontSize: '13px' }}
                />  */}
{/**<input
        required
        type="text"
        placeholder="Résultat QR Code"
        className="form-control col-xl-10 col-8 col-md-8 mx-auto"
        value={scanResult}
        onChange={(e) => setScanResult(e.target.value)}  // Met à jour le résultat du scan dans l'input
        style={{ width: '90%', fontSize: '13px' }}
      /> 


      <button
        onClick={() => setIsScannerActive(!isScannerActive)}
        className="btn5 btn-primary mt-3"
      >
        {isScannerActive ? "Fermer Scanner" : "Scanner un Code"}
      </button>


<button
                        onClick={() => setIsScannerActive(false)}
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            zIndex: 1700,
                            padding: "10px",
                            backgroundColor: "red",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Fermer
                    </button>
      {isScannerActive && (
        <div style={{ marginTop: "20px", width: "100%" }}>
          <QrReader
            onUpdate={(err, result) => {
              if (result) {
                handleScan(result);
              } else if (err) {
                handleError(err);
              }
            }}
            constraints={{
              video: { width: 1280, height: 720, facingMode: "environment" },
            }}
            style={{ width: "100%" }}
          />
        </div>
      )}
    */}
 {/* Input unique pour résultat scan et manuel */}
                          <input
                
                type="text"
                placeholder="Code-barre"
                className="form-control col-xl-10 col-10 col-md-10 mx-auto"
                value={EANCOD_0} // Résultat combiné (manuel + scan)
                onChange={(e) => handleInputCodeChange}
                style={{ display:'none',width: "90%", fontSize: "13px", marginTop: "10px" }}
            />
 {/* Input unique pour résultat scan et manuel */}
<input
                
                type="text"
                placeholder="Résultat QR Code"
                className="form-control col-xl-10 col-8 col-md-8 mx-auto"
                value={scanResult}
                onChange={handlechangeresult}
                style={{ display:'none',width: "90%", fontSize: "13px", marginTop: "10px" }}
            />
    
         
    <input
                
                type='text'
                placeholder='Code article'
                className='form-control col-xl-10 col-10 col-md-10 mx-auto'
                value={ITMREF_0}
                onChange={handleInputChange}
                style={{ width: '90%', fontSize: '13px' }}
readOnly={EANCOD_0.trim() !== ''}
            />   
    
    

                  
     <div className="mb-4" style={{ display:'none'}}>
    <h5 className="text-lg font-bold mb-2 mt-4 w-50 mx-auto">Référence</h5>
    <ul className="list-disc list-inside">
      {[...new Set(localData.map((item) => item.ITMREF_0))].map((itmref, index) => (
        <li key={index} className="text-xs mx-auto w-50" style={{ listStyle: 'none'}}>{itmref}</li>
      ))}
    </ul>
  
  </div>
  <div className="text-right mb-2">
  <button
    onClick={(e) => addNewRow(e)}
    className="btn5 bg-blue-500 text-white px-3 py-1 rounded"
  >
    Ajouter une ligne
  </button>
</div>
            <table className="table-auto border-collapse border border-gray-400 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-1">Lot</th>
            <th className="border border-gray-300 px-2 py-1">Emplacement</th>
            <th className="border border-gray-300 px-2 py-1">Quantité</th>
          </tr>
        </thead>
        <tbody>
  {localData.map((item) => (
    <tr key={item.STOCOU_0}>
      <td className="border border-gray-300 px-1 py-2">
        <input
          type="text"
          value={item.LOT_0}
          onChange={(e) => {
            const updatedData = localData.map((row) =>
              row.STOCOU_0 === item.STOCOU_0 ? { ...row, LOT_0: e.target.value } : row
            );
            setLocalData(updatedData);
          }}
          className="form-control mx-auto border p-1"
          style={{ width: "90%", fontSize: "13px" }}
        />
      </td>
      <td className="border border-gray-300 px-1 py-2">
        <input
          type="text"
          value={item.STOFCY_0}
          onChange={(e) => {
            const updatedData = localData.map((row) =>
              row.STOCOU_0 === item.STOCOU_0 ? { ...row, STOFCY_0: e.target.value } : row
            );
            setLocalData(updatedData);
          }}
          className="form-control mx-auto border p-1"
          style={{ width: "90%", fontSize: "13px" }}
        />
      </td>
      <td className="border border-gray-300 px-1 py-2">
        <input
          type="number"
          value={item.Qt}
          onChange={(e) => handleQtChange(item.STOCOU_0, e.target.value)}
          className="form-control mx-auto border p-1"
          style={{ width: "90%", fontSize: "13px" }}
        />
        <button
        type='button'
          onClick={() => openPopup(item.STOCOU_0)}
          className="btn5 bg-red-500 text-white px-1 py-1 rounded mt-1"
        >
          +
        </button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
      
      {/* Popup */}
      {isPopupOpen && (
  <div
    className="position-fixed top-0 left-0 w-60 h-100 bg-opacity-50 d-flex justify-content-center align-items-center"
    style={{ zIndex: 1050 }} // Assurez-vous que ce z-index est plus élevé que tous les autres composants.
>
    <div className="bg-white p-4 rounded shadow-lg border w-100">
      <h3 className="text-lg font-bold mb-2">Ajouter une quantité</h3>
      <input
        type="number"
        placeholder="Entrez une quantité"
        className="form-control mb-4"
        value={additionalQt}
        onChange={(e) => setAdditionalQt(e.target.value)}
      />
      <div className="d-flex justify-content-end">
        <button
          onClick={closePopup}
          className="btn5 btn-secondary me-2">
          Annuler
        </button>
        <button
          onClick={handleAddQt}
          className="btn5 btn-primary">
            Ajouter
        </button>
      </div>
    </div>
  </div>
)}


                </div></form>
            </div>

            <footer className="menubar-area fot footer-fixed mt-2 cart-footer" style={{ backgroundColor: 'rgb(255,255,255)' }}>
                <div className='flex-container col-12'>
                  
                    <div className="menubar-nav d-flex justify-content-end col-10 mx-auto">
                    <CheckoutValidinv
    REFINV_0={REFINV_0}
    ITMREF_0={ITMREF_0}
    localData={localData}
/>
                    </div>
                </div>
            </footer>  

        </div>
    );
}

export default Validinv;
 {/*REFERENCE INVENTAIRE 
                      
                      <input
                        required
                        type='text'
                        placeholder='Reference inventaire'
                        className='form-control col-xl-10 col-8 col-md-8 mx-auto'
                        value={REFINV}
                        onChange={(e) => { setREFINV(e.target.value) }}
                        style={{ width: '90%', fontSize: '13px' }}
                    /> 
                      */}

                      { /*  const handleCheckout = () => {
                        const DESINVInput = document.querySelector('input[placeholder="Libelé inventaire"]');
                        const REFINVnput = document.querySelector('input[placeholder="Reference inventaire"]');
                        const DATEINVInput = document.querySelector('input[type="date"]');
                        // Check if any of the fields are empty
                      
                        const isDESINVValid = DESINVInput.value.trim() !== '';
                        const isREFINVValid = REFINVnput.value.trim() !== '';
                        const isDATEINVValid = DATEINVInput.value.trim() !== '';
                      
                        if(isDESINVValid){
                            console.log('tru');
                        }
                        if ( isDESINVValid && isREFINVValid && isDATEINVValid) {
                                // Proceed with your checkout logic
                                // ...
                            
                                  // Perform checkout logic
                            const orderGroup = {
                                items: validInvstate.map(item => ({
                                    REFINV: item.REFINV_0,
                                    EMPLAC: item.STOFCY_0,
                                    ITMREF: item.ITMREF_0 ,
                                    LOT: item.LOT_0,
                                    QTYINV :item.QTYINV_0,
                                    USR: item.USER // Assuming isChecked indicates if the item is free
                                })),
                                orderInfo: {
                                   // ORDDAT: DATEINV,
                                    //BPCORD: REFINV,
                                    //BPCNAME:DESINV
                                }
                            };
                            //generateOrderPDF(orderGroup);
                            } else
                                   // Show an alert and focus on the fiDESINVt empty field
                             {
                                alert('Please enter the "Raison Social".');
                                console.log('Please enter')
                            } };
                      
                        const generateOrderPDF = (orderGroup) => {
                             // Add Poppins font to jsPDF
                      
                      
                            const doc = new jsPDF();
                            const logoImg = new Image();
                            logoImg.src = '../logo.jpg'; // Ensure the path is correct
                        
                            // Calculate total price and quantity
                            const totalQuantity = orderGroup.items.reduce((total, item) => total + item.QTY, 0);
                            const totalP = orderGroup.items.reduce((total, item) => total + item.NETPRI, 0);
                            const totalPrice = orderGroup.items.reduce((total, item) => total + item.TOTLIN, 0);
                        
                            logoImg.onload = () => {
                                doc.addImage(logoImg, 'JPG', 25, 15, 30, 20); // x, y, width, height
                                doc.setFontSize(15);
                                doc.setFont("poppins", "bold");
                                doc.setTextColor('#003f7e');
                                doc.text(`TOP CLASS ESPRESSO`, 120, 20);
                                doc.setFontSize(12);
                                doc.setFont("helvetica", "normal");
                                doc.setTextColor(0, 0, 0);
                            
                                doc.text(`E :` + currentUser.EMAILUSR, 120, 35);
                                doc.text(`P:   ` + currentUser.TELEP, 120, 40);
                                doc.text(`DETAIL COMMANDE`, 15, 55);
                        
                                const columns = ["", ""];
                                const rows = [
                                    ["Chargé de compte :", currentUser.NOMUSR],
                                    ["Date :", orderGroup.orderInfo.ORDDAT],
                                    ["Client Code :", orderGroup.orderInfo.BPCORD],
                                    ["Raisons Social :", orderGroup.orderInfo.BPCNAME]
                                ];
                        
                                doc.autoTable({
                                    startY: 60,
                                    head: [columns],
                                    body: rows,
                                    theme: 'plain',
                                    styles: { cellPadding: 1, fontSize: 10 },
                                    columnStyles: {
                                        0: { cellWidth: 40 },
                                        1: { cellWidth: 100 }
                                    }
                                });
                                doc.setFontSize(25); // Set font size
                                doc.setFont("helvetica", "bold"); // Set font to Helvetica and make it bold
                                doc.setTextColor('#003f7e'); // Set text color to blue (RGB format)
                                doc.text(`BON DE COMMANDE`, 65, 110);
                        
                                const tableColumns = ['Référence','Désignation','Quantité', 'Prix unitaire','Total HT'];
                                const tableRows = orderGroup.items.map(item => [item.ITMREF,item.ITMDES, item.QTY, item.GRAT == 1 ? 'Gratuit' : `${item.NETPRI.toLocaleString('fr-MA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,`${item.TOTLIN.toLocaleString('fr-MA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`]);
                        
                                doc.autoTable({
                                    startY: 120,
                                    head: [tableColumns],
                                    styles: { cellPadding: 1, fontSize: 10 },
                                    body: tableRows,
                                    foot: [[ '','', '',  `Total HT`, `${totalPrice.toLocaleString('fr-MA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH`]],
                                    headStyles: { fillColor: '#063970' },  // Light grey background
                                    footStyles: { fillColor: '#063970' },
                                    didDrawPage: function (data) {
                                        // Calculate the position for the custom text
                                        let pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
                                        let textY = data.cuDESINVor.y + 35; // Add 10 units below the table
                                        let textX = data.settings.margin.left + 30;
                                        // Add custom text after the table foot
                                        doc.setFontSize(15); 
                                        doc.setFont("helvetica", "bold"); // Set font to Helvetica and make it bold
                                        doc.setTextColor('#000000'); // Set text color to blue (RGB format)
                                        doc.text("VISA", textX, textY);
                                    }
                                });
                        
                                // Save the PDF as a base64 string
                                const pdfData = doc.output('datauristring').split(',')[1];
                                const uniqueId = new Date().toISOString();
                                // Send the PDF to the server
                                fetch('https://topclassapi2.onrender.com/send-email', {
                                    method: 'POST',
                                    headeDESINV: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        email:['rguigmed107@gmail.com', 'mohamedrguig26@gmail.com', currentUser.EMAILUSR], // Replace with recipient email
                                        subject: `Nouvelle commande ${uniqueId}`,
                                        text: `Vous avez une nouvelle commande .Pour plus d'information merci d'ouvrir le pdf ci-dessous.`,
                                        pdfData: pdfData,
                                    }),
                                })
                                .then(response => response.json())
                                .then(data => {
                                    console.log('Success:', data);
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });
                                doc.save(`order_${orderGroup.orderInfo.ORDDAT}.pdf`);
                                alert('Your order PDF is exported and sent via email!');
                            };
                        };*/  }  
